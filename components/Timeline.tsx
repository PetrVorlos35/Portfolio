"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    year: "2025 - Současnost",
    title: "Vysoká škola ekonomická v Praze",
    description: "Fakulta informatiky a statistiky (FIS), obor Aplikovaná informatika. Zaměření na softwarové inženýrství a datovou analytiku.",
  },
  {
    year: "2024",
    title: "Maturitní projekt: Journeo",
    description: "Moderní cestovatelská aplikace pro plánování itinerářů. Využití Next.js a Tailwind CSS pro frontend, integrace mapových podkladů a práce s externími API. Důraz na UX a responzivitu.",
  },
  {
    year: "2023",
    title: "Ročníkový projekt: NBA Guessing Game",
    description: "Interaktivní webová hra inspirovaná Wordle. Uživatel hádá hráče NBA na základě indicií. Implementace kompletní herní logiky, filtrování dat a validace vstupů. Můj první projekt s pokročilejším JavaScriptem.",
  },
  {
    year: "2021 - 2025",
    title: "SPŠ Ústí nad Labem",
    description: "Obor Informační technologie. Získání silných základů v algoritmizaci, počítačových sítích a hardwaru. Zakončeno maturitou.",
  },
];

const TimelineItem = ({ event }: { event: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"]
  });

  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest reaches exactly 1 when the top of this ref hits the center of the viewport
    // Since the dot is `top-1.5` (slightly below the top of the container), 
    // triggering at 0.98 creates a crisper response with zero perceivable delay when the line reaches it.
    if (latest >= 0.98) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  return (
    <motion.div 
      ref={ref}
      className="relative pl-10 md:pl-16 z-10"
      initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
        {/* Glowing dot on Timeline */}
        <div className={`absolute left-0 top-1.5 transition-all duration-300 rounded-full flex items-center justify-center ${isActive ? 'h-3 w-3 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'h-3 w-3 bg-white border-2 border-gray-300'}`}>
          {isActive && <div className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-50" />}
        </div>
        
        <div className={`bg-white/50 backdrop-blur-md rounded-2xl p-6 border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-white/80 transition-all duration-300 ${isActive ? 'border-cyan-200/50' : 'border-white/50'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <h4 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {event.title}
                </h4>
                <span className={`text-sm font-semibold tracking-wide px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto border transition-colors duration-300 ${isActive ? 'text-cyan-600 bg-cyan-50/80 border-cyan-100' : 'text-gray-400 bg-gray-50 border-gray-100'}`}>
                    {event.year}
                </span>
            </div>
            <p className="text-gray-500 leading-relaxed font-light">
                {event.description}
            </p>
        </div>
    </motion.div>
  );
};

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full max-w-3xl mb-24 mx-auto relative" ref={ref}>
      <h3 className="text-sm text-cyan-600 font-bold uppercase tracking-[0.2em] mb-12 text-center bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-100 shadow-sm inline-block mx-auto left-1/2 -translate-x-1/2 relative">
          Moje cesta
      </h3>
      
      <div className="relative ml-4 md:ml-8 space-y-16">
          {/* Base pale line */}
          <div className="absolute left-[5px] top-4 bottom-0 w-[2px] bg-gray-200"></div>
          {/* Animated gradient fill line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[5px] top-4 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] origin-top z-0"
          />

          {timelineData.map((event, index) => (
             <TimelineItem key={index} event={event} />
          ))}
      </div>
    </div>
  );
}