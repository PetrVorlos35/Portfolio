export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 py-8 mt-20 text-center">
      <div className="text-sm text-gray-400">
        <p className="mb-2">© {new Date().getFullYear()} Petr Vorlíček. Všechna práva vyhrazena.</p>
        <p className="text-xs">
            Built with <span className="text-gray-900 font-medium">Next.js</span> & <span className="text-gray-900 font-medium">Tailwind</span>.
        </p>
      </div>
    </footer>
  );
}