"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowIcon } from "./Icons";
import Footer from "./Footer";
import { caseStudies } from "@/content/caseStudies";

export default function CaseStudyView({ slug }: { slug: string }) {
  const { t, language } = useLanguage();

  // Hide the hero image gracefully if the screenshot asset is missing, so the
  // page never ships a broken image.
  const [heroFailed, setHeroFailed] = useState(false);

  const study = caseStudies[slug];
  const c = study[language];

  // The other case study, for the "next" link at the bottom.
  const otherSlug = Object.keys(caseStudies).find((s) => s !== slug);
  const other = otherSlug ? caseStudies[otherSlug] : null;

  // Highlight the section currently in view in the side table of contents.
  const [activeSection, setActiveSection] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [slug, language]);

  return (
    <main className="w-full">
      {/* Sticky table of contents, shown only where the gutter is wide enough. */}
      <nav
        aria-label={t.caseStudy.onThisPage}
        className="fixed left-8 2xl:left-16 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
      >
        {c.sections.map((section, i) => (
          <a
            key={section.heading}
            href={`#s-${i}`}
            aria-current={activeSection === i ? "true" : undefined}
            className={`group flex items-center gap-2.5 text-xs transition-colors ${
              activeSection === i ? "text-accent-ink" : "text-gray-500 hover:text-black"
            }`}
          >
            <span
              className={`h-px transition-all duration-300 ${
                activeSection === i
                  ? "w-6 bg-accent"
                  : "w-3 bg-gray-300 group-hover:w-5 group-hover:bg-gray-500"
              }`}
            />
            {section.heading}
          </a>
        ))}
      </nav>

      <article className="pt-32 md:pt-40 pb-24 max-w-4xl mx-auto px-6 md:px-10">
        {/* Back link */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-12"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowIcon size={13} className="rotate-[225deg]" />
          </span>
          {t.caseStudy.back}
        </Link>

        {/* Header rendered static (no reveal) so the most important content is
            present immediately and the page doesn't open on a uniform fade. */}
        <header>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-5">
            {c.category} · {study.year}
          </p>
          <h1 className="display font-light text-black mb-8">{c.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed text-balance max-w-[34ch] mb-10">
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
                <span className="sr-only">{t.caseStudy.newTab}</span>
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
              <span className="sr-only">{t.caseStudy.newTab}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon size={12} />
              </span>
            </a>
          </div>
        </header>

        {/* Hero image showing the actual product. Rendered visible by default
            (no reveal gating): it's the proof the whole page rests on, so it
            must never depend on a scroll/observer firing. h-auto keeps any
            screenshot ratio undistorted; width/height limit layout shift. */}
        {study.hero && !heroFailed && (
          <img
            src={study.hero}
            alt={`${c.title}: ${t.caseStudy.screenshotAlt}`}
            width={1600}
            height={1000}
            onError={() => setHeroFailed(true)}
            className="mt-14 w-full h-auto rounded-xl border border-gray-200 shadow-sm"
          />
        )}

        <div className="divider my-16" />

        {/* Meta: role + stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <div>
            <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-3">
              {t.caseStudy.role}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{c.role}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-3">
              {t.caseStudy.stack}
            </p>
            <div className="space-y-3">
              {c.stack.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-gray-500 uppercase tracking-[0.15em] w-20 shrink-0">
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
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {c.sections.map((section, i) => (
            <section
              key={section.heading}
              id={`s-${i}`}
              data-section
              data-index={i}
              className="scroll-mt-28"
            >
              <h2 className="text-xl md:text-2xl font-light text-black mb-5">
                {section.heading}
              </h2>
              {section.body && (
                <p className="text-base text-gray-600 leading-relaxed text-pretty max-w-[68ch]">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="space-y-3 max-w-[68ch]">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-base text-gray-600 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
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
                <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-2">
                  {t.projects.caseStudy}
                </p>
                <p className="text-2xl md:text-3xl font-light text-black transition-all duration-300 group-hover:text-accent-ink group-hover:translate-x-1 group-focus-visible:text-accent-ink group-focus-visible:translate-x-1">
                  {other[language].title}
                </p>
              </div>
              <span className="text-gray-400 transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink">
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
