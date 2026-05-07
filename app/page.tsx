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
    <div className="relative w-full flex flex-col items-center justify-center pt-32 pb-10 overflow-hidden bg-dot-pattern min-h-screen">
      
      {/* Background Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="w-full flex flex-col items-center relative z-10">
        
        {/* ID: HOME */}
        <section id="home" className="w-full px-4 max-w-4xl scroll-mt-32">
            <motion.div variants={heroContainer} initial="hidden" animate="show">
               <Hero />
            </motion.div>
        </section>

        {/* ID: PROJECTS */}
        <section id="projects" className="w-full scroll-mt-32">
            <FeaturedProjects />
        </section>

        {/* ID: ABOUT (Služby + Timeline + Tech) */}
        <section id="about" className="w-full scroll-mt-32 relative">
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
        <section id="contact" className="w-full px-4 scroll-mt-32">
            <ScrollReveal>
                <Contact />
            </ScrollReveal>
        </section>
        
        <Footer />

      </div>
    </div>
  );
}