"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MegaLogo from "./MegaLogo";
import MatrixRain from "./MatrixRain";
import BottomNav from "./BottomNav";
import VisitorTracker from "./VisitorTracker";

/* ---------- Fake Winning Ticker ---------- */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

const WINNER_NAMES = [
  "Ahmad", "Siti", "Muhammad", "Nur", "Mohd", "Faizal", "Aisyah",
  "Hafiz", "Syafiq", "Amirah", "Rizal", "Nadia", "Zulkifli", "Farah",
  "Azman", "Hidayah", "Irfan", "Liyana", "Kamarul", "Dina", "Rashid",
  "Hana", "Firdaus", "Ain", "Haziq", "Balqis", "Fikri", "Wani",
  "Arif", "Mira", "Danial", "Shazwani", "Aiman", "Yana", "Harith",
];
const FALLBACK_COMPANIES = ["WINBOX", "ME88", "BK8", "MEGA888", "918KISS"];
const AMOUNTS = [
  500, 800, 1200, 1500, 1800, 2000, 2300, 2500, 2800, 3000,
  3200, 3500, 3700, 4000, 4500, 5000, 5500, 6000, 6500, 7000,
  7500, 8000, 8500, 9000, 10000, 12000, 15000,
];
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function fmtRM(n: number) {
  return `RM${n.toLocaleString("en-MY")}`;
}

function WinningTicker() {
  const [companies, setCompanies] = useState<string[]>(FALLBACK_COMPANIES);
  const [current, setCurrent] = useState(() => ({
    name: pickRandom(WINNER_NAMES),
    amount: pickRandom(AMOUNTS),
    company: pickRandom(FALLBACK_COMPANIES),
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

  // Cycle ticker every 3.5s
  useEffect(() => {
    const iv = setInterval(() => {
      setAnim(false);
      setTimeout(() => {
        setCurrent({
          name: pickRandom(WINNER_NAMES),
          amount: pickRandom(AMOUNTS),
          company: pickRandom(companies),
        });
        setAnim(true);
      }, 300);
    }, 3500);
    return () => clearInterval(iv);
  }, [companies]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 px-4 py-2.5 border-b border-emerald-500/10">
      {/* Subtle shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.3) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmerTicker 4s linear infinite",
        }}
      />
      <div className="relative flex items-center gap-3 max-w-lg mx-auto">
        {/* LIVE dot */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[8px] font-black tracking-widest text-emerald-400 uppercase">Live</span>
        </div>
        {/* Winning text */}
        <div
          className={`flex-1 text-xs font-semibold text-white/90 transition-all duration-300 ${anim ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <span className="text-yellow-400 font-black">{current.name}</span>
          {" "}berjaya cuci{" "}
          <span className="text-emerald-400 font-black">{fmtRM(current.amount)}</span>
          {" "}dari{" "}
          <span className="text-cyan-400 font-black">{current.company}</span>
          {" "}🎉
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

      {/* GLOBAL CHATROOM & NAV */}
      <BottomNav />

      {/* Visitor notification - sends alert to admin Telegram group */}
      <VisitorTracker />
    </div>
  );
}