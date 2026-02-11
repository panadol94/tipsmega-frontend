"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// iOS Navigator extension for standalone mode detection
interface iOSNavigator extends Navigator {
    standalone?: boolean;
}

const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // ✅ Check if already installed via standalone mode OR navigator flag
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isIOSStandalone = (window.navigator as iOSNavigator).standalone === true;

        if (isStandalone || isIOSStandalone) {
            localStorage.setItem("pwa_installed", "true");
            return;
        }

        // ✅ Check if user already installed (persisted in localStorage)
        if (localStorage.getItem("pwa_installed") === "true") {
            return;
        }

        // ✅ Check if user dismissed it permanently
        if (localStorage.getItem("pwa_dismissed") === "true") {
            return;
        }

        // ✅ Check if user temporarily dismissed (7 days cooldown)
        const dismissedUntil = localStorage.getItem("pwa_dismissed_until");
        if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) {
            return;
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            // ⏰ Show popup after 3 seconds delay (better UX)
            setTimeout(() => {
                setShow(true);
            }, 3000);
        };

        // ✅ Listen for app installed event
        const installedHandler = () => {
            localStorage.setItem("pwa_installed", "true");
            setShow(false);
            setDeferredPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener("appinstalled", installedHandler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
            window.removeEventListener("appinstalled", installedHandler);
        };
    }, []);

    /** Dismiss for 7 days (close button / backdrop) */
    function handleTempDismiss() {
        localStorage.setItem("pwa_dismissed_until", String(Date.now() + DISMISS_DURATION_MS));
        setShow(false);
    }

    async function handleInstall() {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShow(false);
        }
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0 font-sans">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500"
                onClick={handleTempDismiss}
            />

            {/* Popup Card */}
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-amber-500/20 bg-[#0b101b] p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">

                {/* Ambient Background */}
                <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-10 pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-600/10 rounded-full blur-[80px]" />

                {/* Close Button */}
                <button
                    onClick={handleTempDismiss}
                    className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-20"
                >
                    ✕
                </button>

                <div className="relative z-10 flex flex-col items-center text-center pt-2">

                    {/* Icon with Ring Animation */}
                    <div className="mb-6 relative group">
                        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse-slow" />
                        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-b from-[#1a1f2e] to-[#0f121a] border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:scale-105 transition-transform duration-500">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/mega888.png"
                                alt="App Icon"
                                className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            />
                            {/* Shiny border effect */}
                            <div className="absolute inset-0 rounded-2xl border border-white/5" />
                        </div>
                        {/* Notify Badge */}
                        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 border-2 border-[#0b101b] shadow-lg animate-bounce">
                            <span className="text-[10px] font-bold text-white">1</span>
                        </div>
                    </div>

                    <div className="space-y-1 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
                            <span className="text-[9px] font-black tracking-[0.3em] text-amber-500 uppercase">System Upgrade</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-wide uppercase">
                            Install <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Commander App</span>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                            Dapatkan akses <span className="text-amber-300 font-bold">VVIP Network</span> tanpa lag. Lebih pantas, lebih stabil, dan auto-update database RTP.
                        </p>
                    </div>

                    <button
                        onClick={handleInstall}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 p-[1px] shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] active:scale-98 transition-transform"
                    >
                        <div className="relative flex items-center justify-center gap-2 rounded-[11px] bg-[#1a1f2e]/90 backdrop-blur-sm px-4 py-3.5 transition-all group-hover:bg-transparent">
                            <span className="font-black text-xs uppercase tracking-widest text-white group-hover:text-black transition-colors">Install Now</span>
                            <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                    </button>

                    <button
                        onClick={() => {
                            localStorage.setItem("pwa_dismissed", "true");
                            setShow(false);
                        }}
                        className="mt-4 text-[10px] font-bold text-white/20 hover:text-white/50 tracking-widest uppercase transition-colors"
                    >
                        Tak Perlu, Terima Kasih
                    </button>
                </div>
            </div>
        </div>
    );
}

