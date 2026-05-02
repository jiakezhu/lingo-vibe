"use client";

import { useState, useEffect } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import { createClient } from "@/utils/supabase/client";
import { KeyRound, LogOut, UserCircle } from "lucide-react";

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
        alert("API Key saved! ✨");
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <div className="relative z-10 p-5 flex flex-col h-full space-y-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>

            {/* API Config */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                    <KeyRound size={16} className="text-violet-400" />
                    <h2 className="text-base font-semibold text-white">API Configuration</h2>
                </div>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    Enter your Google Gemini API key to bypass the daily limit. Your key is stored securely in your browser.
                </p>
                <div className="flex gap-2">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="input-field flex-1 text-sm"
                    />
                    <button onClick={saveKey} className="btn-primary text-sm !px-5">
                        Save
                    </button>
                </div>
            </div>

            {/* Account */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                    <UserCircle size={16} className="text-violet-400" />
                    <h2 className="text-base font-semibold text-white">Account</h2>
                </div>
                {user ? (
                    <div>
                        <p className="text-sm text-gray-400 mb-4">
                            Logged in as <span className="text-blue-400 font-medium">{user.email}</span>
                        </p>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold py-3 px-4 rounded-xl hover:bg-rose-500/20 active:scale-[0.98] transition-all"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-400">Sign in to save words to your personal notebook.</p>
                        <LoginForm />
                    </div>
                )}
            </div>
        </div>
    );
}
