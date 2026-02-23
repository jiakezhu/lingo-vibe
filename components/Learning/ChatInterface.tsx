"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Volume2, Send, Save, KeyRound } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface WordData {
    target_word: string;
    trilingual_map: { en: string; fr: string; es: string };
    chinese_def: string;
    two_slang_sentences: string[];
    vibe_check_note: string;
}

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

    const handleSearch = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    word: input,
                    lang,
                    customKey: savedLocallyKey
                })
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

        // In local dev without DB setup it might fail gracefully or throw
        if (authError || !user) {
            alert("Please login to save words to your notebook. Authentication is required.");
            return;
        }

        const { error } = await supabase.from("saved_words").insert([
            {
                user_id: user.id,
                word: result.target_word,
                data: result,
                lang
            }
        ]);

        if (error) {
            alert(`Error saving: ${error.message}`);
        } else {
            alert("Saved to notebook! ✨");
        }
    };

    return (
        <div className="flex flex-col flex-1 gap-4">
            <div className="flex gap-2 relative z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder={`Enter a word or phrase in ${lang.toUpperCase()}...`}
                    className="flex-1 neo-border rounded-xl px-4 py-3 bg-white font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-yellow-400 neo-border neo-shadow rounded-xl px-4 flex items-center justify-center hover:bg-yellow-300 active:translate-y-1 active:shadow-[0px_0px_0px_#111827] transition-all"
                >
                    <Send size={24} className="stroke-[3px]" />
                </button>
            </div>

            {showKeyPrompt && (
                <div className="bg-red-100 neo-border neo-shadow-sm p-4 rounded-xl mt-4">
                    <h3 className="font-black text-lg flex items-center gap-2 mb-2">
                        <KeyRound /> Daily Limit Reached!
                    </h3>
                    <p className="text-sm font-medium mb-3">You've used your 2 free AI queries today. Enter your own Google Gemini API key to continue learning endlessly!</p>
                    <div className="flex gap-2">
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="flex-1 neo-border rounded-lg px-3 py-2 text-sm font-bold"
                        />
                        <button
                            onClick={saveCustomKey}
                            className="bg-gray-900 text-white font-bold px-4 rounded-lg active:scale-95 transition-transform"
                        >
                            Save Key
                        </button>
                    </div>
                </div>
            )}

            {loading && (
                <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin w-12 h-12 neo-border rounded-full border-t-yellow-400"></div>
                </div>
            )}

            {result && !loading && (
                <div className="flex-1 overflow-y-auto pb-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white neo-border neo-shadow p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter capitalize">{result.target_word}</h2>
                                <p className="text-lg font-bold text-gray-500">{result.chinese_def}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => playAudio(result.target_word, lang)} className="p-2 bg-blue-200 rounded-full neo-border active:scale-90 shadow-[2px_2px_0px_#111827] active:shadow-[0px_0px_0px_#111827] transition-all">
                                    <Volume2 size={20} className="stroke-[3px]" />
                                </button>
                                <button onClick={saveToNotebook} className="p-2 bg-yellow-400 rounded-full neo-border active:scale-90 shadow-[2px_2px_0px_#111827] active:shadow-[0px_0px_0px_#111827] transition-all">
                                    <Save size={20} className="stroke-[3px]" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-2">Trilingual Map</h3>
                                <div className="grid grid-cols-3 gap-2 text-sm font-bold">
                                    <div className="p-2 bg-blue-100 rounded-md">EN: {result.trilingual_map?.en || "-"}</div>
                                    <div className="p-2 bg-indigo-100 rounded-md">FR: {result.trilingual_map?.fr || "-"}</div>
                                    <div className="p-2 bg-red-100 rounded-md">ES: {result.trilingual_map?.es || "-"}</div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-2">Slang / Usage</h3>
                                <ul className="space-y-2">
                                    {result.two_slang_sentences?.map((sentence, idx) => (
                                        <li key={idx} className="bg-yellow-50 p-3 rounded-lg border-2 border-yellow-200 font-medium text-sm flex gap-2 items-start">
                                            <span className="text-yellow-500 font-bold">{idx + 1}.</span>
                                            <span className="flex-1">{sentence}</span>
                                            <button onClick={() => playAudio(sentence, lang)} className="shrink-0 text-gray-400 hover:text-gray-900 active:scale-90 transition-transform">
                                                <Volume2 size={16} className="stroke-[3px]" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-1">Vibe Check ✨</h3>
                                    <p className="font-bold text-sm leading-relaxed">{result.vibe_check_note}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
