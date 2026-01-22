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

    const colors =
        type === "error"
            ? "border-red-500/50 bg-red-900/80 text-red-200"
            : type === "success"
                ? "border-green-500/50 bg-green-900/80 text-green-200"
                : "border-blue-500/50 bg-blue-900/80 text-blue-200";

    const icon =
        type === "error" ? "❌" : type === "success" ? "✅" : "ℹ️";

    return (
        <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 ${colors} ${visible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
                }`}
            style={{ minWidth: 280, maxWidth: "90vw" }}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-bold tracking-wide text-sm">{message}</span>
        </div>
    );
}
