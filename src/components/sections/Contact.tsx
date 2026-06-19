"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UzairData } from "@/data/mockData";
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/utils/supabase";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const cleanPhone = UzairData.phone.split(' ').join('').split('+').join('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const subjectParam = params.get("subject");
      if (subjectParam) {
        setFormData(prev => ({ ...prev, subject: subjectParam }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Save to Supabase Database
      console.log("Saving record to Supabase...");
      const { error: dbError } = await supabase.from('inquiries').insert([
        { 
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'pending' 
        }
      ]);
      
      if (dbError) {
        console.error("Supabase Save Error:", dbError);
        alert("Database connection error, but you can still send the email.");
      } else {
        console.log("Record saved to Supabase successfully.");
      }

      // 2. Open Email Client
      // const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      // const mailtoLink = `mailto:${UzairData.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
      // window.location.href = mailtoLink;
      
      // 2. Send Email via EmailJS automatically in background
      console.log("Attempting to send email via EmailJS...");
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Uzair"
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_yywfx4a',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_wf0ac39',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '9bTDSx4K693LKCBo6'
      ).catch(emailErr => {
        console.error("EmailJS catch-block error:", emailErr);
        throw new Error(`Email Service Error: ${emailErr?.text || emailErr?.message || 'Could not reach EmailJS'}`);
      });

      console.log("Email sent successfully via EmailJS!");
      
      // 3. Show Success Message
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err: any) {
      console.error("Error:", err);
      alert(`Submission Failed:\n\n${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/5 px-4 py-2 rounded-full border border-primary/20">Get in Touch</span>
          <h2 className="text-6xl font-black mt-8 text-text-main tracking-tighter">Let's Build Something <span className="gradient-text">Extraordinary</span></h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 flex flex-col gap-10"
          >
            <div className="glass p-10 rounded-[40px] border-white/10 bg-white/[0.02]">
              <h4 className="text-2xl font-black mb-10 text-text-main tracking-tight">Contact Information</h4>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-1">Email Address</p>
                    <p className="text-lg font-black text-text-main">{UzairData.email}</p>
                  </div>
                </div>
                
                <a 
                  href={`https://wa.me/${cleanPhone}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-all">
                    <FaWhatsapp size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-green-500 uppercase font-black tracking-widest mb-1">WhatsApp</p>
                    <p className="text-lg font-black text-text-main group-hover:text-primary transition-colors">{UzairData.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-1">Location</p>
                    <p className="text-lg font-black text-text-main">{UzairData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-10 rounded-[40px] border-white/10 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] rounded-full" />
                <h4 className="text-xl font-black mb-4 italic text-text-main">NexStack.AI Agency</h4>
                <p className="text-sm text-text-main opacity-70 leading-relaxed font-medium">
                    Our team is currently accepting high-fidelity projects and enterprise consulting contracts.
                </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass p-12 rounded-[50px] border-white/10 bg-white/[0.02] shadow-2xl"
          >
            {success ? (
              <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shadow-inner">
                  <CheckCircle2 size={56} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-black text-text-main tracking-tighter">Transmission Successful!</h3>
                    <p className="text-lg text-text-main opacity-60 max-w-sm mx-auto">Your email client has been opened. Please hit send to deliver your message to Uzair Ali.</p>
                </div>
                <button onClick={() => setSuccess(false)} className="px-8 py-3 rounded-full bg-white/5 text-primary font-black uppercase tracking-widest text-[10px] border border-white/5 hover:bg-white/10 transition-all">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">Full Identity</label>
                  <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full glass border-white/10 rounded-2xl p-6 text-lg font-bold outline-none focus:border-primary transition-all text-text-main placeholder:text-text-dim shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">Electronic Mail</label>
                  <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="w-full glass border-white/10 rounded-2xl p-6 text-lg font-bold outline-none focus:border-primary transition-all text-text-main placeholder:text-text-dim shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-4 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">Inquiry Subject</label>
                  <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Project Partnership Inquiry" 
                      className="w-full glass border-white/10 rounded-2xl p-6 text-lg font-bold outline-none focus:border-primary transition-all text-text-main placeholder:text-text-dim shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-4 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">Detailed Message</label>
                  <textarea 
                      rows={6} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe your vision and technical requirements..." 
                      className="w-full glass border-white/10 rounded-2xl p-6 text-lg font-bold outline-none focus:border-primary transition-all text-text-main placeholder:text-text-dim shadow-inner"
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-6">
                  <button 
                      type="submit" 
                      className="w-full py-6 rounded-[24px] gradient-bg text-white font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,123,255,0.4)] hover:scale-[1.02] hover:-translate-y-1 transition-all active:scale-95 group"
                  >
                    Send Secure Message <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
