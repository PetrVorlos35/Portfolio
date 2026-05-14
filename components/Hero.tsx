"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const FULL_TEXT = "Fullstack vývojář zaměřený na čistý kód, rychlý výkon a design, který dýchá.";

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

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const tagline = useScramble(FULL_TEXT, ready);

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
          Portfolio — 2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs text-gray-400 uppercase tracking-widest"
        >
          Praha, CZ
        </motion.p>
      </div>

      {/* MAIN NAME */}
      <div className="py-12 md:py-0">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display text-black"
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
            className="display text-black"
            style={{ fontWeight: 300 }}
          >
            Vorlíček
          </motion.h1>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm text-gray-500 text-sm leading-relaxed font-mono"
        >
          {tagline || <span className="opacity-0">{FULL_TEXT}</span>}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-2 text-sm text-gray-400"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Dostupný pro projekty
        </motion.div>
      </div>
    </section>
  );
}