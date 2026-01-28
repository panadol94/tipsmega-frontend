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

            {/* Chibi Character */}
            <div
                className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
            >
                {/* Face */}
                <div className="relative">
                    {/* Eyes */}
                    <div className="flex gap-2 mb-1">
                        <div className="w-2 h-2 bg-white rounded-full" style={{ animation: "blink 3s infinite" }} />
                        <div className="w-2 h-2 bg-white rounded-full" style={{ animation: "blink 3s infinite" }} />
                    </div>
                    {/* Smile */}
                    <div className="w-4 h-2 border-b-2 border-white rounded-full mx-auto" />
                </div>

                {/* Crown/Star decoration */}
                <div className="absolute -top-2 right-0 text-2xl" style={{ animation: "spin 4s linear infinite" }}>
                    ⭐
                </div>

                {/* Thumbs up hand */}
                <div className="absolute -right-2 bottom-2 text-xl" style={{ animation: "wave 1s ease-in-out infinite" }}>
                    👍
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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
