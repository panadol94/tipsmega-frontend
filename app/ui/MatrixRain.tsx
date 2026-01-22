"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const chars = "0123456789ABCDEFMEGA888XYZ";
        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);
        const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -100)); // random start (negative to stagger)

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0F0"; // Green text (classic matrix)
            // Actually let's do Gold/Blue for Mega888 theme?
            // User liked Gold text using .text-premium.
            // Let's try a Gold/Cyan mix or just Cyan for "Cyber".
            // Let's stick to a subtle Cyan/Blue to match the globe logo, Gold might be too contrasting for bg.
            ctx.fillStyle = "#0088ff"; // Tech blue
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                // x = column * font size, y = drop value * font size
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-init drops if width changes significantly? simplified for now
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0, // Behind content
                opacity: 0.15, // Subtle
                pointerEvents: "none",
            }}
        />
    );
}
