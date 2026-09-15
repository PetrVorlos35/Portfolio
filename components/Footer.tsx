"use client";

import Link from "next/link";
import { ArrowIcon } from "./Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="max-w-6xl mx-auto px-6 md:px-10 py-10 border-t border-gray-200 print:hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Petr Vorlíček
            </p>
            <div className="flex gap-4">
                <a href="https://github.com/PetrVorlos35" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap">
                  GitHub <ArrowIcon size={10} className="shrink-0" />
                </a>
                <a href="https://instagram.com/petr.vorel35" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap">
                  Instagram <ArrowIcon size={10} className="shrink-0" />
                </a>
                <Link href="/cv" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap">
                  {t.footer.cv} <ArrowIcon size={10} className="shrink-0" />
                </Link>
            </div>
        </div>
        <p className="text-xs text-gray-500">
          Built with Next.js & Framer Motion
        </p>
      </div>
    </footer>
  );
}
