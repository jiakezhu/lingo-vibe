import Link from "next/link";
import { Earth, Languages } from "lucide-react";

export default function Home() {
  const languages = [
    { id: "en", name: "English", flag: "🇺🇸", color: "bg-blue-200" },
    { id: "es", name: "Spanish", flag: "🇪🇸", color: "bg-red-200" },
    { id: "fr", name: "French", flag: "🇫🇷", color: "bg-indigo-200" },
  ];

  return (
    <div className="p-6 flex flex-col min-h-full">
      <header className="mb-8 mt-4 flex items-center gap-2">
        <Earth size={32} className="stroke-[3px]" />
        <h1 className="text-3xl font-black tracking-tighter">LingoVibe</h1>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Languages className="stroke-[3px]" />
          Choose your vibe
        </h2>

        <div className="space-y-4">
          {languages.map((lang) => (
            <Link
              key={lang.id}
              href={`/learn?lang=${lang.id}`}
              className={`flex items-center p-4 rounded-xl neo-border neo-shadow ${lang.color} hover:-translate-y-1 active:translate-y-0 active:neo-shadow-sm active:shadow-[2px_2px_0px_#111827] transition-all`}
            >
              <span className="text-4xl mr-4">{lang.flag}</span>
              <span className="text-xl font-bold">{lang.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
