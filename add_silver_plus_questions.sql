-- Questions for "Health & Fitness Habits" (Survey 1)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'How often do you exercise?', '{"Daily","3-4 times a week","1-2 times a week","Rarely","Never"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'What type of exercise do you prefer?', '{"Gym/Weights","Running/Jogging","Swimming","Yoga","Team Sports","Home Workouts"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'How many hours of sleep do you get?', '{"Less than 5 hours","5-6 hours","7-8 hours","9+ hours"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'Do you follow a specific diet?', '{"Balanced diet","Vegetarian","Vegan","Keto/Low carb","Intermittent fasting","No specific diet"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'How much water do you drink daily?', '{"Less than 1 liter","1-2 liters","2-3 liters","More than 3 liters"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'Do you take any supplements?', '{"Yes, vitamins","Yes, protein","Yes, other supplements","No supplements"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'How often do you visit a doctor?', '{"Every month","Every 3 months","Once a year","Only when sick","Never"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'Do you track your fitness with apps/wearables?', '{"Yes, smartwatch","Yes, phone app","Yes, both","No tracking"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'What is your biggest health goal?', '{"Lose weight","Build muscle","Improve stamina","Eat healthier","Reduce stress","Better sleep"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Health & Fitness Habits' LIMIT 1), 'What prevents you from being healthier?', '{"Lack of time","No motivation","Too expensive","No access to gym","Poor diet options","Lack of knowledge"}', 10);

-- Questions for "Mental Wellness Survey" (Survey 2)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'How would you rate your stress level?', '{"Very low","Low","Moderate","High","Very high"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'How do you cope with stress?', '{"Exercise","Meditation","Talk to friends/family","Entertainment/TV","Sleep","Eat comfort food"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'Do you practice meditation or mindfulness?', '{"Daily","A few times a week","Occasionally","Never tried","Not interested"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'How is your work-life balance?', '{"Excellent","Good","Fair","Poor","Very poor"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'Do you feel anxious often?', '{"Never","Rarely","Sometimes","Often","Always"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'Have you ever seen a therapist/counselor?', '{"Yes, currently","Yes, in the past","Considering it","No, but might","No, never"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'What affects your mental health most?', '{"Work pressure","Financial stress","Relationships","Family issues","Health concerns","Social media"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'Do you take breaks during work/study?', '{"Yes, regular breaks","Sometimes","Rarely","Never","Not applicable"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'How do you unwind after a long day?', '{"Watch TV/Movies","Read books","Exercise","Spend time with family","Social media","Sleep early"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Mental Wellness Survey' LIMIT 1), 'What would improve your mental wellness?', '{"More free time","Better sleep","Less work stress","Stronger relationships","Financial stability","Professional help"}', 10);

-- Questions for "Lifestyle & Daily Routine" (Survey 3)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'What time do you usually wake up?', '{"Before 6 AM","6-7 AM","7-8 AM","8-9 AM","After 9 AM"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'How do you commute to work/school?', '{"Private car","Public transport","Motorcycle/Boda boda","Walk","Work from home","Bicycle"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'How many hours do you work/study daily?', '{"Less than 4 hours","4-6 hours","7-8 hours","9-10 hours","More than 10 hours"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'What is your housing situation?', '{"Own home","Renting apartment","Renting house","Living with family","Shared accommodation"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'How do you spend your weekends?', '{"Resting at home","Outdoor activities","Social gatherings","Shopping","Church/Religious activities","Side hustle/Extra work"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'Do you cook at home or eat out?', '{"Always cook at home","Mostly cook at home","Equal mix","Mostly eat out","Always eat out"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'How much do you spend on groceries weekly?', '{"Under KSH 2,000","KSH 2,000 - 5,000","KSH 5,000 - 10,000","KSH 10,000 - 20,000","Over KSH 20,000"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'Do you have any pets?', '{"Yes, dog(s)","Yes, cat(s)","Yes, other pets","No pets","Planning to get"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'What is your household size?', '{"Living alone","2 people","3-4 people","5-6 people","More than 6"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Lifestyle & Daily Routine' LIMIT 1), 'What would improve your daily life?', '{"Better income","Shorter commute","More leisure time","Better housing","Healthier lifestyle","Less stress"}', 10);

-- Questions for "Fashion & Style Preferences" (Survey 4)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'How often do you buy new clothes?', '{"Weekly","Monthly","Every 3 months","Twice a year","Once a year or less"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'What is your preferred shopping style?', '{"Online shopping","Physical stores","Both equally","Thrift/Second-hand","Custom/Tailored"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'How much do you spend on clothing monthly?', '{"Under KSH 2,000","KSH 2,000 - 5,000","KSH 5,000 - 10,000","KSH 10,000 - 20,000","Over KSH 20,000"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'What influences your fashion choices?', '{"Comfort","Trends/Fashion","Price","Brand","Quality/Durability","Celebrity influence"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'Do you follow fashion trends?', '{"Always","Often","Sometimes","Rarely","Never"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'Where do you shop for clothes?', '{"Local markets","Shopping malls","Online stores","Instagram/Facebook sellers","International brands"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'What type of clothing do you buy most?', '{"Casual wear","Formal/Office wear","Traditional/African wear","Sportswear","Mix of everything"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'Do you prefer local or international brands?', '{"Only local","Mostly local","Both equally","Mostly international","Only international"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'What accessories do you wear regularly?', '{"Watches","Jewelry","Sunglasses","Bags","Hats/Caps","None regularly"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Fashion & Style Preferences' LIMIT 1), 'What would improve your shopping experience?', '{"Better prices","More variety","Quality products","Faster delivery","Easy returns","Better customer service"}', 10);

-- Questions for "Wellness & Self-Care" (Survey 5)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'How often do you practice self-care?', '{"Daily","A few times a week","Weekly","Monthly","Rarely or never"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'What self-care activities do you enjoy?', '{"Spa/Salon visits","Reading","Nature walks","Meditation","Shopping","Socializing with friends"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'How much do you spend on self-care monthly?', '{"Under KSH 1,000","KSH 1,000 - 3,000","KSH 3,000 - 5,000","KSH 5,000 - 10,000","Over KSH 10,000"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'Do you use skincare products?', '{"Yes, daily routine","Yes, occasionally","Only when needed","No, never","Planning to start"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'How do you relax after a stressful day?', '{"Take a bath","Listen to music","Watch movies","Sleep","Exercise","Talk to someone"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'Do you treat yourself to special experiences?', '{"Yes, regularly","Yes, occasionally","Rarely","Never","Cannot afford it"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'What wellness services interest you?', '{"Massage therapy","Yoga classes","Nutrition coaching","Mental health counseling","Fitness training","Spa treatments"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'Do you have a morning or evening routine?', '{"Yes, both","Only morning","Only evening","No fixed routine","Planning to start"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'What prevents you from self-care?', '{"No time","Too expensive","Not a priority","Do not know how","Feel guilty spending on self","No access to services"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Wellness & Self-Care' LIMIT 1), 'How important is self-care to you?', '{"Extremely important","Very important","Somewhat important","Not very important","Not important at all"}', 10);
