import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { SURVEY_CATEGORIES, MpesaService } from '@/lib/mpesa';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

export interface CategoryUnlock {
  id: string;
  user_id: string;
  category_id: string;
  unlocked_at: string;
  total_earned_in_category: number;
  surveys_completed_in_category: number;
  payment_status: 'pending' | 'completed' | 'failed';
  mpesa_checkout_request_id: string | null;
}

export function useCategories() {
  const { user } = useAuth();
  const [unlocks, setUnlocks] = useState<Map<string, CategoryUnlock>>(new Map());
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);

  const fetchUnlocks = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_category_unlocks')
      .select('*')
      .eq('user_id', user.id)
      .eq('payment_status', 'completed');

    if (error) {
      console.error('Error fetching category unlocks:', error);
      return;
    }

    const unlockMap = new Map<string, CategoryUnlock>();
    data?.forEach((unlock) => {
      unlockMap.set(unlock.category_id, unlock);
    });
    setUnlocks(unlockMap);
  }, [user]);

  useEffect(() => {
    fetchUnlocks();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('category-unlocks')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_category_unlocks',
      }, () => {
        fetchUnlocks();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchUnlocks, user]);

  const isCategoryUnlocked = useCallback((categoryId: string): boolean => {
    // Free starter is always unlocked
    if (categoryId === 'starter') return true;
    return unlocks.has(categoryId);
  }, [unlocks]);

  const getCategoryProgress = useCallback((categoryId: string): {
    earned: number;
    cap: number;
    percentage: number;
    surveysCompleted: number;
  } => {
    const category = SURVEY_CATEGORIES.find(c => c.id === categoryId);
    const unlock = unlocks.get(categoryId);
    
    if (!category) {
      return { earned: 0, cap: 0, percentage: 0, surveysCompleted: 0 };
    }

    const earned = unlock?.total_earned_in_category || 0;
    const cap = category.earning_cap;
    const percentage = cap > 0 ? Math.min((earned / cap) * 100, 100) : 0;
    
    return {
      earned,
      cap,
      percentage,
      surveysCompleted: unlock?.surveys_completed_in_category || 0,
    };
  }, [unlocks]);

  const getTotalEarnings = useCallback((): number => {
    let total = 0;
    unlocks.forEach((unlock) => {
      total += unlock.total_earned_in_category;
    });
    // Include free starter
    const starterProgress = getCategoryProgress('starter');
    total += starterProgress.earned;
    return total;
  }, [unlocks, getCategoryProgress]);

  const canEarnInCategory = useCallback((categoryId: string, reward: number): boolean => {
    const progress = getCategoryProgress(categoryId);
    return progress.earned + reward <= progress.cap;
  }, [getCategoryProgress]);

  const unlockCategory = useCallback(async (
    categoryId: string,
    phoneNumber: string,
    onSuccess?: () => void,
    onFailure?: () => void
  ): Promise<boolean> => {
    const category = SURVEY_CATEGORIES.find(c => c.id === categoryId);
    if (!category) {
      toast.error('Category not found');
      return false;
    }

    if (category.is_free) {
      toast.success('Free category is already unlocked!');
      return true;
    }

    if (!user) {
      toast.error('Please sign in first');
      return false;
    }

    setProcessingPayment(categoryId);

    try {
      // Initiate M-Pesa payment
      const result = await MpesaService.initiateSTKPush(
        phoneNumber,
        category.unlock_price,
        `UNLOCK_${categoryId.toUpperCase()}`,
        `Unlock ${category.name} category`,
        user.id,
        categoryId
      );

      if (result.success && result.checkoutRequestId) {
        // Poll for payment status with real SwiftPaty verification
        MpesaService.pollPaymentStatus(
          result.checkoutRequestId,
          user.id,
          categoryId,
          () => {
            toast.success(`${category.name} unlocked successfully!`);
            fetchUnlocks();
            setProcessingPayment(null);
            onSuccess?.();
          },
          () => {
            toast.error('Payment failed or was cancelled. Please try again.');
            setProcessingPayment(null);
            onFailure?.();
          }
        );
        
        return true;
      } else {
        toast.error(result.error || 'Payment failed');
        onFailure?.();
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment');
      onFailure?.();
      return false;
    } finally {
      // Don't clear processing here - it's cleared in callbacks
    }
  }, [fetchUnlocks]);

  const recordCategoryEarnings = useCallback(async (
    categoryId: string,
    amount: number
  ): Promise<boolean> => {
    if (!user) return false;

    const unlock = unlocks.get(categoryId);
    
    if (unlock) {
      // Update existing unlock
      const { error } = await supabase
        .from('user_category_unlocks')
        .update({
          total_earned_in_category: unlock.total_earned_in_category + amount,
          surveys_completed_in_category: unlock.surveys_completed_in_category + 1,
        })
        .eq('id', unlock.id);

      if (error) {
        console.error('Error updating earnings:', error);
        return false;
      }
    } else if (categoryId === 'starter') {
      // Create starter unlock record
      const { error } = await supabase
        .from('user_category_unlocks')
        .insert({
          user_id: user.id,
          category_id: 'starter',
          payment_status: 'completed',
          total_earned_in_category: amount,
          surveys_completed_in_category: 1,
          unlocked_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating starter unlock:', error);
        return false;
      }
    }

    await fetchUnlocks();
    return true;
  }, [unlocks, fetchUnlocks, user]);

  const hasReachedFreeLimit = useCallback((): boolean => {
    const starterProgress = getCategoryProgress('starter');
    return starterProgress.earned >= 1500;
  }, [getCategoryProgress]);

  const getNextUnlockedCategory = useCallback((): typeof SURVEY_CATEGORIES[0] | null => {
    for (const category of SURVEY_CATEGORIES) {
      if (!isCategoryUnlocked(category.id)) {
        return category;
      }
    }
    return null;
  }, [isCategoryUnlocked]);

  return {
    categories: SURVEY_CATEGORIES,
    unlocks,
    loading,
    processingPayment,
    isCategoryUnlocked,
    getCategoryProgress,
    getTotalEarnings,
    canEarnInCategory,
    unlockCategory,
    recordCategoryEarnings,
    hasReachedFreeLimit,
    getNextUnlockedCategory,
    refresh: fetchUnlocks,
  };
}
