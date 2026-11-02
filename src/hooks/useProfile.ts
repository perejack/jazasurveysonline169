import { useEffect, useState, useCallback } from 'react';
import { supabase, type Database } from '@/lib/supabase';
import { useAuth } from './useAuth';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error: updateError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    setProfile(data);
    return data;
  }, [user]);

  const updateBalance = useCallback(async (amount: number) => {
    if (!user || !profile) throw new Error('No user logged in');

    const newBalance = profile.balance + amount;
    const newTotalEarned = amount > 0 ? profile.total_earned + amount : profile.total_earned;

    const { data, error: updateError } = await supabase
      .from('profiles')
      .update({
        balance: newBalance,
        total_earned: newTotalEarned,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    setProfile(data);
    return data;
  }, [user, profile]);

  const incrementSurveysCompleted = useCallback(async () => {
    if (!user || !profile) throw new Error('No user logged in');

    const { data, error: updateError } = await supabase
      .from('profiles')
      .update({
        surveys_completed: profile.surveys_completed + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    setProfile(data);
    return data;
  }, [user, profile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`profile:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setProfile(payload.new as Profile);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return {
    profile,
    loading,
    error,
    refresh: fetchProfile,
    updateProfile,
    updateBalance,
    incrementSurveysCompleted,
  };
}
