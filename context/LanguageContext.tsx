"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cs } from "@/locales/cs";
import { en } from "@/locales/en";

export type Language = "cs" | "en";
export type Dictionary = typeof cs;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("cs");
  const [mounted, setMounted] = useState(false);

  // Detect the language once on mount. This must run in an effect (not a lazy
  // initializer) so SSR and the first client render both default to "cs". The
  // `mounted` gate below hides content until detection completes, avoiding both
  // a hydration mismatch and a flash of the wrong language.
  /* eslint-disable react-hooks/set-state-in-effect -- intentional one-time mount detection (see note above) */
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "cs" || savedLang === "en")) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "en") {
        setLanguage("en");
      }
    }
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Keep <html lang> in sync so screen readers and search engines read the
  // active language (the site is fully bilingual, not just Czech).
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = language === "cs" ? cs : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {/* Vykreslujeme děti i před mountem pro SSR, výchozí jazyk je CS */}
      <div className={!mounted ? "invisible opacity-0" : "visible opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
