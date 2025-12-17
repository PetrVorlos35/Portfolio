"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const heroContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  return (
    // Přidali jsme pt-24, aby Hero nebylo schované pod Navbarem
    <div className="relative w-full flex flex-col items-center justify-center pt-24 overflow-hidden">
      
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-100/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="w-full flex flex-col items-center">
        
        {/* ID: HOME */}
        <section id="home" className="w-full px-4 max-w-4xl scroll-mt-32"> {/* scroll-mt (margin-top) zajistí, že sekce nebude nalepená pod navbarem když tam klikneš */}
            <motion.div variants={heroContainer} initial="hidden" animate="show">
            <Hero />
            </motion.div>
        </section>

        {/* ID: PROJECTS */}
        <section id="projects" className="w-full scroll-mt-24">
            <FeaturedProjects />
        </section>

        {/* ID: ABOUT (Služby + Timeline) */}
        <section id="about" className="w-full scroll-mt-24">
            <Services />
            
            <ScrollReveal>
                <div className="px-4">
                    <Timeline />
                </div>
            </ScrollReveal>

            <ScrollReveal>
            <div className="px-4">
                <TechStack />
            </div>
            </ScrollReveal>
        </section>

        {/* ID: CONTACT */}
        <section id="contact" className="w-full px-4 scroll-mt-24">
            <ScrollReveal>
                <Contact />
            </ScrollReveal>
        </section>
        
        <Footer />

      </div>
    </div>
  );
}