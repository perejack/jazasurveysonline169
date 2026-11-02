import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Wallet, Award, ChevronRight, Settings,
  Star, Shield, LogOut, Edit, Camera, Loader2
} from "lucide-react";
import { BottomNav } from "./Dashboard";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading } = useProfile();
  const { signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (err) {
      toast.error('Failed to logout');
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    { icon: Wallet, label: "My Wallet", desc: "View balance & transactions", path: "/withdraw" },
    { icon: Award, label: "Upgrade Package", desc: "Get premium surveys", path: "/packages" },
    { icon: Star, label: "My Surveys", desc: `${profile?.surveys_completed || 0} completed surveys`, path: "/dashboard" },
    { icon: Shield, label: "Account Security", desc: "Password & verification", path: null },
    { icon: Settings, label: "Settings", desc: "Notifications & preferences", path: null },
  ];

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
      <div className="bg-primary px-4 pt-12 pb-16 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <h2 className="font-display text-lg font-bold text-primary-foreground">My Profile</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <Camera className="h-3.5 w-3.5 text-accent-foreground" />
            </button>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-primary-foreground">{profile?.full_name || 'User'}</h3>
            <p className="text-primary-foreground/60 text-sm">{profile?.email || ''}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                {profile?.membership_tier || 'Bronze'} Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Wallet Balance</p>
              <p className="font-display text-3xl font-extrabold text-primary mt-1">KSH {(profile?.balance || 0).toLocaleString()}</p>
            </div>
            <button
              onClick={() => navigate("/withdraw")}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-premium transition hover:opacity-90"
            >
              Withdraw
            </button>
          </div>
          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-xl bg-surface p-3 text-center">
              <p className="text-muted-foreground text-xs">Total Earned</p>
              <p className="font-display font-bold text-foreground">KSH {(profile?.total_earned || 0).toLocaleString()}</p>
            </div>
            <div className="flex-1 rounded-xl bg-surface p-3 text-center">
              <p className="text-muted-foreground text-xs">Withdrawn</p>
              <p className="font-display font-bold text-foreground">KSH {(profile?.total_withdrawn || 0).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6 space-y-2">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => item.path && navigate(item.path)}
            className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 text-left hover:shadow-premium transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">{item.label}</p>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        ))}

        <button 
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3 text-left mt-4 hover:bg-destructive/5 transition-all disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
            {loggingOut ? <Loader2 className="h-5 w-5 text-destructive animate-spin" /> : <LogOut className="h-5 w-5 text-destructive" />}
          </div>
          <p className="font-semibold text-sm text-destructive">{loggingOut ? 'Logging out...' : 'Log Out'}</p>
        </button>
      </div>

      <BottomNav active="profile" />
    </div>
  );
};

export default Profile;
