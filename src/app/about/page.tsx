"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UzairData } from "@/data/mockData";
import { CheckCircle2, Award, Zap } from "lucide-react";
import { supabase } from "@/utils/supabase";

const AboutPage = () => {
  const [aboutImage, setAboutImage] = useState("/images/about.jpg");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "about_image")
          .single();

        if (error) {
          console.error("Error fetching about_image setting from Supabase:", error);
          return;
        }
        if (data?.value) {
          console.log("Successfully loaded about_image:", data.value);
          setAboutImage(data.value);
        }
      } catch (err) {
        console.error("Catch error fetching about_image:", err);
      }
    };
    fetchImage();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/10">
              <img 
                src={aboutImage} 
                alt="Uzair Professional" 
                className="w-full h-[600px] object-cover"
                onError={(e) => {
                  console.log("About image failed to load, falling back to default.");
                  (e.target as HTMLImageElement).src = "/images/about.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-3xl font-black">{UzairData.name}</h3>
                <p className="text-primary font-bold uppercase tracking-widest text-xs mt-2">Founder of {UzairData.brand}</p>
              </div>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 gradient-bg rounded-full blur-3xl opacity-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/10 px-4 py-2 rounded-full border border-primary/20">Our Story</span>
            <h1 className="text-6xl font-black mt-8 mb-10 leading-tight tracking-tighter">Engineering the Future of <span className="gradient-text">Intelligent Software</span></h1>
            
            <p className="text-text-main text-xl leading-relaxed mb-10 opacity-90 font-medium">
              Hi, I'm <span className="text-primary font-black">Uzair Ali</span>. Based in <span className="font-bold">Lahore</span>, I specialize in building high-fidelity Full-Stack applications, AI-driven automation systems, and secure cloud infrastructures.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20"><CheckCircle2 size={24} /></div>
                <div>
                  <h4 className="font-black text-lg mb-2 uppercase tracking-tighter">AI-First Approach</h4>
                  <p className="text-sm text-text-main opacity-70 leading-relaxed font-medium">Integrating intelligence into every digital asset.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20"><Award size={24} /></div>
                <div>
                  <h4 className="font-black text-lg mb-2 uppercase tracking-tighter">Security Driven</h4>
                  <p className="text-sm text-text-main opacity-70 leading-relaxed font-medium">Cybersecurity protocols baked into the development lifecycle.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20"><Zap size={24} /></div>
                <div>
                  <h4 className="font-black text-lg mb-2 uppercase tracking-tighter">Global Standard</h4>
                  <p className="text-sm text-text-main opacity-70 leading-relaxed font-medium">Code and designs that meet international quality bars.</p>
                </div>
              </div>
            </div>

            <div className="p-10 glass rounded-[40px] border-white/10 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full" />
                <p className="italic text-text-main text-lg leading-relaxed font-semibold relative z-10">
                    "My mission is to help agencies and startups scale by providing them with the most advanced, secure, and intelligent software solutions available in the modern market."
                </p>
                <div className="mt-8 flex items-center gap-5 relative z-10">
                    <div className="w-12 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/40" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Uzair Ali, Founder NexStack.AI</span>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
