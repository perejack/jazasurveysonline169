import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, TrendingUp, Star, Lock, Loader2, Wallet, ArrowRight, AlertCircle, X, CheckCircle } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useSurveys } from "@/hooks/useSurveys";
import { useCategories } from "@/hooks/useCategories";
import { supabase } from "@/lib/supabase";
import { SURVEY_CATEGORIES, MpesaService } from "@/lib/mpesa";
import { BottomNav } from "./Dashboard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const CategorySurveys = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { profile, loading: profileLoading } = useProfile();
  const { categories, isCategoryUnlocked } = useCategories();
  const { surveys, loading: surveysLoading, completedSurveyIds } = useSurveys();
  const [categorySurveys, setCategorySurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Withdrawal states
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processingStep, setProcessingStep] = useState(0);

  const category = categories.find(c => c.id === categoryId);
  const isUnlocked = categoryId ? isCategoryUnlocked(categoryId) : false;
  const balance = profile?.balance || 0;

  useEffect(() => {
    // Filter surveys for this category
    if (surveys.length > 0 && categoryId) {
      const filtered = surveys.filter(s => {
        const surveyCategoryId = (s as any).category_id || 'starter';
        return surveyCategoryId === categoryId;
      });
      setCategorySurveys(filtered);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [surveys, categoryId]);

  if (profileLoading || loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-surface pb-24">
        <div className="bg-primary px-4 pt-12 pb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-primary-foreground mb-4"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            Category Locked
          </h1>
        </div>
        <div className="px-4 py-8 text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-10 w-10 text-destructive" />
          </div>
          <p className="text-muted-foreground mb-4">
            This category is locked. Unlock it to access surveys.
          </p>
          <button
            onClick={() => navigate("/unlock-categories")}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Unlock Now
          </button>
        </div>
        <BottomNav active="home" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-primary-foreground mb-4"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-foreground">
              {category?.name || "Category"}
            </h1>
            <p className="text-primary-foreground/70 text-sm">
              {category?.surveys_available || 0} surveys available
            </p>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/60 text-xs">Your Balance</p>
            <p className="font-display text-xl font-bold text-accent">
              KSH {balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Category Stats */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1 rounded-xl bg-primary-foreground/10 p-3 text-center">
            <p className="text-primary-foreground/50 text-xs">Earning Cap</p>
            <p className="font-display font-bold text-primary-foreground text-lg">
              KSH {category?.earning_cap?.toLocaleString() || 0}
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-primary-foreground/10 p-3 text-center">
            <p className="text-primary-foreground/50 text-xs">Reward/Survey</p>
            <p className="font-display font-bold text-accent text-lg">
              KSH {category?.reward_per_survey || 0}
            </p>
          </div>
        </div>

        {/* Withdraw Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowWithdrawModal(true)}
          className="mt-4 w-full bg-accent text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <Wallet className="h-5 w-5" />
          Withdraw Funds
        </motion.button>
      </div>

      {/* Surveys List */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">Available Surveys</h3>
          <span className="text-muted-foreground text-xs">{categorySurveys.length} surveys</span>
        </div>

        {categorySurveys.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">
              No surveys available in this category yet.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back later for new surveys!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {categorySurveys.map((survey) => {
                const isCompleted = completedSurveyIds.has(survey.id);
                
                return (
                  <motion.div
                    key={survey.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!isCompleted) {
                        navigate(`/survey/${survey.id}`);
                      }
                    }}
                    className={`bg-card rounded-2xl p-4 shadow-card cursor-pointer group hover:shadow-premium transition-all ${
                      isCompleted ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative">
                        <TrendingUp className="h-5 w-5 text-primary" />
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
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display font-bold text-primary text-sm">KSH {survey.reward}</p>
                        {isCompleted ? (
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
        )}
      </div>

      <BottomNav active="home" />

      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Withdraw Funds</h2>
              <button onClick={() => setShowWithdrawModal(false)} className="p-2 hover:bg-muted rounded-full">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground text-sm mb-2">Available Balance</p>
              <p className="font-display text-3xl font-bold text-primary">KSH {balance.toLocaleString()}</p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Enter Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">KSH</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-border bg-background text-foreground font-display text-xl font-bold focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {[100, 200, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setWithdrawAmount(amount.toString())}
                  className="flex-1 py-2 rounded-lg bg-muted hover:bg-primary/10 text-sm font-medium transition-colors"
                >
                  KSH {amount}
                </button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!withdrawAmount || parseInt(withdrawAmount) <= 0) {
                  toast.error("Please enter a valid amount");
                  return;
                }
                if (parseInt(withdrawAmount) > balance) {
                  toast.error("Insufficient balance");
                  return;
                }
                setShowWithdrawModal(false);
                setShowProcessingModal(true);
                setProcessingStep(0);
                
                // Simulate processing steps
                setTimeout(() => setProcessingStep(1), 1500);
                setTimeout(() => setProcessingStep(2), 3000);
                setTimeout(() => {
                  setShowProcessingModal(false);
                  setShowInactiveModal(true);
                }, 4500);
              }}
              className="w-full bg-primary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2"
            >
              <Wallet className="h-5 w-5" />
              Withdraw KSH {withdrawAmount || "0"}
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Modal */}
      <Dialog open={showProcessingModal} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-0">
          <div className="p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wallet className="h-10 w-10 text-primary" />
              </div>
            </div>
            
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              {processingStep === 0 && "Processing Withdrawal..."}
              {processingStep === 1 && "Connecting to M-Pesa..."}
              {processingStep === 2 && "Transferring Funds..."}
            </h3>
            <p className="text-muted-foreground text-sm">
              {processingStep === 0 && "Please wait while we process your request"}
              {processingStep === 1 && "Initiating M-Pesa transaction"}
              {processingStep === 2 && `Sending KSH ${withdrawAmount} to your account`}
            </p>

            <div className="mt-6 flex justify-center gap-1">
              {[0, 1, 2].map((step) => (
                <motion.div
                  key={step}
                  animate={{
                    backgroundColor: processingStep >= step ? "#16a34a" : "#e5e7eb",
                    scale: processingStep === step ? 1.2 : 1
                  }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inactive Account Modal */}
      <Dialog open={showInactiveModal} onOpenChange={setShowInactiveModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-0">
          <div className="p-6">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            
            <h2 className="font-display text-xl font-bold text-foreground text-center mb-2">
              Account Inactive
            </h2>
            
            <p className="text-muted-foreground text-center mb-6">
              We have detected your account is inactive. Unable to complete direct M-Pesa withdrawal. 
              <span className="text-foreground font-medium"> Activate your account</span> and try the withdrawal again.
            </p>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Withdrawal Failed</p>
                  <p className="text-sm text-muted-foreground">KSH {withdrawAmount || "0"} - Account inactive</p>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowInactiveModal(false);
                setShowActivateModal(true);
              }}
              className="w-full bg-accent text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2"
            >
              <ArrowRight className="h-5 w-5" />
              Activate Account
            </motion.button>
            
            <button
              onClick={() => setShowInactiveModal(false)}
              className="w-full mt-3 py-3 text-muted-foreground font-medium hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Activate Account Modal */}
      <Dialog open={showActivateModal} onOpenChange={setShowActivateModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Activate Account</h2>
              <button onClick={() => setShowActivateModal(false)} className="p-2 hover:bg-muted rounded-full">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Activation Fee</p>
              <p className="font-display text-3xl font-bold text-foreground">KSH 169</p>
              <p className="text-xs text-muted-foreground mt-1">One-time payment to enable withdrawals</p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">M-Pesa Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                  placeholder="2547XX XXX XXX"
                  className="w-full px-4 py-4 rounded-xl border-2 border-border bg-background text-foreground font-medium focus:border-primary focus:outline-none"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Enter your M-Pesa number to receive STK push</p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">M-Pesa Payment</p>
                  <p className="text-sm text-muted-foreground">KSH 169 will be deducted</p>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                if (phoneNumber.length < 10) {
                  toast.error("Please enter a valid phone number");
                  return;
                }
                
                const formattedPhone = phoneNumber.startsWith('254') ? phoneNumber : '254' + phoneNumber.replace(/^0/, '');
                
                // Use MpesaService like in category unlock
                const result = await MpesaService.initiateSTKPush(
                  formattedPhone,
                  169,
                  'ACTIVATE_ACCOUNT',
                  'Account activation fee',
                  profile?.id || '',
                  'activation'
                );

                if (result.success && result.checkoutRequestId) {
                  // Poll for payment status
                  MpesaService.pollPaymentStatus(
                    result.checkoutRequestId,
                    profile?.id || '',
                    'activation',
                    () => {
                      // Payment successful
                      setShowActivateModal(false);
                      setShowSuccessModal(true);
                    },
                    () => {
                      // Payment failed
                      toast.error('Payment failed. Please try again.');
                    }
                  );
                } else {
                  toast.error(result.error || 'Failed to initiate payment');
                }
              }}
              disabled={phoneNumber.length < 10}
              className="w-full bg-primary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wallet className="h-5 w-5" />
              Pay KSH 169 & Activate
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-0">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Account Activated!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your account has been successfully activated. You can now withdraw your earnings directly to M-Pesa.
            </p>

            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-medium">Status: Active</p>
              <p className="text-green-600 text-sm">Withdrawals enabled</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary text-white rounded-xl py-4 font-bold"
            >
              Continue
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategorySurveys;
