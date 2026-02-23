"use client";

import { useState } from "react";
import { Sparkles, Volume2 } from "lucide-react";

export default function StoryGenerator({ words }: { words: any[] }) {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [story, setStory] = useState<{ title: string; content: string; translation: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const toggleWord = (wordStr: string) => {
        if (selectedWords.includes(wordStr)) {
            setSelectedWords(selectedWords.filter(w => w !== wordStr));
        } else {
            if (selectedWords.length >= 5) {
                alert("You can select up to 5 words for a story.");
                return;
            }
            setSelectedWords([...selectedWords, wordStr]);
        }
    };

    const generateStory = async () => {
        if (selectedWords.length === 0) return;
        setLoading(true);
        setStory(null);

        try {
            const customKey = localStorage.getItem("lingovibe_custom_key");
            const res = await fetch("/api/story", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ words: selectedWords, customKey })
            });

            if (!res.ok) throw new Error("Failed to generate story");

            const data = await res.json();
            setStory(data);
        } catch (err) {
            alert("Error generating story. Make sure your API key is configured if limits are reached.");
        }
        setLoading(false);
    };

    const playAudio = (text: string) => {
        if (!("speechSynthesis" in window)) return;
        const utterance = new SpeechSynthesisUtterance(text);
        const lang = words.find(w => w.target_word === selectedWords[0])?.lang || "en";
        if (lang === "fr") utterance.lang = "fr-FR";
        else if (lang === "es") utterance.lang = "es-ES";
        else utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    if (words.length === 0) return null;

    return (
        <div className="flex flex-col h-full sm:px-4 py-4 space-y-6">
            <div className="bg-white p-5 rounded-xl neo-border neo-shadow">
                <h2 className="text-xl font-black mb-2 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" /> Write a Story
                </h2>
                <p className="text-sm font-medium text-gray-600 mb-4">Select up to 5 words to generate a short contextual story.</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {words.map((w, idx) => {
                        const isSelected = selectedWords.includes(w.target_word);
                        return (
                            <button
                                key={idx}
                                onClick={() => toggleWord(w.target_word)}
                                className={`px-3 py-1.5 rounded-lg border-2 font-bold text-sm transition-all ${isSelected
                                        ? "bg-yellow-400 border-gray-900 shadow-[2px_2px_0px_#111827] scale-105"
                                        : "bg-gray-50 border-gray-300 text-gray-500 hover:border-gray-900"
                                    }`}
                            >
                                {w.target_word}
                            </button>
                        )
                    })}
                </div>

                <button
                    onClick={generateStory}
                    disabled={loading || selectedWords.length === 0}
                    className="w-full bg-yellow-400 font-black py-3 rounded-lg neo-border active:translate-y-1 active:shadow-[0px_0px_0px_#111827] shadow-[2px_2px_0px_#111827] transition-all disabled:opacity-50 disabled:shadow-none cursor-pointer"
                >
                    {loading ? "Generating Magic..." : "Generate Story"}
                </button>
            </div>

            {story && !loading && (
                <div className="bg-white p-5 rounded-xl neo-border neo-shadow animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-black">{story.title}</h2>
                        <button onClick={() => playAudio(story.content)} className="p-2 bg-blue-200 rounded-full border-2 border-gray-900 active:scale-90 shadow-[2px_2px_0px_#111827] active:shadow-none transition-all">
                            <Volume2 size={16} className="stroke-[3px]" />
                        </button>
                    </div>
                    <p className="font-medium text-gray-800 leading-relaxed mb-4 text-lg border-l-4 border-yellow-400 pl-3">
                        {story.content}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                        <p className="font-bold text-sm text-gray-600">Translation:</p>
                        <p className="text-sm font-medium mt-1">{story.translation}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
