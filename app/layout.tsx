import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorlos.eu";
const title = "Petr Vorlíček · Fullstack Developer";
const description =
  "Portfolio fullstack vývojáře zaměřeného na čistý kód, rychlý výkon a minimalistický design.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Petr Vorlíček",
    title,
    description,
    locale: "cs_CZ",
    // og:image is supplied by app/opengraph-image.tsx (file-based convention)
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // twitter:image is supplied by app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={dmSans.variable}>
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