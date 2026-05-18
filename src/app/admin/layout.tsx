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
  Image as ImageIcon
} from "lucide-react";
import { UzairData } from "@/data/mockData";
import { cn } from "@/utils/cn";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

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
          <button className="flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all w-full font-black text-xs uppercase tracking-[0.2em]">
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
