"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Reduce density on mobile for better performance
        const isMobile = window.innerWidth < 768;
        const fontSize = isMobile ? 18 : 14; // Larger font = fewer columns on mobile

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const chars = "0123456789ABCDEFMEGA888XYZ";
        const columns = Math.ceil(width / fontSize);
        const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -100));

        // Use requestAnimationFrame with throttle instead of setInterval
        let lastTime = 0;
        const frameInterval = isMobile ? 66 : 50; // ~15fps mobile, ~20fps desktop (was 30fps)
        let animId = 0;

        const draw = (timestamp: number) => {
            animId = requestAnimationFrame(draw);

            // Throttle: skip frame if not enough time has passed
            if (timestamp - lastTime < frameInterval) return;
            lastTime = timestamp;

            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0088ff"; // Tech blue
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        animId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
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
                zIndex: 0,
                opacity: 0.15,
                pointerEvents: "none",
                willChange: "transform", // GPU compositing hint
            }}
        />
    );
}
