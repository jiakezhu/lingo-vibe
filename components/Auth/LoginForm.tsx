"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { LogIn, UserPlus } from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        setLoading(false);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for the confirmation link.");
        }
        setLoading(false);
    };

    return (
        <div className="w-full">
            <form className="space-y-3 flex flex-col">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="input-field w-full"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input-field w-full"
                    required
                />
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <LogIn size={16} />
                    {loading ? "Loading..." : "Login"}
                </button>
                <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="btn-ghost w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <UserPlus size={16} />
                    Sign Up
                </button>
            </form>
        </div>
    );
}
