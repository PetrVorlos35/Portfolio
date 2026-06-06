"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const timeline = [
    {
      num: "01",
      period: t.about.path1Period,
      title: t.about.path1Title,
      sub: t.about.path1Sub,
    },
    {
      num: "02",
      period: t.about.path2Period,
      title: t.about.path2Title,
      sub: t.about.path2Sub,
    },
    {
      num: "03",
      period: t.about.path3Period,
      title: t.about.path3Title,
      sub: t.about.path3Sub,
    },
  ];

  const skills = [
    { label: t.about.frontend, items: ["Next.js", "Vite.js", "React", "JavaScript", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { label: t.about.backend, items: ["Node.js", "PostgreSQL", "MariaDB", "REST API"] },
    { label: t.about.tools, items: ["Git", "Vercel", "Figma", "VS Code"] }
  ];

  return (
    <section id="about" className="py-32 max-w-6xl mx-auto px-6 md:px-10">
      <div className="divider mb-20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* LEFT: Bio & Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{t.about.label}</p>
          <h2 className="display-sm font-light text-black mb-10">{t.about.title}</h2>
          <p className="text-gray-500 leading-relaxed mb-6 text-base">
            {t.about.bio1}
          </p>
          <p className="text-gray-500 leading-relaxed text-base mb-12">
            {t.about.bio2}
          </p>

          {/* Skills */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{t.about.techLabel}</p>
            <div className="space-y-6">
              {skills.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] mb-3">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <span key={s} className="text-xs text-gray-600 border border-gray-200 bg-white px-3 py-1.5 rounded-full hover:border-black hover:bg-black hover:text-white hover:shadow-sm cursor-default transition-all duration-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{t.about.pathLabel}</p>
          <div className="relative pl-4 md:pl-6 border-l border-gray-100 ml-2">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative flex gap-5 py-6 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="absolute -left-[21px] md:-left-[29px] top-8 w-2.5 h-2.5 rounded-full bg-white border border-gray-300 group-hover:bg-black group-hover:border-black group-hover:scale-125 transition-all duration-300" />
                <span className="text-xs text-gray-300 font-mono mt-1 w-6 shrink-0 group-hover:text-black transition-colors duration-300">{item.num}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-medium text-black">{item.title}</h3>
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">{item.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
