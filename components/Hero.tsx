"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const NAME_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Prague clock: starts `null` so SSR and the first client render match
 * (no hydration mismatch), then fills in after mount.
 */
function usePragueTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("cs-CZ", {
        timeZone: "Europe/Prague",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Hero() {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const pragueTime = usePragueTime();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: the name drifts up and fades slightly faster than the rest of
  // the section as the hero scrolls out, giving it depth on the way out.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const nameOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const nameReveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "100%" as const },
          animate: { y: 0 },
          transition: { duration: 0.9, ease: NAME_EASE, delay },
        };

  const words = t.hero.tagline.split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-between pt-16 px-6 md:px-10 pb-12 max-w-6xl mx-auto"
    >
      {/* TOP AREA */}
      <div className="flex items-start justify-between pt-16 md:pt-24">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs text-gray-500 uppercase tracking-widest"
        >
          {t.hero.portfolio}
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5"
        >
          <span>{t.hero.location}</span>
          {pragueTime && (
            <span className="tracking-normal font-mono tabular-nums">· {pragueTime}</span>
          )}
        </motion.p>
      </div>

      {/* MAIN NAME */}
      <motion.h1
        style={reduce ? undefined : { y: nameY, opacity: nameOpacity }}
        className="display text-black py-12 md:py-0"
      >
        <span className="block overflow-hidden">
          <motion.span
            {...nameReveal(0)}
            className="block cursor-default transition-transform duration-500 hover:translate-x-2"
          >
            Petr
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span
            {...nameReveal(0.08)}
            className="block cursor-default transition-transform duration-500 hover:translate-x-2"
          >
            Vorlíček
          </motion.span>
        </span>
        <motion.span
          aria-hidden
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: NAME_EASE }}
          className="mt-6 md:mt-4 block h-px w-20 origin-left"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </motion.h1>

      {/* BOTTOM AREA */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.p
            key={language}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.035, delayChildren: 0.4 } },
            }}
            className="max-w-sm text-gray-600 text-sm leading-relaxed font-mono"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0"
              >
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: 0, transition: { duration: 0.5, ease: NAME_EASE } },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-2.5 text-xs md:text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm cursor-default hover:bg-gray-100 transition-colors duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t.hero.available}
          </motion.div>
        </div>

        <motion.a
          href="#projects"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="group inline-flex items-center gap-2 self-start text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors duration-300"
        >
          {t.hero.selectedWork}
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-y-1"
          >
            ↓
          </span>
        </motion.a>
      </div>
    </section>
  );
}
