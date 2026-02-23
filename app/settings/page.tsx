"use client";

import { useState, useEffect } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
    const [apiKey, setApiKey] = useState("");
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const key = localStorage.getItem("lingovibe_custom_key");
        if (key) setApiKey(key);

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
    }, []);

    const saveKey = () => {
        localStorage.setItem("lingovibe_custom_key", apiKey);
        alert("API Key saved locally! ✨");
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <div className="p-4 flex flex-col h-full space-y-6">
            <h1 className="text-3xl font-black mb-2 tracking-tighter">Settings</h1>

            <div className="bg-white p-6 rounded-xl neo-border neo-shadow">
                <h2 className="text-xl font-bold mb-4">API Configuration</h2>
                <p className="text-sm text-gray-600 mb-4 font-medium">
                    Enter your Google Gemini API key to bypass the daily limit. Your key is stored securely in your browser's local storage and only sent directly to our proxy API.
                </p>
                <div className="flex gap-2">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="flex-1 neo-border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                    />
                    <button
                        onClick={saveKey}
                        className="bg-yellow-400 font-bold px-6 rounded-lg neo-border active:translate-y-1 active:shadow-[0px_0px_0px_#111827] shadow-[2px_2px_0px_#111827] transition-all"
                    >
                        Save
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl neo-border neo-shadow">
                <h2 className="text-xl font-bold mb-4">Account</h2>
                {user ? (
                    <div>
                        <p className="font-bold mb-4">Logged in as: <span className="text-blue-600">{user.email}</span></p>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-400 text-white font-bold py-3 px-4 rounded-lg neo-border active:translate-y-1 active:shadow-[0px_0px_0px_#111827] shadow-[2px_2px_0px_#111827] transition-all"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-600 mb-4">Sign in to save your learned words to your personal notebook!</p>
                        <LoginForm />
                    </div>
                )}
            </div>
        </div>
    );
}
