"use client";

import { Home, BookOpen, Settings, Library } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Learn", href: "/learn", icon: BookOpen },
        { name: "Notebook", href: "/notebook", icon: Library },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)] z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 active:scale-95 ${
                                isActive
                                    ? "text-violet-400"
                                    : "text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            <div className={`relative ${isActive ? 'mb-0.5' : 'mb-1'}`}>
                                {isActive && (
                                    <div className="absolute -inset-2 rounded-full bg-violet-500/10" />
                                )}
                                <Icon
                                    size={22}
                                    className={`relative ${isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"}`}
                                />
                            </div>
                            <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
