"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, utils } from "animejs";
import Link from "next/link";
import Toast, { ToastType } from "./ui/Toast";
import TypewriterText from "./ui/TypewriterText";
import MatrixBackground from "./components/MatrixBackground";
import TerminalStatus from "./components/TerminalStatus";

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
                            colors: ['#ff3333', '#ff0066', '#ff4444', '#ff4d4d'],
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
                "0 0 0 rgba(0,217,255,0)",
                "0 0 26px rgba(0,217,255,0.25)",
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
            {/* Matrix Background */}
            <MatrixBackground opacity={0.08} speed={1} density={1} />

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
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-white text-[13px] tracking-wide">
                            {isLoggedIn && userName ? userName : "MEGA888"}
                        </span>
                        {isLoggedIn && userName && (
                            <span className="text-[9px] text-red-400 font-semibold tracking-wider uppercase mt-0.5">
                                Premium
                            </span>
                        )}
                    </div>
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
            <main className="flex flex-col items-center justify-start min-h-screen py-4 px-4 pb-24">
                <div className="w-full max-w-lg space-y-3">
                    
                    {/* Hero Text — terminal style with holographic scan */}
                    <div className="text-center tm-hero">
                        <div className="terminal-border-red rounded-xl p-3 mb-2 bg-[#0a0f1a]/80 inline-block relative overflow-hidden">
                            <div className="text-[10px] font-mono text-red-400/70 tracking-widest uppercase mb-2">
                                System // v2.0.26
                            </div>
                            
                            {/* Premium animated MEGA888 logo */}
                            <div className="mega888-logo-container" style={{ position: "relative", display: "inline-block", marginBottom: "2px" }}>
                                {/* 3D depth shadow layers */}
                                <div className="mega888-3d-layer mega888-shadow-1">MEGA888</div>
                                <div className="mega888-3d-layer mega888-shadow-2">MEGA888</div>
                                <div className="mega888-3d-layer mega888-shadow-3">MEGA888</div>
                                
                                {/* RGB Glitch layers */}
                                <div className="mega888-glitch mega888-glitch-red" aria-hidden="true">MEGA888</div>
                                <div className="mega888-glitch mega888-glitch-red" aria-hidden="true">MEGA888</div>
                                <div className="mega888-glitch mega888-glitch-white" aria-hidden="true">MEGA888</div>
                                
                                {/* Main text */}
                                <div className="mega888-main-text">MEGA888</div>
                                
                                {/* Neon pulse overlay */}
                                <div className="mega888-neon-pulse" aria-hidden="true">MEGA888</div>
                                
                                {/* Electric spark particles */}
                                <div className="mega888-spark mega888-spark-1"></div>
                                <div className="mega888-spark mega888-spark-2"></div>
                                <div className="mega888-spark mega888-spark-3"></div>
                                <div className="mega888-spark mega888-spark-4"></div>
                            </div>
                            
                            {/* AI RTP SCANNER subtitle */}
                            <div className="mega888-subtitle">
                                <span className="mega888-subtitle-text">AI RTP SCANNER</span>
                                <span className="mega888-subtitle-cursor">▋</span>
                            </div>
                            
                            {/* Red holographic scanning line */}
                            <div className="holographic-scan-line" />
                        </div>

                        {/* Status bar */}
                        <TerminalStatus
                            messages={[
                                "SIGNAL LOCKED // AWAITING INPUT",
                                "LIVE SYNC: OK // NEURAL NET ONLINE",
                                "RTP ANALYSIS ENGINE: READY",
                            ]}
                            showLive={true}
                            showCursor={true}
                            variant="red"
                        />

                        <p className="mt-2 text-sm text-white/50 font-mono text-[11px]">
                            &gt;_ Masukkan ID untuk scan &bull; {stars > 0 ? `${stars} stars available` : "Login untuk bonus stars"}
                        </p>
                    </div>

                    {/* Scanner Card - Terminal Style */}
                    <section className="card relative overflow-hidden p-4 tm-scan tm-scan-pulse terminal-border-red bg-[#0d1321]/90 rounded-2xl">
                        {/* Terminal header bar */}
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-500/20">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-[10px] font-mono text-red-400/60 tracking-widest ml-2">
                                SCANNER_TERMINAL_v2.exe
                            </span>
                            <div className="ml-auto flex items-center gap-2">
                                <span className="live-dot" />
                                <span className="text-[10px] font-mono text-green-400 tracking-widest">LIVE_SYNC: OK</span>
                            </div>
                        </div>
                        
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-300 animate-pulse" />
                                Live AI
                            </span>
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${isValidMegaId ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/5 text-white/40"}`}>
                                {busy ? "Scanning..." : isValidMegaId ? "Ready" : "Awaiting ID"}
                            </span>
                            {/* RTP Badge */}
                            <span className="rtp-badge rtp-badge-medium">
                                <span>◆</span> RTP SCORE
                            </span>
                        </div>

                        {/* Input - Terminal Style */}
                        <div className="rounded-xl border border-red-600/30 bg-[#0a0f1a]/70 p-3 mb-3">
                            <input
                                className={`tm-scan-item terminal-input ${inputError ? 'shake-error' : ''}`}
                                value={megaId}
                                onChange={(e) => setMegaId(e.target.value)}
                                inputMode="numeric"
                                placeholder="ENTER_ID_HERE"
                                maxLength={12}
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            />
                            <div className="mt-2 flex justify-between text-xs font-mono text-red-400/50">
                                <span className="flex items-center gap-1">
                                    <span className="text-[10px]">&gt;_</span> {megaId.trim().length}/12 digit
                                </span>
                                <span>Format: 1xxxxxxxxxxx | 09xxxxxxxx</span>
                            </div>
                        </div>

                        {/* Terminal Animation */}
                        <div className="scanner-terminal-shell mb-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
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
                    <div className="grid grid-cols-2 gap-2">
                        <Link href="/trusted" className="card p-3 text-center border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition">
                            <div className="text-xl mb-0.5">🔥</div>
                            <div className="text-sm font-bold text-white">Trusted List</div>
                            <div className="text-xs text-white/50">Verified agents</div>
                        </Link>
                        <Link href="/help" className="card p-3 text-center border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition">
                            <div className="text-xl mb-0.5 emoji-glow">❓</div>
                            <div className="text-sm font-bold text-white">Help</div>
                            <div className="text-xs text-white/50">Panduan & FAQ</div>
                        </Link>
                    </div>

                    {/* Stars Info */}
                    <h2 className="sr-only">Maklumat Stars</h2>
                    <div className="card p-3 border-white/10 bg-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold text-white">⭐ {stars} Stars</div>
                                <div className="text-xs text-white/40">{stars > 0 ? "1 scan = 1 star" : "Login untuk bonus harian"}</div>
                            </div>
                            <Link href="/mega888" className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-bold text-white/70 hover:text-white transition">
                                Mega888 Hub →
                            </Link>
                        </div>
                    </div>

                    {/* ── Social Proof ── */}
                    <section
                        aria-label="Social proof"
                        className="card p-3 border-red-500/20 bg-gradient-to-br from-red-950/60 to-slate-950/80 overflow-hidden"
                        style={{ borderRadius: 16 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#22d3ee", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                                ⭐ Apa Kata Pengguna
                            </span>
                            <div style={{ flex: 1, height: 1, background: "rgba(34,211,238,0.15)", borderRadius: 1 }} />
                        </div>

                        {/* Marquee container */}
                        <div className="relative overflow-hidden">
                            {/* Fade edges */}
                            <div style={{
                                position: "absolute", left: 0, top: 0, bottom: 0, width: 40,
                                background: "linear-gradient(to right, rgba(8,15,25,0.95), transparent)",
                                zIndex: 10, pointerEvents: "none",
                            }} />
                            <div style={{
                                position: "absolute", right: 0, top: 0, bottom: 0, width: 40,
                                background: "linear-gradient(to left, rgba(8,15,25,0.95), transparent)",
                                zIndex: 10, pointerEvents: "none",
                            }} />

                            {/* Marquee track - duplicated for infinite scroll */}
                            <div className="marquee-track" style={{ display: "flex", gap: "0.75rem", width: "max-content" }}>
                                {/* First set of testimonials */}
                                {[
                                    { name: "Ahmad R.", loc: "Kuala Lumpur", text: "AI Scanner这名堂真系Work! 头先scan紧个game先知系 high RTP", stars: 5, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Siti M.", loc: "Johor Bahru", text: "Guna AI Scanner ni lepas tu menang konsisten. Odds memang improves ✔️", stars: 5, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Chuan L.", loc: "Penang", text: "Best part — totally free. Daily untuk check RTP sebelum main!", stars: 5, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Wei J.", loc: "Sabah", text: "Scanner ni confirm bagitahu RTP yang accurate. Dah biasa everyday use", stars: 5, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Nadia S.", loc: "Selangor", text: "Alhamdulillah lepas 2 minggu guna scanner ni, result lebih consistent", stars: 5, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Raj K.", loc: "Sarawak", text: "Best tool untuk Mega888! Free dan semua orang harus try", stars: 5, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Lisa T.", loc: "Melaka", text: "AI Scanner这名堂勆都用得着！scan完就知道边只game payout高", stars: 5, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
                                ].map((t, i) => (
                                    <div key={`a-${i}`} style={{
                                        minWidth: 280, maxWidth: 280,
                                        padding: "0.85rem 1rem",
                                        borderRadius: 12,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        flexShrink: 0,
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                            {/* Avatar photo */}
                                            <img
                                                src={t.photo}
                                                alt={t.name}
                                                width={32}
                                                height={32}
                                                style={{
                                                    width: 32, height: 32, borderRadius: "50%",
                                                    border: "2px solid rgba(255,255,255,0.15)",
                                                    objectFit: "cover",
                                                    flexShrink: 0,
                                                }}
                                            />
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
                                {/* Duplicate set for seamless loop */}
                                {[
                                    { name: "Ahmad R.", loc: "Kuala Lumpur", text: "AI Scanner这名堂真系Work! 头先scan紧个game先知系 high RTP", stars: 5, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Siti M.", loc: "Johor Bahru", text: "Guna AI Scanner ni lepas tu menang konsisten. Odds memang improves ✔️", stars: 5, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Chuan L.", loc: "Penang", text: "Best part — totally free. Daily untuk check RTP sebelum main!", stars: 5, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Wei J.", loc: "Sabah", text: "Scanner ni confirm bagitahu RTP yang accurate. Dah biasa everyday use", stars: 5, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Nadia S.", loc: "Selangor", text: "Alhamdulillah lepas 2 minggu guna scanner ni, result lebih consistent", stars: 5, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Raj K.", loc: "Sarawak", text: "Best tool untuk Mega888! Free dan semua orang harus try", stars: 5, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" },
                                    { name: "Lisa T.", loc: "Melaka", text: "AI Scanner这名堂勆都用得着！scan完就知道边只game payout高", stars: 5, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" },
                                ].map((t, i) => (
                                    <div key={`b-${i}`} style={{
                                        minWidth: 280, maxWidth: 280,
                                        padding: "0.85rem 1rem",
                                        borderRadius: 12,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        flexShrink: 0,
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                            <img
                                                src={t.photo}
                                                alt={t.name}
                                                width={32}
                                                height={32}
                                                style={{
                                                    width: 32, height: 32, borderRadius: "50%",
                                                    border: "2px solid rgba(255,255,255,0.15)",
                                                    objectFit: "cover",
                                                    flexShrink: 0,
                                                }}
                                            />
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
                        </div>

                        {/* Trust stats bar */}
                        <div style={{
                            marginTop: 8, padding: "0.5rem 0.75rem",
                            borderRadius: 10,
                            background: "rgba(34,211,238,0.06)",
                            border: "1px solid rgba(34,211,238,0.15)",
                            display: "flex", justifyContent: "space-around",
                        }}>
                            {[
                                { val: "4.9/5", lbl: "Rating Purata" },
                                { val: "50K+", lbl: "Pengguna Aktif" },
                                { val: "2024–2026", lbl: "Online" },
                            ].map((s) => (
                                <div key={s.lbl} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#22d3ee" }}>{s.val}</div>
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
                    <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-red-600/30 rounded-3xl overflow-hidden">
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
                            <button onClick={() => { const text = `🎰 MEGA888 RTP: ${lastRtp}% | ID: ${idMasked} | TipsMega888.com`; navigator.share ? navigator.share({title:'RTP Result',text}) : (navigator.clipboard.writeText(text),alert('Copied!')); }} className="flex-1 py-3 bg-red-500/20 border border-red-600/30 rounded-xl text-red-300 font-bold text-sm">📤 SHARE</button>
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
                    <div className="relative overflow-hidden rounded-2xl border border-red-600/30 bg-gradient-to-br from-red-500/20 via-red-500/20 to-red-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(255,77,77,0.4)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-600/30 flex items-center justify-center">
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

                .holographic-title {
                    position: relative;
                }

                .holographic-scan-line {
                    position: absolute;
                    left: -100%;
                    top: 50%;
                    width: 50%;
                    height: 2px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(255, 0, 0, 0.3) 20%, 
                        rgba(255, 50, 50, 0.9) 50%, 
                        rgba(255, 0, 0, 0.3) 80%, 
                        transparent 100%
                    );
                    box-shadow: 
                        0 0 8px rgba(255, 0, 0, 0.8),
                        0 0 16px rgba(255, 50, 50, 0.6),
                        0 0 32px rgba(255, 0, 0, 0.4),
                        0 0 64px rgba(255, 0, 0, 0.2);
                    animation: holographicScan 3s ease-in-out infinite;
                    pointer-events: none;
                    z-index: 10;
                }

                @keyframes holographicScan {
                    0% {
                        left: -100%;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        left: 150%;
                        opacity: 0;
                    }
                }

                .scanner-terminal-shell {
                    position: relative;
                    overflow: hidden;
                }

                .scanner-terminal-line {
                    position: absolute;
                    inset: 0 auto 0 -30%;
                    width: 30%;
                    background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.18), transparent);
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

                /* Marquee animation for testimonials */
                .marquee-track {
                    animation: marquee 40s linear infinite;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                /* ===== MEGA888 PREMIUM ANIMATED LOGO ===== */
                
                /* Main logo container */
                .mega888-logo-container {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 2rem;
                    font-weight: 900;
                    letter-spacing: 0.08em;
                    position: relative;
                }

                /* 3D Depth Layers */
                .mega888-3d-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 2rem;
                    font-weight: 900;
                    letter-spacing: 0.08em;
                }

                .mega888-shadow-1 {
                    color: rgba(255, 0, 0, 0.4);
                    transform: translate(3px, 3px);
                    animation: shadowFloat 3s ease-in-out infinite;
                }

                .mega888-shadow-2 {
                    color: rgba(0, 255, 255, 0.25);
                    transform: translate(6px, 6px);
                    animation: shadowFloat 3s ease-in-out infinite 0.2s;
                }

                .mega888-shadow-3 {
                    color: rgba(0, 0, 255, 0.15);
                    transform: translate(9px, 9px);
                    animation: shadowFloat 3s ease-in-out infinite 0.4s;
                }

                @keyframes shadowFloat {
                    0%, 100% { transform: translate(3px, 3px); }
                    50% { transform: translate(5px, 5px); }
                }

                /* RGB Glitch Effect */
                .mega888-glitch {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 2rem;
                    font-weight: 900;
                    letter-spacing: 0.08em;
                    opacity: 0.8;
                }

                .mega888-glitch-red {
                    color: #ff0040;
                    animation: glitchRed 2.5s infinite linear alternate-reverse;
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }

                .mega888-glitch-cyan {
                    color: #00ffff;
                    animation: glitchCyan 3s infinite linear alternate-reverse;
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }

                .mega888-glitch-white {
                    color: #ffffff;
                    animation: glitchWhite 1.8s infinite linear alternate-reverse;
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }

                @keyframes glitchRed {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 0); opacity: 0; }
                    10% { clip-path: inset(60% 0 10% 0); transform: translate(-3px, 0); opacity: 0.7; }
                    20% { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); opacity: 0; }
                    30% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 0); opacity: 0.6; }
                    40% { clip-path: inset(10% 0 70% 0); transform: translate(3px, 0); opacity: 0; }
                    50% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); opacity: 0.5; }
                    60% { clip-path: inset(5% 0 85% 0); transform: translate(2px, 0); opacity: 0; }
                    70% { clip-path: inset(70% 0 20% 0); transform: translate(-3px, 0); opacity: 0.7; }
                    80% { clip-path: inset(40% 0 40% 0); transform: translate(2px, 0); opacity: 0; }
                    90% { clip-path: inset(15% 0 75% 0); transform: translate(-2px, 0); opacity: 0.5; }
                    100% { clip-path: inset(25% 0 65% 0); transform: translate(3px, 0); opacity: 0; }
                }

                @keyframes glitchCyan {
                    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, 0); opacity: 0; }
                    15% { clip-path: inset(80% 0 5% 0); transform: translate(3px, 0); opacity: 0.6; }
                    25% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 0); opacity: 0; }
                    35% { clip-path: inset(15% 0 80% 0); transform: translate(2px, 0); opacity: 0.5; }
                    45% { clip-path: inset(55% 0 10% 0); transform: translate(-3px, 0); opacity: 0; }
                    55% { clip-path: inset(40% 0 30% 0); transform: translate(2px, 0); opacity: 0.7; }
                    65% { clip-path: inset(5% 0 90% 0); transform: translate(-2px, 0); opacity: 0; }
                    75% { clip-path: inset(65% 0 15% 0); transform: translate(3px, 0); opacity: 0.5; }
                    85% { clip-path: inset(20% 0 55% 0); transform: translate(-2px, 0); opacity: 0; }
                    95% { clip-path: inset(45% 0 35% 0); transform: translate(2px, 0); opacity: 0.6; }
                    100% { clip-path: inset(35% 0 45% 0); transform: translate(-3px, 0); opacity: 0; }
                }

                @keyframes glitchWhite {
                    0% { clip-path: inset(25% 0 65% 0); transform: translate(1px, 0); opacity: 0; }
                    20% { clip-path: inset(5% 0 85% 0); transform: translate(-1px, 0); opacity: 0.8; }
                    40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); opacity: 0; }
                    60% { clip-path: inset(35% 0 45% 0); transform: translate(-2px, 0); opacity: 0.6; }
                    80% { clip-path: inset(50% 0 25% 0); transform: translate(1px, 0); opacity: 0; }
                    100% { clip-path: inset(15% 0 70% 0); transform: translate(-1px, 0); opacity: 0.7; }
                }

                /* Main Text with Neon Glow */
                .mega888-main-text {
                    position: relative;
                    background: linear-gradient(135deg, #ff0040 0%, #ff4d88 25%, #ffffff 50%, #00d4ff 75%, #00ffff 100%);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 3s ease-in-out infinite, subtleFloat 2s ease-in-out infinite;
                    filter: drop-shadow(0 0 10px rgba(255, 0, 64, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
                }

                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes subtleFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                }

                /* Neon Pulse Overlay */
                .mega888-neon-pulse {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 2rem;
                    font-weight: 900;
                    letter-spacing: 0.08em;
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
                    animation: neonPulse 1.5s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes neonPulse {
                    0%, 100% { 
                        opacity: 0.3;
                        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                        filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
                    }
                    50% { 
                        opacity: 0.8;
                        -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9);
                        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 15px rgba(0, 255, 255, 0.6));
                    }
                }

                /* Electric Spark Particles */
                .mega888-spark {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 6px #fff, 0 0 12px #00ffff, 0 0 18px #ff0040;
                    animation: sparkFloat 1.5s ease-in-out infinite;
                }

                .mega888-spark-1 {
                    top: 10%;
                    left: 5%;
                    animation-delay: 0s;
                    animation-duration: 1.2s;
                }

                .mega888-spark-2 {
                    top: 20%;
                    right: 8%;
                    animation-delay: 0.3s;
                    animation-duration: 1.5s;
                }

                .mega888-spark-3 {
                    bottom: 25%;
                    left: 15%;
                    animation-delay: 0.6s;
                    animation-duration: 1.3s;
                }

                .mega888-spark-4 {
                    bottom: 15%;
                    right: 12%;
                    animation-delay: 0.9s;
                    animation-duration: 1.4s;
                }

                @keyframes sparkFloat {
                    0%, 100% { 
                        opacity: 0; 
                        transform: scale(0) translateY(0); 
                    }
                    25% { 
                        opacity: 1; 
                        transform: scale(1.2) translateY(-5px); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(0.8) translateY(-12px); 
                        box-shadow: 0 0 8px #fff, 0 0 16px #00ffff, 0 0 24px #ff0040;
                    }
                    75% { 
                        opacity: 0.5; 
                        transform: scale(0.4) translateY(-18px); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0) translateY(-25px); 
                    }
                }

                /* AI RTP SCANNER Subtitle */
                .mega888-subtitle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2px;
                    margin-top: 4px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.25em;
                    color: rgba(255, 255, 255, 0.9);
                    text-shadow: 0 0 10px rgba(255, 0, 64, 0.6), 0 0 20px rgba(0, 255, 255, 0.4);
                }

                .mega888-subtitle-text {
                    animation: subtitleGlow 2s ease-in-out infinite;
                }

                @keyframes subtitleGlow {
                    0%, 100% { 
                        color: rgba(255, 255, 255, 0.85);
                        text-shadow: 0 0 8px rgba(255, 0, 64, 0.5);
                    }
                    50% { 
                        color: #ffffff;
                        text-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 0, 64, 0.5);
                    }
                }

                .mega888-subtitle-cursor {
                    display: inline-block;
                    color: #00ffff;
                    animation: cursorBlink 0.8s steps(1) infinite;
                    text-shadow: 0 0 8px rgba(0, 255, 255, 0.9);
                }

                @keyframes cursorBlink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                /* Tech VIP Section Animations */
                .tech-vip-section {
                  position: relative;
                }

                .tech-grid-bg {
                  position: absolute;
                  inset: 0;
                  background-image:
                    linear-gradient(rgba(37,211,102,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(37,211,102,0.03) 1px, transparent 1px);
                  background-size: 20px 20px;
                  pointer-events: none;
                  z-index: 0;
                }

                .circuit-corner {
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  pointer-events: none;
                  z-index: 1;
                }
                .circuit-tl {
                  top: 6px;
                  left: 6px;
                  border-top: 2px solid rgba(37,211,102,0.5);
                  border-left: 2px solid rgba(37,211,102,0.5);
                  animation: circuitPulse 2s ease-in-out infinite;
                }
                .circuit-br {
                  bottom: 6px;
                  right: 6px;
                  border-bottom: 2px solid rgba(37,211,102,0.5);
                  border-right: 2px solid rgba(37,211,102,0.5);
                  animation: circuitPulse 2s ease-in-out infinite 1s;
                }

                @keyframes circuitPulse {
                  0%, 100% { opacity: 0.4; }
                  50% { opacity: 1; box-shadow: 0 0 8px rgba(37,211,102,0.5); }
                }

                .electric-border-glow {
                  position: absolute;
                  inset: 0;
                  border-radius: inherit;
                  pointer-events: none;
                  z-index: 0;
                  animation: electricPulse 3s ease-in-out infinite;
                }

                @keyframes electricPulse {
                  0%, 100% {
                    box-shadow: inset 0 0 10px rgba(37,211,102,0.1), 0 0 5px rgba(37,211,102,0.1);
                  }
                  50% {
                    box-shadow: inset 0 0 20px rgba(37,211,102,0.25), 0 0 15px rgba(37,211,102,0.3);
                  }
                }

                .tech-scan-line {
                  position: absolute;
                  left: -100%;
                  top: 0;
                  width: 60%;
                  height: 100%;
                  background: linear-gradient(90deg,
                    transparent 0%,
                    rgba(37,211,102,0.08) 30%,
                    rgba(37,211,102,0.2) 50%,
                    rgba(37,211,102,0.08) 70%,
                    transparent 100%
                  );
                  pointer-events: none;
                  z-index: 2;
                  animation: techScan 4s ease-in-out infinite;
                }

                @keyframes techScan {
                  0% { left: -100%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { left: 200%; opacity: 0; }
                }

                .spark {
                  position: absolute;
                  width: 3px;
                  height: 3px;
                  border-radius: 50%;
                  background: #25D366;
                  pointer-events: none;
                  z-index: 3;
                  animation: sparkFloat 3s ease-in-out infinite;
                }
                .spark-1 {
                  top: 20%;
                  left: 15%;
                  animation-delay: 0s;
                  box-shadow: 0 0 6px rgba(37,211,102,0.8), 0 0 12px rgba(37,211,102,0.4);
                }
                .spark-2 {
                  top: 60%;
                  right: 20%;
                  animation-delay: 1s;
                  box-shadow: 0 0 6px rgba(37,211,102,0.8), 0 0 12px rgba(37,211,102,0.4);
                }
                .spark-3 {
                  bottom: 25%;
                  left: 40%;
                  animation-delay: 2s;
                  box-shadow: 0 0 6px rgba(37,211,102,0.8), 0 0 12px rgba(37,211,102,0.4);
                }

                @keyframes sparkFloat {
                  0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
                  10% { opacity: 1; }
                  50% { transform: translateY(-8px) scale(1.5); opacity: 1; }
                  90% { opacity: 1; }
                }

                .vip-badge-pulse {
                  position: absolute;
                  top: 10px;
                  right: 12px;
                  z-index: 10;
                  animation: badgePulse 2s ease-in-out infinite;
                }

                @keyframes badgePulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.08); }
                }

                .tech-text-glow {
                  text-shadow: 0 0 10px rgba(37,211,102,0.5), 0 0 20px rgba(37,211,102,0.3);
                  animation: textGlow 3s ease-in-out infinite;
                }

                @keyframes textGlow {
                  0%, 100% { text-shadow: 0 0 10px rgba(37,211,102,0.4), 0 0 20px rgba(37,211,102,0.2); }
                  50% { text-shadow: 0 0 15px rgba(37,211,102,0.7), 0 0 30px rgba(37,211,102,0.4); }
                }

                .tech-btn-glow {
                  box-shadow: 0 0 10px rgba(37,211,102,0.3);
                  animation: btnGlow 2s ease-in-out infinite;
                }

                @keyframes btnGlow {
                  0%, 100% { box-shadow: 0 0 8px rgba(37,211,102,0.3); }
                  50% { box-shadow: 0 0 18px rgba(37,211,102,0.6), 0 0 30px rgba(37,211,102,0.3); }
                }

                .electric-icon-glow {
                  animation: iconGlow 2.5s ease-in-out infinite;
                }

                @keyframes iconGlow {
                  0%, 100% { box-shadow: 0 0 5px rgba(37,211,102,0.2); }
                  50% { box-shadow: 0 0 15px rgba(37,211,102,0.5), 0 0 25px rgba(37,211,102,0.3); }
                }

                /* Emoji Glow Animation */
                .emoji-glow {
                    filter: drop-shadow(0 0 8px currentColor);
                    text-shadow: 0 0 10px currentColor;
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                @keyframes pulse-glow {
                    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
                    50% { filter: drop-shadow(0 0 15px currentColor); }
                }
            `}</style>
        </>
    );
}
