"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const services = [
  {
    title: "Web Development",
    desc: "Kompletní tvorba webů od návrhu po nasazení. Zaměření na moderní React ekosystém a Next.js architekturu.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
    color: "group-hover:border-blue-300 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
  },
  {
    title: "Optimalizace & SEO",
    desc: "Zrychlení načítání stránek, zlepšení přístupnosti, server-side rendering a špičková viditelnost ve vyhledávačích.",
    icon: (
      <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    color: "group-hover:border-cyan-300 group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]"
  },
  {
    title: "UI/UX Implementace",
    desc: "Převod grafických návrhů z Figmy do pixel-perfect interaktivního kódu s pokročilými framer animacemi.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    ),
    color: "group-hover:border-purple-300 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
  }
];

export default function Services() {
  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4">
      <div className="flex flex-col items-center mb-16">
          <h3 className="text-sm text-purple-600 font-bold uppercase tracking-[0.2em] mb-2 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">
            Expertíza
          </h3>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight text-center">
            S čím vám mohu pomoci
          </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px", once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`group p-8 glass-panel rounded-3xl transition-all duration-300 bg-white/60 ${service.color}`}
          >
            <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-900 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{service.title}</h4>
            <p className="text-gray-500 leading-relaxed font-light">
                {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}