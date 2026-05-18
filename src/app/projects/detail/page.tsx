"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectsData, UzairData } from "@/data/mockData";
import { supabase } from "@/utils/supabase";
import { FaGithub } from "react-icons/fa";
import { 
  ExternalLink, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  ChevronLeft, 
  FileText, 
  Send,
  Target,
  Cpu,
  ShieldCheck,
  Rocket,
  Loader2
} from "lucide-react";
import Link from "next/link";

const ProjectDetailsContent = () => {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        // Get ID from URL query parameters client-side
        const params = new URLSearchParams(window.location.search);
        const idParam = params.get("id");

        if (!idParam) {
          setProject(null);
          setLoading(false);
          return;
        }

        // Attempt to fetch from Supabase
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", idParam)
          .single();

        if (error) {
          console.log("Supabase fetch failed, trying mockData fallback...", error.message);
          // Fallback to local mockData
          const idNum = Number(idParam);
          const found = ProjectsData.find(p => p.id === idNum);
          if (found) {
            setProject(found);
          } else {
            setProject(null);
          }
        } else {
          setProject(data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-bg-dark flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={50} />
        <p className="text-text-dim font-bold uppercase tracking-widest text-sm">Loading Project Details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-bg-dark flex flex-col items-center justify-center gap-6">
        <h3 className="text-3xl font-black text-white">Project Not Found</h3>
        <p className="text-text-dim max-w-md text-center">The project you are looking for does not exist in our system or might have been removed.</p>
        <button 
          onClick={() => router.push("/#projects")}
          className="px-8 py-4 rounded-2xl gradient-bg text-white font-bold flex items-center gap-2 hover:-translate-y-1 transition-all"
        >
          <ArrowLeft size={20} /> Back to Portfolio
        </button>
      </div>
    );
  }

  const nextImage = () => {
    const len = project.images?.length || 1;
    setCurrentImageIndex((prev) => (prev + 1) % len);
  };

  const prevImage = () => {
    const len = project.images?.length || 1;
    setCurrentImageIndex((prev) => (prev - 1 + len) % len);
  };

  // Simplified phone number for link
  const cleanPhone = UzairData.phone.split(' ').join('').split('+').join('');

  // Extract analysis fields with database mapping and standard fallbacks
  const highlights = project.highlights || [];
  const fullAnalysis = project.full_analysis || project.fullAnalysis || project.description;
  const projectImages = project.images && project.images.length > 0 ? project.images : ["https://placehold.co/800x450/111/333?text=No+Image"];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg-dark">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-dim hover:text-white mb-12 text-sm font-black uppercase tracking-[0.2em] transition-all group"
        >
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Portfolio
        </button>

        {/* Hero Header */}
        <div className="mb-20">
            <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-black uppercase tracking-[0.3em] text-[10px] bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
            >
                Case Study: {project.category}
            </motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-black mt-6 tracking-tighter text-white"
            >
                {project.title}
            </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Visuals & Stats */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video rounded-[40px] overflow-hidden border border-white/5 shadow-2xl group"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={projectImages[currentImageIndex]} 
                  alt={project.title} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x450/111/333?text=Image+Load+Error";
                  }}
                />
              </AnimatePresence>
              
              {projectImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={prevImage} className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <ChevronRight size={24} />
                  </button>
                </div>
              )}

              {projectImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {projectImages.map((_: string, idx: number) => (
                      <button 
                          key={idx} 
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? "bg-primary w-6" : "bg-white/40"}`} 
                      />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Technical Highlights Grid */}
            {highlights && highlights.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                  {highlights.map((highlight: string, idx: number) => (
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={highlight} 
                          className="glass p-6 rounded-3xl border-white/5 flex gap-5 items-start"
                      >
                          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shrink-0">
                              <Target size={20} />
                          </div>
                          <div>
                              <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-1">Impact</h4>
                              <p className="font-bold text-sm text-white">{highlight}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
            )}
          </div>

          {/* Right Column: Content & Breakdown */}
          <div className="lg:col-span-5">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
            >
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                        <Rocket size={24} className="text-primary" /> The Challenge
                    </h3>
                    <p className="text-text-dim text-lg leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {fullAnalysis && (
                  <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                          <Cpu size={24} className="text-primary" /> Technical Breakdown
                      </h3>
                      <p className="text-text-dim text-lg leading-relaxed">
                          {fullAnalysis}
                      </p>
                  </div>
                )}

                {project.tech && project.tech.length > 0 && (
                  <div className="pt-10 border-t border-white/10">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">Core Technologies</h4>
                      <div className="flex flex-wrap gap-4">
                          {project.tech.map((t: string) => (
                          <span key={t} className="px-5 py-2.5 bg-primary/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary border border-primary/20">
                              {t}
                          </span>
                          ))}
                      </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 pt-10">
                    <a 
                      href={project.live_url || project.liveUrl || "/contact"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full py-5 rounded-[20px] gradient-bg text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all text-center"
                    >
                        Launch Live Project <ExternalLink size={18} />
                    </a>
                    <div className="flex gap-4">
                        <a 
                          href={project.pdf_url || project.pdfUrl || "#"} 
                          className="flex-1 py-5 rounded-[20px] glass text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-center"
                        >
                            Case Study PDF <FileText size={16} />
                        </a>
                        <a 
                          href={project.github_url || project.githubUrl || "https://github.com"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-8 py-5 rounded-[20px] glass text-white hover:bg-white/5 transition-all flex items-center justify-center"
                        >
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>

        {/* Big Call to Action Section */}
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-40 glass rounded-[60px] p-16 md:p-24 border-white/5 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 relative overflow-hidden text-center"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Ready for the Next Level?</span>
                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight text-white">
                    Have a Vision for a <span className="gradient-text">Similar Project?</span>
                </h2>
                <p className="text-xl text-text-dim mb-12 leading-relaxed">
                    Uzair and the NexStack.AI team specialize in turning complex ideas into high-fidelity digital realities. Whether it's AI, Blockchain, or Enterprise Software – let's build your masterpiece.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link 
                        href="/contact"
                        className="px-12 py-6 rounded-[24px] gradient-bg text-white font-black uppercase tracking-[0.2em] text-sm shadow-[0_20px_50px_rgba(0,123,255,0.3)] hover:-translate-y-2 transition-all flex items-center gap-4"
                    >
                        Start Your Project <Send size={20} />
                    </Link>
                    <a 
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        className="px-12 py-6 rounded-[24px] glass text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-white/5 transition-all"
                    >
                        WhatsApp Inquiry
                    </a>
                </div>
                
                <div className="mt-16 flex items-center justify-center gap-12 grayscale opacity-40">
                    <ShieldCheck size={40} className="text-white" />
                    <Cpu size={40} className="text-white" />
                    <Rocket size={40} className="text-white" />
                </div>
            </div>
        </motion.section>
      </div>
    </div>
  );
};

export default function ProjectDetailsPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 pb-24 min-h-screen bg-bg-dark flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={50} />
        <p className="text-text-dim font-bold uppercase tracking-widest text-sm">Loading Project Details...</p>
      </div>
    }>
      <ProjectDetailsContent />
    </Suspense>
  );
}
