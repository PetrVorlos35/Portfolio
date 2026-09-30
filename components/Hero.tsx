"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import AccentTuner from "./AccentTuner";

const NAME_EASE = [0.16, 1, 0.3, 1] as const;

const pragueFormat = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  hour: "2-digit",
  minute: "2-digit",
});

const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};
const getPragueTime = () => pragueFormat.format(new Date());
const getServerTime = () => null;

/**
 * Prague clock: the server snapshot is `null` so SSR and hydration match
 * (no hydration mismatch), then the client fills it in.
 */
function usePragueTime() {
  return useSyncExternalStore(subscribeClock, getPragueTime, getServerTime);
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
      <div className="flex items-start justify-between pt-12 md:pt-16">
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

      {/* MAIN: name + intro on the left, accent-color tuner on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end gap-x-16 gap-y-14 py-12 lg:py-10">
        <div>
          <motion.h1
            style={reduce ? undefined : { y: nameY, opacity: nameOpacity }}
            className="display text-black"
          >
            <span className="block overflow-hidden">
              <motion.span {...nameReveal(0)} className="block">
                Petr
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span {...nameReveal(0.08)} className="block">
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

          <motion.p
            key={language}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.035, delayChildren: 0.4 } },
            }}
            className="mt-10 max-w-md text-gray-600 text-sm md:text-base leading-relaxed font-mono"
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
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 inline-flex items-center gap-2.5 text-sm text-gray-700 px-4 py-2 rounded-full border border-gray-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t.hero.available}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: NAME_EASE }}
        >
          <AccentTuner />
        </motion.div>
      </div>

      {/* BOTTOM AREA */}
      <motion.a
        href="#projects"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="group inline-flex items-center gap-2 self-start text-sm text-gray-600 hover:text-accent-ink transition-colors duration-300"
      >
        {t.hero.selectedWork}
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-y-1"
        >
          ↓
        </span>
      </motion.a>
    </section>
  );
}
