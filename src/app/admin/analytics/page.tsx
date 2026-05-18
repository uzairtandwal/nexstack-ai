"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Clock, 
  MapPin, 
  Monitor, 
  Globe, 
  Cpu,
  TrendingUp,
  RefreshCcw
} from "lucide-react";
import { supabase } from "@/utils/supabase";

const AnalyticsPage = () => {
  const [stats, setStats] = useState({ total: 0, unique: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
        const { count } = await supabase.from('views').select('*', { count: 'exact', head: true });
        setStats({
            total: count || 0,
            unique: Math.floor((count || 0) * 0.7), // Simulated unique visitors
            active: Math.floor(Math.random() * 10) + 1 // Simulated active users
        });
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchAnalytics();
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">Real-time <span className="gradient-text">Intelligence</span></h2>
          <p className="text-sm text-text-dim font-bold uppercase tracking-widest">Global visitor data & system performance</p>
        </div>
        <button onClick={fetchAnalytics} className="p-4 rounded-2xl glass hover:bg-white/5 text-primary border border-white/5 transition-all">
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 rounded-[40px] border border-white/10 bg-primary/5 text-center">
              <Users className="mx-auto mb-6 text-primary" size={48} />
              <h4 className="text-5xl font-black text-white mb-2">{stats.total}</h4>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-text-dim">Total Impressions</p>
          </div>
          <div className="glass p-10 rounded-[50px] border border-white/10 bg-white/[0.01] text-center">
              <Globe className="mx-auto mb-6 text-accent" size={48} />
              <h4 className="text-5xl font-black text-white mb-2">{stats.unique}</h4>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-text-dim">Unique Visitors</p>
          </div>
          <div className="glass p-10 rounded-[50px] border border-white/10 bg-green-500/5 text-center">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mx-auto mb-6" />
              <h4 className="text-5xl font-black text-white mb-2">{stats.active}</h4>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-text-dim">Active Now</p>
          </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-12">
          <div className="glass p-12 rounded-[50px] border border-white/10 relative overflow-hidden">
              <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                  <Monitor size={24} className="text-primary" /> Traffic Sources
              </h3>
              <div className="space-y-8">
                  {[
                      { label: "Direct Search", val: "45%", color: "bg-primary" },
                      { label: "Social Media", val: "30%", color: "bg-accent" },
                      { label: "GitHub Referrals", val: "15%", color: "bg-white" },
                      { label: "Others", val: "10%", color: "bg-text-dim" }
                  ].map((item) => (
                      <div key={item.label}>
                          <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3">
                              <span>{item.label}</span>
                              <span className="text-primary">{item.val}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className={`${item.color} h-full rounded-full`} style={{ width: item.val }} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="glass p-12 rounded-[50px] border border-white/10">
              <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                  <MapPin size={24} className="text-primary" /> Geo-Location (Simulated)
              </h3>
              <div className="space-y-6">
                  {[
                      { city: "Lahore, PK", visits: "1,240" },
                      { city: "Islamabad, PK", visits: "890" },
                      { city: "London, UK", visits: "430" },
                      { city: "New York, US", visits: "210" }
                  ].map((loc) => (
                      <div key={loc.city} className="flex justify-between items-center p-5 glass bg-white/[0.02] rounded-2xl border border-white/5">
                          <span className="font-black text-sm uppercase tracking-widest">{loc.city}</span>
                          <span className="text-primary font-black">{loc.visits}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
