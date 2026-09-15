"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "./motion";
import { ArrowIcon } from "./Icons";
import Contact from "./Contact";
import Footer from "./Footer";

const PHONE = "+420 604 852 743";
const EMAIL = "petr@vorlos.eu";

export default function CVView() {
  const { t, language } = useLanguage();
  const cvPdfHref = language === "en" ? "/petr-vorlicek-cv-en.pdf" : "/petr-vorlicek-cv.pdf";
  const cvPdfFilename = language === "en" ? "Petr-Vorlicek-CV-EN.pdf" : "Petr-Vorlicek-CV.pdf";
  const reveal = useReveal();

  const skills = [
    { label: t.cv.designUxLabel, items: t.cv.designUxItems },
    { label: t.cv.frontendTechLabel, items: t.cv.frontendTechItems },
    { label: t.cv.toolsWorkflowLabel, items: t.cv.toolsWorkflowItems },
    { label: t.cv.languagesLabel, items: t.cv.languageItems },
  ];

  const education = [
    { num: "01", period: t.about.path1Period, title: t.about.path1Title, sub: t.about.path1Sub },
    { num: "02", period: t.about.path2Period, title: t.about.path2Title, sub: t.about.path2Sub },
  ];

  return (
    <main className="w-full">
      <article className="pt-32 md:pt-40 pb-24 max-w-4xl mx-auto px-6 md:px-10">
        {/* Back link — not actionable on a printed page */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-12 print:hidden"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowIcon size={13} className="rotate-[225deg]" />
          </span>
          {t.cv.back}
        </Link>

        {/* Header rendered static (no reveal) so the most important content —
            who this is, availability, and the download CTA — is present the
            instant a recruiter's link opens, not after a fade-in. */}
        <header>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-5">{t.cv.label}</p>
          <h1 className="display font-light text-black mb-3">Petr Vorlíček</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-5">{t.cv.role}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-8">
            <span>{t.hero.location}</span>
            <span aria-hidden>·</span>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-black transition-colors">
              {PHONE}
            </a>
            <span aria-hidden>·</span>
            <a href={`mailto:${EMAIL}`} className="hover:text-black transition-colors">
              {EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="inline-flex items-center gap-2.5 text-xs md:text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {t.hero.available}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <a
              href={cvPdfHref}
              download={cvPdfFilename}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white bg-black border border-black px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              {t.cv.download}
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/70 hover:text-black border border-black/10 hover:border-black/30 px-5 py-2.5 rounded-full transition-colors"
            >
              {t.contact.label}
            </a>
          </div>
        </header>

        {/* Summary */}
        <motion.section {...reveal()} className="mt-20 max-w-2xl">
          <p className="text-gray-600 leading-relaxed mb-6 text-base">{t.cv.summary1}</p>
          <p className="text-gray-600 leading-relaxed text-base">{t.cv.summary2}</p>
        </motion.section>

        {/* Skills */}
        <motion.section {...reveal(0.1)} className="mt-20">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">{t.cv.skillsLabel}</p>
          <div className="space-y-6">
            {skills.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-gray-700 border border-gray-200 bg-white px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section {...reveal(0.15)} className="mt-20">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">{t.cv.education}</p>
          <div className="relative pl-4 md:pl-6 border-l border-gray-200 ml-2">
            {education.map((item) => (
              <div key={item.title} className="relative flex gap-5 py-6 group">
                <div className="absolute -left-[21px] md:-left-[29px] top-8 w-2.5 h-2.5 rounded-full bg-white border border-gray-300 group-hover:bg-accent group-hover:border-accent group-hover:scale-125 transition-all duration-300" />
                <span className="text-xs text-gray-400 font-mono mt-1 w-6 shrink-0 group-hover:text-accent-ink transition-colors duration-300">
                  {item.num}
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="text-base font-medium text-black">{item.title}</h3>
                    <span className="text-xs text-gray-600 font-mono whitespace-nowrap bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Selected projects — mirrors the curated write-up from the CV, not
            the full project list shown on the homepage. */}
        <motion.section {...reveal(0.2)} className="mt-20">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">{t.projects.label}</p>
          <div className="space-y-12">
            {t.cv.projects.map((project) => (
              <div key={project.title}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-medium text-black">{project.title}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    {"caseStudySlug" in project && project.caseStudySlug && (
                      <Link
                        href={`/projects/${project.caseStudySlug}?from=cv`}
                        className="text-[10px] uppercase tracking-widest text-accent-ink hover:text-white border border-accent/30 px-3 py-1 rounded-full bg-accent/5 hover:bg-accent hover:border-accent transition-colors"
                      >
                        {t.projects.caseStudy}
                      </Link>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link text-[10px] uppercase tracking-widest text-black/60 hover:text-black transition-colors flex items-center gap-1.5 border border-black/10 px-3 py-1 rounded-full hover:border-black/30"
                    >
                      {project.linkLabel}
                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        <ArrowIcon size={10} />
                      </span>
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{project.subtitle}</p>
                <ul className="space-y-2">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2.5">
                      <span className="text-gray-300 mt-[3px] shrink-0" aria-hidden>
                        —
                      </span>
                      <span>
                        {"label" in bullet && bullet.label && (
                          <strong className="font-medium text-black">{bullet.label}: </strong>
                        )}
                        {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
