"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon } from "./Icons";

const navItems = [
  { name: "Projekty", path: "/#projects" },
  { name: "O mně", path: "/#about" },
  { name: "Kontakt", path: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = path.replace("/#", "");
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    window.history.pushState(null, "", path);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* LOGO */}
          <a
            href="/#home"
            onClick={(e) => scrollTo(e, "/#home")}
            className="text-base font-medium text-black tracking-tight"
          >
            Vorlos
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => scrollTo(e, item.path)}
                className="text-sm text-gray-500 hover:text-black transition-colors duration-200 link-hover cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://github.com/PetrVorlos35"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center gap-1.5"
            >
              GitHub <ArrowIcon size={14} />
            </a>
          </nav>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 group"
            aria-label="Menu"
          >
            <span className={`w-full h-px bg-black transition-all origin-center duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-full h-px bg-black transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-start justify-center px-10"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => scrollTo(e, item.path)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-4xl font-light text-black cursor-pointer"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="https://github.com/PetrVorlos35"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
                className="text-2xl font-light text-gray-400"
              >
                GitHub ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}