"use client";

import React from "react";
import Link from "next/link";
import { UzairData } from "@/data/mockData";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bg-dark border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter mb-6 block">
              <span className="gradient-text">{UzairData.brand}</span>
            </Link>
            <p className="text-text-dim max-w-sm mb-8 leading-relaxed">
              Engineering the future with intelligent digital solutions. We specialize in AI, Cloud, and high-fidelity Full-Stack development.
            </p>
            <div className="flex gap-4">
                <a href={UzairData.socials.github} target="_blank" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"><FaGithub size={20} /></a>
                <a href={UzairData.socials.linkedin} target="_blank" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"><FaLinkedin size={20} /></a>
                <a href={UzairData.socials.twitter} target="_blank" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"><FaTwitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-text-dim text-sm">
              <li><Link href="#home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-text-dim text-sm">
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> {UzairData.email}</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> {UzairData.phone}</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> {UzairData.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-text-dim uppercase tracking-widest font-semibold">
          <p>&copy; 2026 NexStack.AI. Built with precision by {UzairData.name}.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
