"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how LLMs and Generative AI are transforming the way we build modern web applications.",
    date: "May 10, 2026",
    author: "Uzair",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    tag: "Artificial Intelligence"
  },
  {
    title: "Securing Your AWS Infrastructure",
    excerpt: "Top 10 best practices for maintaining a secure and scalable cloud environment on AWS.",
    date: "April 28, 2026",
    author: "Uzair",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    tag: "Cloud Security"
  },
  {
    title: "Next.js 16: What's New?",
    excerpt: "A deep dive into the latest features and performance improvements in the Next.js framework.",
    date: "April 15, 2026",
    author: "Uzair",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1000",
    tag: "Web Dev"
  }
];

const BlogsPage = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Knowledge Base</span>
          <h1 className="text-5xl font-extrabold mt-4">Latest <span className="gradient-text">Insights</span></h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl overflow-hidden group border-white/5"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg tracking-widest">
                  {blog.tag}
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-primary mb-6">
                  <span className="flex items-center gap-2"><Calendar size={14} /> {blog.date}</span>
                  <span className="flex items-center gap-2"><User size={14} /> {blog.author}</span>
                </div>
                <h3 className="text-3xl font-black mb-6 group-hover:text-primary transition-colors leading-tight">{blog.title}</h3>
                <p className="text-text-main text-lg mb-10 leading-relaxed opacity-70 line-clamp-3 font-medium">
                  {blog.excerpt}
                </p>
                <button className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:gap-5 transition-all text-white group/btn">
                  Read Full Article <ArrowRight size={18} className="text-primary transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
