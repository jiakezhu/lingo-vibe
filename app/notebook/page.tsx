"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import StudyMode from "@/components/Notebook/StudyMode";
import StoryGenerator from "@/components/Notebook/StoryGenerator";
import { BookOpen, Wand2 } from "lucide-react";

export default function NotebookPage() {
    const [words, setWords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState<"study" | "story">("study");

    useEffect(() => {
        async function loadWords() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }
            const { data, error } = await supabase.from("saved_words").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
            if (!error && data) {
                setWords(data.map(row => row.data));
            }
            setLoading(false);
        }
        loadWords();
    }, []);

    return (
        <div className="relative z-10 p-5 flex flex-col h-full space-y-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Notebook</h1>

            {/* Tab Switcher */}
            <div className="flex w-full bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
                <button
                    onClick={() => setActiveTab("study")}
                    className={`flex-1 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        activeTab === "study"
                            ? "bg-violet-500/15 text-violet-400 font-semibold border border-violet-500/20"
                            : "text-gray-500 hover:text-gray-300 border border-transparent"
                    }`}
                >
                    <BookOpen size={14} />
                    Flashcards
                </button>
                <button
                    onClick={() => setActiveTab("story")}
                    className={`flex-1 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        activeTab === "story"
                            ? "bg-violet-500/15 text-violet-400 font-semibold border border-violet-500/20"
                            : "text-gray-500 hover:text-gray-300 border border-transparent"
                    }`}
                >
                    <Wand2 size={14} />
                    Story Generator
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-8">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="spinner" />
                    </div>
                ) : words.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                        <p className="text-4xl mb-3">📚</p>
                        <p className="font-semibold text-gray-300 mb-1">Your notebook is empty</p>
                        <p className="text-sm text-gray-500">Head to the Learn tab to save your first word!</p>
                    </div>
                ) : (
                    <>
                        {activeTab === "study" && <StudyMode words={words} />}
                        {activeTab === "story" && <StoryGenerator words={words} />}
                    </>
                )}
            </div>
        </div>
    );
}
