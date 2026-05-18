"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    price: "$499",
    description: "Perfect for personal portfolios and small landing pages.",
    features: ["Single Page Website", "Responsive Design", "Basic SEO", "1 Month Support", "Contact Form"],
    button: "Start Project",
    popular: false
  },
  {
    name: "Professional",
    price: "$1,499",
    description: "Ideal for growing businesses and professional agencies.",
    features: ["Up to 5 Pages", "Custom UI/UX Design", "Advanced SEO", "3 Months Support", "CMS Integration", "Animations"],
    button: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale solutions with AI and Cloud infrastructure.",
    features: ["Unlimited Pages", "AI & ML Integration", "AWS/DevOps Setup", "Priority Support", "Admin Dashboard", "Security Audit"],
    button: "Contact Us",
    popular: false
  }
];

const PricingPage = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Pricing & Plans</span>
          <h1 className="text-5xl font-extrabold mt-4">Choose Your <span className="gradient-text">Investment</span></h1>
          <p className="text-text-dim mt-4 max-w-2xl mx-auto">Transparent pricing for premium digital solutions. From simple landing pages to complex AI platforms.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass p-12 rounded-[40px] border-white/5 relative flex flex-col ${tier.popular ? "border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10" : ""}`}
            >
              {tier.popular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full shadow-xl">Most Popular</span>
              )}
              <h3 className="text-3xl font-black mb-3">{tier.name}</h3>
              <p className="text-text-main text-base mb-10 opacity-70 leading-relaxed font-medium">{tier.description}</p>
              <div className="text-5xl font-black mb-12 flex items-baseline gap-2">
                {tier.price}
                <span className="text-sm text-text-dim font-bold uppercase tracking-widest">/project</span>
              </div>

              <div className="flex flex-col gap-6 mb-12 flex-1">
                {tier.features.map(feature => (
                  <div key={feature} className="flex items-center gap-4 text-base font-semibold text-text-main opacity-90">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check size={14} strokeWidth={4} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-[22px] font-black uppercase tracking-[0.2em] text-xs transition-all ${tier.popular ? "gradient-bg text-white shadow-2xl shadow-primary/30 hover:scale-[1.02]" : "glass hover:bg-white/5 border-white/10"}`}>
                {tier.button}
              </button>
            </motion.div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
