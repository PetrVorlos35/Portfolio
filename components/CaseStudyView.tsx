"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";
import { ArrowIcon } from "./Icons";
import Footer from "./Footer";
import { caseStudies } from "@/content/caseStudies";

export default function CaseStudyView({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const reveal = useReveal();

  const study = caseStudies[slug];
  const c = study[language];

  // The other case study, for the "next" link at the bottom.
  const otherSlug = Object.keys(caseStudies).find((s) => s !== slug);
  const other = otherSlug ? caseStudies[otherSlug] : null;

  return (
    <main className="w-full">
      <article className="pt-36 md:pt-44 pb-24 max-w-4xl mx-auto px-6 md:px-10">
        {/* Back link */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-14"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowIcon size={13} className="rotate-[225deg]" />
          </span>
          {t.caseStudy.back}
        </Link>

        {/* Header */}
        <motion.header {...reveal()}>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">
            {c.category} · {study.year}
          </p>
          <h1 className="display-sm font-light text-black mb-8">{c.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
            {c.tagline}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white bg-black border border-black px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                {t.caseStudy.viewLive}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowIcon size={12} />
                </span>
              </a>
            )}
            <a
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black border border-black/15 px-5 py-2.5 rounded-full hover:border-black/40 transition-colors"
            >
              {t.caseStudy.source}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon size={12} />
              </span>
            </a>
          </div>
        </motion.header>

        <div className="divider my-16" />

        {/* Meta: role + stack */}
        <motion.div
          {...reveal(0.05)}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20"
        >
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">
              {t.caseStudy.role}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{c.role}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">
              {t.caseStudy.stack}
            </p>
            <div className="space-y-3">
              {c.stack.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-[0.15em] w-20 shrink-0">
                    {group.label}
                  </span>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-gray-700 border border-gray-200 bg-white px-2.5 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-16">
          {c.sections.map((section, i) => (
            <motion.section key={section.heading} {...reveal(i * 0.04)}>
              <h2 className="text-xl md:text-2xl font-light text-black mb-5">
                {section.heading}
              </h2>
              {section.body && (
                <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="space-y-3 max-w-2xl">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-base text-gray-600 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Next case study */}
        {other && (
          <>
            <div className="divider mt-20 mb-10" />
            <Link
              href={`/projects/${other.slug}`}
              className="group flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">
                  {t.projects.caseStudy}
                </p>
                <p className="text-2xl md:text-3xl font-light text-black group-hover:text-accent-ink group-hover:translate-x-1 transition-all duration-300">
                  {other[language].title}
                </p>
              </div>
              <span className="text-gray-400 group-hover:text-accent-ink transition-colors">
                <ArrowIcon size={18} />
              </span>
            </Link>
          </>
        )}
      </article>

      <Footer />
    </main>
  );
}
