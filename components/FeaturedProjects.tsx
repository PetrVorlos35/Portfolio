"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const projects = [
  {
    title: "Journeo",
    category: "Cestovatelská Aplikace",
    description: "Komplexní nástroj pro plánování cest. Uživatelé mohou vytvářet itineráře, sdílet je s přáteli a využívat interaktivní mapy. Zaměřeno na maximální UX a rychlost načítání.",
    techs: ["Next.js", "Tailwind CSS", "Mapbox API", "PostgreSQL"],
    image: "/images/journeo.png",
    link: "https://github.com/PetrVorlos35/Journeo",
    align: "left",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "NBA Guessing Game",
    category: "Interaktivní Hra",
    description: "Webová hra inspirovaná Wordle. Logika postavená na porovnávání statistik hráčů v reálném čase. Obsahuje databázi stovek hráčů a denní výzvy.",
    techs: ["React", "TypeScript", "Game Logic", "API Integration"],
    image: "/images/nba.png", 
    link: "https://github.com/PetrVorlos35/Projekt2023-24",
    align: "right",
    color: "from-purple-500/20 to-pink-500/20"
  },
];

// Reusable Tilt Image Component
const TiltImage = ({ src, alt, color }: { src: string, alt: string, color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className="relative w-full aspect-[16/10] rounded-3xl z-10 cursor-pointer group"
    >
        {/* Glow effect behind */}
        <div className={`absolute -inset-4 bg-gradient-to-r ${color} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-10`} />
        
        <div className="absolute inset-0 rounded-3xl overflow-hidden glass-panel border-white/50 p-2 shadow-xl bg-white/40">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 border border-black/5">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
        </div>
    </motion.div>
  )
}

export default function FeaturedProjects() {
  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-4">
      <div className="flex flex-col items-center mb-24">
        <h3 className="text-sm text-cyan-600 font-bold uppercase tracking-[0.2em] mb-2 bg-cyan-50 px-4 py-1.5 rounded-full border border-cyan-100 shadow-sm">
            Vybrané projekty
        </h3>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight text-center">
            Případové Studie
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${project.align === "right" ? "lg:flex-row-reverse" : ""}`}
          >
            
            {/* 1. OBRÁZEK S TILT EFEKTEM */}
            <div className="w-full lg:w-3/5" style={{ perspective: 1000 }}>
              <TiltImage src={project.image} alt={project.title} color={project.color} />
            </div>

            {/* 2. TEXTY */}
            <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
              <span className="text-blue-600 font-bold text-xs mb-4 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                {project.category}
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-none">
                {project.title}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg font-light">
                {project.description}
              </p>

              {/* Tagy */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-10">
                {project.techs.map((tech) => (
                  <span key={tech} className="text-sm font-medium text-gray-600 glass-panel px-4 py-1.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Tlačítka */}
              <div className="flex gap-4">
                <Link 
                  href={project.link}
                  target="_blank"
                  className="group relative flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="relative z-10">GitHub Kód</span>
                </Link>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}