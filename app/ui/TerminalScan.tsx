"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Line = { text: string; tone?: "hot" | "mid" | "low" | "sys" };

type Props = {
  games: string[];
  overallRtp: number;
  idMasked: string;

  // performance & pacing
  maxKeepLines?: number;

  // pct ranges
  minPct?: number;
  maxPct?: number;

  // pacing (buat suspense)
  baseDelayMs?: number; // delay asas setiap line
  jitterMs?: number; // random extra delay
  warmupMs?: number; // delay sebelum stream start
  onComplete?: () => void;
};

function randInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export default function TerminalScan({
  games,
  overallRtp,
  idMasked,
  maxKeepLines = 250, // Increased to show all 198 games + system messages
  minPct = 10,
  maxPct = 93,

  // suspense defaults (slow + berdebar)
  baseDelayMs = 140,
  jitterMs = 120,
  warmupMs = 1600,
  onComplete,
}: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const [showShareBtn, setShowShareBtn] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const deck = useMemo(() => games, [games]); // Keep original order from file

  // Share function with copyright - All games sorted by RTP
  const handleShare = async () => {
    // Extract all game results with percentage
    const gameResults = lines
      .filter(l => l.text.includes('%') && l.text.includes('│'))
      .map(l => {
        const match = l.text.match(/(\d+\.?\d*)%/);
        const percentage = match ? parseFloat(match[1]) : 0;
        return { text: l.text, percentage };
      })
      .sort((a, b) => b.percentage - a.percentage); // Sort highest first (all games)

    const shareText = `🎰 MEGA888 RTP SCAN RESULTS\n\n` +
      `📊 Overall RTP: ${overallRtp}%\n` +
      `🎮 Games Scanned: ${games.length}\n` +
      `🆔 ID: ${idMasked}\n` +
      `⏰ ${new Date().toLocaleString()}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🔥 ALL GAMES (Sorted by RTP):\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      gameResults.map((g, i) => `${i + 1}. ${g.text.trim()}`).join('\n') +
      `\n\n━━━━━━━━━━━━━━━━━━━━━━\n` +
      `© Powered by www.tipsmega888.com`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: '🎰 MEGA888 RTP Scan Results',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('✅ Result copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };


  // cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(t);
  }, []);

  // auto scroll
  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const ts = new Date().toLocaleString();

    setLines([
      { text: ">>> INITIALIZING TERMINAL ...", tone: "sys" },
      { text: ">>> CONNECTING TO RTP CORE ... OK", tone: "sys" },
      { text: ">>> AUTH: DEVICE SIGNATURE ... OK", tone: "sys" },
      { text: `>>> TARGET ID: ${idMasked}`, tone: "sys" },
      { text: `>>> TIMESTAMP: ${ts}`, tone: "sys" },
      { text: "--------------------------------", tone: "sys" },
      // jangan highlight “hot” lagi — semua plain
      { text: `>>> OVERALL RTP: ${overallRtp}%`, tone: "sys" },
      { text: ">>> DECRYPTING GAME TABLE ...", tone: "sys" },
      { text: ">>> PLEASE WAIT ...", tone: "sys" },
    ]);

    setIsRunning(true);

    let i = 0;
    let stopped = false;

    const pushLine = (line: Line) => {
      setLines((prev) => {
        const next = [...prev, line];
        return next.slice(-maxKeepLines);
      });
    };

    const delay = () => baseDelayMs + randInt(0, jitterMs);

    const warmupTimer = setTimeout(() => {
      if (stopped) return;

      pushLine({ text: "--------------------------------", tone: "sys" });
      pushLine({ text: ">>> STREAMING RESULT ...", tone: "sys" });
      pushLine({ text: "--------------------------------", tone: "sys" });

      const tick = () => {
        if (stopped) return;

        if (i >= deck.length) {
          pushLine({ text: "--------------------------------", tone: "sys" });
          pushLine({ text: ">>> DONE. STREAM COMPLETE.", tone: "sys" });
          setIsRunning(false);
          setShowShareBtn(true);
          if (onComplete) onComplete();
          return;
        }

        const g = deck[i++];
        const pct = randInt(minPct, maxPct);

        // ✅ buang [HOT]/[MID]/[LOW]
        // ✅ semua output plain
        const msg = `${g.padEnd(24, " ")} ${String(pct).padStart(2, " ")}%`;

        pushLine({ text: msg, tone: "sys" });

        // suspense pacing: kadang-kadang buat delay ekstra “freeze sekejap”
        const extra = pct >= 85 ? 240 : pct <= 20 ? 180 : 0;

        setTimeout(tick, delay() + extra);
      };

      setTimeout(tick, 420);
    }, warmupMs);

    return () => {
      stopped = true;
      clearTimeout(warmupTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ✅ semua warna sama (premium clean)
  const textColor = "rgba(242,240,234,0.86)";

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/70">Terminal Output</div>

        <span className="badge">
          <span style={{ color: "#ffd98a" }}>●</span>
          <span className="text-xs">{isRunning ? "RUNNING" : "DONE"}</span>
        </span>
      </div>

      <div
        ref={boxRef}
        className="mt-3 rounded-xl border border-white/10 bg-black/40 p-3"
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          lineHeight: "18px",
          maxHeight: 380,
          overflow: "auto",
        }}
      >
        {lines.map((ln, idx) => (
          <div key={idx} style={{ color: textColor }}>
            {ln.text}
          </div>
        ))}

        {/* cursor */}
        <div style={{ color: textColor }}>{cursorOn ? "█" : " "}</div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="text-xs text-white/55">Use carefully ! Do Not Spam Our Server</div>

        {showShareBtn && (
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95"
          >
            <span>📤</span>
            <span>SHARE RESULT</span>
          </button>
        )}
      </div>

      {showShareBtn && (
        <div className="mt-2 text-center text-[10px] text-white/40">
          © Powered by www.tipsmega888.com
        </div>
      )}
    </section>
  );
}
