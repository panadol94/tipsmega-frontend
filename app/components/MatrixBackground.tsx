"use client";

import { useEffect, useRef, useCallback } from "react";

interface MatrixBackgroundProps {
    opacity?: number;
    speed?: number;
    density?: number;
}

export default function MatrixBackground({ 
    opacity = 0.12, 
    speed = 1, 
    density = 1 
}: MatrixBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;
        const baseFontSize = isMobile ? 16 : 14;
        const fontSize = Math.floor(baseFontSize * density);

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Matrix characters - mix of tech/cyber symbols
        const chars = "MEGA8880123456789ABCDEFXYZ><|{/}[]";
        const columns = Math.ceil(width / fontSize);
        const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -100));

        // Frame rate based on speed
        const frameInterval = Math.max(20, 50 / speed);
        let lastTime = 0;
        let animId = 0;

        const drawFrame = (timestamp: number) => {
            animId = requestAnimationFrame(drawFrame);

            if (timestamp - lastTime < frameInterval) return;
            lastTime = timestamp;

            // Dark trail effect
            ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
            ctx.fillRect(0, 0, width, height);

            // Alternate between cyan and green
            const hue = Math.random() > 0.7 ? 160 : 170; // cyan vs green
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.9)`;
            ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Vary brightness
                const brightness = Math.random();
                if (brightness > 0.95) {
                    ctx.fillStyle = "#ffffff";
                    ctx.shadowColor = "#00e5cc";
                    ctx.shadowBlur = 15;
                } else if (brightness > 0.7) {
                    ctx.fillStyle = "#00e5cc";
                    ctx.shadowBlur = 8;
                } else {
                    ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${0.4 + brightness * 0.4})`;
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(char, x, y);

                // Reset drop randomly
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            ctx.shadowBlur = 0;
        };

        animId = requestAnimationFrame(drawFrame);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, [density, speed]);

    useEffect(() => {
        draw();
    }, [draw]);

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
                opacity,
                pointerEvents: "none",
                willChange: "transform",
            }}
        />
    );
}
