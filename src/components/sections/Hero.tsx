"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { UzairData } from "@/data/mockData";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/utils/supabase";

const Hero = () => {
  const [heroImage, setHeroImage] = useState("/images/hero.jpg");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "hero_image")
          .single();

        if (error) {
          console.error("Error fetching hero_image setting from Supabase:", error);
          return;
        }
        if (data?.value) {
          console.log("Successfully loaded hero_image:", data.value);
          setHeroImage(data.value);
        }
      } catch (err) {
        console.error("Catch error fetching hero_image:", err);
      }
    };
    fetchImage();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-primary font-semibold text-xs mb-6 uppercase tracking-widest">
              Available for new projects
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Hi, I'm <span className="gradient-text">{UzairData.name}</span> <br />
              <span className="text-3xl md:text-5xl text-text-dim">
                <Typewriter
                  words={[
                    "Full-Stack Developer",
                    "AI Engineer",
                    "Cybersecurity Student",
                    "AWS Cloud Enthusiast"
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
            <p className="text-lg text-text-dim max-w-lg mb-10 leading-relaxed">
              {UzairData.bio}
            </p>

            <div className="flex flex-wrap gap-6 items-center mb-12">
              <a href="#projects" className="px-8 py-4 rounded-2xl gradient-bg text-white font-bold flex items-center gap-2 shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all">
                View My Work <ArrowRight size={20} />
              </a>
              <a href="/Uzair Ali — CV.pdf" download="Uzair_Ali_CV.pdf" className="px-8 py-4 rounded-2xl glass border border-white/10 text-text-main font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                Download CV
              </a>
              <div className="flex gap-4">
                <a href={UzairData.socials.github} target="_blank" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors">
                  <FaGithub size={22} />
                </a>
                <a href={UzairData.socials.linkedin} target="_blank" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors">
                  <FaLinkedin size={22} />
                </a>
                <a href={UzairData.socials.twitter} target="_blank" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors">
                  <FaTwitter size={22} />
                </a>
              </div>
            </div>

            <div className="flex gap-8 border-t border-white/5 pt-10">
              <div>
                <h3 className="text-3xl font-bold">{UzairData.experience_years}</h3>
                <p className="text-sm text-text-dim uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">{UzairData.projects_completed}</h3>
                <p className="text-sm text-text-dim uppercase tracking-wider">Projects Done</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative z-10 w-full h-full glass rounded-3xl overflow-hidden flex items-center justify-center border-white/20">
                    <img 
                        src={heroImage} 
                        alt="Uzair Code" 
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => {
                          console.log("Hero image failed to load, falling back to default.");
                          (e.target as HTMLImageElement).src = "/images/hero.jpg";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
                    <div className="absolute bottom-8 left-8">
                        <h4 className="text-xl font-bold">NexStack.AI</h4>
                        <p className="text-xs text-text-dim">Intelligence by Architecture</p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Trusted Tech Grid - Infinite Slider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 border-t border-white/5 pt-16 overflow-hidden relative"
        >
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg-dark to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg-dark to-transparent z-10" />
          
          <p className="text-[10px] uppercase font-black tracking-[0.4em] text-primary mb-12 text-center">Powering Digital Innovation With</p>
          
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
            }}
          >
            {[
                { name: "Next.js", color: "from-gray-600 to-black", text: "text-white" },
                { name: "React", color: "from-[#61DAFB] to-[#1c2c4c]", text: "text-white" },
                { name: "AWS", color: "from-[#FF9900] to-[#ec6231]", text: "text-white" },
                { name: "Python", color: "from-[#3776AB] to-[#ffd43b]", text: "text-white" },
                { name: "Docker", color: "from-[#2496ED] to-[#1d63ed]", text: "text-white" },
                { name: "Postgres", color: "from-[#336791] to-[#244e6d]", text: "text-white" },
                { name: "Flutter", color: "from-[#02569B] to-[#05affa]", text: "text-white" },
                { name: "TypeScript", color: "from-[#3178C6] to-[#235a97]", text: "text-white" },
                { name: "Node.js", color: "from-[#339933] to-[#215732]", text: "text-white" },
                { name: "Laravel", color: "from-[#FF2D20] to-[#b31b14]", text: "text-white" },
                { name: "Django", color: "from-[#092E20] to-[#051a13]", text: "text-white" },
                { name: "Tailwind", color: "from-[#06B6D4] to-[#007b8a]", text: "text-white" },
                { name: "MongoDB", color: "from-[#47A248] to-[#2f6d2f]", text: "text-white" },
                { name: "Firebase", color: "from-[#FFCA28] to-[#f57c00]", text: "text-white" },
                // Duplicate for seamless loop
                { name: "Next.js", color: "from-gray-600 to-black", text: "text-white" },
                { name: "React", color: "from-[#61DAFB] to-[#1c2c4c]", text: "text-white" },
                { name: "AWS", color: "from-[#FF9900] to-[#ec6231]", text: "text-white" },
                { name: "Python", color: "from-[#3776AB] to-[#ffd43b]", text: "text-white" },
                { name: "Docker", color: "from-[#2496ED] to-[#1d63ed]", text: "text-white" },
                { name: "Postgres", color: "from-[#336791] to-[#244e6d]", text: "text-white" },
                { name: "Flutter", color: "from-[#02569B] to-[#05affa]", text: "text-white" },
                { name: "TypeScript", color: "from-[#3178C6] to-[#235a97]", text: "text-white" },
                { name: "Node.js", color: "from-[#339933] to-[#215732]", text: "text-white" },
                { name: "Laravel", color: "from-[#FF2D20] to-[#b31b14]", text: "text-white" },
                { name: "Django", color: "from-[#092E20] to-[#051a13]", text: "text-white" },
                { name: "Tailwind", color: "from-[#06B6D4] to-[#007b8a]", text: "text-white" },
                { name: "MongoDB", color: "from-[#47A248] to-[#2f6d2f]", text: "text-white" },
                { name: "Firebase", color: "from-[#FFCA28] to-[#f57c00]", text: "text-white" }
            ].map((tech, i) => (
              <div 
                key={i} 
                className={`py-6 px-10 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${tech.color} min-w-[160px] shadow-xl`}
              >
                <span className={`text-sm font-black tracking-tighter ${tech.text}`}>{tech.name}</span>
                <div className="w-10 h-0.5 rounded-full bg-white/30" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
};

export default Hero;
