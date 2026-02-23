"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for the confirmation link.");
        }
        setLoading(false);
    };

    return (
        <div className="w-full bg-white p-6 rounded-xl neo-border neo-shadow">
            <h1 className="text-3xl font-black mb-6 text-center tracking-tight">LingoVibe</h1>
            <form className="space-y-4 flex flex-col">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full neo-border rounded-lg px-4 py-3 bg-gray-50 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full neo-border rounded-lg px-4 py-3 bg-gray-50 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
                    required
                />
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 active:translate-y-1 active:shadow-[0px_0px_0px_#111827] text-gray-900 font-bold text-lg py-3 px-4 rounded-lg neo-border neo-shadow transition-all"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="w-full bg-white hover:bg-gray-100 active:translate-y-1 active:shadow-[0px_0px_0px_#111827] text-gray-900 font-bold text-lg py-3 px-4 rounded-lg neo-border neo-shadow transition-all mt-2"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
