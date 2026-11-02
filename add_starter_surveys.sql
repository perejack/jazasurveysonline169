-- Reset sequence to avoid conflicts
SELECT setval('surveys_id_seq', COALESCE((SELECT MAX(id) FROM surveys), 0) + 1, false);

-- Add 8 more starter surveys (free tier surveys)
-- Rewards follow the existing pattern: 110-200 KSH
INSERT INTO public.surveys (title, reward, duration, questions_count, category, is_active, category_id) VALUES
('Kenya Consumer Shopping Habits', 115, '5 min', 6, 'Lifestyle', true, 'starter'),
('Mobile Money Usage Patterns', 118, '4 min', 5, 'Finance', true, 'starter'),
('Public Transport Preferences', 122, '3 min', 5, 'Transport', true, 'starter'),
('Food & Dining Preferences', 125, '4 min', 6, 'Lifestyle', true, 'starter'),
('Entertainment & Media Consumption', 128, '5 min', 6, 'Entertainment', true, 'starter'),
('Healthcare Access & Satisfaction', 132, '4 min', 5, 'Health', true, 'starter'),
('Education & Learning Preferences', 135, '5 min', 6, 'Education', true, 'starter'),
('Technology & Device Usage', 138, '3 min', 5, 'Technology', true, 'starter');
