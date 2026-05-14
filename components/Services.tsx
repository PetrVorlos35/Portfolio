"use client";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    desc: "Kompletní tvorba webů od návrhu po nasazení. Zaměření na moderní React ekosystém a Next.js architekturu.",
    icon: (
      <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
  },
  {
    title: "Performance & SEO",
    desc: "Zrychlení načítání stránek, zlepšení přístupnosti a optimalizace pro vyhledávače.",
    icon: (
      <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
  {
    title: "UI/UX Development",
    desc: "Převod grafických návrhů do pixel-perfect kódu s důrazem na čistý design a funkčnost.",
    icon: (
      <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    ),
  }
];

export default function Services() {
  return (
    <div className="w-full max-w-5xl mx-auto py-32 px-4">
      <div className="flex flex-col items-center mb-16">
          <span className="section-label">Expertíza</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight text-center">
            S čím vám mohu pomoci
          </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px", once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-white hover:shadow-sm"
          >
            <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-gray-900 mb-6">
                {service.icon}
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{service.title}</h4>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">
                {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}