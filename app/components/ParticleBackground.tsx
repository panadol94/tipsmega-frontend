"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
}

const COLORS = [
    "rgba(0, 240, 255, 0.6)",  // cyan
    "rgba(0, 240, 255, 0.4)",  // cyan dim
    "rgba(255, 0, 110, 0.4)",  // pink
    "rgba(0, 240, 255, 0.5)",  // cyan
    "rgba(168, 85, 247, 0.4)", // purple
];

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -(Math.random() * 0.8 + 0.2),
            radius: Math.random() * 2 + 1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            opacity: Math.random() * 0.4 + 0.2,
            life: 0,
            maxLife: Math.random() * 200 + 100,
        });

        const initParticles = () => {
            particlesRef.current = [];
            const count = Math.min(30, Math.floor((canvas.width * canvas.height) / 25000));
            for (let i = 0; i < count; i++) {
                const p = createParticle();
                p.y = Math.random() * canvas.height;
                p.life = Math.random() * p.maxLife;
                particlesRef.current.push(p);
            }
        };
        initParticles();

        let lastTime = 0;
        const animate = (timestamp: number) => {
            const delta = timestamp - lastTime;
            lastTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.life += delta * 0.06;
                p.x += p.vx;
                p.y += p.vy;

                const lifeRatio = p.life / p.maxLife;
                const fadeIn = Math.min(lifeRatio * 5, 1);
                const fadeOut = lifeRatio > 0.7 ? 1 - ((lifeRatio - 0.7) / 0.3) : 1;
                const currentOpacity = p.opacity * fadeIn * fadeOut;

                if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
                    Object.assign(p, createParticle());
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${currentOpacity})`);
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
                gradient.addColorStop(0, p.color.replace(/[\d.]+\)$/, `${currentOpacity * 0.5})`));
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="particle-container fade-in-particles"
            style={{ opacity: 0.6 }}
        />
    );
}
