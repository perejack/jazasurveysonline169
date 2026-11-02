-- Questions for "Entertainment & Streaming Habits" (Survey 1)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'Which streaming platforms do you use?', '{"Netflix","Showmax","Amazon Prime","YouTube","DSTV/GOtv","None of these"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'How many hours do you stream daily?', '{"Less than 1 hour","1-2 hours","2-3 hours","3-4 hours","More than 4 hours"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'What type of content do you watch most?', '{"Movies","TV Series","Documentaries","Reality Shows","Sports","Music Videos"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'Do you pay for streaming subscriptions?', '{"Yes, multiple services","Yes, one service","Share family/friend account","Free trials only","No, I use free platforms"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'How much do you spend on entertainment monthly?', '{"Under KSH 500","KSH 500 - 1,000","KSH 1,000 - 2,000","KSH 2,000 - 5,000","Over KSH 5,000"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'What device do you use for streaming?', '{"Smartphone","Smart TV","Laptop","Tablet","Regular TV with decoder"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'Do you download or stream content?', '{"Always download","Mostly download","Equal mix","Mostly stream","Always stream"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'What influences your content choice?', '{"Recommendations","Trending/Popular","Friends suggestions","Social media buzz","Personal research"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'Do you watch local Kenyan content?', '{"Yes, exclusively","Yes, mostly","Equal mix","Rarely","Never"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'What frustrates you about streaming?', '{"Buffering/Loading","High costs","Limited content","Poor video quality","Subscription management","Internet data usage"}', 10),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'Would you pay for exclusive content?', '{"Yes, definitely","Yes, if affordable","Maybe, depends on content","Probably not","No, never"}', 11),
((SELECT id FROM public.surveys WHERE title = 'Entertainment & Streaming Habits' LIMIT 1), 'What new features would you want?', '{"Offline downloads","4K quality","Multiple screens","Cheaper plans","Local content library","Live events streaming"}', 12);

-- Questions for "Gaming & Esports Interest" (Survey 2)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Do you play video games?', '{"Yes, daily","Yes, a few times a week","Yes, occasionally","Rarely","Never"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'What gaming platform do you use?', '{"Mobile phone","PlayStation","Xbox","PC/Laptop","Nintendo","Multiple platforms"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'What type of games do you prefer?', '{"Action/FPS","Sports","Racing","Puzzle/Casual","RPG/Adventure","Strategy"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'How much do you spend on gaming monthly?', '{"Nothing","Under KSH 500","KSH 500 - 1,000","KSH 1,000 - 3,000","Over KSH 3,000"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Do you watch gaming/esports content?', '{"Yes, regularly","Yes, occasionally","Rarely","Never","What is esports?"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Which game streamers do you follow?', '{"Local Kenyan streamers","International pro players","YouTube gamers","Facebook gaming","None of these"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Have you participated in gaming tournaments?', '{"Yes, regularly","Yes, a few times","Once","Interested but never","No interest"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Do you play games competitively or casually?', '{"Always competitive","Mostly competitive","Equal mix","Mostly casual","Always casual"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'What prevents you from gaming more?', '{"Expensive devices","No time","Poor internet","Cost of games","No gaming friends","Not interested"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Would you attend a gaming event in Kenya?', '{"Definitely yes","Probably yes","Maybe","Probably not","Definitely not"}', 10),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'Do you know about Kenyan esports teams?', '{"Yes, follow them","Heard of them","Not aware","What is esports?","Not interested"}', 11),
((SELECT id FROM public.surveys WHERE title = 'Gaming & Esports Interest' LIMIT 1), 'What would improve gaming in Kenya?', '{"Better internet","Gaming lounges","Cheaper consoles","Local tournaments","Sponsorships","Game development jobs"}', 12);

-- Questions for "Online Learning & Courses" (Survey 3)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'Have you taken online courses?', '{"Yes, multiple","Yes, a few","Currently enrolled","Planning to start","Never taken"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'Which platforms do you use for learning?', '{"Coursera","Udemy","YouTube","LinkedIn Learning","Local platforms","University online courses"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'What subjects interest you most?', '{"Technology/IT","Business/Entrepreneurship","Marketing","Design/Creative","Finance","Personal development"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'How much would you pay for a good course?', '{"Under KSH 1,000","KSH 1,000 - 5,000","KSH 5,000 - 10,000","KSH 10,000 - 20,000","Over KSH 20,000"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'What is your preferred learning format?', '{"Video lessons","Live classes","Reading materials","Interactive exercises","Project-based"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'How much time can you dedicate weekly?', '{"Less than 2 hours","2-5 hours","5-10 hours","10-20 hours","More than 20 hours"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'Do certificates matter to you?', '{"Very important","Somewhat important","Nice to have","Not important","Do not care"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'What prevents you from learning online?', '{"No time","Too expensive","Poor internet","No laptop/device","No motivation","Too many options"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'Would you prefer local or international courses?', '{"Only local","Mostly local","Both equally","Mostly international","Only international"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'Have online courses helped your career?', '{"Yes, significantly","Yes, somewhat","Not yet","No impact","Haven''t taken any"}', 10),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'Do you learn better alone or in groups?', '{"Definitely alone","Mostly alone","No preference","Mostly groups","Definitely groups"}', 11),
((SELECT id FROM public.surveys WHERE title = 'Online Learning & Courses' LIMIT 1), 'What would improve online learning?', '{"Lower prices","Better internet","Local content","Shorter courses","Mobile-friendly","Mentor support"}', 12);

-- Questions for "Career Development & Skills" (Survey 4)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'Are you satisfied with your current career?', '{"Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'What skills would you like to develop?', '{"Leadership","Technical/IT","Communication","Project management","Sales/Marketing","Financial literacy"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'Do you have a 5-year career plan?', '{"Yes, detailed plan","Yes, rough plan","Thinking about it","No plan","Live day by day"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'How do you stay updated in your field?', '{"Online courses","Professional networks","Reading articles","Podcasts/Videos","Conferences","I don''t stay updated"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'Would you switch careers completely?', '{"Yes, actively planning","Considering it","Maybe in future","Probably not","Definitely not"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'What is your biggest career challenge?', '{"No growth opportunities","Low salary","Poor work environment","Lack of skills","No job security","Work-life balance"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'Do you have a professional mentor?', '{"Yes, very helpful","Yes, somewhat helpful","Looking for one","No, but want one","No, don''t want one"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'How do you network professionally?', '{"LinkedIn","Industry events","Professional associations","Social media","Friends/Referrals","I don''t network"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'What is your ideal work environment?', '{"Remote/Freelance","Office with team","Hybrid mix","Own business","Large corporation","Government job"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'Do you invest in professional development?', '{"Yes, regularly","Yes, occasionally","Rarely","Only if employer pays","Never"}', 10),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'What motivates you at work?', '{"High salary","Growth opportunities","Recognition","Helping others","Learning new things","Job security"}', 11),
((SELECT id FROM public.surveys WHERE title = 'Career Development & Skills' LIMIT 1), 'What would accelerate your career?', '{"More education","Better network","Mentorship","New job","Start business","Technical skills"}', 12);

-- Questions for "Social Media & Content Creation" (Survey 5)
INSERT INTO public.survey_questions (survey_id, question_text, options, question_order) VALUES
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'Which social platforms do you use daily?', '{"Facebook","Instagram","TikTok","Twitter/X","LinkedIn","YouTube"}', 1),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'How many hours on social media daily?', '{"Less than 1 hour","1-2 hours","2-3 hours","3-4 hours","More than 4 hours"}', 2),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'Do you create content or just consume?', '{"Only create","Mostly create","Equal mix","Mostly consume","Only consume"}', 3),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'Have you monetized your content?', '{"Yes, regularly","Yes, occasionally","Once or twice","Trying to","No, never"}', 4),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'What content do you create most?', '{"Photos","Videos/Reels","Stories","Blogs/Articles","Podcasts","Live streams"}', 5),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'What is your follower count?', '{"Under 500","500-1,000","1,000-5,000","5,000-10,000","Over 10,000"}', 6),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'Do you use social media for business?', '{"Yes, main business channel","Yes, partially","Planning to","No, personal use only","No, not interested"}', 7),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'What content do you engage with most?', '{"Entertainment","Educational","News","Lifestyle","Product reviews","Motivational"}', 8),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'What equipment do you use for content?', '{"Just smartphone","Smartphone + accessories","Professional camera","Laptop editing","Studio setup","None"}', 9),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'What challenges do content creators face?', '{"Low engagement","No monetization","Content ideas","Time management","Equipment costs","Algorithm changes"}', 10),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'Would you become a full-time creator?', '{"Already am","Planning to","Considering it","Probably not","Definitely not"}', 11),
((SELECT id FROM public.surveys WHERE title = 'Social Media & Content Creation' LIMIT 1), 'What platform pays best for creators?', '{"YouTube","TikTok","Instagram","Facebook","Twitter/X","Local platforms"}', 12);
