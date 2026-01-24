"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Simple "Click" Beep (Short, futuristic)
// Using Oscillator in AudioContext for better control

// A better short high-tech click sound (Synthesis approach or better base64)
// For now, let's use a very short, clean Oscillator approach if AudioContext is available, 
// OR a reliable base64. Let's use AudioContext for "Gen-Z" tech feel (synthetic beeps are cleaner).

type SettingsContextType = {
    soundEnabled: boolean;
    hapticEnabled: boolean;
    toggleSound: () => void;
    toggleHaptic: () => void;
    playSound: (type?: "click" | "success" | "error") => void;
    triggerHaptic: (pattern?: number | number[]) => void;
    // Chat
    isChatOpen: boolean;
    toggleChat: (open?: boolean) => void;
    activeTheme: string;
    setTheme: (t: string) => void;
    user: { username: string; token: string; friends?: string[] } | null;
    setUser: (u: { username: string; token: string; friends?: string[] } | null) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function GlobalSettingsProvider({ children }: { children: React.ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState("cyber"); // cyber, matrix, neon, gold
    const [mounted, setMounted] = useState(false);

    // Audio Context Ref
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

    // User Auth State
    const [user, setUser] = useState<{ username: string; token: string; friends?: string[] } | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
            // Load from local storage
            const s = localStorage.getItem("tipsmega_sound");
            const h = localStorage.getItem("tipsmega_haptic");
            const t = localStorage.getItem("tipsmega_chat_theme");
            if (s !== null) setSoundEnabled(s === "true");
            if (h !== null) setHapticEnabled(h === "true");
            if (t) setActiveTheme(t);

            // Fetch User
            const token = localStorage.getItem("tipsmega_token");
            if (token) {
                const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
                fetch(`${API_BASE}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(r => r.json())
                    .then(d => {
                        if (d.ok) {
                            setUser({ username: d.username, token, friends: d.friends || [] });
                        }
                    })
                    .catch(console.error);
            }
        }, 0);
    }, []);

    // ... (rest of audio/haptic code) ...



    const toggleSound = () => {
        const newVal = !soundEnabled;
        setSoundEnabled(newVal);
        localStorage.setItem("tipsmega_sound", String(newVal));
        if (newVal) playSound("click");
    };

    const toggleHaptic = () => {
        const newVal = !hapticEnabled;
        setHapticEnabled(newVal);
        localStorage.setItem("tipsmega_haptic", String(newVal));
        if (newVal) triggerHaptic(50);
    };

    const toggleChat = (open?: boolean) => {
        setIsChatOpen(prev => open ?? !prev);
    };

    const setTheme = (t: string) => {
        setActiveTheme(t);
        localStorage.setItem("tipsmega_chat_theme", t);
    };

    const playSound = (type: "click" | "success" | "error" = "click") => {
        if (!soundEnabled || !audioCtx) return;

        // Resume context if suspended (browser policy)
        if (audioCtx.state === "suspended") {
            audioCtx.resume().catch(() => { });
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === "click") {
            // High-tech short blip
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.06);
        } else if (type === "success") {
            // "Coin" like sound
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "error") {
            // Low buz
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    };

    const triggerHaptic = (pattern: number | number[] = 10) => {
        if (!hapticEnabled || typeof navigator === "undefined" || !navigator.vibrate) return;
        try {
            navigator.vibrate(pattern);
        } catch {
            // ignore errors on devices that dont support
        }
    };

    return (
        <SettingsContext.Provider
            value={{
                soundEnabled,
                hapticEnabled,
                toggleSound,
                toggleHaptic,
                playSound,
                triggerHaptic,
                isChatOpen,
                toggleChat,
                activeTheme,
                setTheme,
                user,
                setUser
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useGlobalSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error("useGlobalSettings must be used within GlobalSettingsProvider");
    return ctx;
}
