"use client";

import React from "react";
import Skills from "@/components/sections/Skills";

const SkillsPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-bg-dark">
      <div className="container mx-auto px-6 py-12">
        <Skills />
        
        {/* Additional Detailed Skills Content for the Standalone Page */}
        <div className="mt-24 grid md:grid-cols-3 gap-10">
            <div className="glass p-12 rounded-[50px] border-white/10 text-center hover:border-primary/50 transition-all">
                <h4 className="text-6xl font-black text-primary mb-5 tracking-tighter">99%</h4>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-text-main opacity-60">Technical Accuracy</p>
            </div>
            <div className="glass p-12 rounded-[50px] border-white/10 text-center hover:border-primary/50 transition-all">
                <h4 className="text-6xl font-black text-primary mb-5 tracking-tighter">100%</h4>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-text-main opacity-60">Security Standard</p>
            </div>
            <div className="glass p-12 rounded-[50px] border-white/10 text-center hover:border-primary/50 transition-all">
                <h4 className="text-6xl font-black text-primary mb-5 tracking-tighter">24/7</h4>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-text-main opacity-60">Cloud Reliability</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
