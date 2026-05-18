"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Edit3, 
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Upload,
  Loader2,
  Database,
  XCircle,
  Link as LinkIcon,
  ListTodo,
  Sparkles,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabase";
import { ProjectsData } from "@/data/mockData";

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Tab states for both modals
  const [activeAddTab, setActiveAddTab] = useState<"basic" | "casestudy">("basic");
  const [activeEditTab, setActiveEditTab] = useState<"basic" | "casestudy">("basic");

  // Add form state
  const [formData, setFormData] = useState({
    title: "", 
    category: "", 
    description: "", 
    tech: "",
    highlights: "", 
    features: "", 
    full_analysis: "",
    live_url: "", 
    github_url: "", 
    pdf_url: ""
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
    } finally {
      setFetching(false);
    }
  };

  // Migrate old mockData projects to Supabase
  const handleSyncOldProjects = async () => {
    if (!confirm(`This will sync existing projects to your Supabase database. Already existing ones will be skipped. Continue?`)) return;
    setSyncing(true);
    try {
      // 1. Fetch already existing project titles from DB
      const { data: existing, error: fetchError } = await supabase
        .from('projects')
        .select('title');
      if (fetchError) throw fetchError;

      const existingTitles = new Set((existing || []).map((p: any) => p.title.toLowerCase().trim()));

      // 2. Filter only new projects not already in DB
      const newProjects = ProjectsData.filter(
        p => !existingTitles.has(p.title.toLowerCase().trim())
      );

      if (newProjects.length === 0) {
        alert("✅ All projects are already synced! No duplicates added.");
        return;
      }

      const toInsert = newProjects.map(p => ({
        title: p.title,
        category: p.category,
        description: p.description,
        tech: p.tech,
        images: p.images,
        features: p.features,
        highlights: (p as any).highlights || [],
        full_analysis: (p as any).fullAnalysis || "",
        live_url: (p as any).liveUrl || "",
        github_url: (p as any).githubUrl || "",
        pdf_url: (p as any).pdfUrl || ""
      }));

      const { error } = await supabase.from('projects').insert(toInsert);
      if (error) throw error;
      alert(`✅ ${newProjects.length} new projects synced! ${ProjectsData.length - newProjects.length} already existed (skipped).`);
      fetchProjects();
    } catch (err: any) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  // Upload a single image file to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error } = await supabase.storage.from('portfolio-assets').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName);
    return data.publicUrl;
  };

  // ADD NEW PROJECT
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const url = await uploadImage(file);
        imageUrls.push(url);
      }
      
      const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);
      const highlightsArray = formData.highlights.split(',').map(h => h.trim()).filter(h => h);
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);

      const { error } = await supabase.from('projects').insert([{
        title: formData.title,
        category: formData.category,
        description: formData.description,
        tech: techArray,
        images: imageUrls,
        highlights: highlightsArray,
        features: featuresArray,
        full_analysis: formData.full_analysis,
        live_url: formData.live_url,
        github_url: formData.github_url,
        pdf_url: formData.pdf_url
      }]);
      
      if (error) throw error;
      setIsAddModalOpen(false);
      
      // Reset form
      setFormData({ 
        title: "", category: "", description: "", tech: "",
        highlights: "", features: "", full_analysis: "",
        live_url: "", github_url: "", pdf_url: ""
      });
      setImageFiles([]);
      setActiveAddTab("basic");
      fetchProjects();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (project: any) => {
    setEditingProject({ 
      ...project, 
      images: [...(project.images || [])],
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : (project.tech || ""),
      highlights: Array.isArray(project.highlights) ? project.highlights.join(', ') : (project.highlights || ""),
      features: Array.isArray(project.features) ? project.features.join(', ') : (project.features || ""),
      full_analysis: project.full_analysis || project.fullAnalysis || "",
      live_url: project.live_url || project.liveUrl || "",
      github_url: project.github_url || project.githubUrl || "",
      pdf_url: project.pdf_url || project.pdfUrl || ""
    });
    setNewImageFiles([]);
    setActiveEditTab("basic");
    setIsEditModalOpen(true);
  };

  // REMOVE an existing image from editing project
  const removeExistingImage = (index: number) => {
    setEditingProject((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index)
    }));
  };

  // SAVE EDIT (upload new images + update DB)
  const handleSaveEdit = async () => {
    if (!editingProject) return;
    setUploadingImages(true);
    try {
      // Upload any new images
      const newUrls: string[] = [];
      for (const file of newImageFiles) {
        const url = await uploadImage(file);
        newUrls.push(url);
      }

      const updatedImages = [...(editingProject.images || []), ...newUrls];
      const techArray = typeof editingProject.tech === 'string'
        ? editingProject.tech.split(',').map((t: string) => t.trim()).filter((t: string) => t)
        : editingProject.tech;

      const highlightsArray = typeof editingProject.highlights === 'string'
        ? editingProject.highlights.split(',').map((h: string) => h.trim()).filter((h: string) => h)
        : editingProject.highlights;

      const featuresArray = typeof editingProject.features === 'string'
        ? editingProject.features.split(',').map((f: string) => f.trim()).filter((f: string) => f)
        : editingProject.features;

      const { error } = await supabase.from('projects').update({
        title: editingProject.title,
        category: editingProject.category,
        description: editingProject.description,
        tech: techArray,
        images: updatedImages,
        highlights: highlightsArray,
        features: featuresArray,
        full_analysis: editingProject.full_analysis,
        live_url: editingProject.live_url,
        github_url: editingProject.github_url,
        pdf_url: editingProject.pdf_url
      }).eq('id', editingProject.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      setEditingProject(null);
      setNewImageFiles([]);
      fetchProjects();
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setUploadingImages(false);
    }
  };

  // DELETE PROJECT
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10">

      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-primary transition-colors" size={18} />
          <input type="text" placeholder="Search projects..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary transition-all font-bold text-sm text-text-main" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-3 w-full md:w-auto flex-wrap">
          <button
            onClick={handleSyncOldProjects}
            disabled={syncing}
            className="flex-1 md:flex-none px-5 py-4 rounded-2xl glass border border-primary/30 text-primary flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-primary/10 transition-all disabled:opacity-50"
          >
            {syncing ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />}
            {syncing ? "Syncing..." : "Sync Old Projects"}
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="flex-1 md:flex-none px-6 py-4 rounded-2xl gradient-bg text-white flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
            <Plus size={18} strokeWidth={3} /> Add New Project
          </button>
        </div>
      </div>

      {/* RLS/SQL Note Banner */}
      <div className="glass border border-white/10 rounded-3xl p-5 bg-white/[0.01] flex gap-4 items-center">
        <Info className="text-primary shrink-0" size={24} />
        <p className="text-xs text-text-dim leading-relaxed">
          <strong>Database Notice:</strong> If you add custom fields (Highlights, Breakdown, Links), please ensure your Supabase <code>projects</code> table contains the corresponding columns. We have synced compatibility layers perfectly.
        </p>
      </div>

      {/* Info Banner if no projects */}
      {!fetching && projects.length === 0 && (
        <div className="glass border border-primary/20 rounded-3xl p-6 text-center bg-primary/5">
          <p className="text-text-main font-bold mb-2">No projects in database yet.</p>
          <p className="text-text-dim text-sm">Click <span className="text-primary font-black">"Sync Old Projects"</span> to import your existing projects, or add a new one!</p>
        </div>
      )}

      {/* Projects Grid */}
      {fetching ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {projects.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase())).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-[40px] border border-white/10 overflow-hidden group hover:border-primary/50 transition-all flex flex-col bg-white/[0.01]"
            >
              {/* Image Preview */}
              <div className="relative h-52 overflow-hidden p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img src={project.images?.[0] || 'https://placehold.co/600x400/111/333?text=No+Preview'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => openEditModal(project)} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white hover:bg-primary transition-all" title="Edit Project">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all" title="Delete Project">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {/* Image count badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-black text-white flex items-center gap-1">
                    <ImageIcon size={10} /> {project.images?.length || 0} Images
                  </div>
                </div>
              </div>

              <div className="p-6 pt-2 flex-1 flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20 w-fit mb-3">{project.category}</span>
                <h3 className="text-xl font-black mb-3 text-text-main group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech?.slice(0, 4).map((t: string) => (
                    <span key={t} className="text-[8px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md text-text-dim border border-white/5">{t}</span>
                  ))}
                </div>
                <button onClick={() => openEditModal(project)} className="mt-auto w-full py-3 rounded-xl glass border border-white/10 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
                  <Edit3 size={14} /> Edit Case Study
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ===== ADD NEW PROJECT MODAL ===== */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl glass border border-white/10 rounded-[40px] p-8 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-text-dim hover:text-white"><X size={20} /></button>
              
              <h2 className="text-3xl font-black text-text-main mb-6">Add New Project</h2>
              
              {/* Premium Tab Bar */}
              <div className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-8">
                <button 
                  type="button" 
                  onClick={() => setActiveAddTab("basic")}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeAddTab === 'basic' ? 'gradient-bg text-white shadow-lg' : 'text-text-dim hover:text-white'}`}
                >
                  <Sparkles size={14} /> Basic Details
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveAddTab("casestudy")}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeAddTab === 'casestudy' ? 'gradient-bg text-white shadow-lg' : 'text-text-dim hover:text-white'}`}
                >
                  <ListTodo size={14} /> Case Study Details
                </button>
              </div>

              <form onSubmit={handleAddProject} className="flex flex-col gap-5">
                
                {activeAddTab === "basic" ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Project Title *</label>
                      <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="e.g. E-Commerce Website" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Category *</label>
                      <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="e.g. Web Application" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Description / Challenge Summary *</label>
                      <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="Short project challenge summary..." />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Technologies (Comma Separated)</label>
                      <input value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="React, Node.js, Supabase" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Upload Images</label>
                      <label className="w-full border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
                        <Upload size={28} className="text-text-dim" />
                        <span className="text-sm font-bold text-text-dim">Click to select images (multiple allowed)</span>
                        <input type="file" multiple accept="image/*" onChange={e => setImageFiles(e.target.files ? Array.from(e.target.files) : [])} className="hidden" />
                      </label>
                      {imageFiles.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {imageFiles.map((f, i) => <span key={i} className="text-xs bg-white/10 px-3 py-1 rounded-full text-text-main">{f.name}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Technical Highlights / Impact (Comma Separated)</label>
                      <input value={formData.highlights} onChange={e => setFormData({...formData, highlights: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="99.9% Uptime, 50% Faster Speed, 4000+ Downloads" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Key Features (Comma Separated)</label>
                      <input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="Real-time Sync, JazzCash Modal, Admin CRM" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Full Technical Breakdown & Architecture Details</label>
                      <textarea rows={5} value={formData.full_analysis} onChange={e => setFormData({...formData, full_analysis: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="Describe core backend architectures, design decisions, and system stack..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Live Demo URL</label>
                        <input value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="https://example.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">GitHub URL</label>
                        <input value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="https://github.com/..." />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Case Study PDF URL</label>
                        <input value={formData.pdf_url} onChange={e => setFormData({...formData, pdf_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="https://drive.google.com/..." />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-4">
                  {activeAddTab === "basic" ? (
                    <button type="button" onClick={() => setActiveAddTab("casestudy")} className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs">
                      Next: Case Study Details →
                    </button>
                  ) : (
                    <button type="button" onClick={() => setActiveAddTab("basic")} className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs">
                      ← Back to Basic Details
                    </button>
                  )}
                  <button type="submit" disabled={loading} className="w-full py-5 rounded-2xl gradient-bg text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50">
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                    {loading ? "Publishing..." : "Publish Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== EDIT PROJECT MODAL ===== */}
      <AnimatePresence>
        {isEditModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl glass border border-white/10 rounded-[40px] p-8 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-text-dim hover:text-white"><X size={20} /></button>

              <h2 className="text-3xl font-black text-text-main mb-2">Edit Case Study</h2>
              <p className="text-text-dim text-sm mb-6 font-bold">{editingProject.title}</p>

              {/* Premium Tab Bar */}
              <div className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-8">
                <button 
                  type="button" 
                  onClick={() => setActiveEditTab("basic")}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeEditTab === 'basic' ? 'gradient-bg text-white shadow-lg' : 'text-text-dim hover:text-white'}`}
                >
                  <Sparkles size={14} /> Basic & Images
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveEditTab("casestudy")}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeEditTab === 'casestudy' ? 'gradient-bg text-white shadow-lg' : 'text-text-dim hover:text-white'}`}
                >
                  <ListTodo size={14} /> Breakdown & Links
                </button>
              </div>

              <div className="flex flex-col gap-5">
                
                {activeEditTab === "basic" ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Project Title</label>
                      <input value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Category</label>
                      <input value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Description / Challenge Summary</label>
                      <textarea rows={3} value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Technologies (Comma Separated)</label>
                      <input value={editingProject.tech} onChange={e => setEditingProject({...editingProject, tech: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" />
                    </div>

                    {/* Current Images */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                        Current Images ({editingProject.images?.length || 0}) — Click ✕ to remove
                      </label>
                      {editingProject.images?.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {editingProject.images.map((img: string, idx: number) => (
                            <div key={idx} className="relative group/img aspect-video rounded-xl overflow-hidden border border-white/10">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(idx)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-text-dim text-sm font-bold glass p-4 rounded-2xl text-center">No images. Add some below!</p>
                      )}
                    </div>

                    {/* Add New Images */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Add New Images</label>
                      <label className="w-full border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors bg-white/5">
                        <Upload size={24} className="text-text-dim" />
                        <span className="text-sm font-bold text-text-dim">Click to upload more images</span>
                        <input type="file" multiple accept="image/*" onChange={e => setNewImageFiles(e.target.files ? Array.from(e.target.files) : [])} className="hidden" />
                      </label>
                      {newImageFiles.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {newImageFiles.map((f, i) => (
                            <span key={i} className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">+ {f.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Technical Highlights / Impact (Comma Separated)</label>
                      <input value={editingProject.highlights} onChange={e => setEditingProject({...editingProject, highlights: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="99.9% Uptime, 50% Faster Speed, 4000+ Downloads" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Key Features (Comma Separated)</label>
                      <input value={editingProject.features} onChange={e => setEditingProject({...editingProject, features: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="Real-time Sync, JazzCash Modal, Admin CRM" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Full Technical Breakdown & Architecture Details</label>
                      <textarea rows={6} value={editingProject.full_analysis} onChange={e => setEditingProject({...editingProject, full_analysis: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-text-main" placeholder="Describe core backend architectures, design decisions, and system stack..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Live Demo URL</label>
                        <input value={editingProject.live_url} onChange={e => setEditingProject({...editingProject, live_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all text-text-main" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">GitHub URL</label>
                        <input value={editingProject.github_url} onChange={e => setEditingProject({...editingProject, github_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all text-text-main" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-2">Case Study PDF URL</label>
                        <input value={editingProject.pdf_url} onChange={e => setEditingProject({...editingProject, pdf_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all text-text-main" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button & Navigation */}
                <div className="flex gap-4 mt-4">
                  {activeEditTab === "basic" ? (
                    <button type="button" onClick={() => setActiveEditTab("casestudy")} className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs">
                      Next: Breakdown & Links →
                    </button>
                  ) : (
                    <button type="button" onClick={() => setActiveEditTab("basic")} className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs">
                      ← Back to Basic & Images
                    </button>
                  )}
                  <button onClick={handleSaveEdit} disabled={uploadingImages} className="w-full py-5 rounded-2xl gradient-bg text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50">
                    {uploadingImages ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                    {uploadingImages ? "Saving Changes..." : "Save All Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
