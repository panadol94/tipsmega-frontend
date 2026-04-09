"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

export default function SharedPageNav({ children }: { children: React.ReactNode }) {
    const { user } = useGlobalSettings();
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
            {/* Top Navigation — premium glassmorphism bar */}
            <nav
                className="flex items-center justify-between px-4 py-3 sticky top-0 z-50"
                style={{
                    background: "rgba(7,9,15,0.82)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 1px 24px rgba(0,0,0,0.5)",
                }}
            >
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    {isLoggedIn ? (
                        <>
                            <div className="relative flex items-center justify-center">
                                {/* Outer scanning ring 1 */}
                                <div className="absolute inset-[-4px] rounded-full border border-red-500/20 border-t-red-500 animate-spin" style={{ animationDuration: '3s' }} />
                                {/* Outer scanning ring 2 (reverse) */}
                                <div className="absolute inset-[-7px] rounded-full border border-dashed border-red-500/30 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
                                
                                {/* Core pulsing glow */}
                                <div className="absolute inset-0 rounded-full bg-red-500/30 blur-sm animate-ping" style={{ animationDuration: '2s' }} />
                                
                                <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center p-[2px] shadow-[0_0_15px_rgba(255,77,77,0.5)] z-10">
                                    <div className="w-full h-full bg-[#07090f] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-white text-[13px] tracking-wide">
                                    {user?.username || userName || "User"}
                                </span>
                                <span className="text-[9px] text-red-400 font-semibold tracking-wider uppercase mt-0.5">
                                    Premium
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <img
                                src="/mega888.png"
                                alt="MEGA888"
                                className="h-6 sm:h-7 object-contain drop-shadow-[0_0_5px_rgba(255,77,77,0.4)] group-hover:drop-shadow-[0_0_10px_rgba(255,77,77,0.8)] transition-all duration-300"
                            />
                            <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase mt-0.5 max-sm:hidden">
                                SCANNER
                            </span>
                        </div>
                    )}
                </Link>

                {/* Right nav cluster */}
                <div className="flex items-center gap-1.5">
                    <Link
                        href="/trusted"
                        className="px-3 py-1.5 text-[11px] font-bold text-white/50 hover:text-white transition-colors hidden sm:inline-flex"
                    >
                        Trusted
                    </Link>
                    <Link
                        href="/help"
                        className="px-3 py-1.5 text-[11px] font-bold text-white/50 hover:text-white transition-colors hidden sm:inline-flex"
                    >
                        Help
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/?auth=register"
                                className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
                                style={{ background: "rgba(255,255,255,0.04)" }}
                            >
                                Daftar
                            </Link>
                            <Link
                                href="/?auth=login"
                                className="px-4 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:scale-105 hover:shadow-md"
                                style={{
                                    background: "linear-gradient(135deg, #4f8EFF, #7B5CFF)",
                                    boxShadow: "0 4px 14px rgba(79,142,255,0.35)",
                                }}
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/profile"
                            className="px-3 py-1.5 text-[11px] font-bold text-white/70 hover:text-white transition-colors"
                        >
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
