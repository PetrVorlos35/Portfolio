"use client";
import { motion } from "framer-motion";

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

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TechStack() {
  return (
    <motion.div variants={item} className="w-full max-w-3xl border-t border-gray-100 pt-10 pb-20 mx-auto text-center">
      <p className="text-xs text-gray-400 font-medium mb-8 uppercase tracking-widest">
        Tech Stack
      </p>
      
      {/* Flex container - zarovná tagy přirozeně vedle sebe */}
      <div className="flex flex-wrap justify-center gap-3">
        {technologies.map((tech) => (
          <span 
            key={tech} 
            className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-600 font-medium transition-all duration-300 hover:border-gray-900 hover:text-gray-900 cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}