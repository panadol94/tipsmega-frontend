"use client";

import { useState, useEffect } from "react";

interface ScannerAnimationProps {
    isScanning: boolean;
    progress?: number; // 0-100
}

export default function ScannerAnimation({ isScanning, progress = 0 }: ScannerAnimationProps) {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const circumference = 2 * Math.PI * 45; // radius 45
    const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

    useEffect(() => {
        if (isScanning) {
            setAnimatedProgress(0);
            const startTime = Date.now();
            const duration = 1500;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - remaining, 3); // ease-out cubic
                setAnimatedProgress(eased * 100);

                if (remaining < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        } else {
            setAnimatedProgress(progress);
        }
    }, [isScanning, progress]);

    return (
        <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
            {/* Background ring */}
            <svg
                width="120"
                height="120"
                viewBox="0 0 100 100"
                style={{ transform: "rotate(-90deg)" }}
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="6"
                />
                {/* Progress ring with gradient */}
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="100%" stopColor="#ff006e" />
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition: isScanning ? "none" : "stroke-dashoffset 0.3s ease-out",
                        filter: "drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))",
                    }}
                />
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cyan-400 font-bold text-lg" style={{ textShadow: "0 0 10px rgba(0, 240, 255, 0.8)" }}>
                    {Math.round(animatedProgress)}%
                </span>
            </div>

            {/* Spinning inner ring when scanning */}
            {isScanning && (
                <div
                    className="absolute inset-[20px] rounded-full border-2 border-dashed border-cyan-500/40"
                    style={{
                        animation: "spinBorder 1.5s linear infinite",
                    }}
                />
            )}
        </div>
    );
}

// Waveform animation component for scanning state
export function WaveformBars() {
    return (
        <div className="flex items-end justify-center gap-1 h-10">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="waveform-bar w-1 rounded-full"
                    style={{
                        background: i % 2 === 0 ? "#00f0ff" : "#ff006e",
                        boxShadow: i % 2 === 0 ? "0 0 6px rgba(0, 240, 255, 0.6)" : "0 0 6px rgba(255, 0, 110, 0.6)",
                    }}
                />
            ))}
        </div>
    );
}

// Scanning state visualization with multiple elements
export function ScanVisualizer({ isScanning }: { isScanning: boolean }) {
    return (
        <div className="relative">
            {/* Circular progress */}
            <ScannerAnimation isScanning={isScanning} />

            {/* Waveform below */}
            <div className="mt-3 flex justify-center">
                <WaveformBars />
            </div>

            {/* Scan status text */}
            <div className="mt-2 text-center">
                <span className="text-xs font-mono text-cyan-400/70 tracking-wider">
                    {isScanning ? "SCANNING RTP..." : "READY"}
                </span>
            </div>
        </div>
    );
}