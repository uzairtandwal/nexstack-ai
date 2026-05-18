"use client";

import React, { useState, useEffect } from "react";
import { UzairData } from "@/data/mockData";
import { 
  User, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  Lock,
  Globe,
  Bell
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [formData, setFormData] = useState({ ...UzairData });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">System <span className="gradient-text">Settings</span></h2>
          <p className="text-sm text-text-dim font-bold uppercase tracking-widest">Manage your profile, brand and security</p>
        </div>
        <button className="px-10 py-4 rounded-2xl gradient-bg text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center gap-3">
            <Save size={18} strokeWidth={3} /> Save All Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-8 space-y-12">
              <div className="glass p-12 rounded-[50px] border-white/10 space-y-10">
                  <h3 className="text-2xl font-black flex items-center gap-4">
                      <User size={24} className="text-primary" /> Identity Configuration
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Full Name</label>
                          <input type="text" value={formData.name} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 text-base font-bold outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Company Brand</label>
                          <input type="text" value={formData.brand} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 text-base font-bold outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="md:col-span-2 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Professional Headline</label>
                          <input type="text" value={formData.title} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 text-base font-bold outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="md:col-span-2 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Bio / Summary</label>
                          <textarea rows={4} value={formData.bio} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 text-base font-bold outline-none focus:border-primary transition-all" />
                      </div>
                  </div>
              </div>

              <div className="glass p-12 rounded-[50px] border-white/10 space-y-10">
                  <h3 className="text-2xl font-black flex items-center gap-4">
                      <Globe size={24} className="text-primary" /> Contact & Social Grid
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                            <input type="email" value={formData.email} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 pl-14 text-base font-bold outline-none focus:border-primary transition-all" />
                          </div>
                      </div>
                      <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">WhatsApp / Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                            <input type="text" value={formData.phone} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 pl-14 text-base font-bold outline-none focus:border-primary transition-all" />
                          </div>
                      </div>
                      <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">GitHub URL</label>
                          <input type="text" value={formData.socials.github} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 text-base font-bold outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-2">LinkedIn URL</label>
                          <input type="text" value={formData.socials.linkedin} className="w-full glass bg-white/5 border-white/10 rounded-2xl p-5 text-base font-bold outline-none focus:border-primary transition-all" />
                      </div>
                  </div>
              </div>
          </div>

          {/* Sidebar Settings */}
          <div className="lg:col-span-4 space-y-12">
              <div className="glass p-10 rounded-[50px] border-white/10 bg-primary/5">
                  <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
                      <Lock size={20} className="text-primary" /> Admin Security
                  </h3>
                  <div className="space-y-6">
                      <button className="w-full py-4 rounded-2xl glass border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-white">
                          Change Password
                      </button>
                      <button className="w-full py-4 rounded-2xl glass border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-white">
                          Enable Two-Factor
                      </button>
                      <button className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all">
                          Wipe Session Cache
                      </button>
                  </div>
              </div>

              <div className="glass p-10 rounded-[50px] border-white/10">
                  <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
                      <Bell size={20} className="text-primary" /> Notifications
                  </h3>
                  <div className="space-y-6">
                      {[
                          { label: "Email Alerts", active: true },
                          { label: "New Lead SMS", active: false },
                          { label: "Weekly Summary", active: true }
                      ].map((pref) => (
                          <div key={pref.label} className="flex justify-between items-center p-4 glass bg-white/[0.02] rounded-2xl border border-white/5">
                              <span className="font-bold text-xs uppercase tracking-widest">{pref.label}</span>
                              <div className={`w-10 h-5 rounded-full p-1 transition-all ${pref.active ? "bg-primary" : "bg-white/10"}`}>
                                  <div className={`w-3 h-3 rounded-full bg-white transition-all ${pref.active ? "translate-x-5" : "translate-x-0"}`} />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default SettingsPage;
