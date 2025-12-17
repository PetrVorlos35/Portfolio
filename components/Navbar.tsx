"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Domů", path: "/#home" },
  { name: "Projekty", path: "/#projects" },
  { name: "O mně", path: "/#about" },
  { name: "Kontakt", path: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        {/* ZMĚNA: px-4 místo px-6 (pro srovnání s mobilem) a max-w-5xl (pro srovnání s desktopem) */}
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between relative">
          
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 z-50 relative" onClick={() => setIsOpen(false)}>
            Vorel<span className="text-blue-600">.</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* HAMBURGER (Mobil) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 -mr-2 text-gray-600 focus:outline-none z-50 relative"
            aria-label="Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 9, backgroundColor: "#000" } : { rotate: 0, y: 0, backgroundColor: "currentColor" }} 
                className="w-full h-0.5 rounded-full origin-center transition-all"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-full h-0.5 bg-current rounded-full transition-all"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -9, backgroundColor: "#000" } : { rotate: 0, y: 0, backgroundColor: "currentColor" }} 
                className="w-full h-0.5 rounded-full origin-center transition-all"
              />
            </div>
          </button>
        </div>

        {/* MOBILNÍ MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl md:hidden"
            >
              {/* Zde taky px-4 a max-w-5xl aby to lícovalo */}
              <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors block"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-6 border-t border-gray-100 flex gap-4">
                     <a href="https://github.com/PetrVorlos35" target="_blank" className="text-sm text-gray-400">GitHub</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
      
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            />
        )}
      </AnimatePresence>
    </>
  );
}