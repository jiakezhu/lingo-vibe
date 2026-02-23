"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Sparkles, Zap, Flame, Heart } from "lucide-react";

export default function StudyMode({ words }: { words: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const wordData = words[currentIndex];
    // Deterministic icon selection based on word length
    const icons = [Smile, Sparkles, Zap, Flame, Heart];
    const DynamicIcon = icons[wordData?.target_word.length % icons.length] || Smile;

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 150);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
        }, 150);
    };

    if (!wordData) return null;

    return (
        <div className="flex flex-col items-center justify-center h-full sm:px-4 py-8">
            <div className="w-full max-w-sm aspect-[3/4] relative perspective-1000">
                <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden bg-white neo-border neo-shadow rounded-2xl p-6 flex flex-col items-center justify-center">
                        <DynamicIcon size={64} className="mb-6 stroke-[2px] text-yellow-400" />
                        <h2 className="text-4xl font-black text-center capitalize">{wordData.target_word}</h2>
                        <p className="text-gray-400 font-bold mt-4 uppercase tracking-widest text-xs">Tap to flip</p>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden bg-yellow-400 neo-border neo-shadow rounded-2xl p-6 flex flex-col items-center justify-center rotate-y-180">
                        <h3 className="text-2xl font-black mb-2 text-center text-gray-900">{wordData.chinese_def}</h3>
                        <div className="w-full bg-white/50 p-3 rounded-lg border-2 border-gray-900 mt-4 text-sm font-bold text-center">
                            <p>EN: {wordData.trilingual_map?.en}</p>
                        </div>

                        {wordData.two_slang_sentences && wordData.two_slang_sentences.length > 0 && (
                            <div className="mt-8 w-full text-left bg-white p-4 rounded-lg border-2 border-gray-900">
                                <p className="font-black text-xs uppercase tracking-widest text-gray-800 mb-2">Example:</p>
                                <p className="text-sm font-medium italic border-l-4 border-gray-900 pl-3 leading-tight">
                                    "{wordData.two_slang_sentences[0]}"
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <div className="flex gap-4 mt-8">
                <button onClick={prevCard} className="bg-white neo-border neo-shadow-sm font-bold px-6 py-2 rounded-lg active:translate-y-1 active:shadow-none transition-all">Prev</button>
                <span className="font-black text-gray-500 flex items-center">{currentIndex + 1} / {words.length}</span>
                <button onClick={nextCard} className="bg-white neo-border neo-shadow-sm font-bold px-6 py-2 rounded-lg active:translate-y-1 active:shadow-none transition-all">Next</button>
            </div>
        </div>
    );
}
