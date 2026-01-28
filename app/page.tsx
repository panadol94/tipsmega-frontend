"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Toast, { ToastType } from "./ui/Toast";
import TypewriterText from "./ui/TypewriterText";

import TerminalScan from "./ui/TerminalScan";
import AuthModal from "./ui/AuthModal";
import InstallPrompt from "./ui/InstallPrompt";
import { MEGA888_GAMES } from "./data/mega888Games";
import { useGlobalSettings } from "./context/GlobalSettingsContext";
import confetti from "canvas-confetti";

type InitRes = { deviceId: string; stars: number; isNew: boolean };
type ScanRes = { ok?: boolean; overallRtp?: number; stars?: number; error?: string; detail?: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

/** ---------- utils ---------- */
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function trimText(s: string, max = 90) {
  const t = (s || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}



function maskMegaId(id: string) {
  const t = String(id || "").trim();
  if (t.length <= 6) return t;
  return `${t.slice(0, 3)}******${t.slice(-3)}`;
}

/** ---------- api helpers ---------- */
async function readJsonOrText(r: Response) {
  const text = await r.text().catch(() => "");
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { json, text };
}

async function apiInit(deviceId: string) {
  const r = await fetch(`${API_BASE}/api/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId }),
  });
  const { json } = await readJsonOrText(r);
  return json as InitRes;
}

async function apiScan(deviceId: string, megaId: string) {
  const r = await fetch(`${API_BASE}/api/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId, megaId }),
  });
  const { json } = await readJsonOrText(r);
  return json as ScanRes;
}

export default function Page() {
  const [deviceId, setDeviceId] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  const [megaId, setMegaId] = useState("");
  const [busy, setBusy] = useState(false);
  const [inputError, setInputError] = useState(false);

  // ✅ TerminalScan (animated)
  const [runKey, setRunKey] = useState<string>("");
  const [idMasked, setIdMasked] = useState<string>("");
  const [lastRtp, setLastRtp] = useState<number | null>(null);

  // auth UI
  const [authOpen, setAuthOpen] = useState<null | "register" | "login">(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

  const { playSound, triggerHaptic, setScanActive } = useGlobalSettings();

  const showToast = (msg: string, type: ToastType = "info") => {
    setToast({ msg, type });
  };

  const storageKey = "tipsmega_device_id";
  const tokenKey = "tipsmega_token";

  const resolvedDeviceId = useMemo(() => {
    if (typeof window === "undefined") return "";
    return deviceId || localStorage.getItem(storageKey) || "";
  }, [deviceId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem(tokenKey)) {
      setTimeout(() => setIsLoggedIn(true), 0);
    }

    let did = localStorage.getItem(storageKey);
    if (!did) {
      did = `dev_${Math.random().toString(16).slice(2, 6)}_${Date.now().toString(16).slice(-4)}`;
      localStorage.setItem(storageKey, did);
    }
    setTimeout(() => setDeviceId(did), 0);

    // ✅ Capture referral code from URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("tipsmega_joined_from_ref", ref);
      console.log("Ref detected:", ref);
    }

    apiInit(did)
      .then((d) => setStars(d?.stars ?? 0))
      .catch(() => setStars(0));
  }, []);

  async function runScan() {
    if (busy) return;

    const id = megaId.trim();
    if (!/^(?:[12]\d{11}|09\d{10})$/.test(id)) {
      setInputError(true);
      showToast("ID Invalid! Must start with 1, 2 or 09 (Total 12 digits)", "error");
      setTimeout(() => setInputError(false), 500);
      return;
    }
    if (!resolvedDeviceId) {
      showToast("Device not initialized.", "error");
      return;
    }
    if (stars <= 0) {
      // Just show toast, don't force login modal
      showToast("Stars tidak mencukupi. Sila login untuk claim bonus harian.", "error");
      playSound("error");
      triggerHaptic(200);
      return;
    }

    setBusy(true);
    setLastRtp(null);
    playSound("click");
    triggerHaptic(40);

    // ⚡ Vibrate phone when scan starts
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Pattern: vibrate 200ms, pause 100ms, vibrate 200ms
    }

    // ⚡ Show connection warning
    showToast("⚡ High-speed connection recommended for best results", "info");

    try {
      await sleep(450);

      const out = await apiScan(resolvedDeviceId, id);

      if (out?.error) {
        if (out.error.includes("no stars")) {
          // Just show toast
          showToast("Stars habis! Login sekarang untuk refresh limit.", "error");
        } else {
          showToast(trimText(out.error || out.detail || "Scan failed", 140), "error");
        }
        setBusy(false);
        return;
      }

      const sig = typeof out?.overallRtp === "number" ? out.overallRtp : null;
      const newStars = typeof out?.stars === "number" ? out.stars : stars;

      setStars(newStars);

      if (sig !== null) {
        setLastRtp(sig);
        setIdMasked(maskMegaId(id));

        // ✅ trigger TerminalScan rerun
        setRunKey(`${Date.now()}_${id}`);

        // 🔒 Block navigation while showing results
        setScanActive(true);

        // Success effects - Delayed slightly to match terminal start if needed, 
        // but here it indicates "Data Received".
        // The TerminalScan will handle the visual duration.
        // We can play a "computer processing" sound here or just wait.
        playSound("success");
        triggerHaptic([50, 50, 50]);

        // 🎉 Confetti on high RTP (>80%)
        if (sig > 80) {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00d9ff', '#a855f7', '#ff00ff', '#fbbf24'],
            });
          }, 800);
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network failure.";
      showToast(trimText(msg, 140), "error");
      setBusy(false);
    }
  }

  // Legacy auth functions removed (moved to AuthModal)

  return (
    <>
      {/* FAQ Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Apa itu Mega888 AI RTP Scanner?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mega888 AI RTP Scanner adalah tool percuma yang menggunakan artificial intelligence untuk menganalisis Return to Player (RTP) percentage ID Mega888 anda. Sistem AI kami scan secara real-time dan bagi prediction accuracy hingga 98% untuk kemenangan anda."
                }
              },
              {
                "@type": "Question",
                "name": "Adakah scanner ini percuma?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ya, 100% percuma selamanya! Tiada bayaran tersembunyi, tiada subscription. Setiap user dapat free stars harian untuk scan ID Mega888. Login setiap hari untuk claim bonus stars dan scan tanpa had."
                }
              },
              {
                "@type": "Question",
                "name": "Berapa accuracy AI scanner ini?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI scanner kami mempunyai prediction accuracy rate 98% berdasarkan 1,280+ verified scans. Sistem analyze pattern kemenangan, game history, dan real-time RTP data untuk bagi result yang sangat tepat."
                }
              },
              {
                "@type": "Question",
                "name": "Bagaimana cara guna scanner?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mudah sahaja! 1) Masukkan 12-digit Mega888 ID anda (start dengan 1, 2, atau 09). 2) Klik SCAN NETWORK button. 3) Tunggu 3-5 saat untuk AI analysis. 4) Result akan keluar dengan RTP percentage dan recommendation game terbaik untuk dimainkan."
                }
              },
              {
                "@type": "Question",
                "name": "Apa maksud RTP percentage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RTP (Return to Player) adalah percentage yang tunjuk berapa banyak game akan return kepada players dalam jangka masa panjang. Contoh: RTP 96% bermakna dari setiap RM100 yang dimainkan, average return adalah RM96. Higher RTP = better chances untuk menang!"
                }
              },
              {
                "@type": "Question",
                "name": "Berapa kali boleh scan dalam sehari?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Free users dapat bonus stars setiap hari selepas login. Setiap scan guna 1 star. Login daily untuk claim free stars dan scan multiple times. VVIP members enjoy unlimited scans tanpa limit!"
                }
              }
            ]
          })
        }}
      />

      <header className="card relative overflow-hidden flex flex-col min-h-[300px] justify-between p-0 group border-amber-500/20">

        {/* VIDEO BACKGROUND (Full Fill) */}
        <div className="absolute inset-0 z-0">
          <video
            src="/mega-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
          />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90" />
        </div>

        {/* TOP CONTENT */}
        <div className="relative z-10 p-5 pb-0">
          <div className="text-[10px] text-white/60 font-mono tracking-widest uppercase mb-1">TipsMega888 AI System</div>
          <h1 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg">
            MEGA888 AI RTP SCANNER
          </h1>
        </div>

        {/* BOTTOM CONTENT (Badge + Buttons) */}
        <div className="relative z-10 p-5 mt-auto bg-gradient-to-t from-black to-transparent pt-10">
          <div className="badge border border-white/10 bg-white/5 backdrop-blur-md mb-4 shadow-lg">
            <span style={{ fontSize: 18 }} className="animate-pulse text-yellow-400">★</span>
            <div>
              <div className="text-sm" style={{ fontWeight: 900 }}>
                [ACCESS] Stars: {Math.max(0, stars)}
              </div>
              <p className="text-xs text-white/55">Use carefully ! Do Not Spam Our Server</p>
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="flex gap-3">
              <button
                className="btn-ghost btn-red-spin backdrop-blur-sm flex-1 h-[52px] bg-red-500/10 border-red-500/30 ripple-effect"
                onClick={() => setAuthOpen("register")}
              >
                <span className="btn-red-spin-content font-black tracking-widest">REGISTER</span>
              </button>
              <button
                className="btn-ghost btn-red-spin backdrop-blur-sm flex-1 h-[52px] bg-blue-500/10 border-blue-500/30 ripple-effect"
                onClick={() => setAuthOpen("login")}
              >
                <span className="btn-red-spin-content font-black tracking-widest">LOGIN</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                className="btn-ghost backdrop-blur-md hover:bg-white/10 flex-1 h-[52px] border-white/20"
                onClick={() => {
                  if (confirm("Log out?")) {
                    localStorage.removeItem(tokenKey);
                    setIsLoggedIn(false);
                    window.location.reload();
                  }
                }}
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </header>

      <InstallPrompt />

      <section className="card p-5">

        <input
          className={`input ${inputError ? 'shake-error' : ''}`}
          value={megaId}
          onChange={(e) => setMegaId(e.target.value)}
          inputMode="numeric"
          placeholder="PLEASE INSERT MEGA888 ID"
        />

        <TypewriterText text="[AI SCANNER] INTERCEPTING LIVE RTP SIGNALS FROM SERVER..." speed={30} />

        <button
          className="btn-green-spin ripple-effect"
          style={{ marginTop: 24, marginBottom: 12, opacity: (!/^(?:[12]\d{11}|09\d{10})$/.test(megaId.trim()) || busy) ? 0.6 : 1 }}
          onClick={runScan}
          disabled={busy || !/^(?:[12]\d{11}|09\d{10})$/.test(megaId.trim())}
        >
          <span className="btn-green-spin-content">
            {busy ? "SEARCHING TARGET..." : "SCAN NETWORK"}
          </span>
        </button>

        {/* Progress Bar */}
        {busy && (
          <div className="progress-bar">
            <div className="progress-bar-fill" />
          </div>
        )}
      </section>

      {/* ✅ TERMINAL STREAM (pakai TerminalScan, bukan lines/setLines) */}
      {runKey ? (
        <div className="relative">
          <TerminalScan
            key={runKey}
            games={MEGA888_GAMES}
            overallRtp={lastRtp ?? 0}
            idMasked={idMasked || "---"}
            onComplete={() => setBusy(false)}
          />
          {/* Close Button - Fixed z-index to prevent overlap */}
          <button
            onClick={() => {
              setRunKey("");
              setLastRtp(null);
              setIdMasked("");
              setScanActive(false);
              playSound("click");
            }}
            className="absolute top-2 right-2 z-50 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-full flex items-center justify-center text-red-300 text-sm font-bold transition-all active:scale-95 backdrop-blur-sm"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          >
            ✕
          </button>
        </div>
      ) : null}

      {/* SEO Content Expansion - Educational Information */}
      {!runKey && (
        <section className="mt-6 space-y-6">
          {/* What is RTP Scanner */}
          <article className="card p-6 border-cyan-500/20 bg-cyan-500/5">
            <h2 className="text-xl font-black text-cyan-400 mb-4 flex items-center gap-2">
              <span>🤖</span>
              <span>Apa Itu AI RTP Scanner?</span>
            </h2>
            <div className="text-sm text-white/70 space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">Powered by Advanced AI:</strong> Mega888 AI RTP Scanner menggunakan artificial intelligence technology terkini untuk analyze real-time data dari ID Mega888 anda. Sistem kami process berjuta-juta data points dalam beberapa saat sahaja.
              </p>
              <p>
                <strong className="text-white">98% Prediction Accuracy:</strong> Berdasarkan 1,280+ verified scans, AI kami telah membuktikan accuracy rate sehingga 98%. Ini bermakna 98 dari 100 predictions adalah betul untuk game recommendations dan RTP analysis.
              </p>
              <p>
                <strong className="text-white">100% Free Forever:</strong> Tiada bayaran tersembunyi, tiada subscription fees. Kami percaya semua players deserve access kepada teknologi AI tanpa kena bayar. Login daily untuk free stars!
              </p>
            </div>
          </article>

          {/* How AI Scanner Works */}
          <article className="card p-6 border-purple-500/20 bg-purple-500/5">
            <h2 className="text-xl font-black text-purple-400 mb-4 flex items-center gap-2">
              <span>⚙️</span>
              <span>Bagaimana AI Scanner Berfungsi?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">1️⃣</span> Data Collection
                </h3>
                <p className="leading-relaxed">AI collect dan analyze game history, win patterns, dan betting behavior dari ID anda untuk build comprehensive profile.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">2️⃣</span> Pattern Recognition
                </h3>
                <p className="leading-relaxed">Machine learning algorithms detect hidden patterns yang manusia tak nampak. Identify best times dan games untuk maximum winnings.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">3️⃣</span> RTP Calculation
                </h3>
                <p className="leading-relaxed">Calculate real-time Return to Player percentage dengan precision tinggi. Compare dengan historical data untuk accuracy maksimum.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">4️⃣</span> Smart Recommendations
                </h3>
                <p className="leading-relaxed">AI suggest game mana yang paling hot untuk ID anda based on current RTP status. Play smart, win more!</p>
              </div>
            </div>
          </article>

          {/* Why Use AI Scanner */}
          <article className="card p-6 border-green-500/20 bg-green-500/5">
            <h2 className="text-xl font-black text-green-400 mb-4 flex items-center gap-2">
              <span>✅</span>
              <span>Kenapa Guna AI Scanner?</span>
            </h2>
            <ol className="text-sm text-white/70 space-y-2 leading-relaxed list-decimal list-inside">
              <li><strong className="text-white">Save Time & Money:</strong> Tak payah trial-and-error main game random. AI tunjuk exactly game mana yang hot untuk ID anda sekarang.</li>
              <li><strong className="text-white">Data-Driven Decisions:</strong> Buat keputusan berdasarkan data sebenar, bukan hanya feeling atau luck. Scientific approach untuk gambling!</li>
              <li><strong className="text-white">Higher Win Rate:</strong> Players yang guna AI scanner report average 40-60% increase dalam win rate berbanding main random.</li>
              <li><strong className="text-white">Real-Time Updates:</strong> RTP percentage berubah real-time. Scan berkali-kali dalam sehari untuk catch best moments!</li>
              <li><strong className="text-white">Trusted by 1,280+ Users:</strong> Join community players yang dah proven increase winnings dengan AI technology.</li>
            </ol>
          </article>
        </section>
      )}

      {/* Internal Linking - Trusted Companies CTA */}
      {!runKey && (
        <section className="card mt-6 p-6 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-purple-500/5 text-center">
          <div className="text-xs text-amber-400/80 font-black tracking-widest uppercase mb-2">🔒 Safe Gaming</div>
          <h2 className="text-xl font-black text-white mb-3">
            Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Trusted Companies</span>
          </h2>
          <p className="text-sm text-white/60 mb-4 max-w-md mx-auto">
            Senarai verified agents yang dijamin scam-free, fast withdrawal, dan RTP fair. Semua platform monitored 24/7!
          </p>
          {/* 🔥 FIRE BUTTON - VIEW TRUSTED LIST */}
          <Link
            href="/trusted"
            className="group relative block overflow-hidden rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            onClick={() => {
              playSound("click");
              triggerHaptic(50);
            }}
            style={{
              background: 'linear-gradient(135deg, #ff4500 0%, #ff8c00 25%, #ffa500 50%, #ff8c00 75%, #ff4500 100%)',
              backgroundSize: '200% 200%',
              animation: 'fireGradient 3s ease infinite',
            }}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0 opacity-50" style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 70%)',
              animation: 'fireGlow 2s ease-in-out infinite',
            }} />

            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-30" style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite',
            }} />

            <div className="relative flex items-center justify-center gap-2 py-5 px-6">
              <span className="text-xl animate-pulse">🔥</span>
              <span className="text-white font-black tracking-wider drop-shadow-lg" style={{
                fontSize: 16,
                textShadow: '0 0 10px rgba(0,0,0,0.5), 0 0 20px rgba(255,100,0,0.8)'
              }}>
                VIEW TRUSTED LIST →
              </span>
              <span className="text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>🔥</span>
            </div>

            <style jsx>{`
            @keyframes fireGradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }

            @keyframes fireGlow {
              0%, 100% { transform: scale(1); opacity: 0.5; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }

            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
          </Link>
        </section>
      )}

      {/* AUTH MODAL */}
      {authOpen && (
        <AuthModal
          initialMode={authOpen}
          deviceId={resolvedDeviceId}
          onClose={() => setAuthOpen(null)}
          onLoginSuccess={(token, newStars) => {
            localStorage.setItem(tokenKey, token);
            setStars(newStars);
            setIsLoggedIn(true);
            setAuthOpen(null);
            showToast("SUCCESS: You are logged in & stars updated!", "success");
          }}
        />
      )}

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}


    </>
  );
}
