-- Fix the sequence to start after the highest existing survey ID, then add surveys
SELECT setval('surveys_id_seq', (SELECT MAX(id) FROM surveys));

-- Add 5 new Bronze Plus surveys (150 KSH each, 8 questions)
INSERT INTO public.surveys (title, category, category_id, reward, duration, questions_count, is_active, created_at) VALUES
('Online Shopping Preferences', 'Technology', 'bronze_plus', 150, '4 min', 8, true, NOW()),
('Mobile App Experience', 'Technology', 'bronze_plus', 150, '3 min', 8, true, NOW()),
('Digital Payment Methods', 'Finance', 'bronze_plus', 150, '4 min', 8, true, NOW()),
('Investment Awareness', 'Finance', 'bronze_plus', 150, '5 min', 8, true, NOW()),
('Tech Gadget Usage', 'Technology', 'bronze_plus', 150, '3 min', 8, true, NOW());
