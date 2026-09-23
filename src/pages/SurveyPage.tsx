import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, X, Loader2 } from "lucide-react";
import { useSurveys } from "@/hooks/useSurveys";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

interface Question {
  id: number;
  question_text: string;
  options: string[];
}

const SurveyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const surveyId = parseInt(id || "1");
  
  const { surveys, getSurveyQuestions, completeSurvey, completedSurveyIds } = useSurveys();
  const { profile, refresh } = useProfile();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [survey, setSurvey] = useState(surveys.find(s => s.id === surveyId));

  useEffect(() => {
    const loadSurvey = async () => {
      if (!surveyId) return;
      
      setLoading(true);
      try {
        const foundSurvey = surveys.find(s => s.id === surveyId);
        if (foundSurvey) {
          setSurvey(foundSurvey);
        }
        
        const surveyQuestions = await getSurveyQuestions(surveyId);
        setQuestions(surveyQuestions.map(q => ({
          id: q.id,
          question_text: q.question_text,
          options: q.options
        })));
      } catch (err) {
        console.error('Error loading survey:', err);
        toast.error('Failed to load survey');
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [surveyId, surveys, getSurveyQuestions]);

  useEffect(() => {
    console.log('Survey loaded:', survey);
    console.log('Survey category_id:', (survey as any)?.category_id);
  }, [survey]);

  const progress = questions.length > 0 ? ((currentQ + 1) / questions.length) * 100 : 0;
  const question = questions[currentQ];

  // Determine where to redirect after completion
  const getReturnPath = () => {
    const surveyCategoryId = (survey as any)?.category_id;
    console.log('Survey:', survey);
    console.log('Category ID:', surveyCategoryId);
    // Only redirect to category page for paid categories (bronze_plus, silver_plus, gold_plus)
    // Starter surveys return to dashboard
    const paidCategories = ['bronze_plus', 'silver_plus', 'gold_plus'];
    const isPaid = surveyCategoryId && paidCategories.includes(surveyCategoryId);
    console.log('Is paid category:', isPaid);
    return isPaid ? `/category/${surveyCategoryId}` : '/dashboard';
  };

  const handleSelect = async (option: string) => {
    setAnswers({ ...answers, [currentQ]: option });
    
    setTimeout(async () => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        await handleComplete();
      }
    }, 400);
  };

  const handleComplete = async () => {
    if (!survey || !profile) return;
    
    setSaving(true);
    try {
      const formattedAnswers: Record<string, string> = {};
      questions.forEach((q, idx) => {
        formattedAnswers[q.id.toString()] = answers[idx] || '';
      });
      
      await completeSurvey(surveyId, survey.reward, formattedAnswers);
      await refresh();
      
      setCompleted(true);
      toast.success(`Earned KSH ${survey.reward}!`);
    } catch (err: any) {
      console.error('Error completing survey:', err);
      toast.error(err.message || 'Failed to save survey completion');
      navigate(getReturnPath());
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!survey || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground">Survey not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 rounded-full bg-primary px-6 py-2 text-primary-foreground font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-primary" />
          </motion.div>
          <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">Survey Complete!</h2>
          <p className="text-muted-foreground mb-2">You've earned</p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl font-extrabold text-accent mb-6"
          >
            KSH {survey?.reward || 150}
          </motion.p>
          <p className="text-muted-foreground text-sm mb-8">Your balance has been updated</p>
          <button
            onClick={() => navigate(getReturnPath())}
            className="rounded-full bg-primary px-8 py-3 text-primary-foreground font-bold shadow-premium transition hover:opacity-90"
          >
            Continue Surveys
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-medium">{survey?.title}</p>
            <p className="text-xs text-primary font-bold">KSH {survey?.reward || 150} reward</p>
          </div>
          <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-semibold">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-8 text-balance">
              {question?.question_text}
            </h3>
            <div className="space-y-3">
              {question?.options.map((option) => (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(option)}
                  disabled={saving}
                  className={`w-full text-left rounded-2xl p-4 border-2 transition-all font-medium ${
                    answers[currentQ] === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/30"
                  } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {saving && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
