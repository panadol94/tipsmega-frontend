"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  megaId: string;
  onPhaseChange?: (phase: string) => void;
}

// Realistic hacker terminal lines
const BOOT_LINES = [
  { text: "[SYS] Initializing Mega888 Neural Scanner v4.2.1...", delay: 80 },
  { text: "[NET] Establishing encrypted tunnel → 188.166.x.x:443", delay: 120 },
  { text: "[SSL] TLS 1.3 handshake ✓ (ECDHE-RSA-AES256-GCM)", delay: 100 },
  { text: "[AUTH] Device fingerprint verified ✓", delay: 90 },
  { text: "[DNS] Resolving mega888-rtp-core.internal...", delay: 150 },
  { text: "[TCP] Connection pool: 8 active streams", delay: 60 },
  { text: "[AI] Loading prediction model (weights: 847MB)...", delay: 200 },
  { text: "[GPU] CUDA cores allocated: 2048", delay: 70 },
  { text: "[MEM] Buffer allocated: 512MB", delay: 60 },
  { text: "[RTP] Subscribing to live RTP feed...", delay: 130 },
  { text: "[DB] Querying historical patterns (24h window)...", delay: 180 },
  { text: "[SIG] Signal strength: ████████░░ 82%", delay: 100 },
  { text: "[AI] Neural network inference started...", delay: 140 },
  { text: "[SCAN] Intercepting game server packets...", delay: 160 },
  { text: "[DATA] Processing 1,847 data points...", delay: 120 },
  { text: "[CRYPTO] Decrypting RTP matrix...", delay: 200 },
  { text: "[RESULT] Compiling analysis report...", delay: 150 },
];

function randomHex(len: number) {
  return Array.from({ length: len }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join(" ");
}

function randomIp() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

export default function HackerScanOverlay({ megaId, onPhaseChange }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("CONNECTING");
  const [hexStream, setHexStream] = useState("");
  const [packets, setPackets] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Phase labels
  const PHASES = ["CONNECTING", "AUTHENTICATING", "SCANNING", "DECRYPTING", "ANALYZING"];

  // Boot sequence
  useEffect(() => {
    let idx = 0;
    let stopped = false;

    const addLine = () => {
      if (stopped || idx >= BOOT_LINES.length) return;
      const line = BOOT_LINES[idx++];
      setLines((prev) => [...prev.slice(-18), line.text]);

      // Update phase
      const phaseIdx = Math.min(Math.floor((idx / BOOT_LINES.length) * PHASES.length), PHASES.length - 1);
      const newPhase = PHASES[phaseIdx];
      setPhase(newPhase);
      onPhaseChange?.(newPhase);

      // Update progress
      setProgress(Math.min(95, Math.floor((idx / BOOT_LINES.length) * 100)));

      setTimeout(addLine, line.delay + Math.random() * 80);
    };

    setTimeout(addLine, 300);
    return () => { stopped = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hex stream animation
  useEffect(() => {
    const t = setInterval(() => {
      setHexStream(randomHex(16));
      setPackets((p) => p + Math.floor(Math.random() * 50) + 10);
    }, 100);
    return () => clearInterval(t);
  }, []);

  // Glitch effect
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80 + Math.random() * 120);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  // Scan ring animation
  useEffect(() => {
    const canvas = document.getElementById("scan-ring") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.38;

      ctx.clearRect(0, 0, w, h);

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,217,255,0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Scanning arc
      ctx.beginPath();
      ctx.arc(cx, cy, r, angle, angle + Math.PI * 0.6);
      ctx.strokeStyle = "rgba(0,217,255,0.8)";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ff6b6b";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner ring
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168,85,247,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner scanning arc (opposite direction)
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.65, -angle * 1.3, -angle * 1.3 + Math.PI * 0.4);
      ctx.strokeStyle = "rgba(168,85,247,0.7)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#a855f7";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Crosshair
      ctx.strokeStyle = "rgba(0,217,255,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.3, cy);
      ctx.lineTo(cx + r * 0.3, cy);
      ctx.moveTo(cx, cy - r * 0.3);
      ctx.lineTo(cx, cy + r * 0.3);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6b6b";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#ff6b6b";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Target ID in center
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = "rgba(0,217,255,0.9)";
      ctx.textAlign = "center";
      ctx.fillText(`TARGET: ${megaId.slice(0, 4)}****${megaId.slice(-2)}`, cx, cy + 22);

      // Data points on ring
      for (let i = 0; i < 8; i++) {
        const a = angle + (i * Math.PI * 2) / 8;
        const px = cx + Math.cos(a) * r * 0.82;
        const py = cy + Math.sin(a) * r * 0.82;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? "#00ff88" : "rgba(0,217,255,0.5)";
        ctx.fill();
      }

      angle += 0.02;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [megaId]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "1rem",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        overflow: "hidden",
      }}
    >
      {/* Background matrix rain effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='40' font-size='30' fill='%2300d9ff' font-family='monospace'%3E01%3C/text%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          animation: "matrixScroll 20s linear infinite",
        }}
      />

      {/* Glitch effect */}
      {glitch && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,217,255,0.03)",
            mixBlendMode: "screen",
            transform: `translateX(${Math.random() * 6 - 3}px)`,
          }}
        />
      )}

      {/* Phase indicator */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: 4,
          color: "#ff6b6b",
          textTransform: "uppercase",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      >
        ● {phase}
      </div>

      {/* Scan ring canvas */}
      <canvas
        id="scan-ring"
        width={200}
        height={200}
        style={{ width: 200, height: 200 }}
      />

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          fontSize: 10,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: 1,
        }}
      >
        <span>PKT: {packets.toLocaleString()}</span>
        <span>LAT: {Math.floor(Math.random() * 30 + 8)}ms</span>
        <span>SIG: {randomIp()}</span>
      </div>

      {/* Terminal box */}
      <div
        ref={termRef}
        style={{
          width: "100%",
          maxWidth: 480,
          maxHeight: 180,
          overflow: "auto",
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(0,217,255,0.2)",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 10,
          lineHeight: "16px",
        }}
      >
        {lines.map((ln, i) => (
          <div
            key={i}
            style={{
              color: ln.includes("✓")
                ? "#00ff88"
                : ln.includes("ERROR")
                  ? "#ff4444"
                  : "rgba(0,217,255,0.85)",
              opacity: i === lines.length - 1 ? 1 : 0.6,
            }}
          >
            {ln}
          </div>
        ))}
        <div style={{ color: "#ff6b6b", opacity: 0.5 }}>
          {hexStream}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div
          style={{
            height: 3,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #ff6b6b, #a855f7, #00ff88)",
              borderRadius: 99,
              transition: "width 0.3s ease",
              boxShadow: "0 0 8px rgba(0,217,255,0.5)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            marginTop: 4,
          }}
        >
          <span>MEGA888 RTP CORE</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes matrixScroll {
          from { transform: translateY(0); }
          to { transform: translateY(-60px); }
        }
      `}</style>
    </div>
  );
}
