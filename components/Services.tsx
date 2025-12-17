"use client";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    desc: "Kompletní tvorba webů od návrhu po nasazení. Zaměření na React a Next.js.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    )
  },
  {
    title: "Optimalizace & SEO",
    desc: "Zrychlení načítání stránek, zlepšení přístupnosti a viditelnosti ve vyhledávačích.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  },
  {
    title: "UI/UX Implementace",
    desc: "Převod grafických návrhů (Figma) do pixel-perfect interaktivního kódu.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    )
  }
];

export default function Services() {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <h3 className="text-sm text-gray-400 font-medium mb-10 uppercase tracking-wider text-center">
        Co nabízím
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-900 mb-4 shadow-sm">
                {service.icon}
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
                {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}