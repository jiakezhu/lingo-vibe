import Link from "next/link";
import { Globe, Sparkles } from "lucide-react";

export default function Home() {
  const languages = [
    { id: "en", name: "English", flag: "🇺🇸", desc: "Slang, idioms & culture", gradient: "from-blue-500/20 to-blue-600/5", accent: "text-blue-400", ring: "ring-blue-500/20" },
    { id: "es", name: "Spanish", flag: "🇪🇸", desc: "Vibes, jerga & expresiones", gradient: "from-rose-500/20 to-rose-600/5", accent: "text-rose-400", ring: "ring-rose-500/20" },
    { id: "fr", name: "French", flag: "🇫🇷", desc: "Argot, nuances & registres", gradient: "from-violet-500/20 to-violet-600/5", accent: "text-violet-400", ring: "ring-violet-500/20" },
  ];

  return (
    <div className="relative z-10 p-6 flex flex-col min-h-full">
      <header className="mb-10 mt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <Globe size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">LingoVibe</h1>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
          Decode the cultural <em className="text-violet-400 not-italic font-medium">vibe</em> behind every word. Trilingual context in real time.
        </p>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={18} className="text-violet-400" />
          <h2 className="text-lg font-semibold text-gray-200">Choose a language</h2>
        </div>

        <div className="space-y-3">
          {languages.map((lang, i) => (
            <Link
              key={lang.id}
              href={`/learn?lang=${lang.id}`}
              className={`group relative flex items-center p-5 rounded-2xl bg-gradient-to-r ${lang.gradient} border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">{lang.flag}</span>
              <div className="flex-1">
                <span className="text-lg font-semibold text-white block">{lang.name}</span>
                <span className={`text-xs ${lang.accent} opacity-80`}>{lang.desc}</span>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </Link>
          ))}
        </div>
      </div>

      <footer className="mt-auto pt-8 pb-2 text-center">
        <p className="text-xs text-gray-600">Powered by Gemini AI · Built by Jack</p>
      </footer>
    </div>
  );
}
