"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

let toastCounter = 0;
const toastListeners: Set<(toast: Toast) => void> = new Set();

export function showToast(message: string, type: ToastType = "info") {
    const toast: Toast = {
        id: ++toastCounter,
        message,
        type,
    };

    toastListeners.forEach(listener => listener(toast));
}

function ToastItem({ message, type, onClose }: ToastProps) {
    const config = {
        success: {
            gradient: "from-emerald-500/20 via-green-500/20 to-teal-500/20",
            border: "border-emerald-500/30",
            glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
            icon: "✅",
            iconBg: "bg-emerald-500/20"
        },
        error: {
            gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20",
            border: "border-red-500/30",
            glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
            icon: "❌",
            iconBg: "bg-red-500/20"
        },
        warning: {
            gradient: "from-red-500/20 via-red-500/20 to-red-500/20",
            border: "border-red-500/30",
            glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
            icon: "⚠️",
            iconBg: "bg-red-500/20"
        },
        info: {
            gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
            border: "border-cyan-500/30",
            glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
            icon: "ℹ️",
            iconBg: "bg-cyan-500/20"
        }
    }[type];

    return (
        <div
            className={`
                relative overflow-hidden rounded-xl border ${config.border} 
                bg-gradient-to-br ${config.gradient} backdrop-blur-xl ${config.glow}
                animate-in slide-in-from-right-4 fade-in duration-300
                mb-3 min-w-[300px] max-w-md
            `}
        >
            {/* Background noise texture */}
            <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative flex items-center gap-3 px-4 py-3">
                {/* Icon with background */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.iconBg} border ${config.border} flex items-center justify-center backdrop-blur-sm`}>
                    <span className="text-xl">{config.icon}</span>
                </div>

                {/* Message */}
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm leading-relaxed tracking-wide">
                        {message}
                    </p>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Bottom shine effect */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${type === 'success' ? 'emerald' : type === 'error' ? 'red' : type === 'warning' ? 'amber' : 'cyan'}-400/40 to-transparent`} />
        </div>
    );
}

export default function AdminToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const listener = (toast: Toast) => {
            setToasts(prev => [...prev, toast]);

            // Auto-dismiss after 3 seconds
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id));
            }, 3000);
        };

        toastListeners.add(listener);
        return () => {
            toastListeners.delete(listener);
        };
    }, []);

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-[9999] flex flex-col items-end">
            {toasts.map(toast => (
                <ToastItem
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}
