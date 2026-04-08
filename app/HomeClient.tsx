"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ParticleBackground from "./components/ParticleBackground";
import AnimatedCounter from "./components/AnimatedCounter";
import { ScanVisualizer } from "./components/ScannerAnimation";

type ToastType = "success" | "error" | "info";
type InitRes = { deviceId: string; stars: number; isNew: boolean };
type ScanRes = { ok?: boolean; overallRtp?: number; stars?: number; error?: string; detail?: string };
type Game = { _id: string; name: string; icon: string; enabled: boolean };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

const Toast = dynamic(() => import("./ui/Toast"), { ssr: false });
const TerminalScan = dynamic(() => import("./ui/TerminalScan"), { ssr: false });
const AuthModal = dynamic(() => import("./ui/AuthModal"), { ssr: false });
const InstallPrompt = dynamic(() => import("./ui/InstallPrompt"), { ssr: false });
const BottomNav = dynamic(() => import("./ui/BottomNav"), { ssr: false });

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

export default function HomeClient({ children }: { children?: React.ReactNode }) {
    const [deviceId, setDeviceId] = useState<string>("");
    const [stars, setStars] = useState<number>(0);
    const [megaId, setMegaId] = useState("");
    const [busy, setBusy] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [inputFlash, setInputFlash] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [runKey, setRunKey] = useState<string>("");
    const [showResult, setShowResult] = useState(false);
    const [idMasked, setIdMasked] = useState<string>("");
    const [lastRtp, setLastRtp] = useState<number | null>(null);
    const [rtpDisplay, setRtpDisplay] = useState<number>(0);
    const [authOpen, setAuthOpen] = useState<null | "register" | "login">(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);
    const [starNotification, setStarNotification] = useState<string | null>(null);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const [showScanline, setShowScanline] = useState(false);
    const [buttonUnlocked, setButtonUnlocked] = useState(false);
    const [buttonBounce, setButtonBounce] = useState(false);

    const COOLDOWN_DURATION = 120;
    const storageKey = "tipsmega_device_id";
    const tokenKey = "tipsmega_token";

    const resolvedDeviceId = useMemo(() => {
        if (typeof window === "undefined") return "";
        return deviceId || localStorage.getItem(storageKey) || "";
    }, [deviceId]);

    const isValidMegaId = /^(?:[12]\d{11}|09\d{10})$/.test(megaId.trim());

    // Handle input change with micro-flash effect
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 12);
        const valid = /^(?:[12]\d{11}|09\d{10})$/.test(val);
        setMegaId(val);

        if (val.length > 0) {
            setInputFlash(true);
            setTimeout(() => setInputFlash(false), 150);
        }

        if (val.length === 12 && valid) {
            setButtonUnlocked(true);
            setButtonBounce(true);
            setTimeout(() => setButtonBounce(false), 400);
            setTimeout(() => setButtonUnlocked(false), 500);
        }
    }, []);

    // Fetch games from API
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/games`);
                if (res.ok) {
                    const data = await res.json();
                    setGames(data.games || []);
                }
            } catch {
                setGames([]);
            }
        };
        fetchGames();
    }, []);

    // Check cooldown on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        const lastScanTime = localStorage.getItem("last_scan_time");
        if (lastScanTime) {
            const elapsed = Math.floor((Date.now() - parseInt(lastScanTime)) / 1000);
            const remaining = COOLDOWN_DURATION - elapsed;
            if (remaining > 0) setCooldownRemaining(remaining);
        }
    }, []);

    // Cooldown ticker
    useEffect(() => {
        if (cooldownRemaining <= 0) return;
        const interval = setInterval(() => {
            setCooldownRemaining((prev) => {
                if (prev <= 1) { clearInterval(interval); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldownRemaining]);

    // Initialize device
    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedUsername = localStorage.getItem("tipsmega_username");
        if (savedUsername) setUserName(savedUsername);
        if (localStorage.getItem(tokenKey)) setTimeout(() => setIsLoggedIn(true), 0);

        let did = localStorage.getItem(storageKey);
        if (!did) {
            did = `dev_${Math.random().toString(16).slice(2, 6)}_${Date.now().toString(16).slice(-4)}`;
            localStorage.setItem(storageKey, did);
        }
        setTimeout(() => setDeviceId(did), 0);

        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");
        if (ref) localStorage.setItem("tipsmega_joined_from_ref", ref);

        apiInit(did).then((d) => setStars(d?.stars ?? 0)).catch(() => setStars(0));
    }, []);

    useEffect(() => {
        if (lastRtp === null || Number.isNaN(lastRtp)) return;
        setRtpDisplay(Math.round((lastRtp + Number.EPSILON) * 10) / 10);
    }, [lastRtp]);

    const showToast = (msg: string, type: ToastType = "info") => {
        setToast({ msg, type });
    };

    const runScan = async () => {
        if (busy) return;

        if (cooldownRemaining > 0) {
            const minutes = Math.floor(cooldownRemaining / 60);
            const seconds = cooldownRemaining % 60;
            showToast(`⏱️ Cooldown: ${minutes}:${seconds.toString().padStart(2, '0')}`, "error");
            return;
        }

        const id = megaId.trim();
        if (!/^(?:[12]\d{11}|09\d{10})$/.test(id)) {
            setInputError(true);
            showToast("ID Invalid! Must start with 1, 2 or 09 (12 digits)", "error");
            setTimeout(() => setInputError(false), 500);
            return;
        }
        if (stars <= 0) {
            showToast("Stars tidak cukup. Login untuk bonus harian.", "error");
            return;
        }

        setBusy(true);
        setShowScanline(true);
        setTimeout(() => setShowScanline(false), 200);
        setLastRtp(null);

        try {
            await sleep(3200);
            const out = await apiScan(resolvedDeviceId, id);

            if (out?.error) {
                showToast(trimText(out.error || out.detail || "Scan failed", 140), "error");
                setBusy(false);
                return;
            }

            const sig = typeof out?.overallRtp === "number" ? out.overallRtp : null;
            const newStars = typeof out?.stars === "number" ? out.stars : stars;

            setStars(newStars);

            if (sig !== null) {
                setLastRtp(sig);
                setIdMasked(maskMegaId(id));
                setRunKey(`${Date.now()}_${id}`);
                setShowResult(true);

                localStorage.setItem("last_scan_time", Date.now().toString());
                setCooldownRemaining(COOLDOWN_DURATION);

                if (sig > 80) {
                    setTimeout(() => {
                        import("canvas-confetti").then(({ default: confetti }) => {
                            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#00f0ff', '#ff006e', '#a855f7'] });
                        }).catch(() => null);
                    }, 800);
                }
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Network failure.";
            showToast(trimText(msg, 140), "error");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="app-bg min-h-screen w-full relative overflow-x-hidden">
            {/* Particle Background */}
            <ParticleBackground />

            {/* Scanline Flash Effect */}
            {showScanline && <div className="scanline-effect" />}

            {/* Navigation */}
            <nav className="top-brand">
                <div className="top-brand-inner">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/mega888.png"
                            alt="MEGA888"
                            className="h-7 object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,0.8)] transition-all duration-300"
                        />
                        <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase max-sm:hidden">
                            Scanner
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        {!isLoggedIn ? (
                            <>
                                <button onClick={() => setAuthOpen("register")} className="px-3 py-1.5 text-[11px] font-bold text-white/70 border border-white/15 rounded-full hover:border-white/30 transition-all">
                                    Daftar
                                </button>
                                <button onClick={() => setAuthOpen("login")} className="px-4 py-1.5 text-[11px] font-bold text-white rounded-full transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00f0ff, #ff006e)", boxShadow: "0 4px 14px rgba(0, 240, 255, 0.3)" }}>
                                    Login
                                </button>
                            </>
                        ) : (
                            <span className="text-xs font-bold text-cyan-400">{userName || "User"}</span>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="app-wrap">
                <div className="app-shell">
                    {/* Hero Section */}
                    <div className="text-center fade-in-up">
                        <div className="relative inline-block mb-3">
                            <img
                                src="/mega888.png"
                                alt="MEGA888"
                                className="h-16 sm:h-20 object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                            />
                            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10" />
                        </div>

                        {/* Single H1, simplified */}
                        <h1 className="h1-cyber">
                            Mega888 RTP Scanner
                        </h1>
                        <p className="text-white/50 text-sm mt-2">
                            Semak RTP live sebelum spin • {stars > 0 ? `${stars} stars available` : "Login untuk bonus"}
                        </p>
                    </div>

                    {/* Scanner Card */}
                    <section className={`card-cyber p-5 fade-in-up ${busy ? "scan-busy" : ""}`} style={{ animationDelay: "0.1s" }}>
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="badge badge-cyan">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                Live AI
                            </span>
                            <span className={`badge ${isValidMegaId ? "badge-cyan" : "border-white/10 bg-white/5 text-white/40"}`}>
                                {busy ? "Scanning..." : isValidMegaId ? "Ready" : "Awaiting ID"}
                            </span>
                        </div>

                        {/* Input with pulse glow */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={megaId}
                                onChange={handleInputChange}
                                placeholder="Masukkan 12-digit ID"
                                maxLength={12}
                                className={`input-glow ${inputFlash ? "input-flash" : ""} ${!isValidMegaId && megaId.length > 0 ? "border-pink-500/50" : ""}`}
                            />
                            <div className="mt-2 flex justify-between text-xs text-white/40">
                                <span>{megaId.trim().length}/12 digit</span>
                                <span>Format: 123456789012</span>
                            </div>
                        </div>

                        {/* Scanner Visualizer */}
                        <div className="flex items-center justify-center my-4">
                            <ScanVisualizer isScanning={busy} />
                        </div>

                        {/* Scan Button */}
                        <button
                            onClick={runScan}
                            disabled={busy || cooldownRemaining > 0 || !isValidMegaId}
                            className={`btn-cyber-primary ${buttonBounce ? "btn-bounce" : ""} ${buttonUnlocked ? "btn-unlock" : ""}`}
                        >
                            {busy ? "SCANNING..." :
                                cooldownRemaining > 0 ? `⏱️ ${Math.floor(cooldownRemaining / 60)}:${(cooldownRemaining % 60).toString().padStart(2, '0')}` :
                                    "START SCAN"}
                        </button>

                        <div className="mt-3 text-center text-xs text-white/40">
                            {busy ? "AI analysis in progress..." : isValidMegaId ? "Ready to scan" : "Enter your Mega888 ID above"}
                        </div>
                    </section>

                    {/* Test ID Lead Magnet */}
                    <Link href="/test-id" className="card-cyber p-4 flex items-center justify-between gap-3 fade-in-up" style={{ animationDelay: "0.15s" }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 flex items-center justify-center">
                                <span className="text-xl">🎰</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Test ID Mega888 Percuma</h3>
                                <p className="text-white/50 text-[10px]">Cuba main tanpa modal</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-3 fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <Link href="/trusted" className="card-cyber p-4 text-center">
                            <div className="text-2xl mb-1">🔥</div>
                            <div className="text-sm font-bold text-white">Trusted List</div>
                            <div className="text-xs text-white/50">Verified agents</div>
                        </Link>
                        <Link href="/help" className="card-cyber p-4 text-center">
                            <div className="text-2xl mb-1">❓</div>
                            <div className="text-sm font-bold text-white">Help</div>
                            <div className="text-xs text-white/50">Panduan & FAQ</div>
                        </Link>
                    </div>

                    {/* Stars Info */}
                    <div className="card-cyber p-4 fade-in-up" style={{ animationDelay: "0.25s" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold text-white">⭐ {stars} Stars</div>
                                <div className="text-xs text-white/40">{stars > 0 ? "1 scan = 1 star" : "Login untuk bonus harian"}</div>
                            </div>
                            <Link href="/mega888" className="px-4 py-2 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition">
                                Hub →
                            </Link>
                        </div>
                    </div>

                    {children}
                </div>
            </main>

            {/* RTP Result */}
            {lastRtp !== null && !busy && (
                <section className="card-cyber p-5 m-4 fade-in-up">
                    <div className="text-[10px] text-cyan-400/60 font-mono tracking-widest uppercase mb-2">
                        [RESULT] Overall RTP
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 to-cyan-500">
                            <AnimatedCounter
                                value={rtpDisplay}
                                decimals={1}
                                suffix="%"
                                className="inline-block"
                            />
                        </div>
                        <div className="text-xs text-white/60 pb-2">estimated</div>
                    </div>
                </section>
            )}

            {/* Scan Result Modal */}
            {showResult && runKey && (
                <div className="modal-backdrop">
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="font-bold text-cyan-400">✅ SCAN COMPLETE</h3>
                            <button onClick={() => setShowResult(false)} className="text-white/60 hover:text-white text-2xl">&times;</button>
                        </div>
                        <div className="p-4">
                            <TerminalScan
                                key={runKey}
                                games={games.map(g => g.name)}
                                overallRtp={lastRtp ?? 0}
                                idMasked={idMasked || "---"}
                                onComplete={() => setBusy(false)}
                            />
                        </div>
                        <div className="flex gap-3 p-4 border-t border-white/10">
                            <Link href="/mega888" className="flex-1 text-center py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition">
                                View Games
                            </Link>
                            <button onClick={() => setShowResult(false)} className="flex-1 py-3 rounded-xl font-bold text-sm bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Auth Modal */}
            {authOpen && (
                <AuthModal
                    mode={authOpen}
                    onClose={() => setAuthOpen(null)}
                    onLoginSuccess={(token, user, newStars) => {
                        localStorage.setItem(tokenKey, token);
                        const name = user || "User";
                        localStorage.setItem("tipsmega_username", name);
                        setUserName(name);
                        setStars(newStars);
                        setIsLoggedIn(true);
                        setAuthOpen(null);
                        showToast("SUCCESS: Logged in!", "success");
                    }}
                />
            )}

            {/* Toast */}
            {toast && (
                <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
            )}

            {/* Star Notification */}
            {starNotification && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-4 fade-in" style={{ minWidth: 300 }}>
                    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.3)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                <span className="text-xl">⭐</span>
                            </div>
                            <p className="font-bold text-white text-sm">{starNotification}</p>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav isBusy={busy} />
            <InstallPrompt />

            <style jsx global>{`
                .scan-busy {
                    animation: scanBusyPulse 1.2s ease-in-out infinite alternate;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
                }

                @keyframes scanBusyPulse {
                    0% { transform: scale(1); box-shadow: 0 0 10px rgba(0, 240, 255, 0.1); }
                    100% { transform: scale(1.003); box-shadow: 0 0 25px rgba(0, 240, 255, 0.2); }
                }

                @keyframes spinBorder {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}