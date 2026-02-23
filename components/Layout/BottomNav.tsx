"use client";

import { Home, BookOpen, Settings, Library } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Learn", href: "/learn", icon: BookOpen },
        { name: "Notebook", href: "/notebook", icon: Library },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-white border-t-4 border-gray-900 pb-[env(safe-area-inset-bottom)] z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full transition-all active:scale-95",
                                isActive ? "text-gray-900 font-bold bg-yellow-400" : "text-gray-500 font-medium hover:bg-gray-100"
                            )}
                        >
                            <Icon
                                size={24}
                                className={clsx(
                                    "mb-1",
                                    isActive ? "stroke-[3px]" : "stroke-[2px]"
                                )}
                            />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
