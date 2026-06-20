import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Petr Vorlíček — Fullstack Developer",
  description: "Portfolio fullstack vývojáře zaměřeného na čistý kód, rychlý výkon a minimalistický design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={dmSans.variable}>
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="jrZaX+nr9QVOLpCtGPlTYA"
          strategy="afterInteractive"
          async
        />
      </head>
      <body className={`${dmSans.className} bg-white text-black antialiased w-full overflow-x-hidden`}>
        <LanguageProvider>
          <a href="#home" className="skip-link">Skip to content</a>
          <ScrollProgress />
          <Navbar />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}