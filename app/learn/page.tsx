import { Suspense } from "react";
import ChatInterface from "@/components/Learning/ChatInterface";
import { Zap } from "lucide-react";

export default function LearnPage() {
    return (
        <div className="relative z-10 p-5 flex flex-col min-h-full">
            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                    <Zap size={16} className="text-violet-400" />
                </div>
                <h1 className="text-xl font-bold text-white">Lingo AI</h1>
            </div>
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="spinner" /></div>}>
                <ChatInterface />
            </Suspense>
        </div>
    );
}
