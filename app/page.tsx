"use client";

import { useEffect, useMemo, useState } from "react";
import Toast, { ToastType } from "./ui/Toast";
import TypewriterText from "./ui/TypewriterText";

import TerminalScan from "./ui/TerminalScan";
import AuthModal from "./ui/AuthModal";
import InstallPrompt from "./ui/InstallPrompt";
import { MEGA888_GAMES } from "./data/mega888Games";
import { useGlobalSettings } from "./context/GlobalSettingsContext";

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

  const { playSound, triggerHaptic } = useGlobalSettings();

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

        // Success effects - Delayed slightly to match terminal start if needed, 
        // but here it indicates "Data Received".
        // The TerminalScan will handle the visual duration.
        // We can play a "computer processing" sound here or just wait.
        playSound("success");
        triggerHaptic([50, 50, 50]);
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
              <div className="text-xs text-white/60">[STATUS] Device Online</div>
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
      </section>

      {/* ✅ TERMINAL STREAM (pakai TerminalScan, bukan lines/setLines) */}
      {runKey ? (
        <TerminalScan
          key={runKey}
          games={MEGA888_GAMES}
          overallRtp={lastRtp ?? 0}
          idMasked={idMasked || "---"}
          onComplete={() => setBusy(false)}
        />
      ) : null}

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
