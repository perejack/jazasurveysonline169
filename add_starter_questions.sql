-- Questions for "Kenya Consumer Shopping Habits" (Survey 1)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Kenya Consumer Shopping Habits' LIMIT 1), 'Where do you shop most often?', '{"Local markets","Supermarkets","Online stores","Malls","Small shops/kiosks"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Kenya Consumer Shopping Habits' LIMIT 1), 'How often do you go shopping?', '{"Daily","2-3 times a week","Weekly","Monthly","Less often"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Kenya Consumer Shopping Habits' LIMIT 1), 'What influences your buying decision most?', '{"Price","Quality","Brand","Recommendations","Advertisements"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Kenya Consumer Shopping Habits' LIMIT 1), 'Do you compare prices before buying?', '{"Always","Often","Sometimes","Rarely","Never"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Kenya Consumer Shopping Habits' LIMIT 1), 'What payment method do you prefer?', '{"Cash","M-Pesa","Credit/Debit card","Mobile banking","Credit from shop"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Kenya Consumer Shopping Habits' LIMIT 1), 'How much do you spend weekly on shopping?', '{"Under 500 KSH","500-1000 KSH","1000-2500 KSH","2500-5000 KSH","Over 5000 KSH"}', 6);

-- Questions for "Mobile Money Usage Patterns" (Survey 2)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Mobile Money Usage Patterns' LIMIT 1), 'Which mobile money service do you use?', '{"M-Pesa","Airtel Money","TKash","Equitel","Multiple services"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Mobile Money Usage Patterns' LIMIT 1), 'How often do you use mobile money?', '{"Daily","Several times a week","Weekly","Monthly","Rarely"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Mobile Money Usage Patterns' LIMIT 1), 'What do you use mobile money for most?', '{"Sending money","Receiving money","Paying bills","Buying goods","Banking transactions"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Mobile Money Usage Patterns' LIMIT 1), 'Are you satisfied with transaction fees?', '{"Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Mobile Money Usage Patterns' LIMIT 1), 'Have you ever had issues with mobile money?', '{"Never","Rarely","Sometimes","Often","Very often"}', 5);

-- Questions for "Public Transport Preferences" (Survey 3)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Public Transport Preferences' LIMIT 1), 'What transport do you use most?', '{"Matatu","Bus","Boda boda","Taxi/Uber","Personal car"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Public Transport Preferences' LIMIT 1), 'How much do you spend on transport daily?', '{"Under 100 KSH","100-200 KSH","200-500 KSH","500-1000 KSH","Over 1000 KSH"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Public Transport Preferences' LIMIT 1), 'Are you satisfied with public transport?', '{"Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Public Transport Preferences' LIMIT 1), 'What is your biggest transport concern?', '{"Cost","Safety","Time delays","Overcrowding","Route availability"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Public Transport Preferences' LIMIT 1), 'Would you use a ride-sharing app?', '{"Already do","Yes, definitely","Maybe","Probably not","No interest"}', 5);

-- Questions for "Food & Dining Preferences" (Survey 4)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Food & Dining Preferences' LIMIT 1), 'Where do you eat most often?', '{"Home cooked","Street food","Restaurants","Fast food","Hotel/Café"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Food & Dining Preferences' LIMIT 1), 'How often do you eat out?', '{"Daily","2-3 times a week","Weekly","Monthly","Rarely"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Food & Dining Preferences' LIMIT 1), 'What cuisine do you prefer?', '{"Kenyan traditional","Fast food","Indian","Chinese","Continental/Western"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Food & Dining Preferences' LIMIT 1), 'How much do you spend on a meal out?', '{"Under 200 KSH","200-500 KSH","500-1000 KSH","1000-2000 KSH","Over 2000 KSH"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Food & Dining Preferences' LIMIT 1), 'Do you use food delivery apps?', '{"Often","Sometimes","Rarely","Never","Didn''t know they exist"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Food & Dining Preferences' LIMIT 1), 'What matters most when dining out?', '{"Price","Taste","Hygiene","Location","Service quality"}', 6);

-- Questions for "Entertainment & Media Consumption" (Survey 5)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Media Consumption' LIMIT 1), 'How do you watch movies/shows most?', '{"TV","Cinema","Streaming services","Downloads","YouTube"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Media Consumption' LIMIT 1), 'What type of music do you listen to?', '{"Bongo/Genge","Gospel","International pop","Afrobeat","Reggae/Roots"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Media Consumption' LIMIT 1), 'How many hours of entertainment daily?', '{"Less than 1 hour","1-2 hours","2-4 hours","4-6 hours","Over 6 hours"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Media Consumption' LIMIT 1), 'Do you subscribe to any streaming service?', '{"Netflix","Showmax","Amazon Prime","YouTube Premium","None"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Media Consumption' LIMIT 1), 'What device do you use for entertainment?', '{"Smartphone","TV","Laptop","Tablet","Cinema"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Media Consumption' LIMIT 1), 'How much do you spend on entertainment monthly?', '{"Under 500 KSH","500-1000 KSH","1000-2500 KSH","2500-5000 KSH","Over 5000 KSH"}', 6);

-- Questions for "Healthcare Access & Satisfaction" (Survey 6)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Healthcare Access & Satisfaction' LIMIT 1), 'Where do you seek medical care most?', '{"Public hospital","Private hospital","Pharmacy","Clinic","Traditional healer"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Healthcare Access & Satisfaction' LIMIT 1), 'Do you have health insurance?', '{"NHIF","Private insurance","Both","None","Planning to get"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Healthcare Access & Satisfaction' LIMIT 1), 'How far is your nearest health facility?', '{"Walking distance","Under 5km","5-10km","10-20km","Over 20km"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Healthcare Access & Satisfaction' LIMIT 1), 'Are you satisfied with healthcare costs?', '{"Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Healthcare Access & Satisfaction' LIMIT 1), 'How often do you visit a doctor?', '{"Monthly","Every 3 months","Yearly","Only when sick","Rarely"}', 5);

-- Questions for "Education & Learning Preferences" (Survey 7)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Education & Learning Preferences' LIMIT 1), 'What is your highest education level?', '{"Primary","Secondary","Diploma","Degree","Postgraduate"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Education & Learning Preferences' LIMIT 1), 'Are you currently studying?', '{"Yes, full-time","Yes, part-time","Planning to","No, completed","No, stopped"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Education & Learning Preferences' LIMIT 1), 'How do you prefer to learn new skills?', '{"Online courses","In-person classes","Self-study","Videos/Tutorials","Workshops"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Education & Learning Preferences' LIMIT 1), 'Would you pay for an online course?', '{"Yes, definitely","Maybe, if affordable","Unsure","Probably not","No"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Education & Learning Preferences' LIMIT 1), 'What skills do you want to learn?', '{"Technology/Digital","Business/Finance","Creative arts","Languages","Professional skills"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Education & Learning Preferences' LIMIT 1), 'How much would you spend on a course?', '{"Under 1000 KSH","1000-5000 KSH","5000-15000 KSH","15000-50000 KSH","Over 50000 KSH"}', 6);

-- Questions for "Technology & Device Usage" (Survey 8)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Technology & Device Usage' LIMIT 1), 'What smartphone do you use?', '{"Samsung","Tecno/Infinix/Itel","iPhone","Huawei/Xiaomi","Other/Feature phone"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Technology & Device Usage' LIMIT 1), 'How many hours daily on your phone?', '{"1-2 hours","3-4 hours","5-6 hours","7-8 hours","Over 8 hours"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Technology & Device Usage' LIMIT 1), 'What do you use your phone for most?', '{"Social media","Communication","Entertainment","Work/Business","News/Information"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Technology & Device Usage' LIMIT 1), 'Do you have internet at home?', '{"Yes, WiFi","Yes, mobile data","Both","No, use public WiFi","No internet access"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Technology & Device Usage' LIMIT 1), 'How much do you spend on data monthly?', '{"Under 500 KSH","500-1000 KSH","1000-2500 KSH","2500-5000 KSH","Over 5000 KSH"}', 5);
