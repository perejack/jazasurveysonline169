import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export class MpesaService {
  static formatPhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = '254' + cleaned.substring(1);
    if (cleaned.startsWith('+')) cleaned = cleaned.substring(1);
    if (!cleaned.startsWith('254')) cleaned = '254' + cleaned;
    return cleaned;
  }

  static async initiateSTKPush(
    phoneNumber: string,
    amount: number,
    accountReference: string,
    transactionDesc: string,
    userId: string,
    categoryId: string
  ): Promise<{ success: boolean; checkoutRequestId?: string; error?: string }> {
    try {
      const formattedPhone = this.formatPhone(phoneNumber);
      const merchantRequestId = `MR${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      const tempCheckoutRequestId = `CR${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

      const { error: dbError } = await supabase.from('mpesa_payments').insert({
        user_id: userId,
        category_id: categoryId,
        amount,
        phone_number: formattedPhone,
        checkout_request_id: tempCheckoutRequestId,
        merchant_request_id: merchantRequestId,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (dbError) throw dbError;

      // Exact CLEANSHELFPAYHERO endpoint + payload shape
      const response = await fetch('/api/payhero/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          phoneNumber: phoneNumber,
          phone_number: formattedPhone,
          amount,
          description: transactionDesc,
          reference: accountReference,
          referencePrefix: 'JAZA',
        }),
      });

      let data: Record<string, unknown> | null = null;
      try {
        data = (await response.json()) as Record<string, unknown>;
      } catch {
        await supabase
          .from('mpesa_payments')
          .update({ status: 'failed', result_desc: 'Invalid server response' })
          .eq('checkout_request_id', tempCheckoutRequestId);
        return { success: false, error: `Payment service returned an invalid response (${response.status}).` };
      }

      const checkoutRequestId =
        (typeof data.checkoutId === 'string' ? data.checkoutId : null) ??
        (typeof data.checkoutRequestId === 'string' ? data.checkoutRequestId : null);

      if (!response.ok || data.success === false || !checkoutRequestId) {
        const errorMessage =
          (typeof data.message === 'string' ? data.message : null) ??
          (typeof data.error === 'string' ? data.error : null) ??
          `Failed to initiate payment (${response.status})`;
        await supabase
          .from('mpesa_payments')
          .update({ status: 'failed', result_desc: errorMessage })
          .eq('checkout_request_id', tempCheckoutRequestId);
        return { success: false, error: errorMessage };
      }

      await supabase
        .from('mpesa_payments')
        .update({ checkout_request_id: checkoutRequestId, status: 'processing' })
        .eq('checkout_request_id', tempCheckoutRequestId);

      toast.success('STK Push sent! Check your phone and enter PIN.');
      return { success: true, checkoutRequestId };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to initiate payment' };
    }
  }

  static async pollPaymentStatus(
    checkoutRequestId: string,
    userId: string,
    categoryId: string,
    onComplete: () => void,
    onFailed: () => void,
    maxAttempts: number = 12
  ) {
    let attempts = 0;

    const checkStatus = async () => {
      if (attempts >= maxAttempts) {
        onFailed();
        return;
      }

      attempts++;

      try {
        // Exact CLEANSHELFPAYHERO status endpoint + body
        const response = await fetch('/api/payhero/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutId: checkoutRequestId }),
        });

        const data = (await response.json()) as Record<string, unknown>;

        if (!response.ok || data.status === 'error') {
          setTimeout(checkStatus, 5000);
          return;
        }

        const responseStatus = String(data.status ?? data.state ?? '').toLowerCase();
        const rawStatus = String(data.rawStatus ?? '').toLowerCase();
        const receiptNumber =
          (typeof data.receiptNumber === 'string' ? data.receiptNumber : null) ?? null;
        const resultDesc =
          (typeof data.resultDesc === 'string' ? data.resultDesc : '') ||
          (typeof data.message === 'string' ? data.message : '');

        const paid =
          responseStatus === 'paid' ||
          responseStatus === 'success' ||
          rawStatus === 'success' ||
          rawStatus === 'completed' ||
          rawStatus === 'paid';

        const failed =
          responseStatus === 'failed' ||
          rawStatus === 'failed' ||
          rawStatus === 'cancelled' ||
          rawStatus === 'canceled';

        if (paid) {
          await supabase
            .from('mpesa_payments')
            .update({
              status: 'completed',
              mpesa_receipt_number: receiptNumber,
              result_code: 0,
              result_desc: 'Success',
            })
            .eq('checkout_request_id', checkoutRequestId);

          await supabase.from('user_category_unlocks').upsert(
            {
              user_id: userId,
              category_id: categoryId,
              payment_status: 'completed',
              mpesa_checkout_request_id: checkoutRequestId,
              unlocked_at: new Date().toISOString(),
              total_earned_in_category: 0,
              surveys_completed_in_category: 0,
            },
            { onConflict: 'user_id,category_id' },
          );

          onComplete();
          return;
        }

        if (failed) {
          await supabase
            .from('mpesa_payments')
            .update({
              status: 'failed',
              result_desc: resultDesc || 'Payment failed',
            })
            .eq('checkout_request_id', checkoutRequestId);
          onFailed();
          return;
        }

        setTimeout(checkStatus, 5000);
      } catch {
        setTimeout(checkStatus, 5000);
      }
    };

    setTimeout(checkStatus, 5000);
  }
}

export const SURVEY_CATEGORIES = [
  { id: 'starter', name: 'Free Starter', description: 'Complete free surveys and earn up to KSH 1,500', unlock_price: 0, earning_cap: 1500, surveys_available: 10, rate_per_survey: 150, icon: 'Gift', gradient: 'from-emerald-400 to-teal-600', is_free: true },
  { id: 'bronze_plus', name: 'Bronze Plus', description: 'Unlock surveys earning up to KSH 1,000 more', unlock_price: 159, earning_cap: 1000, surveys_available: 8, rate_per_survey: 125, icon: 'Zap', gradient: 'from-amber-600 to-orange-500', is_free: false },
  { id: 'silver_plus', name: 'Silver Plus', description: 'Unlock surveys earning up to KSH 2,500 more', unlock_price: 199, earning_cap: 2500, surveys_available: 15, rate_per_survey: 167, icon: 'Award', gradient: 'from-slate-400 to-slate-600', is_free: false },
  { id: 'gold_plus', name: 'Gold Plus', description: 'Unlock surveys earning up to KSH 3,000 more', unlock_price: 229, earning_cap: 3000, surveys_available: 15, rate_per_survey: 200, icon: 'Crown', gradient: 'from-yellow-400 to-yellow-600', is_free: false },
  { id: 'platinum_plus', name: 'Platinum Plus', description: 'Unlock surveys earning up to KSH 3,500 more', unlock_price: 259, earning_cap: 3500, surveys_available: 15, rate_per_survey: 234, icon: 'Gem', gradient: 'from-cyan-400 to-blue-600', is_free: false },
  { id: 'diamond_plus', name: 'Diamond Plus', description: 'Unlock surveys earning up to KSH 5,000 more', unlock_price: 299, earning_cap: 5000, surveys_available: 20, rate_per_survey: 250, icon: 'Diamond', gradient: 'from-violet-500 to-purple-700', is_free: false },
];
