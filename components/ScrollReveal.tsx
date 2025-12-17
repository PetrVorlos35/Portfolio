"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ScrollReveal({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Začíná neviditelný a o 50px níže
      whileInView={{ opacity: 1, y: 0 }} // Jakmile je v okně, vyjede nahoru
      viewport={{ once: true, margin: "-100px" }} // "once: true" znamená, že se to animuje jen jednou (nebliká to při scrollování nahoru/dolů)
      transition={{ duration: 0.8, ease: "easeOut" }} // Pomalý, hladký dojezd
    >
      {children}
    </motion.div>
  );
}