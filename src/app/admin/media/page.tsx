"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Upload, RefreshCcw, CheckCircle2, Loader2, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMedia() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      setSettings(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${key}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName);

      // Update the setting in DB
      const { error: updateError } = await supabase
        .from("site_settings")
        .update({ value: urlData.publicUrl, updated_at: new Date().toISOString() })
        .eq("key", key);

      if (updateError) throw updateError;

      fetchSettings();
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingKey(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-text-main tracking-tight mb-2">
            Media <span className="gradient-text">Manager</span>
          </h2>
          <p className="text-sm text-text-dim font-bold uppercase tracking-widest">
            Change images on any page of your website
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="p-4 rounded-2xl glass hover:bg-white/5 text-primary border border-white/10 transition-all"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Info Box */}
      <div className="glass p-5 rounded-2xl border border-primary/20 bg-primary/5">
        <p className="text-sm text-text-main font-bold">
          💡 <span className="text-primary">How it works:</span> Click "Upload New Image" on any section below → Select image from your computer → Image automatically updates on your live website!
        </p>
      </div>

      {/* Media Cards */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {settings.map((setting) => (
            <motion.div
              key={setting.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-[40px] border border-white/10 overflow-hidden bg-white/[0.01]"
            >
              {/* Image Preview */}
              <div
                className="relative h-56 overflow-hidden cursor-pointer group"
                onClick={() => setPreviewModal(setting.value)}
              >
                <img
                  src={setting.value}
                  alt={setting.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x400/111/333?text=No+Image";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white font-black text-xs uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Click to Preview</span>
                </div>
              </div>

              {/* Info & Upload */}
              <div className="p-6">
                <div className="mb-5">
                  <h3 className="text-xl font-black text-text-main mb-1">{setting.label}</h3>
                  <p className="text-[10px] text-text-dim font-mono break-all line-clamp-1">{setting.value}</p>
                  {setting.updated_at && (
                    <p className="text-[10px] text-text-dim mt-1">
                      Last updated: {new Date(setting.updated_at).toLocaleDateString("en-PK")}
                    </p>
                  )}
                </div>

                <label className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/30 flex items-center justify-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                  {uploadingKey === setting.key ? (
                    <>
                      <Loader2 size={20} className="text-primary animate-spin" />
                      <span className="text-primary font-black text-sm">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="text-primary" />
                      <span className="text-primary font-black text-sm uppercase tracking-widest">Upload New Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingKey !== null}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(setting.key, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setPreviewModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full rounded-[40px] overflow-hidden"
            >
              <img src={previewModal} className="w-full h-auto max-h-[80vh] object-contain" alt="Preview" />
              <button
                onClick={() => setPreviewModal(null)}
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
