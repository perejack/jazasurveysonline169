import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Unlock, Star, Zap, Crown, TrendingUp, CheckCircle } from "lucide-react";
import { BottomNav } from "./Dashboard";

const surveyPacks = [
  {
    id: "starter",
    name: "Starter Pack",
    icon: Zap,
    price: 200,
    surveys: 5,
    maxEarning: 750,
    color: "primary",
    features: ["5 new surveys", "Earn up to KSH 750", "Technology & Lifestyle topics"],
    popular: false,
  },
  {
    id: "value",
    name: "Value Pack",
    icon: Star,
    price: 350,
    surveys: 10,
    maxEarning: 1500,
    color: "accent",
    features: ["10 new surveys", "Earn up to KSH 1,500", "All categories included", "Priority survey access"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Pack",
    icon: Crown,
    price: 500,
    surveys: 15,
    maxEarning: 2250,
    color: "primary",
    features: ["15 new surveys", "Earn up to KSH 2,250", "Exclusive premium surveys", "Priority survey access", "Bonus reward multiplier"],
    popular: false,
  },
  {
    id: "ultimate",
    name: "Ultimate Pack",
    icon: TrendingUp,
    price: 650,
    surveys: 20,
    maxEarning: 3000,
    color: "accent",
    features: ["20 new surveys", "Earn up to KSH 3,000", "All premium categories", "VIP survey access", "2x bonus rewards", "Daily new surveys"],
    popular: false,
  },
];

const UnlockSurveys = () => {
  const navigate = useNavigate();
  const [unlocking, setUnlocking] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);

  const handleUnlock = (packId: string) => {
    setUnlocking(packId);
    // Simulate STK push
    setTimeout(() => {
      setUnlocking(null);
      setUnlocked(packId);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h2 className="font-display text-lg font-bold text-primary-foreground">Unlock More Surveys</h2>
        </div>
        <div className="bg-primary-foreground/10 glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
              <Lock className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold text-sm">Survey Limit Reached</p>
              <p className="text-primary-foreground/60 text-xs">You've earned KSH 2,000 from free surveys. Unlock a survey pack to continue earning and reach the withdrawal minimum.</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between bg-primary-foreground/5 rounded-xl p-3">
            <div>
              <p className="text-primary-foreground/50 text-xs">Current Balance</p>
              <p className="font-display font-bold text-accent text-lg">KSH 2,000</p>
            </div>
            <div className="text-right">
              <p className="text-primary-foreground/50 text-xs">Withdrawal Min</p>
              <p className="font-display font-bold text-primary-foreground text-lg">KSH 2,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Success Overlay */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-3xl p-8 text-center max-w-sm w-full shadow-premium"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
              >
                <Unlock className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="font-display text-2xl font-extrabold text-foreground mb-2">Pack Unlocked!</h3>
              <p className="text-muted-foreground text-sm mb-2">New surveys are now available</p>
              <p className="text-primary font-bold text-sm">Redirecting to dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STK Push Processing Overlay */}
      <AnimatePresence>
        {unlocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-card rounded-3xl p-8 text-center max-w-sm w-full shadow-premium"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Processing Payment</h3>
              <p className="text-muted-foreground text-sm">Check your phone for the M-Pesa STK push prompt</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Survey Packs */}
      <div className="px-4 mt-6">
        <h3 className="font-display font-bold text-foreground mb-1">Choose a Survey Pack</h3>
        <p className="text-muted-foreground text-xs mb-4">Unlock more surveys to continue earning toward withdrawal</p>
        
        <div className="space-y-4">
          {surveyPacks.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-2xl p-5 shadow-card relative overflow-hidden ${
                pack.popular ? "ring-2 ring-accent" : ""
              }`}
            >
              {pack.popular && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                  MOST POPULAR
                </div>
              )}
              
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  pack.color === "accent" ? "bg-accent/10" : "bg-primary/10"
                }`}>
                  <pack.icon className={`h-6 w-6 ${pack.color === "accent" ? "text-accent" : "text-primary"}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-bold text-foreground">{pack.name}</h4>
                  <p className="text-muted-foreground text-xs">{pack.surveys} surveys · Earn up to KSH {pack.maxEarning.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-extrabold text-primary">KSH {pack.price}</p>
                  <p className="text-muted-foreground text-[10px]">one-time</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {pack.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-xs">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUnlock(pack.id)}
                disabled={!!unlocking}
                className={`w-full rounded-xl py-3 font-bold text-sm transition-all ${
                  pack.popular
                    ? "bg-accent text-accent-foreground shadow-lg hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                } disabled:opacity-50`}
              >
                Unlock for KSH {pack.price}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-muted-foreground text-[10px] text-center mt-4 px-4">
          Payment via M-Pesa. Survey packs unlock additional surveys. Earnings depend on survey completion.
        </p>
      </div>

      <BottomNav active="tasks" />
    </div>
  );
};

export default UnlockSurveys;
