"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance anim
        const t1 = setTimeout(() => setVisible(true), 10);
        // Auto close
        const t2 = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // Wait for exit anim
        }, 3000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [onClose]);

    // 🎨 Premium cyberpunk theme colors
    const config =
        type === "error"
            ? {
                gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20",
                border: "border-red-500/30",
                glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
                icon: "❌",
                iconBg: "bg-red-500/20"
            }
            : type === "success"
                ? {
                    gradient: "from-emerald-500/20 via-green-500/20 to-teal-500/20",
                    border: "border-emerald-500/30",
                    glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
                    icon: "✅",
                    iconBg: "bg-emerald-500/20"
                }
                : {
                    gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
                    border: "border-cyan-500/30",
                    glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
                    icon: "ℹ️",
                    iconBg: "bg-cyan-500/20"
                };

    return (
        <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-500 ${visible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-90"
                }`}
            style={{ minWidth: 300, maxWidth: "90vw" }}
        >
            {/* Premium Toast Card with Glassmorphism */}
            <div className={`relative overflow-hidden rounded-2xl border ${config.border} bg-gradient-to-br ${config.gradient} backdrop-blur-xl ${config.glow}`}>

                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative flex items-center gap-4 px-5 py-4">
                    {/* Icon with background */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.iconBg} border ${config.border} flex items-center justify-center backdrop-blur-sm`}>
                        <span className="text-lg">{config.icon}</span>
                    </div>

                    {/* Message */}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm tracking-wide leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Bottom shine effect */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
        </div>
    );
}
