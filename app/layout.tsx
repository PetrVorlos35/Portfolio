import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";

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
      <body className={`${dmSans.className} bg-white text-black antialiased w-full overflow-x-hidden`}>
        <ScrollProgress />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}