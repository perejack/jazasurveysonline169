import { useEffect, useState, useCallback } from 'react';
import { supabase, type Database } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { useCategories } from './useCategories';

export type Survey = Database['public']['Tables']['surveys']['Row'];
export type SurveyQuestion = Database['public']['Tables']['survey_questions']['Row'];
export type SurveyCompletion = Database['public']['Tables']['survey_completions']['Row'];

export function useSurveys() {
  const { user } = useAuth();
  const { recordCategoryEarnings, hasReachedFreeLimit, getCategoryProgress } = useCategories();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [completedSurveyIds, setCompletedSurveyIds] = useState<Set<number>>(new Set());

  const fetchSurveys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('surveys')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      console.log('Fetched surveys:', data);
      if (data && data.length > 0) {
        console.log('First survey category_id:', (data[0] as any).category_id);
      }

      setSurveys(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch surveys'));
      console.error('Error fetching surveys:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCompletedSurveys = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('survey_completions')
        .select('survey_id')
        .eq('user_id', user.id);

      if (fetchError) {
        throw fetchError;
      }

      const completedIds = new Set(data?.map(c => c.survey_id) || []);
      setCompletedSurveyIds(completedIds);
    } catch (err) {
      console.error('Error fetching completed surveys:', err);
    }
  }, [user]);

  const getSurveyQuestions = useCallback(async (surveyId: number) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('survey_questions')
        .select('*')
        .eq('survey_id', surveyId)
        .order('question_order', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching survey questions:', err);
      throw err;
    }
  }, []);

  const completeSurvey = useCallback(async (surveyId: number, reward: number, answers: Record<string, string>) => {
    if (!user) throw new Error('No user logged in');

    // Check if already completed
    if (completedSurveyIds.has(surveyId)) {
      throw new Error('Survey already completed');
    }

    // Determine which category this survey belongs to
    const survey = surveys.find(s => s.id === surveyId);
    const categoryId = (survey as any)?.category_id || 'starter';

    // Start a transaction
    const { data: completion, error: completionError } = await supabase
      .from('survey_completions')
      .insert({
        user_id: user.id,
        survey_id: surveyId,
        reward_earned: reward,
        answers,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (completionError) {
      throw completionError;
    }

    // Update user's balance and stats using RPC
    const { error: rpcError } = await supabase.rpc('complete_survey', {
      p_user_id: user.id,
      p_reward: reward,
    });

    if (rpcError) {
      // Rollback completion if balance update fails
      await supabase.from('survey_completions').delete().eq('id', completion.id);
      throw rpcError;
    }

    // Record earnings in the appropriate category
    await recordCategoryEarnings(categoryId, reward);

    setCompletedSurveyIds(prev => new Set([...prev, surveyId]));
    return completion;
  }, [user, completedSurveyIds, recordCategoryEarnings, surveys]);

  useEffect(() => {
    fetchSurveys();
    fetchCompletedSurveys();
  }, [fetchSurveys, fetchCompletedSurveys]);

  const hasCompletedAllSurveys = useCallback((): boolean => {
    if (surveys.length === 0) return false;
    return completedSurveyIds.size >= surveys.length;
  }, [surveys.length, completedSurveyIds]);

  return {
    surveys,
    loading,
    error,
    completedSurveyIds,
    refresh: fetchSurveys,
    getSurveyQuestions,
    completeSurvey,
    hasCompletedAllSurveys,
  };
}
