-- Fix the sequence to start after the highest existing survey ID, then add surveys
SELECT setval('surveys_id_seq', (SELECT MAX(id) FROM surveys));

-- Add 5 new Gold Plus surveys (250 KSH each, 12 questions)
-- Gold Plus: Entertainment and Education categories
INSERT INTO public.surveys (title, category, category_id, reward, duration, questions_count, is_active, created_at) VALUES
('Entertainment & Streaming Habits', 'Entertainment', 'gold_plus', 250, '6 min', 12, true, NOW()),
('Gaming & Esports Interest', 'Entertainment', 'gold_plus', 250, '5 min', 12, true, NOW()),
('Online Learning & Courses', 'Education', 'gold_plus', 250, '6 min', 12, true, NOW()),
('Career Development & Skills', 'Education', 'gold_plus', 250, '5 min', 12, true, NOW()),
('Social Media & Content Creation', 'Entertainment', 'gold_plus', 250, '6 min', 12, true, NOW());
