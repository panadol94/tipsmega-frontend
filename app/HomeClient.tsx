"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, utils } from "animejs";
import Link from "next/link";
import Toast, { ToastType } from "./ui/Toast";
import TypewriterText from "./ui/TypewriterText";

import TerminalScan from "./ui/TerminalScan";
import HackerScanOverlay from "./ui/HackerScanOverlay";
import AuthModal from "./ui/AuthModal";
import InstallPrompt from "./ui/InstallPrompt";
import BottomNav from "./ui/BottomNav";
import { useGlobalSettings } from "./context/GlobalSettingsContext";
import { useStarSync } from "./lib/useStarSync";
import confetti from "canvas-confetti";

type InitRes = { deviceId: string; stars: number; isNew: boolean };
type ScanRes = { ok?: boolean; overallRtp?: number; stars?: number; error?: string; detail?: string };
type Game = { _id: string; name: string; icon: string; enabled: boolean };

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

export default function HomeClient() {
    const [deviceId, setDeviceId] = useState<string>("");
    const [stars, setStars] = useState<number>(0);

    const [megaId, setMegaId] = useState("");
    const [busy, setBusy] = useState(false);
    const [inputError, setInputError] = useState(false);

    // ✅ Dynamic games from API
    const [games, setGames] = useState<Game[]>([]);

    // ✅ TerminalScan (animated)
    const [runKey, setRunKey] = useState<string>("");
    const [showResult, setShowResult] = useState(false);
    const [idMasked, setIdMasked] = useState<string>("");
    const [lastRtp, setLastRtp] = useState<number | null>(null);

    // RTP UI animation
    const rtpAnimRef = useRef<{ val: number }>({ val: 0 });
    const rtpPrevRef = useRef<number>(0);
    const rtpAnimInstRef = useRef<ReturnType<typeof animate> | null>(null);
    const scanPulseAnimInstRef = useRef<ReturnType<typeof animate> | null>(null);
    const [rtpDisplay, setRtpDisplay] = useState<number>(0);

    // auth UI
    const [authOpen, setAuthOpen] = useState<null | "register" | "login">(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

    // Star notification
    const [starNotification, setStarNotification] = useState<string | null>(null);

    // Cooldown state (2 minutes)
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const COOLDOWN_DURATION = 120; // 2 minutes in seconds

    // Hacker scan overlay
    const [showHackerOverlay, setShowHackerOverlay] = useState(false);

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

    const isValidMegaId = /^(?:[12]\d{11}|09\d{10})$/.test(megaId.trim());

    // Entrance animation
    useLayoutEffect(() => {
        const prefersReducedMotion =
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let safetyTimeout: number | null = null;

        const queryEls = () => {
            const heroEls = Array.from(document.querySelectorAll<HTMLElement>(".tm-hero"));
            const scanEls = Array.from(document.querySelectorAll<HTMLElement>(".tm-scan"));
            return { heroEls, scanEls };
        };

        const forceFinalState = () => {
            const { heroEls, scanEls } = queryEls();
            heroEls.forEach((el) => {
                el.style.opacity = "1";
                el.style.transform = "none";
                el.style.willChange = "";
            });
            scanEls.forEach((el) => {
                el.style.opacity = "1";
                el.style.transform = "none";
                el.style.willChange = "";
            });
        };

        const applyInitialHiddenState = () => {
            const { heroEls, scanEls } = queryEls();
            for (const el of heroEls) {
                el.style.opacity = "0";
                el.style.transform = "translateY(18px)";
                el.style.willChange = "opacity, transform";
            }
            for (const el of scanEls) {
                el.style.opacity = "0";
                el.style.transform = "translateY(10px)";
                el.style.willChange = "opacity, transform";
            }
        };

        const animateIn = () => {
            if (prefersReducedMotion) {
                forceFinalState();
                return;
            }

            applyInitialHiddenState();

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    try {
                        const { heroEls, scanEls } = queryEls();
                        animate(heroEls, {
                            opacity: [0, 1],
                            translateY: [18, 0],
                            delay: utils.stagger(110),
                            duration: 750,
                            easing: "easeOutCubic",
                            complete: forceFinalState,
                        });

                        animate(scanEls, {
                            opacity: [0, 1],
                            translateY: [10, 0],
                            duration: 650,
                            easing: "easeOutCubic",
                            delay: 250,
                            complete: forceFinalState,
                        });
                    } catch {
                        forceFinalState();
                    }
                });
            });

            if (safetyTimeout) window.clearTimeout(safetyTimeout);
            safetyTimeout = window.setTimeout(forceFinalState, 2000);
        };

        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) animateIn();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                const { heroEls } = queryEls();
                const isHidden = heroEls.some((el) => el.style.opacity === "0");
                if (isHidden) animateIn();
            }
        };

        animateIn();

        window.addEventListener("pageshow", handlePageShow);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (safetyTimeout) window.clearTimeout(safetyTimeout);
            forceFinalState();
        };
    }, []);

    // Animate RTP number when result changes
    useEffect(() => {
        if (lastRtp === null || Number.isNaN(lastRtp)) return;

        const from = rtpPrevRef.current || 0;
        rtpPrevRef.current = lastRtp;

        if (rtpAnimInstRef.current) {
            rtpAnimInstRef.current.pause();
            rtpAnimInstRef.current = null;
        }
        rtpAnimRef.current.val = from;

        rtpAnimInstRef.current = animate(rtpAnimRef.current, {
            val: lastRtp,
            duration: 900,
            easing: "easeOutExpo",
            update: () => {
                const v = Math.round((rtpAnimRef.current.val + Number.EPSILON) * 10) / 10;
                setRtpDisplay(v);
            },
        });
    }, [lastRtp]);

    // Fetch games from API
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/games`);
                if (res.ok) {
                    const data = await res.json();
                    setGames(data.games || []);
                }
            } catch (err) {
                console.error("Failed to fetch games:", err);
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
            if (remaining > 0) {
                setCooldownRemaining(remaining);
            }
        }
    }, [COOLDOWN_DURATION]);

    // Cooldown ticker
    useEffect(() => {
        if (cooldownRemaining <= 0) return;

        const interval = setInterval(() => {
            setCooldownRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldownRemaining]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedUsername = localStorage.getItem("tipsmega_username");
        if (savedUsername) setUserName(savedUsername);
        if (localStorage.getItem(tokenKey)) {
            setTimeout(() => setIsLoggedIn(true), 0);
        }

        let did = localStorage.getItem(storageKey);
        if (!did) {
            did = `dev_${Math.random().toString(16).slice(2, 6)}_${Date.now().toString(16).slice(-4)}`;
            localStorage.setItem(storageKey, did);
        }
        setTimeout(() => setDeviceId(did), 0);

        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");
        if (ref) {
            localStorage.setItem("tipsmega_joined_from_ref", ref);
            console.log("Ref detected:", ref);
        }

        const checkIpChange = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                const currentIp = data.ip;
                const storedIp = localStorage.getItem('user_last_ip');

                if (storedIp && storedIp !== currentIp) {
                    showToast(
                        `⚠️ IP berubah! Cooldown masih aktif per device.`,
                        "error"
                    );
                    playSound("error");
                    triggerHaptic(300);
                }

                localStorage.setItem('user_last_ip', currentIp);
            } catch (error) {
                console.error('IP check failed:', error);
            }
        };

        checkIpChange();

        apiInit(did)
            .then((d) => setStars(d?.stars ?? 0))
            .catch(() => setStars(0));
    }, []);

    // AUTO STAR SYNC
    useStarSync({
        token: typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null,
        deviceId: resolvedDeviceId,
        enabled: isLoggedIn,
        onStarsUpdated: (newStars, claimedAmount) => {
            setStars(newStars);
            if (claimedAmount > 0) {
                const message = `✅ Claimed ${claimedAmount} stars! Total: ${newStars}`;
                setStarNotification(message);
                showToast(message, "success");
                playSound("success");
                triggerHaptic(100);
                setTimeout(() => setStarNotification(null), 5000);
            }
        },
        onPendingDetected: (pending) => {
            const message = `✨ You have ${pending} pending stars!`;
            setStarNotification(message);
            playSound("click");
            triggerHaptic(50);
            setTimeout(() => setStarNotification(null), 5000);
        },
    });

    async function runScan() {
        if (busy) return;

        if (cooldownRemaining > 0) {
            const minutes = Math.floor(cooldownRemaining / 60);
            const seconds = cooldownRemaining % 60;
            showToast(`⏱️ Cooldown: ${minutes}:${seconds.toString().padStart(2, '0')}`, "error");
            playSound("error");
            return;
        }

        const id = megaId.trim();
        if (!/^(?:[12]\d{11}|09\d{10})$/.test(id)) {
            setInputError(true);
            showToast("ID Invalid! Must start with 1, 2 or 09 (12 digits)", "error");
            setTimeout(() => setInputError(false), 500);
            return;
        }
        if (!resolvedDeviceId) {
            showToast("Device not initialized.", "error");
            return;
        }
        if (stars <= 0) {
            showToast("Stars tidak cukup. Login untuk bonus harian.", "error");
            playSound("error");
            triggerHaptic(200);
            return;
        }

        setBusy(true);
        setShowHackerOverlay(true);
        setLastRtp(null);
        playSound("click");
        triggerHaptic(40);

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }

        showToast("⚡ High-speed connection recommended", "info");

        try {
            await sleep(3200);

            const out = await apiScan(resolvedDeviceId, id);

            if (out?.error) {
                if (out.error.includes("no stars")) {
                    showToast("Stars habis! Login untuk refresh.", "error");
                } else {
                    showToast(trimText(out.error || out.detail || "Scan failed", 140), "error");
                }
                setBusy(false);
                setShowHackerOverlay(false);
                return;
            }

            const sig = typeof out?.overallRtp === "number" ? out.overallRtp : null;
            const newStars = typeof out?.stars === "number" ? out.stars : stars;

            setStars(newStars);

            if (sig !== null) {
                setLastRtp(sig);
                setIdMasked(maskMegaId(id));

                setShowHackerOverlay(false);
                setRunKey(`${Date.now()}_${id}`);
                        setShowResult(true);

                setScanActive(true);

                localStorage.setItem("last_scan_time", Date.now().toString());
                setCooldownRemaining(COOLDOWN_DURATION);

                playSound("success");
                triggerHaptic([50, 50, 50]);

                if (sig > 80) {
                    setTimeout(() => {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#ff6b6b', '#a855f7', '#ff00ff', '#ff4d4d'],
                        });
                    }, 800);
                }
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Network failure.";
            showToast(trimText(msg, 140), "error");
            setBusy(false);
            setShowHackerOverlay(false);
        }
    }

    // Scan pulse while busy
    useEffect(() => {
        if (!busy) {
            if (scanPulseAnimInstRef.current) {
                scanPulseAnimInstRef.current.pause();
                scanPulseAnimInstRef.current = null;
            }
            return;
        }

        scanPulseAnimInstRef.current = animate(".tm-scan-pulse", {
            boxShadow: [
                "0 0 0 rgba(255,77,77,0)",
                "0 0 26px rgba(255,77,77,0.20)",
            ],
            scale: [1, 1.01],
            direction: "alternate",
            loop: true,
            duration: 850,
            easing: "easeInOutSine",
        });
    }, [busy]);

    return (
        <>
            {/* HACKER SCAN OVERLAY */}
            {showHackerOverlay && (
                <HackerScanOverlay megaId={megaId} />
            )}

            {/* Premium Navigation — glassmorphism */}
            <nav
                className="flex items-center justify-between px-4 py-3 sticky top-0 z-50"
                style={{
                    background: "rgba(7,9,15,0.85)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 1px 24px rgba(0,0,0,0.5)",
                }}
            >
                <Link href="/" className="flex items-center gap-2.5 group">
                    {isLoggedIn ? (
                        <>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center p-[2px] shadow-[0_0_15px_rgba(255,77,77,0.3)]">
                                <div className="w-full h-full bg-[#07090f] rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-white text-[13px] tracking-wide">
                                    {userName || "User"}
                                </span>
                                <span className="text-[9px] text-red-400 font-semibold tracking-wider uppercase mt-0.5">
                                    Premium
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <img
                                src="/mega888.png"
                                alt="MEGA888"
                                className="h-6 sm:h-7 object-contain drop-shadow-[0_0_5px_rgba(255,77,77,0.4)] group-hover:drop-shadow-[0_0_10px_rgba(255,77,77,0.8)] transition-all duration-300"
                            />
                            <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase mt-0.5 max-sm:hidden">
                                SCANNER
                            </span>
                        </div>
                    )}
                </Link>

                {/* Right nav cluster */}
                <div className="flex items-center gap-1.5">
                    <Link
                        href="/trusted"
                        className="px-3 py-1.5 text-[11px] font-bold text-white/50 hover:text-white transition-colors hidden sm:inline-flex"
                    >
                        Trusted
                    </Link>
                    <Link
                        href="/help"
                        className="px-3 py-1.5 text-[11px] font-bold text-white/50 hover:text-white transition-colors hidden sm:inline-flex"
                    >
                        Help
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setAuthOpen("register")}
                                className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
                                style={{ background: "rgba(255,255,255,0.04)" }}
                            >
                                Daftar
                            </button>
                            <button
                                onClick={() => setAuthOpen("login")}
                                className="px-4 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:scale-105 hover:shadow-md"
                                style={{
                                    background: "linear-gradient(135deg, #4f8EFF, #7B5CFF)",
                                    boxShadow: "0 4px 14px rgba(79,142,255,0.35)",
                                }}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                if (confirm("Logout?")) {
                                    localStorage.removeItem(tokenKey);
                                    setIsLoggedIn(false);
                                    window.location.reload();
                                }
                            }}
                            className="px-3 py-1.5 text-[11px] font-bold text-white/70 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            {/* Scanner Section - CENTERED & CLEAN */}
            <main className="flex flex-col items-center justify-start min-h-screen py-8 px-4 pb-32">
                <div className="w-full max-w-lg space-y-6">
                    
                    {/* Hero Text — premium headline */}
                    <div className="text-center flex flex-col items-center">
                        {/* MEGA888 REAL LOGO + AI SCANNER EFFECT */}
                        <div className="relative w-64 md:w-80 h-24 md:h-28 mb-0 flex items-center justify-center group cursor-default mt-2">
                            {/* Logo Image */}
                            <img 
                                src="/mega888.png" 
                                alt="MEGA888" 
                                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,77,77,0.4)] group-hover:scale-105 transition-all duration-500"
                            />

                            {/* Tech Nodes (Brackets) */}
                            <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-[2px] h-10 bg-red-500/60 shadow-[0_0_10px_rgba(255,77,77,0.8)]" />
                            <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-[2px] h-10 bg-red-500/60 shadow-[0_0_10px_rgba(255,77,77,0.8)]" />
                            <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-[20px] w-3 h-[2px] bg-red-500/60" />
                            <div className="absolute -left-2 sm:-left-4 top-1/2 translate-y-[20px] w-3 h-[2px] bg-red-500/60" />
                            <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-[20px] w-3 h-[2px] bg-red-500/60" />
                            <div className="absolute -right-2 sm:-right-4 top-1/2 translate-y-[20px] w-3 h-[2px] bg-red-500/60" />
                            
                            {/* Ambient Glow */}
                            <div className="absolute inset-4 bg-red-600/20 blur-3xl group-hover:bg-red-500/30 transition-all duration-700 animate-pulse -z-10" />
                        </div>

                        <h1
                            className="text-3xl font-black italic relative z-20 -mt-2"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, #fca5a5 40%, #ff4d4d 80%, #991b1b 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 2px 16px rgba(255,77,77,0.30))",
                            }}
                        >
                            AI RTP SCANNER
                        </h1>
                        <p className="mt-2 text-sm text-white/50">
                            Masukkan ID untuk scan • {stars > 0 ? `${stars} stars available` : "Login untuk bonus stars"}
                        </p>
                    </div>

                    {/* Scanner Card */}
                    <section className="card relative overflow-hidden p-6 tm-scan tm-scan-pulse border-red-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950/20 rounded-3xl">
                        <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,77,77,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,77,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
                        
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-300 animate-pulse" />
                                Live AI
                            </span>
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${isValidMegaId ? "border-red-400/30 bg-red-400/10 text-red-300" : "border-white/10 bg-white/5 text-white/40"}`}>
                                {busy ? "Scanning..." : isValidMegaId ? "Ready" : "Awaiting ID"}
                            </span>
                        </div>

                        {/* Input */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 mb-4">
                            <input
                                className={`tm-scan-item input input-premium text-center text-lg ${inputError ? 'shake-error' : ''}`}
                                value={megaId}
                                onChange={(e) => setMegaId(e.target.value)}
                                inputMode="numeric"
                                placeholder="Masukkan 12-digit ID"
                                maxLength={12}
                            />
                            <div className="mt-2 flex justify-between text-xs text-white/40">
                                <span>{megaId.trim().length}/12 digit</span>
                                <span>Format: 123456789012 atau 091234567890</span>
                            </div>
                        </div>

                        {/* Terminal Animation */}
                        <div className="scanner-terminal-shell mb-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                            <div className="scanner-terminal-line" />
                            <TypewriterText text="[AI] SIGNAL READY • ENTER ID TO BEGIN SCAN..." speed={24} />
                        </div>

                        {/* Scan Button */}
                        <button
                            className={cooldownRemaining > 0 ? "tm-scan-item tm-scan-cta btn-cooldown" : "tm-scan-item tm-scan-cta btn-green-spin ripple-effect"}
                            style={{ width: '100%', opacity: (!isValidMegaId || busy || cooldownRemaining > 0) ? 0.6 : 1 }}
                            onClick={runScan}
                            disabled={busy || cooldownRemaining > 0 || !isValidMegaId}
                        >
                            <span className={cooldownRemaining > 0 ? "" : "btn-green-spin-content"}>
                                {busy ? "SCANNING..." :
                                    cooldownRemaining > 0 ? `⏱️ ${Math.floor(cooldownRemaining / 60)}:${(cooldownRemaining % 60).toString().padStart(2, '0')}` :
                                        "START SCAN"}
                            </span>
                        </button>

                        <div className="mt-3 text-center text-xs text-white/40">
                            {busy ? "AI analysis in progress..." : isValidMegaId ? "Ready to scan" : "Enter your Mega888 ID above"}
                        </div>
                    </section>

                    {/* Quick Links */}
                    <h2 className="sr-only">Pautan Pantas</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/trusted" className="card p-4 text-center border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition">
                            <div className="text-2xl mb-1">🔥</div>
                            <div className="text-sm font-bold text-white">Trusted List</div>
                            <div className="text-xs text-white/50">Verified agents</div>
                        </Link>
                        <Link href="/help" className="card p-4 text-center border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition">
                            <div className="text-2xl mb-1">❓</div>
                            <div className="text-sm font-bold text-white">Help</div>
                            <div className="text-xs text-white/50">Panduan & FAQ</div>
                        </Link>
                    </div>

                    {/* Stars Info */}
                    <h2 className="sr-only">Maklumat Stars</h2>
                    <div className="card p-4 border-white/10 bg-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold text-white">⭐ {stars} Stars</div>
                                <div className="text-xs text-white/40">{stars > 0 ? "1 scan = 1 star" : "Login untuk bonus harian"}</div>
                            </div>
                            <Link href="/mega888" className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold text-white/70 hover:text-white transition">
                                Mega888 Hub →
                            </Link>
                        </div>
                    </div>

                    {/* ── Social Proof ── */}
                    <section
                        aria-label="Social proof"
                        className="card p-4 border-red-500/20 bg-gradient-to-br from-red-950/30 to-slate-950/80"
                        style={{ borderRadius: 16 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ff6b6b", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                                ⭐ Apa Kata Pengguna
                            </span>
                            <div style={{ flex: 1, height: 1, background: "rgba(255,107,107,0.15)", borderRadius: 1 }} />
                        </div>

                        {/* Testimonial row */}
                        <div style={{ display: "grid", gap: "0.6rem" }}>
                            {[
                                {
                                    name: "Ahmad R.",
                                    loc: "Kuala Lumpur",
                                    text: "AI Scanner这名堂真系Work! 头先scan紧个game先知系 high RTP，跟住中咗个大彩 🎰",
                                    stars: 5,
                                },
                                {
                                    name: "Siti M.",
                                    loc: "Johor Bahru",
                                    text: "Guna AI Scanner ni lepas tu menang konsisten sikit. Takdak guarantee tapi odds memang improves ✔️",
                                    stars: 5,
                                },
                                {
                                    name: "Chuan L.",
                                    loc: "Penang",
                                    text: "Best part — totally free. Daugunakan daily untuk check RTP sebelum main. Highly recommend!",
                                    stars: 5,
                                },
                            ].map((t, i) => (
                                <div key={i} style={{
                                    padding: "0.85rem 1rem",
                                    borderRadius: 12,
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                        {/* Avatar circle */}
                                        <div style={{
                                            width: 30, height: 30, borderRadius: "50%",
                                            background: `hsl(${i * 60 + 180},70%,50%,0.2)`,
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "0.75rem", fontWeight: 800, color: "#fff",
                                            flexShrink: 0,
                                        }}>
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e2e8f0" }}>{t.name}</span>
                                            <span style={{ fontSize: "0.72rem", color: "#475569", marginLeft: 6 }}>{t.loc}</span>
                                        </div>
                                        <div style={{ marginLeft: "auto", color: "#ef4444", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                                            {"★".repeat(t.stars)}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "0.83rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>{t.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trust stats bar */}
                        <div style={{
                            marginTop: 12, padding: "0.7rem 1rem",
                            borderRadius: 10,
                            background: "rgba(255,77,77,0.06)",
                            border: "1px solid rgba(255,77,77,0.12)",
                            display: "flex", justifyContent: "space-around",
                        }}>
                            {[
                                { val: "4.9/5", lbl: "Rating Purata" },
                                { val: "50K+", lbl: "Pengguna Aktif" },
                                { val: "2024–2026", lbl: "Online" },
                            ].map((s) => (
                                <div key={s.lbl} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#ff6b6b" }}>{s.val}</div>
                                    <div style={{ fontSize: "0.68rem", color: "#334155", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.lbl}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>

            {/* RTP RESULT */}
            <h2 className="sr-only">Keputusan RTP</h2>
            {lastRtp !== null && !busy ? (
                <section className="card p-5 m-4 border-red-500/20 bg-red-500/5 rounded-3xl">
                    <div className="text-[10px] text-white/60 font-mono tracking-widest uppercase mb-2">
                        [RESULT] Overall RTP
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-red-200 to-red-500">
                            {rtpDisplay.toFixed(1)}%
                        </div>
                        <div className="text-xs text-white/60 pb-2">estimated</div>
                    </div>
                </section>
            ) : null}

            {/* SCAN RESULT MODAL */}
            {showResult && runKey && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowResult(false)} />
                    <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-red-500/30 rounded-3xl overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="font-bold text-red-300">✅ SCAN COMPLETE</h3>
                            <button onClick={() => setShowResult(false)} className="text-white/60 hover:text-white text-2xl">&times;</button>
                        </div>
                        <div className="p-4">
                            <TerminalScan
                                key={runKey}
                                games={games.map(g => g.name)}
                                overallRtp={lastRtp ?? 0}
                                idMasked={idMasked || "---"}
                                onComplete={() => {
                                    setBusy(false);
                                    setScanActive(false);
                                }}
                            />
                        </div>
                        <div className="flex gap-3 p-4 border-t border-white/10">
                            <button onClick={() => { const text = `🎰 MEGA888 RTP: ${lastRtp}% | ID: ${idMasked} | TipsMega888.com`; navigator.share ? navigator.share({title:'RTP Result',text}) : (navigator.clipboard.writeText(text),alert('Copied!')); }} className="flex-1 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 font-bold text-sm">📤 SHARE</button>
                            <button onClick={() => setShowResult(false)} className="flex-1 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-bold text-sm">CLOSE</button>
                        </div>
                    </div>
                </div>
            )}

            {/* AUTH MODAL */}
            {authOpen && (
                <AuthModal
                    initialMode={authOpen}
                    deviceId={resolvedDeviceId}
                    onClose={() => setAuthOpen(null)}
                    onLoginSuccess={(token, newStars, user) => {
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

            {toast && (
                <Toast
                    message={toast.msg}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Star Notification */}
            {starNotification && (
                <div
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-4 fade-in duration-500"
                    style={{ minWidth: 300, maxWidth: '90%' }}
                >
                    <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/20 via-red-500/20 to-red-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(255,77,77,0.4)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                <span className="text-xl">⭐</span>
                            </div>
                            <p className="font-bold text-white text-sm">{starNotification}</p>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav isBusy={busy} />
            <InstallPrompt />

            <style jsx>{`
                .btn-cooldown {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #ff6b35, #f7931e);
                    border: 2px solid rgba(255, 107, 53, 0.3);
                    border-radius: 16px;
                    color: white;
                    font-weight: bold;
                    font-size: 15px;
                    cursor: not-allowed;
                    animation: pulse-cooldown 2s ease-in-out infinite;
                }

                .tm-scan-cta {
                    min-height: 56px;
                }

                @keyframes pulse-cooldown {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(0.985); }
                }

                .scanner-terminal-shell {
                    position: relative;
                    overflow: hidden;
                }

                .scanner-terminal-line {
                    position: absolute;
                    inset: 0 auto 0 -30%;
                    width: 30%;
                    background: linear-gradient(90deg, transparent, rgba(255, 77, 77, 0.15), transparent);
                    filter: blur(1px);
                    animation: scannerSweep 3.8s linear infinite;
                    pointer-events: none;
                }

                @keyframes scannerSweep {
                    0% { transform: translateX(0); opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { transform: translateX(430%); opacity: 0; }
                }
            `}</style>
        </>
    );
}
