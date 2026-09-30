"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";

// Pill links: taller on mobile for a comfortable touch target, compact on desktop.
const PILL =
  "group/link text-xs flex items-center gap-1.5 border px-3.5 py-2 md:px-3 md:py-1 rounded-full transition-colors";

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const reveal = useReveal();

  return (
    <section id="projects" className="pt-24 pb-24 md:pb-32 max-w-6xl mx-auto px-6 md:px-10">
      {/* Section header */}
      <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="label-accent text-sm font-mono text-gray-500 mb-3">{t.projects.label}</p>
          <h2 className="display-sm font-light text-black max-w-[16ch]">{t.projects.title}</h2>
        </div>
        <p className="hidden md:block text-sm text-gray-500 shrink-0">
          {t.projects.count.replace("{count}", t.projects.items.length.toString())}
        </p>
      </div>

      {/* Project list */}
      <div>
        {t.projects.items.map((project, i) => {
          const href = project.live || project.link;
          return (
            <motion.div key={i} className="project-row" {...reveal(i * 0.1)}>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 gap-5 md:gap-4 group">
                {/* Left */}
                <div className="flex items-center gap-10">
                  <span className="hidden md:block text-xs text-gray-500 font-mono w-6 shrink-0 group-hover:text-accent-ink transition-colors duration-300">
                    {project.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    {/* Mobile meta line: number · category ... year */}
                    <p className="md:hidden flex items-center gap-2 text-xs font-mono text-gray-500 mb-3">
                      <span>{project.num}</span>
                      <span aria-hidden>·</span>
                      <span>{project.category}</span>
                      <span className="ml-auto tabular-nums">{project.year}</span>
                    </p>
                    <h3 className="text-3xl md:text-4xl font-light text-black">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block md:group-hover:translate-x-2 transition-transform duration-500 ease-out hover:text-accent-ink focus-visible:text-accent-ink"
                      >
                        {project.title}
                      </a>
                    </h3>
                    <p className="md:hidden text-[15px] leading-relaxed text-gray-600 mt-3 text-pretty">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right side. On desktop this stays a single row when it fits;
                    if it doesn't, the tech-chip group drops to its own line as
                    a whole (never splitting mid-list) instead of individual
                    chips wrapping ragged. */}
                <div className="flex items-center flex-wrap md:justify-end gap-x-4 gap-y-3 md:gap-8 lg:gap-12">
                  <div className="hidden md:flex gap-2 flex-nowrap justify-end shrink-0">
                    {project.techs.map((tech) => (
                      <span key={tech} className="text-xs text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full bg-white/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {"slug" in project && project.slug && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className={`${PILL} text-accent-ink hover:text-white border-accent/30 bg-accent/5 hover:bg-accent hover:border-accent`}
                      >
                        {t.projects.caseStudy}
                        <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                          <ArrowIcon size={10} />
                        </span>
                      </Link>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${PILL} text-black/70 hover:text-black border-black/10 hover:border-black/30`}
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
                        className={`${PILL} text-black/80 hover:text-white border-black/10 hover:border-black bg-black/5 hover:bg-black`}
                      >
                        Live
                        <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                          <ArrowIcon size={10} />
                        </span>
                      </a>
                    )}
                  </div>
                  <div className="hidden md:flex items-center gap-4 shrink-0">
                    <span className="text-xs text-gray-500 font-mono hidden lg:block">{project.category}</span>
                    <span className="text-xs text-gray-500 font-mono tabular-nums">{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
