"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import StudyMode from "@/components/Notebook/StudyMode";
import StoryGenerator from "@/components/Notebook/StoryGenerator";

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
            // Note: If 'saved_words' table isn't fully created or RLS blocks it, this fails gracefully.
            const { data, error } = await supabase.from("saved_words").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
            if (!error && data) {
                setWords(data.map(row => row.data)); // Extracting the JSON
            }
            setLoading(false);
        }
        loadWords();
    }, []);

    return (
        <div className="p-4 flex flex-col h-full space-y-6">
            <h1 className="text-3xl font-black mb-2 tracking-tighter">Your Notebook</h1>

            <div className="flex w-full bg-gray-100 rounded-lg p-1 neo-border">
                <button
                    onClick={() => setActiveTab("study")}
                    className={`flex-1 py-2 font-bold text-sm rounded-md transition-all ${activeTab === "study" ? "bg-white neo-shadow-sm border-2 border-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                >
                    Flashcards
                </button>
                <button
                    onClick={() => setActiveTab("story")}
                    className={`flex-1 py-2 font-bold text-sm rounded-md transition-all ${activeTab === "story" ? "bg-white neo-shadow-sm border-2 border-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                >
                    Story Generator
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-8">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin w-10 h-10 neo-border rounded-full border-t-yellow-400"></div>
                    </div>
                ) : words.length === 0 ? (
                    <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl text-center">
                        <p className="font-bold text-gray-700">Your notebook is empty. Navigate strictly to Learn tab to save words!</p>
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
