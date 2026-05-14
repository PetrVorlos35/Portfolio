"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    num: "01",
    period: "2025 — Nyní",
    title: "VŠE Praha",
    sub: "Aplikovaná informatika · FIS",
  },
  {
    num: "02",
    period: "2024",
    title: "Journeo",
    sub: "Maturitní projekt · Next.js, PostgreSQL",
  },
  {
    num: "03",
    period: "2023",
    title: "NBA Guessing Game",
    sub: "Ročníkový projekt · React, REST API",
  },
  {
    num: "04",
    period: "2021 — 2025",
    title: "SPŠ Ústí nad Labem",
    sub: "Informační technologie",
  },
];

const skills = [
  "Next.js", "Vite.js", "React", "JavaScript", "TypeScript", "Node.js", "HTML", "CSS",
  "PostgreSQL", "MariaDB", "Tailwind CSS", "Framer Motion", "Git"
];

export default function About() {
  return (
    <section id="about" className="py-32 max-w-6xl mx-auto px-6 md:px-10">
      <div className="divider mb-20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* LEFT: Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">O mně</p>
          <h2 className="display-sm font-light text-black mb-10">Kdo jsem</h2>
          <p className="text-gray-500 leading-relaxed mb-6 text-base">
            Jsem fullstack vývojář z Ústí nad Labem, aktuálně studující na VŠE v Praze. 
            Specializuji se na tvorbu rychlých, čistých a přístupných webových aplikací.
          </p>
          <p className="text-gray-500 leading-relaxed text-base">
            Kladu důraz na detail — od správné architektury kódu přes výkon až po vizuální dojem. 
            Věřím, že dobrý software musí být zároveň dobrý produkt.
          </p>

          {/* Skills */}
          <div className="mt-12">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">Technologie</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Cesta</p>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-6 py-6 border-t border-gray-100 last:border-b"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <span className="text-xs text-gray-300 font-mono mt-0.5 w-6 shrink-0">{item.num}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-medium text-black">{item.title}</h3>
                    <span className="text-xs text-gray-400 font-mono whitespace-nowrap">{item.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
