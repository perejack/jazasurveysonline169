import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Lock, Unlock, Smartphone, CheckCircle,
  Gift, Zap, Award, Crown, Gem, Diamond, ChevronRight,
  Loader2, XCircle, AlertCircle, Sparkles
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useProfile } from "@/hooks/useProfile";
import { SURVEY_CATEGORIES, MpesaService } from "@/lib/mpesa";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gift,
  Zap,
  Award,
  Crown,
  Gem,
  Diamond,
};

export default function UnlockCategories() {
  const navigate = useNavigate();
  const { categories, isCategoryUnlocked, getCategoryProgress, unlockCategory, processingPayment } = useCategories();
  const { profile } = useProfile();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [phone, setPhone] = useState(profile?.phone || "");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'failed'>('idle');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [unlockedCategoryName, setUnlockedCategoryName] = useState('');

  const handleUnlock = async () => {
    if (!selectedCategory) return;
    
    const category = categories.find(c => c.id === selectedCategory);
    if (!category) return;

    if (category.is_free) {
      toast.success("Free category is already unlocked!");
      return;
    }

    setPaymentStatus('processing');
    
    const success = await unlockCategory(
      selectedCategory, 
      phone,
      () => {
        // onSuccess - payment confirmed
        setPaymentStatus('idle');
        setUnlockedCategoryName(category.name);
        setShowPaymentModal(false);
        setTimeout(() => setShowSuccessModal(true), 300);
      },
      () => {
        // onFailure - payment failed
        setPaymentStatus('failed');
      }
    );
    
    if (!success) {
      setPaymentStatus('failed');
    }
  };

  const openPaymentModal = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPaymentStatus('idle');
    setShowPaymentModal(true);
  };

  const getTotalPotentialEarnings = () => {
    return categories.reduce((sum, cat) => sum + cat.earning_cap, 0);
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-8 rounded-b-3xl relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-primary-foreground/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition"
          >
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h2 className="font-display text-lg font-bold text-primary-foreground">Unlock More Tasks</h2>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-foreground/10 backdrop-blur-lg rounded-2xl p-4 border border-primary-foreground/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-primary-foreground/60 text-xs">Total Earning Potential</p>
                <p className="font-display text-2xl font-bold text-primary-foreground">
                  KSH {getTotalPotentialEarnings().toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Unlock premium categories to access higher-paying surveys and maximize your earnings!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories List */}
      <div className="px-4 -mt-4 space-y-4">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon] || Gift;
          const isUnlocked = isCategoryUnlocked(category.id);
          const progress = getCategoryProgress(category.id);
          const isProcessing = processingPayment === category.id;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden shadow-card ${
                isUnlocked ? 'bg-card' : 'bg-card/50'
              }`}
            >
              {/* Category Card */}
              <div className={`p-4 ${category.gradient} bg-gradient-to-r`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl ${isUnlocked ? 'bg-white/20' : 'bg-black/20'} backdrop-blur flex items-center justify-center`}>
                      <Icon className={`h-7 w-7 ${isUnlocked ? 'text-white' : 'text-white/70'}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {isUnlocked ? (
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Unlock className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <div className="bg-black/20 backdrop-blur rounded-xl px-3 py-2">
                        <p className="text-white font-bold text-lg">KSH {category.unlock_price}</p>
                        <p className="text-white/70 text-xs">to unlock</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Surveys</p>
                    <p className="font-bold text-foreground">{category.surveys_available}</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className="text-muted-foreground text-xs">Per Survey</p>
                    <p className="font-bold text-foreground">KSH {category.reward_per_survey}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Max Earning</p>
                    <p className="font-bold text-accent">KSH {category.earning_cap.toLocaleString()}</p>
                  </div>
                </div>

                {isUnlocked ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-bold text-foreground">
                        KSH {progress.earned.toLocaleString()} / KSH {progress.cap.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {progress.surveysCompleted} surveys completed
                      </p>
                      {progress.percentage >= 100 && (
                        <span className="text-xs text-destructive font-medium">Category Maxed</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => openPaymentModal(category.id)}
                    disabled={isProcessing}
                    className="w-full rounded-xl py-3 bg-primary text-primary-foreground font-bold text-sm shadow-premium hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Unlock Now - KSH {category.unlock_price}
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => paymentStatus !== 'processing' && setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`${categories.find(c => c.id === selectedCategory)?.gradient} bg-gradient-to-r p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-white">
                    Unlock Category
                  </h3>
                  {paymentStatus === 'idle' && (
                    <button 
                      onClick={() => setShowPaymentModal(false)}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <XCircle className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
                
                <div className="text-center">
                  <p className="text-white/80 text-sm">Pay KSH {categories.find(c => c.id === selectedCategory)?.unlock_price}</p>
                  <p className="text-white font-display text-3xl font-bold">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {paymentStatus === 'processing' ? (
                  <div className="text-center py-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center mx-auto mb-4"
                    />
                    <p className="text-lg font-bold text-foreground mb-2">Processing Payment...</p>
                    <p className="text-sm text-muted-foreground">
                      Check your phone and enter M-Pesa PIN to complete payment
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Waiting for confirmation...
                    </p>
                  </div>
                ) : paymentStatus === 'failed' ? (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Payment failed. Please check your M-Pesa balance and try again.
                    </p>
                    <button
                      onClick={() => setPaymentStatus('idle')}
                      className="w-full rounded-xl py-3 bg-primary text-primary-foreground font-bold"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        M-Pesa Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 0712345678"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-0 focus:ring-2 focus:ring-primary font-medium"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        You'll receive an M-Pesa STK push on this number
                      </p>
                    </div>

                    <div className="bg-muted rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Unlock Fee</span>
                        <span className="font-medium">KSH {categories.find(c => c.id === selectedCategory)?.unlock_price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Potential Earnings</span>
                        <span className="font-bold text-accent">
                          KSH {categories.find(c => c.id === selectedCategory)?.earning_cap.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-medium">Net Gain Potential</span>
                        <span className="font-bold text-primary">
                          KSH {(categories.find(c => c.id === selectedCategory)?.earning_cap || 0) - (categories.find(c => c.id === selectedCategory)?.unlock_price || 0)}+
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleUnlock}
                      disabled={!phone}
                      className="w-full rounded-xl py-4 bg-primary text-primary-foreground font-bold shadow-premium hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      Pay with M-Pesa
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    <p className="text-xs text-center text-muted-foreground">
                      By clicking Pay, you agree to our Terms of Service and authorize this payment
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal - Shows after payment confirmed */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-border text-center"
            >
              {/* Success Animation */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                  <CheckCircle className="h-12 w-12 text-white" />
                </motion.div>
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Payment Successful!
              </h3>
              <p className="text-muted-foreground mb-4">
                {unlockedCategoryName} unlocked successfully!
              </p>

              <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">You can now access</p>
                <p className="font-semibold text-foreground">{unlockedCategoryName} surveys</p>
              </div>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  // Navigate to the specific category surveys page
                  const category = categories.find(c => c.name === unlockedCategoryName);
                  if (category) {
                    navigate(`/category/${category.id}`);
                  } else {
                    navigate('/dashboard');
                  }
                }}
                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90 transition"
              >
                Start Taking Surveys
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
