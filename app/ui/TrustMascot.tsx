"use client";

import { useEffect, useState } from "react";

export default function TrustMascot() {
    const [isVisible, setIsVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [message, setMessage] = useState("✅ 100% Trusted!");

    const messages = [
        "✅ 100% Trusted!",
        "🛡️ Verified Partners",
        "⭐ Premium Quality",
        "💯 Safe & Secure"
    ];

    useEffect(() => {
        // Show mascot after 2 seconds
        const showTimer = setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setShowBubble(true), 500);
        }, 2000);

        // Rotate messages every 5 seconds
        const messageInterval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setMessage(randomMsg);
        }, 5000);

        return () => {
            clearTimeout(showTimer);
            clearInterval(messageInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => {
        // Trigger bounce animation on click
        setShowBubble(false);
        setTimeout(() => setShowBubble(true), 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-24 right-4 z-50 cursor-pointer"
            onClick={handleClick}
            style={{ animation: "float 3s ease-in-out infinite" }}
        >
            {/* Speech Bubble */}
            {showBubble && (
                <div
                    className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
                    style={{ animation: "popIn 0.3s ease-out" }}
                >
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                        <div className="text-sm font-bold">{message}</div>
                        {/* Triangle pointer */}
                        <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-600" />
                    </div>
                </div>
            )}

            {/* Chibi Character - Actual Image with Animations */}
            <div className="relative w-24 h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/chibi-mascot.png"
                    alt="Trust Mascot"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{
                        animation: "bounce 2s ease-in-out infinite, sway 3s ease-in-out infinite",
                        filter: "drop-shadow(0 4px 20px rgba(147, 51, 234, 0.4))"
                    }}
                />

                {/* Sparkle effects around character */}
                <div className="absolute -top-1 -right-1 text-xl animate-ping" style={{ animationDuration: "2s" }}>
                    ✨
                </div>
                <div className="absolute -bottom-1 -left-1 text-lg" style={{ animation: "twinkle 3s ease-in-out infinite" }}>
                    💫
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes popIn {
          0% { transform: scale(0) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @media (max-width: 640px) {
          .fixed {
            bottom: 5rem;
            right: 1rem;
          }
        }
      `}</style>
        </div>
    );
}
