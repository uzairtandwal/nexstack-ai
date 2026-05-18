"use client";

import React from "react";
import Services from "@/components/sections/Services";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <div className="pt-20">
      <Services />
      <section className="pb-24 container mx-auto px-6">
        <div className="glass p-12 rounded-[40px] border-white/5 text-center">
            <h3 className="text-3xl font-black mb-6">Need a Custom Solution?</h3>
            <p className="text-text-dim mb-10 max-w-2xl mx-auto">We don't just write code; we solve business problems. Let's discuss your requirements and build a dedicated strategy for your growth.</p>
            <Link href="/contact" className="inline-block px-10 py-5 rounded-2xl gradient-bg text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
              Book a Free Consultation
            </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
