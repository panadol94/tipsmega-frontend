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
                    {/* Logo badge — larger, richer gradient */}
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-lg transition-transform group-hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #4f8EFF 0%, #7B5CFF 50%, #C44EFF 100%)",
                            boxShadow: "0 4px 16px rgba(79,142,255,0.4)",
                        }}
                    >
                        M
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-white text-[13px] tracking-wide">
                            {isLoggedIn && userName ? userName : "MEGA888"}
                        </span>
                        {isLoggedIn && userName && (
                            <span className="text-[9px] text-amber-400 font-semibold tracking-wider uppercase mt-0.5">
                                Premium
                            </span>
                        )}
                    </div>
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
