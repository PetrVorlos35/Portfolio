"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";

export default function About() {
  const { t } = useLanguage();
  const reveal = useReveal();

  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6 md:px-10">
      <div className="divider mb-20" />

      <motion.div {...reveal()} className="max-w-2xl">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">{t.about.label}</p>
        <h2 className="display-sm font-light text-black mb-10">{t.about.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-6 text-base max-w-prose">
          {t.about.bio1}
        </p>
        <p className="text-gray-600 leading-relaxed text-base max-w-prose">
          {t.about.bio2}
        </p>
      </motion.div>
    </section>
  );
}
