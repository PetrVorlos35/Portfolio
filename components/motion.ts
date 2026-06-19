"use client";

import { useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal-on-scroll props that respect `prefers-reduced-motion`.
 * When the user opts out of motion, returns no animation props so the
 * element renders in its final, visible state (never hidden behind a
 * transition that may not fire on headless renders or background tabs).
 */
export function useReveal() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay, ease: EASE },
        };
}
