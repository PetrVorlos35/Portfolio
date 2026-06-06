"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl py-4 shadow-sm shadow-gray-100" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-lg font-medium text-black active:scale-[0.98] transition-transform"
          >
            PV.
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm transition-colors active:scale-[0.98] ${
                  activeSection === link.id ? "text-black" : "text-gray-400 hover:text-black"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setLanguage(language === "cs" ? "en" : "cs")}
              className="text-xs font-mono text-gray-400 hover:text-black transition-colors active:scale-[0.95]"
              aria-label="Toggle language"
            >
              {language === "cs" ? "EN" : "CZ"}
            </button>
            <a
              href="https://github.com/PetrVorlos35"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-black border border-black/10 px-4 py-2 rounded-full hover:border-black/30 hover:bg-black/5 transition-all active:scale-[0.98]"
            >
              GitHub 
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon size={12} />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black z-50 active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "Zavřít" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(link.id)}
                className={`text-2xl font-light active:scale-[0.98] transition-transform ${
                  activeSection === link.id ? "text-black" : "text-gray-400"
                }`}
              >
                {link.name}
              </motion.button>
            ))}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="flex items-center gap-6 mt-4"
            >
              <button
                onClick={() => setLanguage(language === "cs" ? "en" : "cs")}
                className="text-sm font-mono text-gray-500 hover:text-black transition-colors"
              >
                {language === "cs" ? "Switch to EN" : "Přepnout na CZ"}
              </button>
            </motion.div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="https://github.com/PetrVorlos35"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs uppercase tracking-widest text-black border border-black/10 px-6 py-3 rounded-full active:scale-[0.98] transition-transform"
            >
              GitHub
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}