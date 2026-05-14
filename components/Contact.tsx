"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon } from "./Icons";

const EMAIL = "petrvorlicek97@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

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
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Kontakt</p>

        <h2 className="display font-light text-black mb-16" style={{ lineHeight: "0.95" }}>
          Pojďme<br />spolupracovat.
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <button
            onClick={handleCopy}
            className="group flex items-center gap-3 text-lg md:text-2xl font-light text-black border-b border-gray-200 pb-2 hover:border-black transition-colors duration-200"
          >
            <span>{EMAIL}</span>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-sm text-green-600 font-mono"
                >
                  ✓ Zkopírováno
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 font-mono group-hover:text-black transition-colors"
                >
                  Zkopírovat
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-8 mt-16">
          <a
            href="https://github.com/PetrVorlos35"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            GitHub <ArrowIcon size={12} className="shrink-0" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            LinkedIn <ArrowIcon size={12} className="shrink-0" />
          </a>
          <a
            href="https://instagram.com/petr.vorel35"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            Instagram <ArrowIcon size={12} className="shrink-0" />
          </a>
          <span className="text-sm text-gray-300 whitespace-nowrap">Praha · Ústí n. L.</span>
        </div>
      </motion.div>
    </section>
  );
}