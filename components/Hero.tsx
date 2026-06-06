"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

function useScramble(text: string, start: boolean) {
  const [displayed, setDisplayed] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!start) return;
    let iteration = 0;
    const totalFrames = text.length * 4;
    intervalRef.current = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((letter, i) => {
            if (letter === " ") return " ";
            if (i < Math.floor(iteration / 4)) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration > totalFrames) {
        clearInterval(intervalRef.current!);
        setDisplayed(text);
      }
    }, 30);
    return () => clearInterval(intervalRef.current!);
  }, [start, text]);

  return displayed;
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const tagline = useScramble(t.hero.tagline, ready);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between pt-16 px-6 md:px-10 pb-12 max-w-6xl mx-auto">
      {/* TOP AREA */}
      <div className="flex items-start justify-between pt-16 md:pt-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs text-gray-400 uppercase tracking-widest"
        >
          {t.hero.portfolio}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs text-gray-400 uppercase tracking-widest"
        >
          {t.hero.location}
        </motion.p>
      </div>

      {/* MAIN NAME */}
      <div className="py-12 md:py-0">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display text-black inline-block cursor-default transition-transform duration-500 hover:translate-x-2"
            style={{ fontWeight: 300 }}
          >
            Petr
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="display text-black inline-block cursor-default transition-transform duration-500 hover:translate-x-2"
            style={{ fontWeight: 300 }}
          >
            Vorlíček
          </motion.h1>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.p
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm text-gray-500 text-sm leading-relaxed font-mono"
        >
          {tagline || <span className="opacity-0">{t.hero.tagline}</span>}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-2.5 text-xs md:text-sm text-gray-600 bg-gray-50/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/60 shadow-sm cursor-default hover:bg-gray-100 transition-colors duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {t.hero.available}
        </motion.div>
      </div>
    </section>
  );
}