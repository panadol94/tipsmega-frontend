"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MegaLogo from "./MegaLogo";
import MatrixRain from "./MatrixRain";
import BottomNav from "./BottomNav";

/* ---------- Withdrawal Notification Ticker ---------- */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

const WINNER_NAMES = [
  "Ahmad", "Siti", "Muhammad", "Nur", "Mohd", "Faizal", "Aisyah",
  "Hafiz", "Syafiq", "Amirah", "Rizal", "Nadia", "Zulkifli", "Farah",
  "Azman", "Hidayah", "Irfan", "Liyana", "Kamarul", "Dina", "Rashid",
  "Hana", "Firdaus", "Ain", "Haziq", "Balqis", "Fikri", "Wani",
  "Arif", "Mira", "Danial", "Shazwani", "Aiman", "Yana", "Harith",
];
const LAST_INITIALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FALLBACK_COMPANIES = ["WINBOX", "ME88", "BK8", "MEGA888", "918KISS"];
const AMOUNTS = [
  380, 520, 750, 880, 1050, 1230, 1480, 1750, 1920, 2100,
  2350, 2680, 3100, 3450, 3780, 4200, 4650, 4850, 5200, 5800,
  6300, 6750, 7200, 7900, 8500, 9200, 10500, 12800, 14500,
];
const TIME_AGO = [
  "baru je", "1 minit lepas", "2 minit lepas", "3 minit lepas",
  "5 minit lepas", "8 minit lepas", "10 minit lepas", "12 minit lepas",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function fmtRM(n: number) {
  return `RM${n.toLocaleString("en-MY")}`;
}
function randomDelay() {
  // Random 6–15 seconds to feel organic
  return 6000 + Math.floor(Math.random() * 9000);
}

function WinningTicker() {
  const [companies, setCompanies] = useState<string[]>(FALLBACK_COMPANIES);
  const [current, setCurrent] = useState(() => ({
    name: `${pickRandom(WINNER_NAMES)} ${LAST_INITIALS[Math.floor(Math.random() * 26)]}.`,
    amount: pickRandom(AMOUNTS),
    company: pickRandom(FALLBACK_COMPANIES),
    timeAgo: pickRandom(TIME_AGO),
  }));
  const [anim, setAnim] = useState(true);

  // Fetch real company names from database on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/companies`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const arr = Array.isArray(json?.companies) ? json.companies : Array.isArray(json) ? json : [];
        const names = arr
          .filter((c: { status?: string }) => (c.status || "").toUpperCase() !== "HIDDEN")
          .map((c: { name: string }) => c.name)
          .filter(Boolean);
        if (names.length > 0) setCompanies(names);
      })
      .catch(() => {/* keep fallback */ });
  }, []);

  // Cycle ticker with random delay (6-15s) to feel natural
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      timeout = setTimeout(() => {
        setAnim(false);
        setTimeout(() => {
          setCurrent({
            name: `${pickRandom(WINNER_NAMES)} ${LAST_INITIALS[Math.floor(Math.random() * 26)]}.`,
            amount: pickRandom(AMOUNTS),
            company: pickRandom(companies),
            timeAgo: pickRandom(TIME_AGO),
          });
          setAnim(true);
        }, 400);
        cycle(); // schedule next with new random delay
      }, randomDelay());
    };
    cycle();
    return () => clearTimeout(timeout);
  }, [companies]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5 px-4 py-2.5 border-b border-red-500/10">
      {/* Subtle shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.2) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmerTicker 6s linear infinite",
        }}
      />
      <div className="relative flex items-center gap-3 max-w-lg mx-auto">
        {/* LIVE dot */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
        </div>
        {/* Withdrawal text */}
        <div
          className={`flex-1 text-xs font-medium text-white/80 transition-all duration-500 ${anim ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <span className="text-red-400 font-bold">{current.name}</span>
          {" "}berjaya cuci{" "}
          <span className="text-red-400 font-bold">{fmtRM(current.amount)}</span>
          {" "}dari{" "}
          <span className="text-red-300 font-bold">{current.company}</span>
          <span className="text-white/30 ml-1.5 text-[10px]">• {current.timeAgo}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes shimmerTicker {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}


export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isChat = pathname === "/chat" || pathname?.startsWith("/chat/");

  // Admin pages use their own layout - skip user-facing shell
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="app-bg">
      <MatrixRain />
      {/* Top Brand Header */}
      <div className="top-brand">
        <div className="top-brand-inner">
          <div className="brand-left">
            <div className="brand-logo">
              <MegaLogo />
            </div>

            <div className="brand-text">
              <div className="brand-title">MEGA888 AI</div>
              <div className="brand-sub">Tips • RTP • VIP Scanner</div>
            </div>
          </div>

          <div className="brand-chip">Premium</div>
        </div>
      </div>

      {/* 🏆 LIVE WINNING TICKER - Between navbar and content */}
      <WinningTicker />

      {/* Content */}
      <div className="app-wrap">
        <div className="app-shell">{children}</div>
      </div>

      {/* SEO Footer Links — helps Google discover all pages */}
      {!isChat && (
        <footer style={{ padding: "1.5rem 1rem 5rem", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.8rem" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#ef4444", marginBottom: 6, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>Mega888</div>
                <Link href="/" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>🏠 AI Scanner</Link>
                <Link href="/mega888" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>🧭 Mega888 Hub</Link>
                <Link href="/trusted" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>✅ Company Trusted</Link>
                <Link href="/share" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>⭐ Share & Stars</Link>
                <Link href="/info" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>ℹ️ Info & FAQ</Link>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#8b5cf6", marginBottom: 6, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>Tips & Game</div>
                <Link href="/blog" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>📝 Blog Tips</Link>
                <Link href="/games" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>🎮 Semua Game</Link>
                <Link href="/blog/tips-mega888-pro" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>💡 Tips Pro</Link>
                <Link href="/blog/hack-rtp-mega888" style={{ display: "block", color: "#94a3b8", textDecoration: "none", padding: "2px 0" }}>🎯 Pola RTP AI</Link>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.72rem", color: "#64748b", lineHeight: 1.8 }}>
              <div style={{ marginBottom: 6 }}>
                <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", margin: "0 8px" }}>About</Link>
                <Link href="/privacy-policy" style={{ color: "#94a3b8", textDecoration: "none", margin: "0 8px" }}>Privacy Policy</Link>
                <Link href="/terms" style={{ color: "#94a3b8", textDecoration: "none", margin: "0 8px" }}>Terms</Link>
                <Link href="/disclaimer" style={{ color: "#94a3b8", textDecoration: "none", margin: "0 8px" }}>Disclaimer</Link>
              </div>
              © 2026 TipsMega888 AI Scanner — Mega888 Tips, RTP & Strategi Terkini
            </div>
          </div>
        </footer>
      )}

      {/* GLOBAL CHATROOM & NAV */}
      <BottomNav />
    </div>
  );
}
