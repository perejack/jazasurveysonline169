-- Questions for "Online Shopping Preferences" (Survey 1)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'How often do you shop online?', '{"Daily","Weekly","Monthly","Rarely","Never"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'What products do you buy most online?', '{"Electronics","Clothing","Food/Groceries","Books","Home items"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'Which platform do you use most?', '{"Jumia","Kilimall","Amazon","Facebook Marketplace","Instagram Shops"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'What influences your purchase decision?', '{"Price","Customer Reviews","Brand Reputation","Delivery Speed","Discounts/Offers"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'How much do you spend monthly on online shopping?', '{"Under KSH 1,000","KSH 1,000 - 5,000","KSH 5,000 - 10,000","KSH 10,000 - 20,000","Over KSH 20,000"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'What payment method do you prefer?', '{"M-Pesa","Credit/Debit Card","Cash on Delivery","Bank Transfer"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'Have you ever returned an online purchase?', '{"Yes","No","Multiple times"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Online Shopping Preferences' LIMIT 1), 'What would improve your online shopping experience?', '{"Faster delivery","Better prices","More variety","Easier returns","Improved customer service"}', 8);

-- Questions for "Mobile App Experience" (Survey 2)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'How many apps do you have on your phone?', '{"Less than 20","20-50","50-100","More than 100"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'Which app category do you use most?', '{"Social Media","Banking/Finance","Shopping","Entertainment","Productivity"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'How often do you download new apps?', '{"Weekly","Monthly","Rarely","Only when needed"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'What makes you uninstall an app?', '{"Too slow","Too many ads","Takes too much storage","Drains battery","Privacy concerns"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'Do you read app reviews before downloading?', '{"Always","Sometimes","Never"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'Have you paid for any app or in-app purchase?', '{"Yes","No","Planning to"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'What feature do you value most in apps?', '{"Speed/Performance","User-friendly design","Offline functionality","Security features","Personalization"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Mobile App Experience' LIMIT 1), 'Any app recommendations or feedback?', '{"Better UI/UX","Faster loading","Less ads","More features","Better support"}', 8);

-- Questions for "Digital Payment Methods" (Survey 3)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'Which digital payment do you use most?', '{"M-Pesa","Bank App","PayPal","Card Payment","Cryptocurrency"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'How often do you use digital payments?', '{"Multiple times daily","Daily","Weekly","Monthly","Rarely"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'What do you pay for most with digital payments?', '{"Utility Bills","Shopping","Money Transfers","Subscriptions","Food Delivery"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'What is your biggest concern with digital payments?', '{"Security/Fraud","Transaction Fees","Network Issues","Transaction Limits","Privacy"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'Have you ever had a failed transaction?', '{"Yes","No","Multiple times"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'How quickly are your issues resolved?', '{"Immediately","Within hours","1-2 days","Longer than a week","Never resolved"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'Would you recommend your payment provider?', '{"Definitely","Probably","Not sure","Probably not","Definitely not"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Digital Payment Methods' LIMIT 1), 'What improvements would you suggest?', '{"Lower fees","Better security","Faster processing","Higher limits","Better support"}', 8);

-- Questions for "Investment Awareness" (Survey 4)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'Do you currently invest in any financial instruments?', '{"Yes","No","Planning to start"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'Which investments are you aware of?', '{"Stocks/Shares","Government Bonds","SACCOs","Money Market Funds","Cryptocurrency","Real Estate"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'How much would you consider investing monthly?', '{"Under KSH 5,000","KSH 5,000 - 10,000","KSH 10,000 - 50,000","KSH 50,000 - 100,000","Over KSH 100,000"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'What is your investment goal?', '{"Short-term gains","Long-term wealth","Retirement","Emergency fund","Education"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'How do you research investments?', '{"Social Media","Friends/Family","Financial Advisor","Bank Information","Online Research"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'What prevents you from investing more?', '{"Lack of knowledge","Insufficient funds","Fear of losing money","Do not trust institutions","No access to platforms"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'Would you use a mobile app for investments?', '{"Yes","No","Maybe"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Investment Awareness' LIMIT 1), 'Any questions about investing?', '{"How to start","Best options","Risks involved","Returns expected","Where to learn"}', 8);

-- Questions for "Tech Gadget Usage" (Survey 5)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'Which device do you use most daily?', '{"Smartphone","Laptop","Tablet","Desktop","Smartwatch"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'How many tech gadgets do you own?', '{"1-2 devices","3-5 devices","6-10 devices","More than 10"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'What do you use your devices for most?', '{"Work","Entertainment","Communication","Learning","Shopping"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'How often do you upgrade your devices?', '{"Every year","Every 2 years","Every 3+ years","Only when broken","Rarely upgrade"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'What influences your gadget purchase?', '{"Brand","Price","Features","Reviews","Warranty/Support"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'Do you use smart home devices?', '{"Yes","No","Planning to buy","Interested but expensive"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'How much do you spend on tech yearly?', '{"Under KSH 10,000","KSH 10,000 - 50,000","KSH 50,000 - 100,000","KSH 100,000 - 200,000","Over KSH 200,000"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Tech Gadget Usage' LIMIT 1), 'What tech product are you planning to buy next?', '{"New phone","Laptop","Smart TV","Smartwatch","Gaming device"}', 8);
