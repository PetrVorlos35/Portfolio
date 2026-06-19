import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <FeaturedProjects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}