"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";

const EMAIL = "petr@vorlos.eu";

type CopyState = "idle" | "copied" | "error";

export default function Contact() {
  const [status, setStatus] = useState<CopyState>("idle");
  const { t } = useLanguage();
  const reveal = useReveal();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2800);
  };

  return (
    <section id="contact" className="py-32 max-w-6xl mx-auto px-6 md:px-10">
      <div className="divider mb-20" />

      <motion.div {...reveal()}>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">{t.contact.label}</p>

        <h2 className="display font-light text-black mb-16" style={{ lineHeight: "0.95" }}>
          {t.contact.titlePart1}<br />{t.contact.titlePart2}
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <button
            onClick={handleCopy}
            aria-label={`${t.contact.copy}: ${EMAIL}`}
            className="group relative flex items-center gap-4 md:gap-6 text-xl md:text-3xl font-light text-black pb-3 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">{EMAIL}</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

            <span aria-live="polite" className="contents">
              <AnimatePresence mode="wait">
                {status === "copied" ? (
                  <motion.span
                    key="ok"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-sm text-green-700 font-mono flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-md"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t.contact.copied}
                  </motion.span>
                ) : status === "error" ? (
                  <motion.span
                    key="err"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-sm text-gray-700 font-mono bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-md"
                  >
                    {EMAIL}
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-gray-500 font-mono group-hover:text-black transition-colors md:mt-1"
                  >
                    {t.contact.copy}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-8 mt-24">
          <a
            href="https://github.com/PetrVorlos35"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1.5 whitespace-nowrap"
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
            className="group text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1.5 whitespace-nowrap"
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
            className="group text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            Instagram
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon size={12} className="shrink-0" />
            </span>
          </a>
          <span className="text-sm text-gray-500 whitespace-nowrap ml-auto md:ml-0">{t.contact.location}</span>
        </div>
      </motion.div>
    </section>
  );
}
