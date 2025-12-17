"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    <motion.div variants={item} className="w-full max-w-2xl mx-auto mb-20">
      
      <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center shadow-sm">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Máš nápad na projekt?
        </h2>
        <p className="text-gray-500 mb-8">
          Napiš mi a společně vymyslíme řešení.
        </p>

        {/* COPY ELEMENT */}
        <div className="flex flex-col items-center gap-4 mb-10">
            <button
              onClick={handleCopy}
              className="group relative flex items-center gap-3 px-5 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all active:scale-95 w-full md:w-auto justify-center md:justify-start"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>

              <span className="text-gray-700 font-mono text-sm md:text-base font-medium">
                {email}
              </span>

              <div className="h-4 w-px bg-gray-300 mx-1 hidden md:block"></div>

              <div className="relative w-20 flex justify-center">
                <AnimatePresence mode='wait'>
                    {copied ? (
                        <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-green-600 text-sm font-bold flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Hotovo
                        </motion.span>
                    ) : (
                        <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-gray-400 text-sm group-hover:text-gray-600 transition-colors"
                        >
                            Zkopírovat
                        </motion.span>
                    )}
                </AnimatePresence>
              </div>
            </button>
        </div>

        {/* --- LOKACE & SÍTĚ (Oddělené čarou) --- */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            
            {/* LOKACE - Vlevo */}
            <div className="flex items-center gap-3 text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                {/* Ústí (Domov) */}
                <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default" title="Domov">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Ústí n. L.
                </span>

                {/* Šipka */}
                <span className="text-gray-300">➝</span>

                {/* Praha (Studium) */}
                <span className="flex items-center gap-1.5 text-gray-900 font-medium cursor-default" title="Aktuálně / Studium">
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Praha
                </span>
            </div>

            {/* SOCIÁLNÍ SÍTĚ - Vpravo */}
            <div className="flex gap-4">
                <a href="https://github.com/PetrVorlos35" target="_blank" className="text-gray-400 hover:text-black transition-colors font-medium">GitHub</a>
                <span className="text-gray-200">|</span>
                <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors font-medium">LinkedIn</a>
            </div>
        </div>

      </div>
    </motion.div>
  );
}