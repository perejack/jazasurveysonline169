import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import catTech from "@/assets/cat-tech.jpg";
import catLifestyle from "@/assets/cat-lifestyle.jpg";
import catFmcg from "@/assets/cat-fmcg.jpg";
import catEducation from "@/assets/cat-education.jpg";
import catHealth from "@/assets/cat-health.jpg";
import catEntertainment from "@/assets/cat-entertainment.jpg";
import { CheckCircle, TrendingUp, Wallet, Star, ArrowRight, Smartphone, Shield, HelpCircle } from "lucide-react";

const categories = [
  { name: "Technology", img: catTech, surveys: 12, reward: "Up to 150 KSH" },
  { name: "Lifestyle", img: catLifestyle, surveys: 8, reward: "Up to 150 KSH" },
  { name: "FMCG", img: catFmcg, surveys: 15, reward: "Up to 150 KSH" },
  { name: "Education", img: catEducation, surveys: 10, reward: "Up to 150 KSH" },
  { name: "Health", img: catHealth, surveys: 6, reward: "Up to 150 KSH" },
  { name: "Entertainment", img: catEntertainment, surveys: 9, reward: "Up to 150 KSH" },
];

const features = [
  { icon: CheckCircle, title: "Simple & Easy", desc: "No typing required — just tap to select your answers" },
  { icon: Wallet, title: "M-Pesa Withdrawal", desc: "Request withdrawal to your M-Pesa once you reach the minimum balance" },
  { icon: TrendingUp, title: "Grow Your Earnings", desc: "Unlock more survey categories as you participate and level up" },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Optimized for your phone so you can participate from anywhere" },
];

const howItWorks = [
  { step: "1", title: "Create Account", desc: "Sign up for free and set up your profile" },
  { step: "2", title: "Answer Surveys", desc: "Browse categories and answer survey questions by tapping" },
  { step: "3", title: "Earn Rewards", desc: "Accumulate earnings for each completed survey" },
  { step: "4", title: "Withdraw", desc: "Request M-Pesa withdrawal when you reach the minimum balance" },
];

const faqs = [
  { q: "How does Jaza work?", a: "Jaza is a survey platform where you answer questions from various brands and organizations. You earn rewards for each completed survey. Earnings vary based on survey length and category." },
  { q: "How much can I earn per survey?", a: "Each survey has its own reward amount, typically up to KSH 150 depending on the survey length and type. Premium surveys may offer different rates." },
  { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal amount is KSH 2,500. You can request a withdrawal to your M-Pesa once your balance reaches this threshold." },
  { q: "Are there limits on surveys?", a: "Free accounts have a survey earning limit. You can unlock additional survey packs to access more surveys and continue earning." },
  { q: "Is Jaza free to use?", a: "Yes, creating an account and starting surveys is completely free. Optional premium features and survey packs are available for users who want to access more content." },
];

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-primary-foreground">
            <span className="text-accent">J</span>aza
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/auth")}
              className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary/20"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-premium transition hover:opacity-90"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src={heroBg}
          alt="Kenyan professionals using smartphones"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur">
              <Star className="h-4 w-4" /> Survey Platform for Kenyans
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-primary-foreground mb-4 text-balance">
              Share Your Opinion.
              <br />
              <span className="text-accent">Get Rewarded.</span>
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg font-body">
              Answer surveys from top brands and earn rewards sent directly to your M-Pesa. No typing — just tap and select.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="group flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg transition hover:scale-105 active:scale-95"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border-2 border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-lg font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/20"
              >
                How It Works
              </button>
            </div>
            <p className="text-primary-foreground/50 text-xs mt-4">
              Free to join. Earnings depend on survey availability and completion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              How <span className="text-primary">Jaza</span> Works
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Getting started is simple. Here's how the platform works.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-display font-extrabold text-xl">
                  {item.step}
                </div>
                <h4 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Why Choose <span className="text-primary">Jaza</span>
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              A platform designed with Kenyans in mind.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-premium transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h4>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Survey Mall */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Survey <span className="text-accent">Categories</span>
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Browse topics that interest you and start participating.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring" }}
                whileHover={{ scale: 1.03 }}
                onClick={() => navigate("/auth")}
                className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square md:aspect-[4/3]"
              >
                <img
                  src={cat.img}
                  alt={`${cat.name} survey category`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="glass rounded-xl px-3 py-2">
                    <h4 className="font-display font-bold text-primary-foreground text-sm md:text-base">{cat.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-primary-foreground/70 text-xs">{cat.surveys} surveys</span>
                      <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                        {cat.reward}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Frequently Asked <span className="text-primary">Questions</span>
            </h3>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                  <HelpCircle className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-muted-foreground text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto text-lg">
              Join our growing community of Kenyans sharing their opinions and earning rewards.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-lg font-bold text-accent-foreground shadow-lg transition hover:scale-105 active:scale-95"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <p className="text-primary-foreground/40 text-xs mt-4">
              No credit card required. Earnings vary based on survey availability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-10">
        <div className="container mx-auto px-4 text-center">
          <h4 className="font-display text-xl font-bold text-background mb-2">
            <span className="text-accent">J</span>aza
          </h4>
          <p className="text-background/50 text-sm mb-4">Survey Platform for Kenyans</p>
          <div className="flex justify-center gap-6 text-background/40 text-xs">
            <span className="cursor-pointer hover:text-background/60 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-background/60 transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-background/60 transition-colors">Contact Us</span>
          </div>
          <p className="text-background/30 text-xs mt-4">© 2026 Jaza. All rights reserved. Individual results may vary.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
