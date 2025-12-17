"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Journeo",
    category: "Cestovatelská Aplikace",
    description: "Komplexní nástroj pro plánování cest. Uživatelé mohou vytvářet itineráře, sdílet je s přáteli a využívat interaktivní mapy. Zaměřeno na maximální UX a rychlost načítání.",
    techs: ["Next.js", "Tailwind CSS", "Mapbox API", "PostgreSQL"],
    image: "/images/journeo.png", // Nezapomeň mít obrázek v public/images
    link: "https://github.com/PetrVorlos35/Journeo",
    liveLink: "#", // Pokud máš live demo, dej ho sem
    align: "left", // Obrázek vlevo
  },
  {
    title: "NBA Guessing Game",
    category: "Interaktivní Hra",
    description: "Webová hra inspirovaná Wordle. Logika postavená na porovnávání statistik hráčů v reálném čase. Obsahuje databázi stovek hráčů a denní výzvy.",
    techs: ["React", "TypeScript", "Game Logic", "API Integration"],
    image: "/images/nba.png", 
    link: "https://github.com/PetrVorlos35/Projekt2023-24",
    liveLink: "#",
    align: "right", // Obrázek vpravo
  },
];

export default function FeaturedProjects() {
  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4">
      <h3 className="text-sm text-gray-400 font-medium mb-16 uppercase tracking-wider text-center">
        Vybrané projekty
      </h3>

      <div className="flex flex-col gap-24">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${project.align === "right" ? "lg:flex-row-reverse" : ""}`}
          >
            
            {/* 1. OBRÁZEK (Velký a dominantní) */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-lg group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay při hoveru */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
            </div>

            {/* 2. TEXTY */}
            <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-blue-600 font-medium text-sm mb-2 bg-blue-50 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {project.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tagy */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {project.techs.map((tech) => (
                  <span key={tech} className="text-xs font-mono text-gray-500 border border-gray-200 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Tlačítka */}
              <div className="flex gap-4">
                <Link 
                  href={project.link}
                  target="_blank"
                  className="flex items-center gap-2 text-gray-900 font-medium hover:text-blue-600 transition-colors border-b border-black hover:border-blue-600 pb-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub Code
                </Link>
                {/* Pokud nemáš live demo, tohle schovej nebo smaž */}
                {/* <Link href={project.liveLink} className="...">Live Demo</Link> */}
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}