export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 md:px-10 py-10 border-t border-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Petr Vorlíček
            </p>
            <div className="flex gap-4">
                <a href="https://github.com/PetrVorlos35" target="_blank" className="text-[10px] uppercase tracking-widest text-gray-300 hover:text-black transition-colors">GitHub</a>
                <a href="https://instagram.com/petr.vorel35" target="_blank" className="text-[10px] uppercase tracking-widest text-gray-300 hover:text-black transition-colors">Instagram</a>
            </div>
        </div>
        <p className="text-xs text-gray-300">
          Built with Next.js & Framer Motion
        </p>
      </div>
    </footer>
  );
}