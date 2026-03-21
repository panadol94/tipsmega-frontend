"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";

export default function SharedPageNav({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const tokenKey = "tipsmega_token";
        const nameKey = "tipsmega_username";
        const savedName = localStorage.getItem(nameKey);
        if (savedName) setUserName(savedName);
        if (localStorage.getItem(tokenKey)) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            {/* Top Navigation - consistent with homepage */}
            <nav className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-xs text-white">M</div>
                    <span className="font-black text-white tracking-wide">{isLoggedIn && userName ? userName : "MEGA888"}</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link href="/trusted" className="px-3 py-1.5 text-xs font-bold text-white/70 hover:text-white transition hidden sm:inline-flex">
                        Trusted
                    </Link>
                    <Link href="/help" className="px-3 py-1.5 text-xs font-bold text-white/70 hover:text-white transition hidden sm:inline-flex">
                        Help
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            <Link href="/?auth=register" className="px-3 py-1.5 border border-white/15 bg-white/5 rounded-full text-xs font-bold text-white/80 hover:text-white transition">
                                Daftar
                            </Link>
                            <Link href="/?auth=login" className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs font-bold text-white">
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link href="/profile" className="px-3 py-1.5 text-xs font-bold text-white/70 hover:text-white transition">
                            Profile
                        </Link>
                    )}
                </div>
            </nav>

            {/* Page Content */}
            <main className="pb-24">
                {children}
            </main>

            <BottomNav />
        </>
    );
}
