"use client";
import { motion, Variants } from "framer-motion";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Git",
  "Framer Motion"
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const item: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
};

export default function TechStack() {
  return (
    <div className="w-full max-w-4xl pt-10 pb-24 mx-auto text-center">
      <h3 className="text-sm text-blue-600 font-bold uppercase tracking-[0.2em] mb-10 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm inline-block">
        Tech Stack
      </h3>
      
      {/* Flex container - zarovná tagy přirozeně vedle sebe */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-50px", once: true }}
        className="flex flex-wrap justify-center gap-4"
      >
        {technologies.map((tech) => (
          <motion.div 
            key={tech}
            variants={item}
            whileHover={{ y: -5, scale: 1.05 }}
            className="px-6 py-3 rounded-xl glass-panel text-[15px] text-gray-700 font-semibold cursor-default hover:text-gray-900 transition-colors"
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}