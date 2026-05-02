import { Suspense } from "react";
import ChatInterface from "@/components/Learning/ChatInterface";

export default function LearnPage() {
    return (
        <div className="relative z-10 p-5 pt-6 flex flex-col min-h-full">
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="spinner" /></div>}>
                <ChatInterface />
            </Suspense>
        </div>
    );
}
