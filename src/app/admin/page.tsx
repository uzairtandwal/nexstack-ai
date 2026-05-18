"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  ArrowUp, 
  CheckCircle2, 
  XCircle, 
  Clock,
  RefreshCcw,
  Trash2,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/utils/supabase";

const StatCard = ({ title, value, icon, trend }: any) => (
  <div className="glass p-10 rounded-[40px] border-white/10 relative overflow-hidden group bg-white/[0.02]">
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all" />
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xl border border-primary/20">
        {icon}
      </div>
      <span className="flex items-center gap-2 text-xs font-black text-green-400 bg-green-400/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-400/20">
        <ArrowUp size={12} strokeWidth={4} /> {trend}
      </span>
    </div>
    <p className="text-[12px] text-primary uppercase tracking-[0.4em] font-black mb-3 relative z-10">{title}</p>
    <h3 className="text-5xl font-black text-white relative z-10 tracking-tighter">{value}</h3>
  </div>
);

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [stats, setStats] = useState({ views: 0, inquiries: 0, payments: 0 });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch real counts
      const { count: viewCount } = await supabase.from('views').select('*', { count: 'exact', head: true });
      const { data: inqData, error: inqError } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      const { count: payCount } = await supabase.from('payments').select('*', { count: 'exact', head: true });

      if (inqError) throw inqError;

      setInquiries(inqData || []);
      setStats({
        views: viewCount || 0,
        inquiries: inqData?.length || 0,
        payments: payCount || 0
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('admin-live-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'views' }, () => fetchData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
        const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
        if (error) throw error;
        await fetchData();
    } catch (err) {
        alert("Action failed. Check Supabase permissions.");
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this permanently?")) return;
    try {
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
    } catch (err) {
        alert("Delete failed.");
    }
  };

  if (!mounted) return (
    <div className="h-screen flex items-center justify-center bg-bg-dark">
        <div className="flex flex-col items-center gap-6">
            <RefreshCcw size={48} className="text-primary animate-spin" />
            <p className="text-sm font-black uppercase tracking-[0.5em] text-text-dim">Securing Command Center...</p>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-16 max-w-full mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl font-black mb-4 text-white tracking-tighter">System <span className="gradient-text">Overview</span></h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-xs font-black uppercase tracking-widest text-green-500">Live Network Active</span>
            </div>
            <span className="text-text-dim text-xs font-bold uppercase tracking-widest opacity-40">|</span>
            <span className="text-text-dim text-xs font-bold uppercase tracking-widest">NexStack.AI Agency v1.0</span>
          </div>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={fetchData}
                className="w-16 h-16 rounded-[24px] glass hover:bg-white/5 text-text-main transition-all flex items-center justify-center border-white/10"
            >
                <RefreshCcw size={24} className={loading ? "animate-spin text-primary" : ""} />
            </button>
            <button className="px-10 py-5 rounded-[24px] gradient-bg text-white font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,123,255,0.3)] hover:-translate-y-2 transition-all">
                Download Global Report
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard title="Global Traffic" value={stats.views.toLocaleString()} icon={<Eye size={32} />} trend="14.2%" />
        <StatCard title="Active Leads" value={stats.inquiries} icon={<Users size={32} />} trend="9.8%" />
        <StatCard title="Simulated Rev" value={`$${(stats.payments * 499).toLocaleString()}`} icon={<DollarSign size={32} />} trend="18.5%" />
        <StatCard title="System Health" value="100%" icon={<TrendingUp size={32} />} trend="Perfect" />
      </div>

      <div className="grid xl:grid-cols-12 gap-12">
        {/* Inquiries Management Table */}
        <div className="xl:col-span-8 glass rounded-[50px] p-12 border-white/10 bg-white/[0.01] relative">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Users size={24} /></div>
                <h3 className="text-3xl font-black text-white tracking-tight">Client Inquiries</h3>
            </div>
            <div className="flex gap-2">
                <span className="px-5 py-2 rounded-full bg-white/5 text-text-dim text-[10px] font-black uppercase tracking-widest border border-white/10 italic">Secure Connection</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base border-separate border-spacing-y-6">
              <thead>
                <tr className="text-primary uppercase text-[11px] font-black tracking-[0.4em]">
                  <th className="px-6 pb-2">Client Details</th>
                  <th className="px-6 pb-2">Project Request</th>
                  <th className="px-6 pb-2">Status</th>
                  <th className="px-6 pb-2 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="text-center py-32">
                            <div className="flex flex-col items-center gap-4 opacity-20">
                                <AlertCircle size={64} />
                                <p className="text-xl font-black uppercase tracking-widest">No active leads in database</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    inquiries.map((inq) => (
                        <tr key={inq.id} className="group glass bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all">
                            <td className="px-6 py-8 rounded-l-[30px]">
                                <p className="text-xl font-black text-white mb-1">{inq.name}</p>
                                <p className="text-sm text-primary font-bold tracking-tight opacity-70">{inq.email}</p>
                            </td>
                            <td className="px-6 py-8">
                                <p className="font-black text-white text-lg mb-2">{inq.subject}</p>
                                <p className="text-sm text-text-dim leading-relaxed font-medium line-clamp-2">{inq.message}</p>
                            </td>
                            <td className="px-6 py-8">
                                <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 w-fit shadow-lg ${
                                    inq.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                                    inq.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}>
                                    <div className={`w-2 h-2 rounded-full ${inq.status === 'pending' ? 'bg-orange-500' : inq.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    {inq.status}
                                </span>
                            </td>
                            <td className="px-6 py-8 rounded-r-[30px] text-right">
                                <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        title="Approve Inquiry"
                                        onClick={() => updateStatus(inq.id, 'approved')}
                                        className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-xl"
                                    >
                                        <CheckCircle2 size={24} />
                                    </button>
                                    <button 
                                        title="Delete Permanently"
                                        onClick={() => deleteInquiry(inq.id)}
                                        className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live System Logs Feed */}
        <div className="xl:col-span-4 glass rounded-[50px] p-12 border-white/10 flex flex-col bg-white/[0.01]">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent"><TrendingUp size={24} /></div>
            <h3 className="text-3xl font-black text-white tracking-tight">System Logs</h3>
          </div>
          
          <div className="flex flex-col gap-8 flex-1 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar">
            {stats.views > 0 && (
                <div className="flex gap-6 items-start border-l-4 border-primary pl-8 py-3 relative">
                    <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,123,255,0.8)]" />
                    <div>
                        <p className="text-lg font-black text-white">Traffic Spike Detected</p>
                        <p className="text-[10px] text-text-dim font-black uppercase tracking-widest mt-2">Source: Anonymous Visitor</p>
                    </div>
                </div>
            )}
            {inquiries.slice(0, 8).map((inq, i) => (
              <div key={i} className="flex gap-6 items-start border-l-4 border-green-500 pl-8 py-3 relative">
                <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                <div>
                  <p className="text-lg font-black text-white">Lead: {inq.name}</p>
                  <p className="text-[10px] text-text-dim font-black uppercase tracking-widest mt-2">Verified at {new Date(inq.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
