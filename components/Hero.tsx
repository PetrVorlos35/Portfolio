"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <motion.div variants={item} className="flex flex-col items-center relative z-10 w-full">
      {/* STATUS BADGE */}
      <motion.div 
        className="mb-10 inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 border-white text-xs font-medium text-gray-700 shadow-sm cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="tracking-wide uppercase text-[10px] text-gray-500">Status</span>
          <span className="w-px h-3 bg-gray-300 mx-1"></span>
          Available for new projects
        </div>
      </motion.div>

      {/* NADPIS */}
      <div className="relative group">
        {/* Subtle glow behind text */}
        <div className="absolute -inset-x-10 -inset-y-10 bg-cyan-200/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <h1 className="text-center text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-8 leading-[1]">
          Tvořím moderní <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-gradient bg-[length:200%_auto]">
            webové aplikace.
          </span>
        </h1>
      </div>

      {/* BIO */}
      <p className="text-center text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-light">
        Ahoj, jsem <strong className="font-semibold text-gray-900">Vorel</strong>. Fullstack vývojář. <br className="hidden md:block" />
        Měním nápady v rychlý, čistý a <span className="italic text-gray-800">premium</span> kód.
      </p>

      {/* TLAČÍTKA */}
      <div className="flex flex-wrap gap-4 justify-center mb-20 w-full">
        <Link 
          href="#projects"
          className="group relative px-8 py-4 rounded-xl bg-gray-900 text-white font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center gap-2"
        >
          {/* Animated light sweeping across button */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
          
          <span className="relative z-20 flex items-center gap-2 font-semibold tracking-wide">
            Prozkoumat Práci
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </Link>
        
        <a 
          href="https://github.com/PetrVorlos35" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-8 py-4 rounded-xl glass-panel text-gray-800 font-semibold hover:bg-white transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-gray-700 transition-colors group-hover:text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Můj GitHub
        </a>
      </div>
    </motion.div>
  );
}