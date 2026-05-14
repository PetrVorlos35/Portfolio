"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowIcon } from "./Icons";

const projects = [
  {
    num: "01",
    title: "Journeo rework",
    category: "Fullstack App",
    year: "2026",
    description: "Komplexní nástroj pro plánování cest s interaktivními mapami a sdílenými itineráři.",
    techs: ["Vite.js", "JavaScript", "TailwindCSS", "MariaDB"],
    link: "https://github.com/PetrVorlos35/Journeov2",
  },
  {
    num: "02",
    title: "Minimalist Portfolio",
    category: "Web / Design",
    year: "2026",
    description: "Redesign osobního portfolia se zaměřením na čistou typografii a vysoký výkon.",
    techs: ["Next.js", "TailwindCSS", "Framer Motion"],
    link: "https://github.com/PetrVorlos35/Portfolio",
  },
  {
    num: "03",
    title: "Journeo",
    category: "Fullstack App",
    year: "2025",
    description: "Komplexní nástroj pro plánování cest s interaktivními mapami a sdílenými itineráři.",
    techs: ["Vite.js", "JavaScript", "TailwindCSS", "Mapbox"],
    link: "https://github.com/PetrVorlos35/Journeo",
  },
  {
    num: "04",
    title: "NBA Guessing Game",
    category: "Game / Web App",
    year: "2023",
    description: "Interaktivní webová hra inspirovaná Wordle, postavená na datech NBA v reálném čase.",
    techs: ["Node.js", "JavaScript", "REST API"],
    link: "https://github.com/PetrVorlos35/Projekt2023-24",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-32 max-w-6xl mx-auto px-6 md:px-10">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Vybrané projekty</p>
          <h2 className="display-sm font-light text-black">Moje práce</h2>
        </div>
        <p className="hidden md:block text-sm text-gray-400">
          {projects.length} projekty
        </p>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="project-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={project.link}
              target="_blank"
              className="flex flex-col md:flex-row md:items-center justify-between py-10 gap-4 group"
            >
              {/* Left */}
              <div className="flex items-start md:items-center gap-6 md:gap-10">
                <span className="text-xs text-gray-300 font-mono mt-1 md:mt-0 w-6 shrink-0">
                  {project.num}
                </span>
                <div>
                  <h3 className="text-2xl md:text-4xl font-light text-black group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 md:hidden">{project.description}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-8 md:gap-12 ml-12 md:ml-0">
                <div className="hidden md:flex gap-2 flex-wrap justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.techs.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-mono shrink-0">{project.category}</span>
                <span className="text-xs text-gray-300 font-mono shrink-0">{project.year}</span>
                <span className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300 shrink-0">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}