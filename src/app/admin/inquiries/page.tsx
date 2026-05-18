"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  Search,
  Filter,
  RefreshCcw,
  Mail,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    if (error) alert("Status update failed");
    else fetchInquiries();
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) alert("Delete failed");
    else fetchInquiries();
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">Message <span className="gradient-text">Vault</span></h2>
          <p className="text-sm text-text-dim font-bold uppercase tracking-widest">Manage and respond to client inquiries</p>
        </div>
        <button onClick={fetchInquiries} className="p-4 rounded-2xl glass hover:bg-white/5 text-primary border border-white/5 transition-all">
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="glass rounded-[50px] border border-white/10 overflow-hidden bg-white/[0.01]">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary transition-all font-bold text-sm"
            />
          </div>
          <div className="flex gap-4">
            <span className="px-6 py-3 rounded-xl glass text-[10px] font-black uppercase tracking-widest border border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" /> {inquiries.length} Total Messages
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4 px-10 pb-10">
            <thead>
              <tr className="text-primary uppercase text-[10px] font-black tracking-[0.4em]">
                <th className="px-6 pb-2">Timestamp</th>
                <th className="px-6 pb-2">Client Identity</th>
                <th className="px-6 pb-2">Project Subject</th>
                <th className="px-6 pb-2">Status</th>
                <th className="px-6 pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="group glass bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <td className="px-6 py-8 rounded-l-[30px] border-l border-y border-white/5">
                    <div className="flex items-center gap-3 text-text-dim">
                      <Clock size={14} />
                      <span className="text-xs font-bold">{new Date(inq.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8 border-y border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-black text-xs uppercase">{inq.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-white text-lg">{inq.name}</p>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{inq.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8 border-y border-white/5 max-w-xs">
                    <p className="font-bold text-text-main mb-1">{inq.subject}</p>
                    <p className="text-xs text-text-dim font-medium line-clamp-2">{inq.message}</p>
                  </td>
                  <td className="px-6 py-8 border-y border-white/5">
                    <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${inq.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                        inq.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-8 rounded-r-[30px] border-r border-y border-white/5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => updateStatus(inq.id, 'approved')} className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"><CheckCircle2 size={20} /></button>
                      <button onClick={() => deleteInquiry(inq.id)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
