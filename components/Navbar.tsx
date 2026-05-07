"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Domů", path: "/#home" },
  { name: "Projekty", path: "/#projects" },
  { name: "O mně", path: "/#about" },
  { name: "Kontakt", path: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("/#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active hash based on scroll
      const sections = ['home', 'projects', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setActiveHash(`/#${section}`);
        }
      }
    };
    
    // Set initial hash
    if (window.location.hash) {
      setActiveHash(`/${window.location.hash}`);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out px-4 ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <motion.div 
            className="flex items-center justify-between w-full max-w-5xl rounded-full px-6 py-3 glass-panel"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        >
          {/* LOGO */}
          <a
            href="/#home"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              // @ts-ignore
              if (window.lenis) { window.lenis.scrollTo(0); }
              else { window.scrollTo({ top: 0, behavior: "smooth" }); }
              window.history.pushState(null, '', `/#home`);
            }}
            className="text-xl font-bold tracking-tighter text-gray-900 z-50 relative group cursor-pointer"
          >
            Vorel<span className="text-blue-500 group-hover:text-cyan-400 transition-colors">.</span>
          </a>

        {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const isActive = activeHash === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.path.replace("/#", "");
                    if (targetId === "home") {
                      // @ts-ignore
                      if (window.lenis) { window.lenis.scrollTo(0); }
                      else { window.scrollTo({ top: 0, behavior: "smooth" }); }
                      window.history.pushState(null, '', `/#home`);
                    } else {
                      const elem = document.getElementById(targetId);
                      if (elem) {
                        // @ts-ignore
                        if (window.lenis) { window.lenis.scrollTo(elem); }
                        else { elem.scrollIntoView({ behavior: "smooth" }); }
                        window.history.pushState(null, '', `/#${targetId}`);
                      }
                    }
                  }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                    isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-50/80 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* HAMBURGER (Mobil) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none z-50 relative rounded-full transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 7, backgroundColor: "#000" } : { rotate: 0, y: 0, backgroundColor: "currentColor" }} 
                className="w-full h-[2px] rounded-full origin-center transition-all bg-current"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-full h-[2px] rounded-full transition-all bg-current"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -7, backgroundColor: "#000" } : { rotate: 0, y: 0, backgroundColor: "currentColor" }} 
                className="w-full h-[2px] rounded-full origin-center transition-all bg-current"
              />
            </div>
          </button>
        </motion.div>

        {/* MOBILNÍ MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-20 left-4 right-4 glass-panel rounded-3xl p-6 md:hidden flex flex-col gap-4 shadow-2xl border-white/60"
            >
                {navItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const targetId = item.path.replace("/#", "");
                      if (targetId === "home") {
                        // @ts-ignore
                        if (window.lenis) { window.lenis.scrollTo(0); }
                        else { window.scrollTo({ top: 0, behavior: "smooth" }); }
                        window.history.pushState(null, '', `/#home`);
                      } else {
                        const elem = document.getElementById(targetId);
                        if (elem) {
                          // @ts-ignore
                          if (window.lenis) { window.lenis.scrollTo(elem); }
                          else { elem.scrollIntoView({ behavior: "smooth" }); }
                          window.history.pushState(null, '', `/#${targetId}`);
                        }
                      }
                    }}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors p-3 rounded-2xl hover:bg-white/50 cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
                
                <div className="pt-4 mt-2 border-t border-gray-200/50 flex gap-4 px-3">
                     <a href="https://github.com/PetrVorlos35" target="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub Profile
                     </a>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Backdrop overlay pro rozostření celého webu za menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-white/20 z-40 md:hidden backdrop-blur-sm"
            />
        )}
      </AnimatePresence>
    </>
  );
}