import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home, User, Wallet, Award, ChevronRight, Star, Clock,
  TrendingUp, Bell, Lock, Loader2, CheckCircle2, X
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useSurveys } from "@/hooks/useSurveys";
import { useCategories } from "@/hooks/useCategories";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import catTech from "@/assets/cat-tech.jpg";
import catLifestyle from "@/assets/cat-lifestyle.jpg";
import catFmcg from "@/assets/cat-fmcg.jpg";
import catEducation from "@/assets/cat-education.jpg";
import catHealth from "@/assets/cat-health.jpg";
import catEntertainment from "@/assets/cat-entertainment.jpg";

const surveyCategories = [
  { name: "Technology", img: catTech, count: 12 },
  { name: "Lifestyle", img: catLifestyle, count: 8 },
  { name: "FMCG", img: catFmcg, count: 15 },
  { name: "Education", img: catEducation, count: 10 },
  { name: "Health", img: catHealth, count: 6 },
  { name: "Entertainment", img: catEntertainment, count: 9 },
];

const FREE_TIER_LIMIT = 1500;

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useProfile();
  const { categories, unlocks, isCategoryUnlocked, hasReachedFreeLimit, getCategoryProgress, getTotalEarnings } = useCategories();
  const { surveys, loading: surveysLoading, completedSurveyIds, hasCompletedAllSurveys } = useSurveys();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedCompletedSurvey, setSelectedCompletedSurvey] = useState<any>(null);

  const earnedAmount = profile?.total_earned || 0;
  const remainingAmount = Math.max(0, FREE_TIER_LIMIT - earnedAmount);

  // Filter surveys to only show those from unlocked categories
  // Starter surveys (no category_id) are always shown
  // Paid category surveys only show if that category is unlocked
  const visibleSurveys = surveys.filter((s) => {
    const surveyCategoryId = (s as any).category_id;
    // If no category_id, it's a starter survey - always show
    if (!surveyCategoryId) return true;
    // Otherwise, only show if the category is unlocked
    return isCategoryUnlocked(surveyCategoryId);
  });

  // Check if any paid category is unlocked (bronze_plus or higher)
  const hasUnlockedPaidCategory = categories.some(cat => !cat.is_free && isCategoryUnlocked(cat.id));
  
  // Check if all VISIBLE surveys are completed (not all surveys in DB)
  const allVisibleSurveysCompleted = visibleSurveys.length > 0 && visibleSurveys.every(s => completedSurveyIds.has(s.id));
  
  const reachedLimit = (hasReachedFreeLimit() || allVisibleSurveysCompleted) && !hasUnlockedPaidCategory;
  const starterProgress = getCategoryProgress('starter');
  const totalEarnings = getTotalEarnings();
  const balance = profile?.balance || 0;

  const filteredSurveys = selectedCategory
    ? visibleSurveys.filter((s) => s.category === selectedCategory)
    : visibleSurveys;

  const handleSurveyClick = (surveyId: number) => {
    const isCompleted = completedSurveyIds.has(surveyId);
    if (reachedLimit) {
      setShowLimitModal(true);
    } else if (isCompleted) {
      const survey = surveys.find(s => s.id === surveyId);
      setSelectedCompletedSurvey(survey);
      setShowCompletedModal(true);
    } else {
      navigate(`/survey/${surveyId}`);
    }
  };

  const loading = profileLoading || surveysLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-20 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Good morning 👋</p>
            <h2 className="font-display text-xl font-bold text-primary-foreground">
              {profile?.full_name || 'User'}
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary-foreground" />
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
            >
              <User className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-foreground/10 glass rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/60 text-xs font-medium uppercase tracking-wider">Account Balance</p>
              <motion.p
                key={balance}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-extrabold text-accent mt-1"
              >
                KSH {balance.toLocaleString()}
              </motion.p>
              <p className="text-primary-foreground/50 text-xs mt-1">Min withdrawal: KSH 2,500</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/withdraw")}
                className="rounded-xl bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition hover:opacity-90"
              >
                Withdraw
              </button>
              <button
                onClick={() => navigate("/packages")}
                className="rounded-xl border border-primary-foreground/20 px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                Upgrade
              </button>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex-1 rounded-xl bg-primary-foreground/5 p-3 text-center">
              <p className="text-primary-foreground/50 text-xs">Completed</p>
              <p className="font-display font-bold text-primary-foreground text-lg">
                {profile?.surveys_completed || 0}
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-primary-foreground/5 p-3 text-center">
              <p className="text-primary-foreground/50 text-xs">Pending</p>
              <p className="font-display font-bold text-primary-foreground text-lg">
                {profile?.surveys_pending || 0}
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-primary-foreground/5 p-3 text-center">
              <p className="text-primary-foreground/50 text-xs">Earned</p>
              <p className="font-display font-bold text-accent text-lg">
                {profile?.total_earned?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Free Tier Limit Banner */}
      {reachedLimit && (
        <div className="px-4 -mt-8 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl p-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/90 to-orange-500/90" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-white text-lg">Free Survey Limit!</p>
                  <p className="text-white/90 text-sm">
                    You've earned KSH {earnedAmount.toLocaleString()} from {completedSurveyIds.size} surveys
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((earnedAmount / FREE_TIER_LIMIT) * 100, 100)}%` }}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/10 rounded-xl p-3">
                  <p className="text-white/80 text-xs">Earned</p>
                  <p className="font-bold text-white">KSH {earnedAmount.toLocaleString()}</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-3">
                  <p className="text-white/80 text-xs">Remaining</p>
                  <p className="font-bold text-white">KSH {remainingAmount.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/unlock-categories")}
                className="w-full mt-4 rounded-xl bg-white py-3 text-sm font-bold text-orange-600 shadow-lg hover:bg-white/90 transition"
              >
                Unlock More Tasks to Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Categories */}
      <div className={`px-4 ${reachedLimit ? '' : '-mt-8'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Categories</h3>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs text-primary font-semibold"
          >
            View All
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {surveyCategories.map((cat) => (
            <motion.button
              key={cat.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`flex-shrink-0 relative rounded-2xl overflow-hidden w-24 h-28 ${
                selectedCategory === cat.name ? "ring-2 ring-accent ring-offset-2" : ""
              }`}
            >
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-primary-foreground text-xs font-bold">{cat.name}</p>
                <p className="text-primary-foreground/60 text-[10px]">{cat.count} surveys</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Daily Tasks</h3>
          <span className="bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">Complete 3 surveys today</p>
              <p className="text-muted-foreground text-xs">Earn bonus KSH 50</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">1/3</p>
              <div className="w-16 h-1.5 rounded-full bg-muted mt-1">
                <div className="w-1/3 h-full rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Surveys */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">
            {selectedCategory ? selectedCategory : "Available"} Surveys
          </h3>
          <span className="text-muted-foreground text-xs">{filteredSurveys.length} surveys</span>
        </div>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredSurveys.map((survey) => {
              const isCompleted = completedSurveyIds.has(survey.id);
              // Check if survey's category is unlocked using category_id field
              const surveyCategoryId = (survey as any).category_id || 'starter';
              const isSurveyUnlocked = isCategoryUnlocked(surveyCategoryId);
              
              return (
                <motion.div
                  key={survey.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSurveyClick(survey.id)}
                  className={`bg-card rounded-2xl p-4 shadow-card cursor-pointer group hover:shadow-premium transition-all ${
                    reachedLimit && !isSurveyUnlocked ? "opacity-70" : ""
                  } ${isCompleted ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      {reachedLimit && !isSurveyUnlocked && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive flex items-center justify-center">
                          <Lock className="h-3 w-3 text-destructive-foreground" />
                        </div>
                      )}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-foreground truncate">{survey.title}</p>
                        {survey.premium && (
                          <span className="bg-accent/20 text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                            Premium
                          </span>
                        )}
                        {isCompleted && (
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                            Done
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-blue-600 bg-blue-50 text-xs flex items-center gap-1 px-2 py-0.5 rounded-full font-medium">
                          <Clock className="h-3 w-3" /> {survey.duration}
                        </span>
                        <span className="text-purple-600 bg-purple-50 text-xs px-2 py-0.5 rounded-full font-medium">{survey.questions_count} Qs</span>
                        <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">{survey.category}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-bold text-primary text-sm">KSH {survey.reward}</p>
                      {reachedLimit && !isSurveyUnlocked ? (
                        <Lock className="h-4 w-4 text-destructive ml-auto mt-1" />
                      ) : isCompleted ? (
                        <span className="text-xs text-green-600 font-medium">Completed</span>
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto mt-1 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Completed Survey Modal */}
      <AnimatePresence>
        {showCompletedModal && selectedCompletedSurvey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompletedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Animation */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Survey Already Completed!
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  You've already completed this survey and earned your reward.
                </p>

                {/* Survey Details Card */}
                <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                  <p className="font-semibold text-foreground text-sm mb-3">
                    {selectedCompletedSurvey.title}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Reward Earned</p>
                      <p className="font-display text-lg font-bold text-green-600">
                        KSH {selectedCompletedSurvey.reward}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="text-sm font-semibold text-green-600 flex items-center gap-1 justify-center">
                        <CheckCircle2 className="h-3 w-3" /> Completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6">
                  <p className="text-xs text-primary font-medium">
                    🎉 Great job! Look for new surveys to earn more.
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => setShowCompletedModal(false)}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90 transition"
                >
                  Got it!
                </button>
              </div>

              {/* Close X */}
              <button
                onClick={() => setShowCompletedModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav active="home" />
    </div>
  );
};

export const BottomNav = ({ active }: { active: string }) => {
  const navigate = useNavigate();
  const items = [
    { id: "home", icon: Home, label: "Home", path: "/dashboard" },
    { id: "tasks", icon: Award, label: "Tasks", path: "/dashboard" },
    { id: "wallet", icon: Wallet, label: "Wallet", path: "/withdraw" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 pb-2 pt-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
              active === item.id
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className={`h-5 w-5 ${active === item.id ? "text-primary" : ""}`} />
            <span className="text-[10px] font-semibold">{item.label}</span>
            {active === item.id && (
              <motion.div layoutId="nav-indicator" className="w-1 h-1 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
