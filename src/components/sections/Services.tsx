"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServicesData } from "@/data/mockData";
import { Code, Smartphone, Cloud, Cpu, Shield, Repeat, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Code,
  Smartphone,
  Cloud,
  Cpu,
  Shield,
  Repeat,
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-widest uppercase text-xs"
          >
            What I Offer
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mt-4"
          >
            Premium Digital <span className="gradient-text">Solutions</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ServicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl group border-white/5 hover:border-primary/50 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="text-2xl font-bold mb-5">{service.title}</h3>
                <p className="text-text-main text-base leading-relaxed mb-8 opacity-80">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {service.tech.map((t) => (
                    <span key={t} className="text-[11px] uppercase font-black tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/contact?subject=${encodeURIComponent("Inquiry about " + service.title)}`} 
                  className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:text-primary transition-all group"
                >
                  Learn More <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
