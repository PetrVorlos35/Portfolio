"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";

export default function About() {
  const { t } = useLanguage();
  const reveal = useReveal();

  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6 md:px-10">
      <div className="divider mb-20" />

      <motion.div {...reveal()} className="max-w-2xl">
        <p className="text-sm font-mono text-gray-500 mb-8">{t.about.label}</p>
        <h2 className="display-sm font-light text-black mb-10">{t.about.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-6 text-base max-w-prose">
          {t.about.bio1}
        </p>
        <p className="text-gray-600 leading-relaxed text-base max-w-prose">
          {t.about.bio2}
        </p>
        <Link
          href="/cv"
          className="group mt-10 inline-flex items-center gap-2 text-base text-black hover:text-accent-ink transition-colors"
        >
          <span className="link-hover">{t.about.cvLink}</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
