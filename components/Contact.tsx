"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";

const EMAIL = "petr@vorlos.eu";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-32 max-w-6xl mx-auto px-6 md:px-10">
      <div className="divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{t.contact.label}</p>

        <h2 className="display font-light text-black mb-16" style={{ lineHeight: "0.95" }}>
          {t.contact.titlePart1}<br />{t.contact.titlePart2}
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <button
            onClick={handleCopy}
            className="group relative flex items-center gap-4 md:gap-6 text-xl md:text-3xl font-light text-black pb-3 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">{EMAIL}</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-sm text-green-700 font-mono flex items-center gap-1.5 bg-green-50 border border-green-100 px-3 py-1.5 rounded-md"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t.contact.copied}
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 font-mono group-hover:text-black transition-colors md:mt-1"
                >
                  {t.contact.copy}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-8 mt-24">
          <a
            href="https://github.com/PetrVorlos35"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            GitHub 
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon size={12} className="shrink-0" />
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/petr-vorlicek"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            LinkedIn 
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon size={12} className="shrink-0" />
            </span>
          </a>
          <a
            href="https://instagram.com/petr.vorel35"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            Instagram 
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon size={12} className="shrink-0" />
            </span>
          </a>
          <span className="text-sm text-gray-300 whitespace-nowrap ml-auto md:ml-0">{t.contact.location}</span>
        </div>
      </motion.div>
    </section>
  );
}