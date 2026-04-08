"use client";

import { useState, useEffect } from "react";

interface TerminalStatusProps {
    messages?: string[];
    showLive?: boolean;
    showCursor?: boolean;
    variant?: "cyan" | "green" | "yellow";
}

export default function TerminalStatus({
    messages = [],
    showLive = true,
    showCursor = true,
    variant = "cyan",
}: TerminalStatusProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    const variantColors = {
        cyan: "#00e5cc",
        green: "#22c55e",
        yellow: "#eab308",
    };

    const variantShadow = {
        cyan: "rgba(0, 229, 204, 0.5)",
        green: "rgba(34, 197, 94, 0.5)",
        yellow: "rgba(234, 179, 8, 0.5)",
    };

    useEffect(() => {
        if (messages.length === 0) return;

        const currentMessage = messages[currentIndex];
        let charIndex = 0;
        setIsTyping(true);
        setDisplayedText("");

        const typeInterval = setInterval(() => {
            if (charIndex < currentMessage.length) {
                setDisplayedText(currentMessage.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);

                // Switch to next message after delay
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % messages.length);
                }, 2000);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [currentIndex, messages]);

    return (
        <div
            className="system-status"
            style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                background: "rgba(0, 0, 0, 0.5)",
                border: `1px solid ${variantColors[variant]}30`,
                borderRadius: "8px",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
            }}
        >
            {/* Live indicator */}
            {showLive && (
                <div className="live-indicator">
                    <span
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: variantColors[variant],
                            boxShadow: `0 0 6px ${variantShadow[variant]}`,
                            animation: "livePulse 2s ease-in-out infinite",
                        }}
                    />
                    <span
                        style={{
                            color: variantColors[variant],
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            fontSize: "10px",
                        }}
                    >
                        LIVE
                    </span>
                </div>
            )}

            {/* Separator */}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>

            {/* System message with typing effect */}
            <div style={{ flex: 1, minWidth: "200px" }}>
                <span
                    style={{
                        color: variantColors[variant],
                        textShadow: `0 0 8px ${variantShadow[variant]}`,
                    }}
                >
                    {displayedText}
                </span>
                {showCursor && isTyping && (
                    <span
                        className="terminal-cursor"
                        style={{
                            width: "8px",
                            height: "14px",
                            background: variantColors[variant],
                            boxShadow: `0 0 6px ${variantShadow[variant]}`,
                            verticalAlign: "text-bottom",
                        }}
                    />
                )}
            </div>

            {/* Timestamp */}
            <span
                style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "10px",
                }}
            >
                {new Date().toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })}
            </span>
        </div>
    );
}
