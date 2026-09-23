import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, CheckCircle, Loader2 } from "lucide-react";
import { BottomNav } from "./Dashboard";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Withdraw = () => {
  const navigate = useNavigate();
  const { profile, refresh } = useProfile();
  const balance = profile?.balance || 0;
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [step, setStep] = useState<"form" | "confirm" | "processing" | "success">("form");
  const [submitting, setSubmitting] = useState(false);

  const minWithdrawal = 2500;
  const canWithdraw = balance >= minWithdrawal && parseInt(amount) >= minWithdrawal && parseInt(amount) <= balance;

  const quickAmounts = [2500, 3000, 5000];

  const handleWithdraw = () => {
    if (!canWithdraw) return;
    setStep("confirm");
  };

  const confirmWithdraw = async () => {
    if (!profile) return;
    
    setSubmitting(true);
    setStep("processing");
    
    try {
      // Create withdrawal record
      const { data: withdrawal, error: withdrawalError } = await supabase
        .from('withdrawals')
        .insert({
          user_id: profile.id,
          amount: parseInt(amount),
          phone_number: phone,
          status: 'processing',
          transaction_id: `TXN${Date.now()}`,
        })
        .select()
        .single();

      if (withdrawalError) throw withdrawalError;

      // Update user balance
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          balance: balance - parseInt(amount),
          total_withdrawn: (profile.total_withdrawn || 0) + parseInt(amount),
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (updateError) {
        // Rollback withdrawal if balance update fails
        await supabase.from('withdrawals').delete().eq('id', withdrawal.id);
        throw updateError;
      }

      // Refresh profile to get updated balance
      await refresh();
      
      setStep("success");
      toast.success(`KSH ${amount} withdrawal initiated!`);
    } catch (err: any) {
      console.error('Withdrawal error:', err);
      toast.error(err.message || 'Failed to process withdrawal');
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h2 className="font-display text-lg font-bold text-primary-foreground">Withdraw to M-Pesa</h2>
        </div>
        <div className="text-center">
          <p className="text-primary-foreground/60 text-xs uppercase tracking-wider">Available Balance</p>
          <p className="font-display text-4xl font-extrabold text-accent mt-1">KSH {balance.toLocaleString()}</p>
          <p className="text-primary-foreground/40 text-xs mt-1">Minimum withdrawal: KSH {minWithdrawal.toLocaleString()}</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-card rounded-2xl p-5 shadow-card">
                <label className="text-sm font-semibold text-foreground block mb-2">Amount (KSH)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-lg font-display font-bold text-foreground focus:border-primary focus:outline-none transition"
                />
                <div className="flex gap-2 mt-3">
                  {quickAmounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a.toString())}
                      className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                        amount === a.toString()
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-foreground border border-border"
                      }`}
                    >
                      {a.toLocaleString()}
                    </button>
                  ))}
                </div>

                <label className="text-sm font-semibold text-foreground block mb-2 mt-5">M-Pesa Number</label>
                <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-surface px-4 py-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent text-foreground font-semibold focus:outline-none"
                  />
                </div>

                {balance < minWithdrawal && (
                  <div className="mt-3 rounded-xl bg-destructive/10 p-3">
                    <p className="text-destructive text-xs font-semibold">
                      Insufficient balance. Minimum withdrawal is KSH {minWithdrawal.toLocaleString()}.
                      Earn KSH {(minWithdrawal - balance).toLocaleString()} more to withdraw.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleWithdraw}
                  disabled={!canWithdraw || submitting}
                  className={`w-full mt-5 rounded-xl py-4 font-bold text-sm transition ${
                    canWithdraw && !submitting
                      ? "bg-primary text-primary-foreground shadow-premium hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {submitting ? 'Processing...' : 'Withdraw to M-Pesa'}
                </button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-card rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-bold text-lg text-foreground text-center mb-4">Confirm Withdrawal</h3>
                <div className="space-y-3 bg-surface rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Amount</span>
                    <span className="font-bold text-foreground">KSH {parseInt(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">M-Pesa Number</span>
                    <span className="font-bold text-foreground">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Fee</span>
                    <span className="font-bold text-primary">FREE</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setStep("form")}
                    className="flex-1 rounded-xl py-3 border-2 border-border font-bold text-sm text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmWithdraw}
                    disabled={submitting}
                    className="flex-1 rounded-xl py-3 bg-primary text-primary-foreground font-bold text-sm shadow-premium disabled:opacity-50"
                  >
                    {submitting ? 'Processing...' : 'Confirm'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <Loader2 className="h-16 w-16 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Processing...</h3>
              <p className="text-muted-foreground text-sm">Sending STK push to {phone}</p>
              <p className="text-muted-foreground text-xs mt-1">Please enter your M-Pesa PIN on your phone</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Withdrawal Successful!</h3>
              <p className="text-muted-foreground text-sm mb-1">KSH {parseInt(amount).toLocaleString()} sent to</p>
              <p className="font-bold text-foreground mb-6">{phone}</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-full bg-primary px-8 py-3 text-primary-foreground font-bold shadow-premium"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav active="wallet" />
    </div>
  );
};

export default Withdraw;
