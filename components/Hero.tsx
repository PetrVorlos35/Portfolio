"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Varianta animace pro tento prvek
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <motion.div variants={item} className="flex flex-col items-center">
      {/* STATUS BADGE */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-green-100 text-green-700 text-xs font-medium shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for new projects
        </span>
      </div>

      {/* NADPIS */}
      <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
        Tvořím moderní <br />
        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
          webové aplikace.
        </span>
      </h1>

      {/* BIO */}
      <p className="text-center text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
        Ahoj, jsem <strong>Vorel</strong>. Fullstack vývojář. <br className="hidden md:block" />
        Měním nápady v rychlý, čistý a funkční kód.
      </p>

      {/* TLAČÍTKA */}
      <div className="flex flex-wrap gap-4 justify-center mb-24">
<Link 
  href="#projects"
  className="group relative px-8 py-3.5 rounded-lg bg-gray-900 text-white font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
>
  {/* Tenhle div dělá ten světelný efekt */}
  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
  
  <span className="relative z-20 flex items-center gap-2">
    Moje práce
    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
  </span>
</Link>
        
        <a 
          href="https://github.com/PetrVorlos35" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
        >
          GitHub
        </a>
      </div>
    </motion.div>
  );
}