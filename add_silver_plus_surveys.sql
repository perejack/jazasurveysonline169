-- Fix the sequence to start after the highest existing survey ID, then add surveys
SELECT setval('surveys_id_seq', (SELECT MAX(id) FROM surveys));

-- Add 5 new Silver Plus surveys (200 KSH each, 10 questions)
-- Silver Plus: Health and Lifestyle categories
INSERT INTO public.surveys (title, category, category_id, reward, duration, questions_count, is_active, created_at) VALUES
('Health & Fitness Habits', 'Health', 'silver_plus', 200, '5 min', 10, true, NOW()),
('Mental Wellness Survey', 'Health', 'silver_plus', 200, '4 min', 10, true, NOW()),
('Lifestyle & Daily Routine', 'Lifestyle', 'silver_plus', 200, '5 min', 10, true, NOW()),
('Fashion & Style Preferences', 'Lifestyle', 'silver_plus', 200, '4 min', 10, true, NOW()),
('Wellness & Self-Care', 'Health', 'silver_plus', 200, '5 min', 10, true, NOW());
