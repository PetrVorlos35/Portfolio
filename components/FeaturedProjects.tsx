"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";

const PREVIEW_EASE = [0.16, 1, 0.3, 1] as const;

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const reveal = useReveal();
  const reduce = useReducedMotion();

  // Floating preview that follows the cursor on desktop. Hidden entirely if
  // the screenshot asset is missing (onError), so nothing ever ships broken.
  const [preview, setPreview] = useState<{ src: string; x: number; y: number } | null>(null);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const markFailed = (src: string) => setFailed((f) => ({ ...f, [src]: true }));

  return (
    <section
      id="projects"
      className="pt-24 pb-32 max-w-6xl mx-auto px-6 md:px-10"
      onMouseMove={(e) =>
        setPreview((p) => (p ? { ...p, x: e.clientX, y: e.clientY } : p))
      }
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{t.projects.label}</p>
          <h2 className="display-sm font-light text-black">{t.projects.title}</h2>
        </div>
        <p className="hidden md:block text-sm text-gray-500">
          {t.projects.count.replace("{count}", t.projects.items.length.toString())}
        </p>
      </div>

      {/* Project list */}
      <div>
        {t.projects.items.map((project, i) => {
          const href = project.live || project.link;
          const showThumb = project.image && !failed[project.image];
          return (
            <motion.div
              key={i}
              className="project-row"
              {...reveal(i * 0.1)}
              onMouseEnter={(e) => {
                if (showThumb) setPreview({ src: project.image!, x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setPreview(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between py-10 gap-4 group">
                {/* Left */}
                <div className="flex items-start md:items-center gap-6 md:gap-10">
                  <span className="text-xs text-gray-400 font-mono mt-1 md:mt-0 w-6 shrink-0 group-hover:text-accent-ink transition-colors duration-300">
                    {project.num}
                  </span>
                  <div>
                    {/* Mobile thumbnail */}
                    {showThumb && (
                      <img
                        src={project.image}
                        alt=""
                        loading="lazy"
                        onError={() => markFailed(project.image!)}
                        className="md:hidden mb-3 w-full max-w-xs aspect-[4/3] object-cover rounded-lg border border-gray-200"
                      />
                    )}
                    <h3 className="text-2xl md:text-4xl font-light text-black">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group-hover:translate-x-2 transition-transform duration-500 ease-out hover:text-accent-ink focus-visible:text-accent-ink"
                      >
                        {project.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 md:hidden">{project.description}</p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center flex-wrap gap-x-4 gap-y-3 md:gap-8 lg:gap-12 ml-12 md:ml-0 mt-3 md:mt-0">
                  <div className="hidden md:flex gap-2 flex-wrap justify-end">
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
                        className="group/link text-[10px] uppercase tracking-widest text-black/60 hover:text-black transition-colors flex items-center gap-1.5 border border-black/10 px-3 py-1 rounded-full hover:border-black/30"
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
                        className="group/link text-[10px] uppercase tracking-widest text-black/70 hover:text-white transition-colors flex items-center gap-1.5 border border-black/10 px-3 py-1 rounded-full hover:border-black bg-black/5 hover:bg-black"
                      >
                        Live
                        <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                          <ArrowIcon size={10} />
                        </span>
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-gray-500 font-mono hidden lg:block">{project.category}</span>
                    <span className="text-xs text-gray-400 font-mono">{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating cursor-follow preview (desktop, pointer devices only) */}
      <AnimatePresence>
        {preview && !reduce && (
          <motion.div
            key={preview.src}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: PREVIEW_EASE }}
            style={{ left: preview.x, top: preview.y }}
            className="pointer-events-none fixed z-40 hidden md:block"
          >
            <div className="w-80 aspect-[4/3] -translate-y-1/2 translate-x-7 rounded-xl overflow-hidden border border-gray-200 shadow-2xl shadow-black/10 bg-white">
              <img
                src={preview.src}
                alt=""
                onError={() => {
                  markFailed(preview.src);
                  setPreview(null);
                }}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
