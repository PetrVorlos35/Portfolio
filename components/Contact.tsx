"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "petrvorlicek97@gmail.com"; // DOPLŇ SVŮJ EMAIL

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={item} className="w-full max-w-3xl mx-auto mb-20 relative group">
      
      {/* Animated subtle glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

      <div className="glass-panel bg-white/70 rounded-3xl p-10 md:p-14 text-center">
        
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
          Máte nápad na <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">projekt?</span>
        </h2>
        <p className="text-gray-500 text-lg font-light mb-10 max-w-lg mx-auto">
          Napište mi a společně vymyslíme inovativní a rychlé řešení pro vaše potřeby.
        </p>

        {/* COPY ELEMENT */}
        <div className="flex flex-col items-center gap-4 mb-14">
            <button
              onClick={handleCopy}
              className="group/btn relative flex items-center gap-4 px-6 py-4 bg-white/80 hover:bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md rounded-2xl transition-all active:scale-95 md:w-auto justify-center"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>

              <span className="text-gray-800 font-mono text-base md:text-lg font-medium tracking-tight">
                {email}
              </span>

              <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

              <div className="relative w-24 flex justify-center">
                <AnimatePresence mode='wait'>
                    {copied ? (
                        <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-green-600 text-sm font-bold flex items-center gap-1.5"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Hotovo
                        </motion.span>
                    ) : (
                        <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-gray-400 text-sm font-medium group-hover/btn:text-blue-600 transition-colors"
                        >
                            Zkopírovat
                        </motion.span>
                    )}
                </AnimatePresence>
              </div>
            </button>
        </div>

        {/* --- LOKACE & SÍTĚ --- */}
        <div className="pt-8 border-t border-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* LOKACE - Vlevo */}
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white">
                <span className="flex items-center gap-2 text-gray-400 font-medium text-sm" title="Domov">
                    Ústí n. L.
                </span>
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                <span className="flex items-center gap-1.5 text-gray-900 font-bold text-sm cursor-default" title="Aktuálně / Studium">
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Praha
                </span>
            </div>

            {/* SOCIÁLNÍ SÍTĚ - Vpravo */}
            <div className="flex gap-6 items-center">
                <a href="https://github.com/PetrVorlos35" target="_blank" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>  
                  GitHub
                </a>
                <span className="text-gray-200">|</span>
                <a href="https://linkedin.com" target="_blank" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>  
                  LinkedIn
                </a>
            </div>
        </div>

      </div>
    </motion.div>
  );
}