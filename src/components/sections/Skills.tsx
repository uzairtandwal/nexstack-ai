"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillsData } from "@/data/mockData";

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-text-dim">{name}</span>
      <span className="text-xs font-bold text-primary">{level}%</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, delay: index * 0.1 }}
        className="h-full gradient-bg rounded-full shadow-[0_0_10px_rgba(0,123,255,0.5)]"
      />
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-bg-dark/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Technical Proficiency</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4">My <span className="gradient-text">Skills</span> Set</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-xl font-bold mb-10 border-l-4 border-primary pl-4 uppercase tracking-tighter">Frontend</h4>
            {SkillsData.frontend.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10 border-l-4 border-primary pl-4 uppercase tracking-tighter">Backend</h4>
            {SkillsData.backend.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10 border-l-4 border-primary pl-4 uppercase tracking-tighter">Cloud & DevOps</h4>
            {SkillsData.devops.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10 border-l-4 border-primary pl-4 uppercase tracking-tighter">Cybersecurity</h4>
            {SkillsData.cybersecurity.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
