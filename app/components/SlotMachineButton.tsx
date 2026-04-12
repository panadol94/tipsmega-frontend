"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface JoinActivity {
  name: string;
  time: string;
}

const RECENT_JOINS: JoinActivity[] = [
  { name: "Ahmad R.", time: "2 minit lepas" },
  { name: "Sarah M.", time: "5 minit lepas" },
  { name: "Rizal K.", time: "8 minit lepas" },
  { name: "Faiz A.", time: "12 minit lepas" },
  { name: "Nurul L.", time: "15 minit lepas" },
];

const WHATSAPP_LINK = "https://masuk10.com/Prospinner";

export default function WhatsAppGroupCTA({
  className = "",
}: {
  className?: string;
}) {
  const [memberCount, setMemberCount] = useState(2847);
  const [todayJoins, setTodayJoins] = useState(12);
  const [currentJoinIndex, setCurrentJoinIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 15 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          // Reset daily
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate recent joins
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoinIndex((prev) => (prev + 1) % RECENT_JOINS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Simulate live member count increase
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMemberCount((prev) => prev + 1);
        setTodayJoins((prev) => prev + 1);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Hover animation
  useEffect(() => {
    if (cardRef.current && glowRef.current) {
      if (isHovered) {
        animate(cardRef.current, {
          scale: [1, 1.02],
          duration: 300,
          easing: "easeOutCubic",
        });
        animate(glowRef.current, {
          opacity: [0.3, 0.6],
          duration: 300,
          easing: "easeOutCubic",
        });
      } else {
        animate(cardRef.current, {
          scale: [1.02, 1],
          duration: 300,
          easing: "easeOutCubic",
        });
        animate(glowRef.current, {
          opacity: [0.6, 0.3],
          duration: 300,
          easing: "easeOutCubic",
        });
      }
    }
  }, [isHovered]);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <a
      ref={cardRef}
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-cta-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Join WhatsApp Group"
    >
      <div ref={glowRef} className="whatsapp-cta-glow" />
      <div className="whatsapp-cta-border" />

      {/* Header Stats */}
      <div className="whatsapp-cta-header">
        <div className="stat-badge members">
          <span className="stat-icon">👥</span>
          <div className="stat-content">
            <span className="stat-number">{memberCount.toLocaleString()}</span>
            <span className="stat-label">orang dalam group</span>
          </div>
        </div>
        <div className="stat-badge joins">
          <span className="stat-icon">🔴</span>
          <div className="stat-content">
            <span className="stat-number today">+{todayJoins}</span>
            <span className="stat-label">hari ini</span>
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="whatsapp-cta-activity">
        <div className="activity-indicator">
          <span className="pulse-dot" />
          <span className="activity-label">LIVE</span>
        </div>
        <div className="activity-feed">
          <span className="activity-text">
            <strong>{RECENT_JOINS[currentJoinIndex].name}</strong> baru join
          </span>
          <span className="activity-time">
            {RECENT_JOINS[currentJoinIndex].time}
          </span>
        </div>
      </div>

      {/* Urgency Section */}
      <div className="whatsapp-cta-urgency">
        <div className="urgency-item">
          <span className="urgency-icon">⚡</span>
          <span className="urgency-text">Limited: <strong>50 slot sahaja</strong></span>
        </div>
        <div className="urgency-item countdown">
          <span className="urgency-icon">⏰</span>
          <span className="urgency-text">
            Reset dalam{" "}
            <span className="countdown-timer">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </span>
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="whatsapp-cta-button">
        <span className="cta-icon">💬</span>
        <span className="cta-text">JOIN GROUP SEKARANG</span>
        <span className="cta-arrow">→</span>
      </div>

      {/* Value Props */}
      <div className="whatsapp-cta-benefits">
        <span className="benefit-item">✓ Tips gacor setiap hari</span>
        <span className="benefit-item">✓ RTP scanner free</span>
        <span className="benefit-item">✓ Jackpot alerts</span>
      </div>

      <style jsx>{`
        .whatsapp-cta-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          padding: 20px;
          border-radius: 24px;
          overflow: hidden;
          text-decoration: none;
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.95) 0%,
            rgba(8, 10, 18, 0.98) 100%
          );
          border: 1px solid rgba(34, 197, 94, 0.2);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 16px 40px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(34, 197, 94, 0.1);
          transition: transform 0.24s ease, box-shadow 0.24s ease;
          isolation: isolate;
        }

        .whatsapp-cta-card:hover {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 20px 50px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(34, 197, 94, 0.25),
            0 0 40px rgba(34, 197, 94, 0.15);
        }

        .whatsapp-cta-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at top center,
            rgba(34, 197, 94, 0.15),
            transparent 60%
          );
          opacity: 0.3;
        }

        .whatsapp-cta-border {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(34, 197, 94, 0.4) 0%,
            transparent 50%,
            rgba(34, 197, 94, 0.2) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .whatsapp-cta-header {
          display: flex;
          gap: 12px;
          justify-content: space-between;
        }

        .stat-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .stat-badge.members {
          flex: 1;
        }

        .stat-icon {
          font-size: 1.3rem;
          line-height: 1;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-number {
          font-size: 1.1rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .stat-number.today {
          color: #4ade80;
        }

        .stat-label {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .whatsapp-cta-activity {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .activity-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 rgba(74, 222, 128, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }

        .activity-label {
          font-size: 0.65rem;
          font-weight: 900;
          color: #4ade80;
          letter-spacing: 0.12em;
        }

        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .activity-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .activity-text strong {
          color: #fff;
          font-weight: 700;
        }

        .activity-time {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .whatsapp-cta-urgency {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .urgency-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .urgency-item.countdown {
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.2);
        }

        .urgency-icon {
          font-size: 1rem;
        }

        .urgency-text strong {
          color: #fbbf24;
          font-weight: 700;
        }

        .countdown-timer {
          font-family: "JetBrains Mono", monospace;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 0.05em;
        }

        .whatsapp-cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 24px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            #22c55e 0%,
            #16a34a 100%
          );
          box-shadow:
            0 8px 24px rgba(34, 197, 94, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .whatsapp-cta-card:hover .whatsapp-cta-button {
          transform: translateY(-2px);
          box-shadow:
            0 12px 32px rgba(34, 197, 94, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .cta-icon {
          font-size: 1.3rem;
        }

        .cta-text {
          font-size: 0.95rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .cta-arrow {
          font-size: 1.2rem;
          color: #fff;
          transition: transform 0.2s ease;
        }

        .whatsapp-cta-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        .whatsapp-cta-benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .benefit-item {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.02em;
        }

        @media (max-width: 420px) {
          .whatsapp-cta-card {
            padding: 16px;
            gap: 12px;
          }

          .stat-badge {
            padding: 8px 10px;
          }

          .stat-number {
            font-size: 0.95rem;
          }

          .cta-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </a>
  );
}
