import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vorel | Fullstack Developer",
  description: "Portfolio a ukázky práce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      {/* PŘIDÁNO: overflow-x-hidden a w-full */}
      <body className={`${inter.className} bg-white text-gray-900 antialiased w-full overflow-x-hidden`}>
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main className="w-full">
            {children}
        </main>
      </body>
    </html>
  );
}