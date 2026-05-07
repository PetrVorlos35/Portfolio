"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Jak dlouho trvá dojezd (vyšší = plynulejší)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing funkce
    });

    // @ts-ignore - expose to window for Navbar interception
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // @ts-ignore
      delete window.lenis;
      lenis.destroy();
    };
  }, []);

  return null; // Tato komponenta nic nevykresluje, jen mění chování
}