import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      {/* Pozadí stejné jako na Home */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-blue-100/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
      
      <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
        Tady nic není
      </h2>
      
      <p className="text-gray-500 mb-8 max-w-md">
        Stránka, kterou hledáš, neexistuje. Možná ses jen překlikl.
      </p>
    </div>
  );
}