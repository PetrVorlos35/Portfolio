"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    year: "2025 - Současnost",
    title: "Vysoká škola ekonomická v Praze",
    description: "Fakulta informatiky a statistiky (FIS), obor Aplikovaná informatika. Zaměření na softwarové inženýrství.",
  },
  {
    year: "2024",
    title: "Maturitní projekt: Journeo",
    description: "Moderní cestovatelská aplikace pro plánování itinerářů. Využití Next.js a Tailwind CSS pro frontend.",
  },
  {
    year: "2023",
    title: "Ročníkový projekt: NBA Guessing Game",
    description: "Interaktivní webová hra inspirovaná Wordle. Implementace kompletní herní logiky a validace vstupů.",
  },
  {
    year: "2021 - 2025",
    title: "SPŠ Ústí nad Labem",
    description: "Obor Informační technologie. Získání silných základů v algoritmizaci a počítačových sítích.",
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
    if (latest >= 0.98) setIsActive(true);
    else setIsActive(false);
  });

  return (
    <motion.div 
      ref={ref}
      className="relative pl-10 md:pl-16"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
        <div className={`absolute left-0 top-1.5 rounded-full transition-all duration-300 ${isActive ? 'h-3 w-3 bg-black' : 'h-3 w-3 bg-white border border-gray-200'}`} />
        
        <div className="flex flex-col mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                {event.year}
            </span>
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                {event.title}
            </h4>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed font-medium">
            {event.description}
        </p>
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
    <div className="w-full max-w-2xl mb-32 mx-auto relative pt-32" ref={ref}>
      <div className="flex flex-col items-center mb-20">
        <span className="section-label">Moje cesta</span>
      </div>
      
      <div className="relative ml-4 md:ml-8 space-y-16">
          <div className="absolute left-[5px] top-4 bottom-0 w-[1px] bg-gray-100"></div>
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[5px] top-4 w-[1px] bg-black origin-top z-0"
          />

          {timelineData.map((event, index) => (
             <TimelineItem key={index} event={event} />
          ))}
      </div>
    </div>
  );
}