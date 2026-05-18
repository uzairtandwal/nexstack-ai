"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabase";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Search, ChevronLeft, ChevronRight, Moon, Sun, Loader2 } from "lucide-react";

const categories = ["All", "Web", "App", "AI", "Security"];

const ProjectCard = ({ project }: { project: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % (project.images?.length || 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev - 1 + (project.images?.length || 1)) % (project.images?.length || 1));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-[40px] overflow-hidden group border-white/5 bg-white/5 dark:bg-card-bg shadow-2xl flex flex-col h-full"
    >
      {/* Interactive Stacked Slider Container */}
      <div className="relative h-72 overflow-hidden bg-black/20 p-6 flex items-center justify-center shrink-0">
        
        {/* The Stacked Images */}
        <div className="relative w-full h-full perspective-1000">
            <AnimatePresence mode="popLayout">
                {project.images && project.images.length > 0 ? project.images.map((img: string, idx: number) => {
                    const isCurrent = idx === currentImageIndex;
                    const offset = (idx - currentImageIndex + project.images.length) % project.images.length;
                    
                    if (offset > 2) return null; // Only show top 3 layers

                    return (
                        <motion.div
                            key={img}
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ 
                                scale: 1 - offset * 0.06, 
                                opacity: 1 - offset * 0.25,
                                x: offset * 15,
                                y: offset * 12, // Increased Y offset to show corners below
                                zIndex: project.images.length - offset,
                                rotate: offset * 5 // Increased rotation for visible corners
                            }}
                            exit={{ x: -300, opacity: 0, rotate: -25 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl origin-bottom-right bg-card-bg"
                            style={{ pointerEvents: isCurrent ? 'auto' : 'none' }}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                    );
                }) : (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-white/5">
                        <span className="text-text-dim text-sm font-bold">No Images Available</span>
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Navigation Arrows (Highly Visible) */}
        {project.images && project.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 z-[50]">
            <button
              onClick={prevImage}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Floating Indicator */}
        {project.images && project.images.length > 0 && (
          <div className="absolute top-8 right-8 z-[50] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/10">
              IMAGE {currentImageIndex + 1} / {project.images.length}
          </div>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
            <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                {project.category}
            </span>
            <div className="flex gap-3">
                <FaGithub className="text-text-main hover:text-primary transition-colors cursor-pointer" size={20} />
                <ExternalLink className="text-text-main hover:text-primary transition-colors cursor-pointer" size={20} />
            </div>
        </div>
        
        <h3 className="text-3xl font-black mb-4 line-clamp-1 text-text-main">{project.title}</h3>
        <p className="text-text-main text-base mb-8 line-clamp-2 leading-relaxed opacity-80">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {project.tech?.map((t: string) => (
            <span key={t} className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-2 rounded-xl text-text-main border border-white/10">
              {t}
            </span>
          ))}
        </div>

        <Link
            href={`/projects/detail/?id=${project.id}`}
            className="mt-auto w-full py-5 rounded-[20px] gradient-bg text-white font-black text-center block text-sm uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(0,123,255,0.3)] hover:scale-[1.02] hover:-translate-y-1 transition-all active:scale-95"
        >
            Explore Case Study
        </Link>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching public projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.5em] text-[12px] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">Premium Portfolio</span>
            <h2 className="text-7xl font-black mt-8 tracking-tighter text-text-main">Selected <span className="gradient-text">Works</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                  activeCategory === cat 
                    ? "gradient-bg text-white border-transparent shadow-2xl shadow-primary/40 scale-110" 
                    : "glass text-text-main hover:bg-white/10 border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-32">
                <Loader2 className="animate-spin text-primary" size={64} />
            </div>
        ) : projects.length === 0 ? (
            <div className="text-center py-32 glass border border-white/10 rounded-[40px]">
                <h3 className="text-2xl font-bold text-text-main mb-4">No Projects Found</h3>
                <p className="text-text-dim text-lg">New projects will be displayed here soon.</p>
            </div>
        ) : (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
