-- ==============================================================================
-- CLEAN USER DATA SCRIPT FOR JAZA SURVEYS
-- This script removes all user accounts, profiles, completions, payments & withdrawals
-- while PRESERVING all surveys, categories, and question data.
-- ==============================================================================

-- 1. Wipe all user-related operational tables in public schema
TRUNCATE TABLE public.survey_completions CASCADE;
TRUNCATE TABLE public.withdrawals CASCADE;
TRUNCATE TABLE public.user_packages CASCADE;
TRUNCATE TABLE public.user_category_unlocks CASCADE;
TRUNCATE TABLE public.mpesa_payments CASCADE;
TRUNCATE TABLE public.profiles CASCADE;

-- 2. Delete all registered authentication users from Supabase Auth schema
-- (CASCADE will clean up auth.identities, auth.sessions, auth.mfa, etc.)
DELETE FROM auth.users;

-- 3. Confirm clean state
SELECT 'Profiles count' AS table_name, COUNT(*) FROM public.profiles
UNION ALL
SELECT 'Auth users count', COUNT(*) FROM auth.users
UNION ALL
SELECT 'Survey completions count', COUNT(*) FROM public.survey_completions
UNION ALL
SELECT 'Withdrawals count', COUNT(*) FROM public.withdrawals
UNION ALL
SELECT 'M-Pesa payments count', COUNT(*) FROM public.mpesa_payments;
