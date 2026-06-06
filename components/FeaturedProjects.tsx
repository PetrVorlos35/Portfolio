"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-32 max-w-6xl mx-auto px-6 md:px-10">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">{t.projects.label}</p>
          <h2 className="display-sm font-light text-black">{t.projects.title}</h2>
        </div>
        <p className="hidden md:block text-sm text-gray-400">
          {t.projects.count.replace("{count}", t.projects.items.length.toString())}
        </p>
      </div>

      {/* Project list */}
      <div>
        {t.projects.items.map((project, i) => (
          <motion.div
            key={i}
            className="project-row active:scale-[0.99] origin-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between py-10 gap-4 group cursor-pointer">
              {/* Left */}
              <div className="flex items-start md:items-center gap-6 md:gap-10">
                <span className="text-xs text-gray-300 font-mono mt-1 md:mt-0 w-6 shrink-0">
                  {project.num}
                </span>
                <div>
                  <h3 className="text-2xl md:text-4xl font-light text-black group-hover:translate-x-2 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 md:hidden">{project.description}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center flex-wrap gap-x-4 gap-y-3 md:gap-8 lg:gap-12 ml-12 md:ml-0 mt-3 md:mt-0">
                <div className="hidden md:flex gap-2 flex-wrap justify-end opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  {project.techs.map((tech) => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full bg-white/50">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link text-[10px] uppercase tracking-widest text-black/50 hover:text-black transition-colors flex items-center gap-1.5 border border-black/10 px-3 py-1 rounded-full hover:border-black/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub 
                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        <ArrowIcon size={10} />
                      </span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link text-[10px] uppercase tracking-widest text-black/50 hover:text-black transition-colors flex items-center gap-1.5 border border-black/10 px-3 py-1 rounded-full hover:border-black/30 bg-black/5 hover:bg-transparent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live 
                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        <ArrowIcon size={10} />
                      </span>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-gray-400 font-mono hidden lg:block">{project.category}</span>
                  <span className="text-xs text-gray-300 font-mono">{project.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}