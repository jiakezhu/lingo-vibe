import { Suspense } from "react";
import ChatInterface from "@/components/Learning/ChatInterface";

export default function LearnPage() {
    return (
        <div className="p-4 flex flex-col min-h-full">
            <h1 className="text-2xl font-black mb-4">Lingo AI</h1>
            <Suspense fallback={<div className="font-bold p-4">Loading interface...</div>}>
                <ChatInterface />
            </Suspense>
        </div>
    );
}
