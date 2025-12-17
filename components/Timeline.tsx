"use client";
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2025 - Současnost",
    title: "Vysoká škola ekonomická v Praze",
    description: "Fakulta informatiky a statistiky (FIS), obor Aplikovaná informatika. Zaměření na softwarové inženýrství a datovou analytiku.",
    active: true,
  },
  {
    year: "2024",
    title: "Maturitní projekt: Journeo",
    description: "Moderní cestovatelská aplikace pro plánování itinerářů. Využití Next.js a Tailwind CSS pro frontend, integrace mapových podkladů a práce s externími API. Důraz na UX a responzivitu.",
    active: false,
  },
  {
    year: "2023",
    title: "Ročníkový projekt: NBA Guessing Game",
    description: "Interaktivní webová hra inspirovaná Wordle. Uživatel hádá hráče NBA na základě indicií. Implementace kompletní herní logiky, filtrování dat a validace vstupů. Můj první projekt s pokročilejším JavaScriptem.",
    active: false,
  },
  {
    year: "2021 - 2025",
    title: "SPŠ Ústí nad Labem",
    description: "Obor Informační technologie. Získání silných základů v algoritmizaci, počítačových sítích a hardwaru. Zakončeno maturitou.",
    active: false,
  },
];

export default function Timeline() {
  return (
    <div className="w-full max-w-2xl mb-24 mx-auto">
      {/* Nadpis se může objevit klasicky hned */}
      <h3 className="text-sm text-gray-400 font-medium mb-8 uppercase tracking-wider text-center">
          Moje cesta
      </h3>
      
      <div className="relative border-l border-gray-200 ml-4 md:ml-0 space-y-12">
          {timelineData.map((event, index) => (
              <motion.div 
                key={index} 
                className="relative pl-8 md:pl-12"
                // ANIMACE PRO KAŽDÝ BOD ZVLÁŠŤ:
                initial={{ opacity: 0, x: -20 }} // Přijede jemně zleva (od čáry)
                whileInView={{ opacity: 1, x: 0 }} // Jakmile je vidět, srovná se
                viewport={{ once: true, margin: "-100px" }} // Spustí se, až když je bod kousek v záběru
                transition={{ duration: 0.5, delay: 0.1 }} // Krátké zpoždění pro plynulost
              >
                  {/* Tečka na ose */}
                  <div className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-white ${event.active ? 'bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]' : 'bg-gray-300'}`}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h4 className={`text-lg font-bold ${event.active ? 'text-gray-900' : 'text-gray-700'}`}>
                          {event.title}
                      </h4>
                      <span className="text-sm font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          {event.year}
                      </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                      {event.description}
                  </p>
              </motion.div>
          ))}
      </div>
    </div>
  );
}