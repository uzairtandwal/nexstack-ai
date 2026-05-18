"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  MessageSquare,
  BarChart3,
  LogOut,
  User,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Image as ImageIcon,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import { UzairData } from "@/data/mockData";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Check session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = sessionStorage.getItem("admin_logged_in");
      if (loggedIn === "true") {
        setIsAuthenticated(true);
      }
      setChecking(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Master Passwords
    const validPasswords = ["UzairAdmin@2026", "uzair", "admin", "Uzair@123"];

    if (validPasswords.includes(password.trim())) {
      sessionStorage.setItem("admin_logged_in", "true");
      setIsAuthenticated(true);
      setPassword("");
    } else {
      setError("Incorrect Master Password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    setIsAuthenticated(false);
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  if (checking) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex flex-col items-center justify-center gap-4">
        <Lock className="animate-pulse text-primary" size={40} />
        <p className="text-text-dim text-xs font-black uppercase tracking-widest">Checking Session Integrity...</p>
      </div>
    );
  }

  // --- PASSWORD LOCK SCREEN GATE ---
  if (!isAuthenticated) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Futuristic background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px]" />

        <div className="relative z-10 w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[40px] border border-white/10 p-10 bg-white/[0.01] shadow-2xl relative"
          >
            {/* Lock Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
                <Lock size={28} />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Master Administrator</h1>
              <p className="text-sm text-text-dim font-bold">Secure control panel authentication required.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3 ml-2">Master Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-primary transition-all font-bold text-sm text-text-main placeholder:text-text-dim"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="glass border border-red-500/20 rounded-2xl p-4 bg-red-500/5 flex items-start gap-3">
                  <AlertCircle className="text-red-400 shrink-0" size={18} />
                  <p className="text-xs text-red-300 font-bold leading-relaxed">{error}</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-5 rounded-2xl gradient-bg text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
              >
                <Unlock size={16} /> Authenticate System
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- AUTHORIZED PANEL ACCESS ---
  return (
    <div className="bg-[#050505] text-white flex" style={{height: '100vh', overflow: 'hidden'}}>
      {/* Sidebar */}
      <aside className="w-72 shrink-0 glass border-r border-white/5 p-6 flex flex-col gap-8 z-50 h-screen overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black gradient-text tracking-tighter">
            {UzairData.brand}
          </span>
        </Link>

        <nav className="flex flex-col gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-dim mb-2 ml-4">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between group p-4 rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-primary text-white shadow-2xl shadow-primary/20"
                    : "text-text-dim hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
                  <span className="font-black text-sm uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="p-4 glass rounded-2xl border-white/5 bg-primary/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Agency Status</p>
            <p className="text-xs font-bold text-text-main">Accepting Projects</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all w-full font-black text-xs uppercase tracking-[0.2em]"
          >
            <LogOut size={20} /> Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" style={{height: '100vh'}}>
        <header className="h-20 glass border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-0.5">Authenticated Session</p>
            <h2 className="text-xl font-black text-text-main tracking-tight capitalize">
              {pathname.split('/').pop() === 'admin' ? 'Overview' : pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-text-main">{UzairData.name}</p>
              <p className="text-[9px] text-primary font-black uppercase tracking-widest">Master Administrator</p>
            </div>
            <div className="w-11 h-11 rounded-xl gradient-bg p-0.5 shadow-xl">
              <div className="w-full h-full rounded-[10px] bg-bg-dark flex items-center justify-center text-white overflow-hidden border border-white/10">
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
