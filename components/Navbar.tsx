"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const onHome = pathname === "/";
  const onCV = pathname === "/cv";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll behind the fullscreen mobile menu.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Section highlighting only applies on the home page. Re-run on route
    // changes so the observer re-attaches when navigating back from a sub-page.
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [onHome]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    // On a sub-page (e.g. a case study) there are no sections to scroll to,
    // so route home to the right anchor instead.
    if (!onHome) {
      router.push(id === "home" ? "/" : `/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }
  };

  const navLinks = [
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.about, id: "about" },
    { name: t.nav.contact, id: "contact" },
  ];

  // Active highlight is meaningful only on the home page.
  const effectiveActive = onHome ? activeSection : "";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
          scrolled ? "bg-white/80 backdrop-blur-xl py-4 shadow-sm shadow-gray-100" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-lg font-medium text-black active:scale-[0.98] transition-transform"
          >
            PV<span className="text-accent">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                aria-current={effectiveActive === link.id ? "true" : undefined}
                className={`text-sm transition-colors active:scale-[0.98] ${
                  effectiveActive === link.id ? "text-accent-ink font-medium" : "text-gray-500 hover:text-accent-ink"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setLanguage(language === "cs" ? "en" : "cs")}
              className="text-xs font-mono text-gray-500 hover:text-accent-ink transition-colors active:scale-[0.95]"
              aria-label={language === "cs" ? "Switch to English" : "Přepnout do češtiny"}
            >
              {language === "cs" ? "EN" : "CS"}
            </button>
            <a
              href="https://github.com/PetrVorlos35"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-accent-ink transition-colors"
            >
              GitHub
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon size={11} />
              </span>
            </a>
            <Link
              href="/cv"
              aria-current={onCV ? "page" : undefined}
              className="text-sm text-black border border-black/15 px-4 py-1.5 rounded-full hover:border-black hover:bg-black hover:text-white transition-colors active:scale-[0.98]"
            >
              {t.footer.cv}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-sm text-black z-50 -mr-2 px-2 py-2 active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
          >
            {mobileMenuOpen ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            <nav aria-label={t.nav.menu} className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(link.id)}
                  aria-current={effectiveActive === link.id ? "true" : undefined}
                  className={`flex items-baseline gap-4 py-3 text-left text-5xl font-light tracking-tight active:scale-[0.98] transition-transform ${
                    effectiveActive === link.id ? "text-accent-ink" : "text-black"
                  }`}
                >
                  <span className="text-xs font-mono text-gray-500 tracking-normal w-5">0{i + 1}</span>
                  {link.name}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-6 border-t border-gray-200 pt-6"
            >
              <Link
                href="/cv"
                onClick={() => setMobileMenuOpen(false)}
                aria-current={onCV ? "page" : undefined}
                className="flex items-center justify-center text-base text-white bg-black rounded-full py-3.5 active:scale-[0.98] transition-transform"
              >
                {t.footer.cv}
              </Link>
              <div className="flex items-center justify-between">
                <a
                  href="https://github.com/PetrVorlos35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 py-2 text-sm text-gray-600"
                >
                  GitHub <ArrowIcon size={11} />
                </a>
                <button
                  onClick={() => setLanguage(language === "cs" ? "en" : "cs")}
                  className="py-2 text-sm font-mono text-gray-600"
                >
                  {language === "cs" ? "Switch to EN" : "Přepnout na CS"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}