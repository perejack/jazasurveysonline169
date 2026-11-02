import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Auth() {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^0\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid Kenyan phone number (e.g., 0712345678)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message || 'Failed to sign in');
        } else {
          toast.success('Welcome back!');
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.fullName,
          formData.phone
        );
        if (error) {
          toast.error(error.message || 'Failed to sign up');
        } else {
          toast.success('Account created successfully! Please check your email to verify your account.');
          setIsLogin(true);
          setFormData({ ...formData, password: '' });
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
            <span className="text-primary">J</span>aza
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Sign in to continue earning' : 'Create an account to start earning'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Full Name - Only for Signup */}
              {!isLogin && (
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full rounded-xl border-2 bg-surface pl-12 pr-4 py-3 text-foreground focus:outline-none transition ${
                        errors.fullName ? 'border-destructive' : 'border-border focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border-2 bg-surface pl-12 pr-4 py-3 text-foreground focus:outline-none transition ${
                      errors.email ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone - Only for Signup */}
              {!isLogin && (
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Phone Number (M-Pesa)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0712345678"
                      className={`w-full rounded-xl border-2 bg-surface pl-12 pr-4 py-3 text-foreground focus:outline-none transition ${
                        errors.phone ? 'border-destructive' : 'border-border focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border-2 bg-surface pl-12 pr-12 py-3 text-foreground focus:outline-none transition ${
                      errors.password ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-premium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="ml-1 text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Free to join</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>M-Pesa payouts</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Quick surveys</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Real rewards</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
