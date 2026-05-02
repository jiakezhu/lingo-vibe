"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Volume2, Send, Save, KeyRound, Sparkles, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface WordData {
    target_word: string;
    trilingual_map: { en: string; fr: string; es: string };
    chinese_def: string;
    two_slang_sentences: string[];
    vibe_check_note: string;
}

const SUGGESTIONS: Record<string, { words: string[]; label: string }> = {
    en: {
        words: ["vibe", "slay", "ghosting", "lowkey", "flex", "cap", "salty", "shade"],
        label: "Trending slang"
    },
    fr: {
        words: ["kiffer", "bof", "galère", "ouf", "meuf", "balec", "chanmé", "relou"],
        label: "Argot courant"
    },
    es: {
        words: ["mola", "currar", "flipar", "tío", "guay", "majo", "pasta", "quedada"],
        label: "Jerga popular"
    },
};

const LANG_INFO: Record<string, { flag: string; name: string; accent: string }> = {
    en: { flag: "🇺🇸", name: "English", accent: "text-blue-400" },
    fr: { flag: "🇫🇷", name: "French", accent: "text-violet-400" },
    es: { flag: "🇪🇸", name: "Spanish", accent: "text-rose-400" },
};

export default function ChatInterface() {
    const searchParams = useSearchParams();
    const lang = searchParams?.get("lang") || "en";

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WordData | null>(null);
    const [showKeyPrompt, setShowKeyPrompt] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [savedLocallyKey, setSavedLocallyKey] = useState("");

    const supabase = createClient();
    const langInfo = LANG_INFO[lang] || LANG_INFO.en;
    const suggestions = SUGGESTIONS[lang] || SUGGESTIONS.en;

    useEffect(() => {
        const key = localStorage.getItem("lingovibe_custom_key");
        if (key) setSavedLocallyKey(key);
    }, []);

    const playAudio = (text: string, langCode: string) => {
        if (!("speechSynthesis" in window)) return;
        const utterance = new SpeechSynthesisUtterance(text);
        if (langCode === "fr") utterance.lang = "fr-FR";
        else if (langCode === "es") utterance.lang = "es-ES";
        else utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    const handleSearch = async (word?: string) => {
        const searchWord = word || input;
        if (!searchWord.trim()) return;
        if (word) setInput(word);
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ word: searchWord, lang, customKey: savedLocallyKey })
            });

            if (res.status === 429) {
                setShowKeyPrompt(true);
                setLoading(false);
                return;
            }

            if (!res.ok) throw new Error("API Error");
            const data = await res.json();
            setResult(data);
        } catch (err) {
            alert("Error fetching data. Please try again.");
        }
        setLoading(false);
    };

    const saveCustomKey = () => {
        if (!apiKey) return;
        localStorage.setItem("lingovibe_custom_key", apiKey);
        setSavedLocallyKey(apiKey);
        setShowKeyPrompt(false);
    };

    const saveToNotebook = async () => {
        if (!result) return;
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            alert("Please login to save words to your notebook.");
            return;
        }

        const { error } = await supabase.from("saved_words").insert([
            { user_id: user.id, word: result.target_word, data: result, lang }
        ]);

        if (error) {
            alert(`Error saving: ${error.message}`);
        } else {
            alert("Saved to notebook! ✨");
        }
    };

    return (
        <div className="flex flex-col flex-1 gap-4 relative z-10">
            {/* Language Badge */}
            <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{langInfo.flag}</span>
                <span className={`text-sm font-semibold ${langInfo.accent}`}>{langInfo.name} Mode</span>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder={`Enter a word or phrase...`}
                    className="input-field flex-1"
                />
                <button
                    onClick={() => handleSearch()}
                    disabled={loading}
                    className="btn-primary !p-3 !rounded-xl flex items-center justify-center disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </div>

            {/* Rate Limit Prompt */}
            {showKeyPrompt && (
                <div className="glass-card p-5 border-rose-500/20 animate-fade-in-up">
                    <h3 className="font-bold text-base flex items-center gap-2 mb-2 text-rose-400">
                        <KeyRound size={18} /> Daily Limit Reached
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">Enter your Google Gemini API key to continue learning.</p>
                    <div className="flex gap-2">
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="input-field flex-1 text-sm"
                        />
                        <button onClick={saveCustomKey} className="btn-primary text-sm !px-4">Save</button>
                    </div>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex-1 flex flex-col justify-center items-center gap-3">
                    <div className="spinner" />
                    <p className="text-sm text-gray-500">Analyzing cultural context...</p>
                </div>
            )}

            {/* Empty / Idle State */}
            {!result && !loading && !showKeyPrompt && (
                <div className="flex-1 flex flex-col gap-5 animate-fade-in-up">
                    {/* How it works */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} className="text-violet-400" />
                            <h3 className="text-sm font-semibold text-gray-200">How it works</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { step: "1", text: "Enter any word or slang", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
                                { step: "2", text: "Get trilingual translations (EN · FR · ES)", color: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
                                { step: "3", text: "Discover cultural context & vibe", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
                            ].map(({ step, text, color }) => (
                                <div key={step} className="flex items-center gap-3">
                                    <span className={`w-7 h-7 rounded-lg ${color} border text-xs font-bold flex items-center justify-center flex-shrink-0`}>{step}</span>
                                    <span className="text-sm text-gray-400">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggested Words */}
                    <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-semibold mb-3">{suggestions.label}</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.words.map((word) => (
                                <button
                                    key={word}
                                    onClick={() => handleSearch(word)}
                                    className="group flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-gray-300 hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-violet-300 transition-all duration-200"
                                >
                                    {word}
                                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Fun Fact */}
                    <div className="mt-auto bg-gradient-to-br from-violet-500/[0.06] to-blue-500/[0.03] border border-violet-500/10 rounded-xl p-4">
                        <p className="text-xs text-gray-500 leading-relaxed">
                            <span className="text-violet-400 font-medium">💡 Did you know?</span> The same word can carry completely different cultural "vibes" across languages. LingoVibe uses AI to decode these hidden nuances in real time.
                        </p>
                    </div>
                </div>
            )}

            {/* Results */}
            {result && !loading && (
                <div className="flex-1 overflow-y-auto pb-4 space-y-4 animate-fade-in-up">
                    <div className="glass-card p-6">
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-white capitalize">{result.target_word}</h2>
                                <p className="text-base text-gray-400 mt-1">{result.chinese_def}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => playAudio(result.target_word, lang)} className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 active:scale-90 transition-all">
                                    <Volume2 size={18} />
                                </button>
                                <button onClick={saveToNotebook} className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 hover:bg-violet-500/20 active:scale-90 transition-all">
                                    <Save size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Trilingual Map */}
                        <div className="mb-5">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">Trilingual Map</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="lang-badge-en rounded-lg px-3 py-2.5 text-center">
                                    <span className="text-[10px] uppercase tracking-wider opacity-60 block mb-0.5">EN</span>
                                    <span className="text-sm font-semibold">{result.trilingual_map?.en || "-"}</span>
                                </div>
                                <div className="lang-badge-fr rounded-lg px-3 py-2.5 text-center">
                                    <span className="text-[10px] uppercase tracking-wider opacity-60 block mb-0.5">FR</span>
                                    <span className="text-sm font-semibold">{result.trilingual_map?.fr || "-"}</span>
                                </div>
                                <div className="lang-badge-es rounded-lg px-3 py-2.5 text-center">
                                    <span className="text-[10px] uppercase tracking-wider opacity-60 block mb-0.5">ES</span>
                                    <span className="text-sm font-semibold">{result.trilingual_map?.es || "-"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Slang Sentences */}
                        <div className="mb-5">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">Usage & Slang</h3>
                            <ul className="space-y-2">
                                {result.two_slang_sentences?.map((sentence, idx) => (
                                    <li key={idx} className="bg-white/[0.03] border border-white/[0.06] p-3.5 rounded-xl flex gap-3 items-start">
                                        <span className="text-violet-400 font-bold text-sm mt-0.5">{idx + 1}</span>
                                        <span className="flex-1 text-sm text-gray-300 leading-relaxed">{sentence}</span>
                                        <button onClick={() => playAudio(sentence, lang)} className="shrink-0 text-gray-500 hover:text-violet-400 active:scale-90 transition-all">
                                            <Volume2 size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Vibe Check */}
                        <div className="bg-gradient-to-br from-violet-500/10 to-blue-500/5 border border-violet-500/15 p-4 rounded-xl">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-violet-400 font-semibold mb-2 flex items-center gap-1.5">
                                ✨ Vibe Check
                            </h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{result.vibe_check_note}</p>
                        </div>
                    </div>

                    {/* Search Another */}
                    <button
                        onClick={() => { setResult(null); setInput(""); }}
                        className="w-full btn-ghost text-sm flex items-center justify-center gap-2"
                    >
                        <Sparkles size={14} />
                        Search another word
                    </button>
                </div>
            )}
        </div>
    );
}
