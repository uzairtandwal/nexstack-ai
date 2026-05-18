"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Cpu, Cloud, Smartphone } from "lucide-react";

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    org: "Amazon Web Services",
    date: "2025",
    icon: <Cloud className="text-primary" />,
    color: "from-orange-500/20 to-transparent"
  },
  {
    title: "Cybersecurity Analyst",
    org: "Google / Coursera",
    date: "2024",
    icon: <ShieldCheck className="text-green-500" />,
    color: "from-green-500/20 to-transparent"
  },
  {
    title: "Full-Stack Web Development",
    org: "Meta",
    date: "2023",
    icon: <Cpu className="text-blue-500" />,
    color: "from-blue-500/20 to-transparent"
  },
  {
    title: "Mobile App Specialist",
    org: "Google",
    date: "2024",
    icon: <Smartphone className="text-purple-500" />,
    color: "from-purple-500/20 to-transparent"
  }
];

const CertificationsPage = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Accomplishments</span>
          <h1 className="text-5xl font-extrabold mt-4">Professional <span className="gradient-text">Certifications</span></h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass p-8 rounded-3xl border-white/5 bg-gradient-to-br ${cert.color} group hover:border-primary/50 transition-all`}
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <Award size={24} className="text-text-dim/20" />
              </div>
              <h3 className="text-3xl font-black mb-3 leading-tight">{cert.title}</h3>
              <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">{cert.org}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-main opacity-50 mt-auto">Issued {cert.date} &middot; Verified Digital Badge</p>
              
              <button className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-3 hover:gap-5 transition-all group/btn">
                View Certificate <Award size={16} className="text-primary transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsPage;
