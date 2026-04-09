"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs";
import confetti from "canvas-confetti";

const SYMBOLS = ["7", "BAR", "🍒", "💎", "MEGA", "WIN", "PLAY"];
const DEFAULT_PATTERN = ["7", "MEGA", "7"];
const HOVER_PATTERN = ["PLAY", "NOW", "WIN"];

type SlotMachineButtonProps = {
  href: string;
  className?: string;
  label?: string;
  sublabel?: string;
  pattern?: string[];
};

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export default function SlotMachineButton({
  href,
  className = "",
  label = "PLAY NOW",
  sublabel = "Tap for jackpot access",
  pattern = DEFAULT_PATTERN,
}: SlotMachineButtonProps) {
  const [reels, setReels] = useState<string[]>([...pattern]);
  const [spinning, setSpinning] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [jackpot, setJackpot] = useState(false);
  const wrapRef = useRef<HTMLAnchorElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reelIntervals = useRef<number[]>([]);
  const mountedRef = useRef(false);

  const finalPattern = useMemo(() => {
    if (pattern.length === 3) return pattern;
    return DEFAULT_PATTERN;
  }, [pattern]);

  const clearReels = () => {
    reelIntervals.current.forEach((id) => window.clearInterval(id));
    reelIntervals.current = [];
  };

  const burstCoins = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      angle: 60,
      startVelocity: 45,
      origin: { x: 0.2, y: 0.55 },
      colors: ["#ffd700", "#ffb700", "#fff2a8", "#ff5f1f"],
      shapes: ["circle"],
      scalar: 1.1,
    });

    confetti({
      particleCount: 50,
      spread: 65,
      angle: 120,
      startVelocity: 45,
      origin: { x: 0.8, y: 0.55 },
      colors: ["#ffd700", "#ffb700", "#fff2a8", "#ff5f1f"],
      shapes: ["circle"],
      scalar: 1.1,
    });
  };

  const flashJackpot = () => {
    setJackpot(true);
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.35, 1, 0.45],
        scale: [1, 1.04, 1],
        duration: 650,
        easing: "easeOutExpo",
      });
    }

    if (wrapRef.current) {
      animate(wrapRef.current, {
        scale: [1, 1.015, 1],
        duration: 450,
        easing: "easeOutBack",
      });
    }

    window.setTimeout(() => setJackpot(false), 1100);
  };

  const spinTo = (target: string[], speed = 95, finalDelay = 1050) => {
    clearReels();
    setSpinning(true);

    [0, 1, 2].forEach((index) => {
      const interval = window.setInterval(() => {
        setReels((prev) => {
          const next = [...prev];
          next[index] = randomSymbol();
          return next;
        });
      }, speed + index * 20);
      reelIntervals.current.push(interval);
    });

    target.forEach((symbol, index) => {
      window.setTimeout(() => {
        const interval = reelIntervals.current[index];
        if (interval) window.clearInterval(interval);
        setReels((prev) => {
          const next = [...prev];
          next[index] = symbol;
          return next;
        });
      }, finalDelay + index * 220);
    });

    window.setTimeout(() => {
      clearReels();
      setSpinning(false);
      flashJackpot();
    }, finalDelay + target.length * 220 + 60);
  };

  useEffect(() => {
    mountedRef.current = true;
    const timer = window.setTimeout(() => spinTo(finalPattern, 85, 850), 250);
    return () => {
      mountedRef.current = false;
      window.clearTimeout(timer);
      clearReels();
    };
  }, [finalPattern]);

  useEffect(() => {
    if (!mountedRef.current || spinning) return;
    if (hovering) {
      spinTo(HOVER_PATTERN, 60, 520);
    }
  }, [hovering, spinning]);

  const handleClick = () => {
    burstCoins();
    spinTo(finalPattern, 55, 900);
  };

  return (
    <a
      ref={wrapRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`slot-machine-button ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClick}
      aria-label={label}
    >
      <div ref={glowRef} className={`slot-machine-glow ${jackpot ? "is-jackpot" : ""}`} />
      <div className="slot-machine-flash" />
      <div className="slot-machine-topbar">
        <span className="slot-machine-lamps" />
        <span className={`slot-machine-jackpot ${jackpot ? "active" : ""}`}>JACKPOT</span>
        <span className="slot-machine-lamps" />
      </div>

      <div className="slot-machine-reels" aria-hidden="true">
        {reels.map((symbol, index) => (
          <div key={`${index}-${symbol}`} className={`slot-reel ${spinning ? "spinning" : ""}`}>
            <div className="slot-reel-window">
              <span className="slot-reel-symbol">{symbol}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="slot-machine-copy">
        <span className="slot-machine-title">{label}</span>
        <span className="slot-machine-subtitle">{sublabel}</span>
      </div>

      <style jsx>{`
        .slot-machine-button {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 18px 18px 16px;
          border-radius: 24px;
          overflow: hidden;
          text-decoration: none;
          background:
            radial-gradient(circle at top, rgba(255, 235, 160, 0.22), transparent 42%),
            linear-gradient(180deg, #8e1111 0%, #4d0505 40%, #1f0303 100%);
          border: 1px solid rgba(255, 221, 125, 0.45);
          box-shadow:
            inset 0 1px 0 rgba(255, 247, 200, 0.5),
            inset 0 -10px 24px rgba(0, 0, 0, 0.45),
            0 16px 36px rgba(0, 0, 0, 0.45),
            0 0 30px rgba(255, 65, 65, 0.22);
          transition: transform 0.24s ease, box-shadow 0.24s ease;
          isolation: isolate;
        }

        .slot-machine-button:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow:
            inset 0 1px 0 rgba(255, 247, 200, 0.6),
            inset 0 -10px 24px rgba(0, 0, 0, 0.45),
            0 22px 45px rgba(0, 0, 0, 0.55),
            0 0 40px rgba(255, 72, 72, 0.3);
        }

        .slot-machine-glow,
        .slot-machine-flash {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
        }

        .slot-machine-glow {
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.18), transparent 58%);
          box-shadow: inset 0 0 0 2px rgba(255, 214, 102, 0.18);
          opacity: 0.45;
        }

        .slot-machine-glow.is-jackpot {
          background: radial-gradient(circle at center, rgba(255, 240, 120, 0.34), transparent 55%);
        }

        .slot-machine-flash {
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 40%, transparent 65%);
          transform: translateX(-130%);
          animation: shine 4.5s linear infinite;
          opacity: 0.7;
        }

        .slot-machine-topbar {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          justify-content: center;
        }

        .slot-machine-lamps {
          flex: 1;
          height: 8px;
          border-radius: 999px;
          background: repeating-linear-gradient(90deg, #ffd95c 0 10px, #ff7b00 10px 20px);
          box-shadow: 0 0 12px rgba(255, 196, 0, 0.45);
          opacity: 0.9;
        }

        .slot-machine-jackpot {
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.35em;
          color: #ffe792;
          text-shadow: 0 0 10px rgba(255, 217, 92, 0.65);
        }

        .slot-machine-jackpot.active {
          color: #fff8c7;
          text-shadow: 0 0 12px rgba(255, 232, 133, 0.95), 0 0 24px rgba(255, 102, 0, 0.65);
          animation: blink 0.18s linear 5;
        }

        .slot-machine-reels {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          width: 100%;
        }

        .slot-reel {
          position: relative;
          padding: 4px;
          border-radius: 18px;
          background: linear-gradient(180deg, #fddc7a 0%, #a05a00 48%, #fef0b2 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 14px rgba(0,0,0,0.3);
        }

        .slot-reel.spinning {
          animation: reelShake 0.16s linear infinite;
        }

        .slot-reel-window {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 64px;
          border-radius: 14px;
          background: linear-gradient(180deg, #fffdf4 0%, #f4e7c3 100%);
          box-shadow: inset 0 8px 12px rgba(255,255,255,0.65), inset 0 -8px 14px rgba(120, 79, 0, 0.18);
          overflow: hidden;
        }

        .slot-reel-symbol {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 100%;
          padding: 0 4px;
          font-size: clamp(1rem, 4vw, 1.25rem);
          font-weight: 900;
          color: #7c110f;
          letter-spacing: 0.06em;
          text-shadow: 0 2px 0 rgba(255,255,255,0.45);
          transform: translateZ(0);
        }

        .slot-machine-copy {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .slot-machine-title {
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          color: #fff8dc;
          text-shadow: 0 0 18px rgba(255, 183, 0, 0.35), 0 2px 0 rgba(0,0,0,0.3);
        }

        .slot-machine-subtitle {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255, 236, 189, 0.8);
        }

        @keyframes shine {
          0% { transform: translateX(-130%) skewX(-16deg); }
          100% { transform: translateX(180%) skewX(-16deg); }
        }

        @keyframes reelShake {
          0% { transform: translateY(0); }
          25% { transform: translateY(-1px); }
          50% { transform: translateY(1px); }
          100% { transform: translateY(0); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        @media (max-width: 420px) {
          .slot-machine-button {
            padding: 16px 14px 15px;
            gap: 10px;
          }

          .slot-reel-window {
            min-height: 58px;
          }

          .slot-machine-title {
            font-size: 0.98rem;
          }

          .slot-machine-subtitle,
          .slot-machine-jackpot {
            letter-spacing: 0.14em;
          }
        }
      `}</style>
    </a>
  );
}
