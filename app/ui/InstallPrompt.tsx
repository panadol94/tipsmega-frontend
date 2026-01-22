"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShow(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

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
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-20 sm:items-center sm:pb-0">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setShow(false)}
            />

            {/* Popup Card */}
            <div className="relative transform overflow-hidden rounded-2xl border border-blue-500/30 bg-[#0f162a] p-6 shadow-2xl transition-all sm:w-full sm:max-w-sm animate-pop">
                {/* Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <button
                    onClick={() => setShow(false)}
                    className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="mb-5 relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all" />
                        <img
                            src="/mega888.png"
                            alt="Mega888 Logo"
                            className="relative w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <h3 className="mb-2 text-xl font-black text-white tracking-wide uppercase drop-shadow-md">
                        Install Application
                    </h3>
                    <p className="mb-6 text-xs font-medium text-white/60 leading-relaxed max-w-[260px]">
                        Install <span className="text-blue-400 font-bold">TipsMega888</span> untuk akses pantas, notifikasi RTP live, dan pengalaman commander yang lebih lancar.
                    </p>

                    <button
                        onClick={handleInstall}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border border-blue-400/30 py-3.5 text-xs font-black text-white tracking-[0.1em] shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 uppercase"
                    >
                        Install System Now
                    </button>
                </div>
            </div>
        </div>
    );
}
