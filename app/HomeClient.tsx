"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, utils } from "animejs";
import Link from "next/link";
import { Flame, HelpCircle, Star, Send, Trophy } from "lucide-react";
import Toast, { ToastType } from "./ui/Toast";
import MatrixBackground from "./components/MatrixBackground";

import TerminalScan from "./ui/TerminalScan";
import HackerScanOverlay from "./ui/HackerScanOverlay";
import AuthModal from "./ui/AuthModal";
import InstallPrompt from "./ui/InstallPrompt";
import TestimonialCarousel from "./components/TestimonialCarousel";

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

    // React to URL auth param changes (handles client-side navigation & browser back/forward)
    useEffect(() => {
        let lastAuthParam: string | null = null;
        let userManuallyClosed = false;

        const handleAuthParam = () => {
            const params = new URLSearchParams(window.location.search);
            const authParam = params.get("auth");
            
            // Only reopen if auth param CHANGED (not just polling same URL)
            if (authParam !== lastAuthParam) {
                lastAuthParam = authParam;
                userManuallyClosed = false; // Reset on navigation
                if (authParam === "login" || authParam === "register") {
                    setAuthOpen(authParam);
                } else {
                    setAuthOpen(null);
                }
            }
        };

        handleAuthParam();

        // Poll URL changes
        const interval = setInterval(handleAuthParam, 300);
        window.addEventListener("popstate", handleAuthParam);

        return () => {
            clearInterval(interval);
            window.removeEventListener("popstate", handleAuthParam);
        };
    }, []);

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

            {/* Scanner Section - CENTERED & CLEAN */}
            <main className="flex flex-col items-center justify-start min-h-screen px-4 py-4 pb-28">
                <div className="w-full max-w-lg space-y-4">
                    <section className="tm-hero card relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-2 shadow-[0_24px_80px_rgba(2,6,23,0.45)]">
                        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
                        <img
                            src="/home/scanner-social-proof-top.jpg"
                            alt="AI RTP Scanner Teknologi Pintar Percuma"
                            className="w-full rounded-[24px] border border-white/10 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                        />
                    </section>

                    <section id="scanner-section" className="card relative overflow-hidden rounded-[28px] border border-red-500/20 bg-[#0d1321]/95 p-4 tm-scan tm-scan-pulse shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
                        <div className="flex items-center gap-2 border-b border-red-500/20 pb-2">
                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="ml-2 text-[10px] font-mono tracking-widest text-red-400/60">
                                SCANNER_TERMINAL_v2.exe
                            </span>
                            <div className="ml-auto flex items-center gap-2">
                                <span className="live-dot" />
                                <span className="text-[10px] font-mono tracking-widest text-green-400">LIVE_SYNC: OK</span>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-red-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-300 animate-pulse" />
                                Live AI
                            </span>
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${busy ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300" : isValidMegaId ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/5 text-white/40"}`}>
                                {busy ? "Scanning..." : isValidMegaId ? "Ready" : "Awaiting ID"}
                            </span>
                            <span className="rtp-badge rtp-badge-medium">
                                <span>◆</span> RTP SCORE
                            </span>
                        </div>

                        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
                            <div>
                                <div className="mb-3 space-y-1">
                                    <h2 className="text-xl font-black text-white">Scan Mega888 ID anda</h2>
                                    <p className="text-sm text-white/60">
                                        Masukkan ID untuk semakan RTP semasa. Cooldown, auth, dan result modal kekal seperti biasa.
                                    </p>
                                </div>

                                <div className="mb-3 rounded-xl border border-red-600/30 bg-[#0a0f1a]/70 p-3">
                                    <input
                                        className={`tm-scan-item terminal-input ${inputError ? 'shake-error' : ''}`}
                                        value={megaId}
                                        onChange={(e) => setMegaId(e.target.value)}
                                        inputMode="numeric"
                                        placeholder="ENTER_ID_HERE"
                                        maxLength={12}
                                        name="megaId"
                                        autoComplete="off"
                                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                    />
                                    <div className="mt-2 flex justify-between text-xs font-mono text-red-400/50">
                                        <span className="flex items-center gap-1">
                                            <span className="text-[10px]">&gt;_</span> {megaId.trim().length}/12 digit
                                        </span>
                                        <span>Format: 1xxxxxxxxxxx | 09xxxxxxxx</span>
                                    </div>
                                </div>

                                <div className="scanner-terminal-shell mb-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                                    <div className="scanner-terminal-line" />
                                    <span className="font-mono text-xs text-red-400/80">[AI] SIGNAL READY • ENTER ID TO BEGIN SCAN...</span>
                                </div>

                                <button
                                    className={cooldownRemaining > 0 ? "tm-scan-item tm-scan-cta btn-cooldown" : "tm-scan-item tm-scan-cta btn-green-spin ripple-effect"}
                                    style={{ width: '100%', opacity: (!isValidMegaId || busy || cooldownRemaining > 0) ? 0.6 : 1 }}
                                    onClick={runScan}
                                    disabled={busy || cooldownRemaining > 0 || !isValidMegaId}
                                >
                                    <span className={cooldownRemaining > 0 ? "" : "btn-green-spin-content"}>
                                        {busy ? "SCANNING..." : cooldownRemaining > 0 ? `⏱️ ${Math.floor(cooldownRemaining / 60)}:${(cooldownRemaining % 60).toString().padStart(2, '0')}` : "START SCAN"}
                                    </span>
                                </button>

                                <div className="mt-3 text-center text-xs text-white/40">
                                    {busy ? "AI analysis in progress..." : isValidMegaId ? "Ready to scan" : "Enter your Mega888 ID above"}
                                </div>
                            </div>

                            <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Flow Pantas</div>
                                <div className="mt-2 space-y-2">
                                    {[
                                        '1. Scan dulu untuk tengok signal semasa',
                                        '2. Bandingkan trusted company yang verified',
                                        '3. Join komuniti untuk alert dan update',
                                    ].map((step) => (
                                        <div key={step} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-xs text-white/70">
                                            {step}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/trusted" className="mt-3 flex items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-3 transition hover:border-red-400/40 hover:bg-red-500/15">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-[0.18em] text-red-200">Trusted Company</div>
                                        <div className="mt-1 text-sm text-white/75">Laluan kedua yang paling jelas selepas scan.</div>
                                    </div>
                                    <Flame className="h-5 w-5 text-red-300 premium-icon-glow-red" />
                                </Link>
                            </aside>
                        </div>
                    </section>

                    <section className="tm-hero space-y-3">
                        <div className="mb-1 flex items-center justify-between px-1">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/80">Shortcut pantas</h2>
                                <p className="mt-1 text-xs text-white/45">Lagi padat, terus ke flow yang paling orang guna.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <Link href="/trusted" className="card group rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/12 to-orange-500/6 p-3 text-center transition hover:border-red-400/40 hover:bg-red-500/10">
                                <div className="mb-2 flex justify-center">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/15">
                                        <Flame className="h-5 w-5 text-red-300 premium-icon-glow-red transition group-hover:scale-110" />
                                    </div>
                                </div>
                                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-white">Trusted</div>
                                <div className="mt-1 text-[10px] text-white/50">Verified payout</div>
                            </Link>

                            <Link href="/help" className="card group rounded-2xl border border-purple-500/20 bg-purple-500/5 p-3 text-center transition hover:bg-purple-500/10">
                                <div className="mb-2 flex justify-center">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/12">
                                        <HelpCircle className="h-5 w-5 text-purple-300 premium-icon-glow-purple transition group-hover:scale-110" />
                                    </div>
                                </div>
                                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-white">Help</div>
                                <div className="mt-1 text-[10px] text-white/50">Panduan ringkas</div>
                            </Link>

                            <a href="https://t.me/tipsmega888chat" target="_blank" rel="noreferrer" className="card group rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center transition hover:bg-emerald-500/10">
                                <div className="mb-2 flex justify-center">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/12">
                                        <Send className="h-5 w-5 text-emerald-300 transition group-hover:scale-110" />
                                    </div>
                                </div>
                                <div className="text-[11px] font-black uppercase tracking-[0.12em] text-white">Komuniti</div>
                                <div className="mt-1 text-[10px] text-white/50">Telegram rasmi</div>
                            </a>
                        </div>
                    </section>

                    <h2 className="sr-only">Maklumat Stars</h2>
                    <div className="card rounded-3xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-amber-400 premium-icon-glow-gold" />
                                    {stars > 0 ? (
                                        <span className="text-sm font-bold text-white">{stars} Stars</span>
                                    ) : (
                                        <span className="text-sm font-bold text-white/60">No Stars</span>
                                    )}
                                </div>
                                <div className="ml-6 text-xs text-white/40">{stars > 0 ? "1 scan = 1 star" : "Login untuk bonus harian"}</div>
                            </div>
                            <Link href="/mega888" className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:text-white">
                                Mega888 Hub →
                            </Link>
                        </div>
                    </div>

                    {/* ── Community Wins Marquee ── */}
                    <section
                        aria-label="Community wins"
                        className="card p-4 border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-950/80 to-slate-950/90 overflow-hidden"
                        style={{ borderRadius: 16 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h1 className="text-sm font-black text-white tracking-wide">
                                        🎯 TIPSMEGA888 | RTP MEGA888 LIVE
                                    </h1>
                                    <h2 className="text-[10px] text-amber-400/70 font-medium tracking-wider uppercase">
                                        Community Wins
                                    </h2>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-400 tracking-wider">LIVE</span>
                            </div>
                        </div>

                        {/* Marquee Container */}
                        <div className="relative overflow-hidden group">
                            {/* Fade edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0f1a] to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0f1a] to-transparent z-10 pointer-events-none" />

                            {/* Marquee Track */}
                            <div 
                                className="flex gap-3 wins-marquee-track"
                                style={{ width: 'max-content' }}
                            >
                                {/* First set of wins */}
                                {[
                                    { img: '/wins/win-1.jpg', amount: '4,500', game: 'Ultra Mega Big Win', player: 'Player 1', alt: 'Mega888 big win screenshot - Group WhatsApp Mega888 member RM 4,500 win' },
                                    { img: '/wins/win-2.jpg', amount: '750', game: 'Big Win', player: 'Player 2', alt: 'Group WhatsApp spin member win - Mega888 RM 750 win screenshot' },
                                    { img: '/wins/win-3.jpg', amount: '2,500', game: 'Gates of Olympus', player: 'Player 3', alt: 'Mega888 community member win - Gates of Olympus RM 2,500 jackpot' },
                                    { img: '/wins/win-4.jpg', amount: '15,000,000', game: 'CM8 Jackpot', player: 'Player 4', alt: 'Mega888 big jackpot community win - RM 15 Million CM8 Jackpot screenshot' },
                                    { img: '/wins/win-5.jpg', amount: '6,567', game: 'Rush Xmas', player: 'Player 5', alt: 'Group WhatsApp Mega888 spin win - Rush Xmas RM 6,567 big win' },
                                ].map((win, i) => (
                                    <div 
                                        key={`win-a-${i}`}
                                        className="relative group/win flex-shrink-0 w-[200px] rounded-xl overflow-hidden bg-slate-900/50 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
                                    >
                                        {/* Win Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img 
                                                src={win.img} 
                                                alt={win.alt}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/win:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                            
                                            {/* Amount Badge */}
                                            <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30">
                                                <span className="text-[10px] font-black text-slate-950">
                                                    RM {win.amount}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Win Info */}
                                        <div className="p-2.5">
                                            <p className="text-[11px] font-bold text-white truncate">
                                                {win.game}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[9px] text-white/50">{win.player}</span>
                                                <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
                                                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                                    Verified
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Duplicate set for seamless loop */}
                                {[
                                    { img: '/wins/win-1.jpg', amount: '4,500', game: 'Ultra Mega Big Win', player: 'Player 1', alt: 'Mega888 big win screenshot - Group WhatsApp Mega888 member RM 4,500 win' },
                                    { img: '/wins/win-2.jpg', amount: '750', game: 'Big Win', player: 'Player 2', alt: 'Group WhatsApp spin member win - Mega888 RM 750 win screenshot' },
                                    { img: '/wins/win-3.jpg', amount: '2,500', game: 'Gates of Olympus', player: 'Player 3', alt: 'Mega888 community member win - Gates of Olympus RM 2,500 jackpot' },
                                    { img: '/wins/win-4.jpg', amount: '15,000,000', game: 'CM8 Jackpot', player: 'Player 4', alt: 'Mega888 big jackpot community win - RM 15 Million CM8 Jackpot screenshot' },
                                    { img: '/wins/win-5.jpg', amount: '6,567', game: 'Rush Xmas', player: 'Player 5', alt: 'Group WhatsApp Mega888 spin win - Rush Xmas RM 6,567 big win' },
                                ].map((win, i) => (
                                    <div 
                                        key={`win-b-${i}`}
                                        className="relative group/win flex-shrink-0 w-[200px] rounded-xl overflow-hidden bg-slate-900/50 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img 
                                                src={win.img} 
                                                alt={win.alt}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/win:scale-110"
                                            />
                                            
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                            <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30">
                                                <span className="text-[10px] font-black text-slate-950">
                                                    RM {win.amount}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-2.5">
                                            <p className="text-[11px] font-bold text-white truncate">
                                                {win.game}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[9px] text-white/50">{win.player}</span>
                                                <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
                                                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                                    Verified
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {[
                                { val: 'RM 15M+', lbl: 'Total Won' },
                                { val: '1,200+', lbl: 'Winners' },
                                { val: 'Today', lbl: 'Just Now' },
                            ].map((s, i) => (
                                <div 
                                    key={i} 
                                    className="text-center py-2 rounded-xl bg-amber-500/5 border border-amber-500/10"
                                >
                                    <div className="text-sm font-black text-amber-400">{s.val}</div>
                                    <div className="text-[9px] text-white/40 font-medium uppercase tracking-wider">{s.lbl}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Social Proof Carousel ── */}
                    <TestimonialCarousel />

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
                    onClose={() => {
                        setAuthOpen(null);
                        // Clear auth param from URL so interval doesn't reopen
                        const url = new URL(window.location.href);
                        url.searchParams.delete("auth");
                        window.history.replaceState({}, "", url.toString());
                    }}
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
                                <Star className="w-5 h-5 text-amber-400 premium-icon-glow-gold" />
                            </div>
                            <p className="font-bold text-white text-sm">{starNotification}</p>
                        </div>
                    </div>
                </div>
            )}


            <InstallPrompt />

            <div className="fixed inset-x-0 bottom-3 z-40 px-3 md:hidden">
                <div className="mx-auto grid max-w-lg grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-slate-950/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <button
                        type="button"
                        onClick={() => document.getElementById('scanner-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="rounded-xl bg-red-500 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white"
                    >
                        Scan
                    </button>
                    <Link href="/trusted" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-white/85">
                        Trusted
                    </Link>
                    <a href="https://t.me/tipsmega888chat" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-white/85">
                        Community
                    </a>
                </div>
            </div>

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

                /* Wins marquee animation with pause on hover */
                .wins-marquee-track {
                    animation: winsMarquee 30s linear infinite;
                }
                
                .group:hover .wins-marquee-track {
                    animation-play-state: paused;
                }
                
                @keyframes winsMarquee {
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
                    color: #ff3333;
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

                /* Premium Icon Glow Effects */
                .premium-icon-glow {
                    filter: drop-shadow(0 0 6px currentColor);
                    animation: icon-pulse-glow 2s ease-in-out infinite;
                }

                .premium-icon-glow-red {
                    color: #ff4d4d;
                    filter: drop-shadow(0 0 8px rgba(255, 77, 77, 0.8)) drop-shadow(0 0 16px rgba(255, 77, 77, 0.4));
                    animation: icon-pulse-red 2s ease-in-out infinite;
                }

                .premium-icon-glow-gold {
                    color: #fbbf24;
                    filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.4));
                    animation: icon-pulse-gold 2s ease-in-out infinite;
                }

                .premium-icon-glow-purple {
                    color: #a855f7;
                    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.4));
                    animation: icon-pulse-purple 2s ease-in-out infinite;
                }

                .premium-icon-glow-blue {
                    color: #3b82f6;
                    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.4));
                    animation: icon-pulse-blue 2s ease-in-out infinite;
                }

                .premium-icon-glow-green {
                    color: #22c55e;
                    filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.4));
                    animation: icon-pulse-green 2s ease-in-out infinite;
                }

                .premium-icon-glow-cyan {
                    color: #ff3333;
                    filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 16px rgba(34, 211, 238, 0.4));
                    animation: icon-pulse-cyan 2s ease-in-out infinite;
                }

                @keyframes icon-pulse-glow {
                    0%, 100% { filter: drop-shadow(0 0 4px currentColor); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor); transform: scale(1.05); }
                }

                @keyframes icon-pulse-red {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(255, 77, 77, 0.6)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 12px rgba(255, 77, 77, 0.9)) drop-shadow(0 0 24px rgba(255, 77, 77, 0.5)); transform: scale(1.08); }
                }

                @keyframes icon-pulse-gold {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.6)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 24px rgba(251, 191, 36, 0.5)); transform: scale(1.08); }
                }

                @keyframes icon-pulse-purple {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.6)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 24px rgba(168, 85, 247, 0.5)); transform: scale(1.08); }
                }

                @keyframes icon-pulse-blue {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.9)) drop-shadow(0 0 24px rgba(59, 130, 246, 0.5)); transform: scale(1.08); }
                }

                @keyframes icon-pulse-green {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.6)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 12px rgba(34, 197, 94, 0.9)) drop-shadow(0 0 24px rgba(34, 197, 94, 0.5)); transform: scale(1.08); }
                }

                @keyframes icon-pulse-cyan {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.6)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.9)) drop-shadow(0 0 24px rgba(34, 211, 238, 0.5)); transform: scale(1.08); }
                }

                /* Legacy Emoji Glow Animation (deprecated, kept for compatibility) */
                .emoji-glow {
                    filter: drop-shadow(0 0 8px currentColor);
                    text-shadow: 0 0 10px currentColor;
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                @keyframes pulse-glow {
                    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
                    50% { filter: drop-shadow(0 0 15px currentColor); }
                }

                /* ================================================
                   CINEMATIC HOLLYWOOD MEGA888 ANIMATIONS
                   ================================================ */

                /* Letter-by-letter reveal animation */
                @keyframes letterReveal {
                    0% {
                        opacity: 0;
                        transform: translateY(30px) scale(0.8);
                        filter: blur(10px);
                    }
                    50% {
                        opacity: 0.7;
                        filter: blur(2px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }

                /* Golden shimmer/metallic reflection */
                @keyframes goldenShimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }

                /* Cinematic spotlight sweep */
                @keyframes spotlightSweep {
                    0% {
                        transform: translateX(-100%) skewX(-15deg);
                        opacity: 0;
                    }
                    15% {
                        opacity: 0.4;
                    }
                    50% {
                        opacity: 0.25;
                    }
                    85% {
                        opacity: 0.4;
                    }
                    100% {
                        transform: translateX(200%) skewX(-15deg);
                        opacity: 0;
                    }
                }

                /* Film grain overlay animation */
                @keyframes filmGrain {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-2%, -2%); }
                    20% { transform: translate(2%, 2%); }
                    30% { transform: translate(-1%, 1%); }
                    40% { transform: translate(1%, -1%); }
                    50% { transform: translate(-2%, 2%); }
                    60% { transform: translate(2%, -2%); }
                    70% { transform: translate(-1%, -1%); }
                    80% { transform: translate(1%, 1%); }
                    90% { transform: translate(-2%, -2%); }
                }

                /* Anamorphic lens flare */
                @keyframes lensFlare {
                    0%, 100% {
                        opacity: 0;
                        transform: scale(0.5) translateX(-50%);
                    }
                    10% {
                        opacity: 0.8;
                        transform: scale(1) translateX(-50%);
                    }
                    30% {
                        opacity: 0.4;
                        transform: scale(0.8) translateX(-50%);
                    }
                    50% {
                        opacity: 0.9;
                        transform: scale(1.2) translateX(-50%);
                    }
                    70% {
                        opacity: 0.3;
                        transform: scale(0.7) translateX(-50%);
                    }
                    90% {
                        opacity: 0.7;
                        transform: scale(0.9) translateX(-50%);
                    }
                }

                /* Letterbox bar animation */
                @keyframes letterboxReveal {
                    0% {
                        transform: scaleY(0);
                    }
                    60% {
                        transform: scaleY(0);
                    }
                    100% {
                        transform: scaleY(1);
                    }
                }

                /* 3D perspective container */
                .mega888-perspective-container {
                    transform: perspective(1000px) rotateX(5deg) rotateY(-2deg) rotateZ(0.5deg);
                    transform-style: preserve-3d;
                    animation: perspectiveFloat 6s ease-in-out infinite;
                }

                @keyframes perspectiveFloat {
                    0%, 100% {
                        transform: perspective(1000px) rotateX(5deg) rotateY(-2deg) rotateZ(0.5deg) translateZ(0);
                    }
                    50% {
                        transform: perspective(1000px) rotateX(3deg) rotateY(2deg) rotateZ(-0.5deg) translateZ(10px);
                    }
                }

                /* Cinematic container */
                .mega888-cinematic-container {
                    position: relative;
                    display: inline-block;
                    padding: 30px 20px;
                    overflow: hidden;
                }

                /* Letterbox bars */
                .mega888-letterbox {
                    position: absolute;
                    left: -10%;
                    right: -10%;
                    height: 12%;
                    background: linear-gradient(to bottom, #000 50%, transparent 50%),
                                linear-gradient(to top, #000 50%, transparent 50%);
                    background-size: 100% 100%;
                    transform-origin: center;
                    animation: letterboxReveal 2s ease-out forwards;
                    z-index: 10;
                }

                .mega888-letterbox-top {
                    top: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.95) 45%, transparent 55%);
                }

                .mega888-letterbox-bottom {
                    bottom: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 45%, transparent 55%);
                }

                /* Film grain overlay using SVG noise */
                .mega888-film-grain {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
                    opacity: 0.04;
                    pointer-events: none;
                    animation: filmGrain 0.5s steps(10) infinite;
                    z-index: 5;
                    mix-blend-mode: overlay;
                }

                /* Cinematic spotlight */
                .mega888-spotlight {
                    position: absolute;
                    top: -20%;
                    left: -50%;
                    width: 200%;
                    height: 150%;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 215, 100, 0.08) 20%,
                        rgba(255, 215, 100, 0.15) 40%,
                        rgba(255, 255, 255, 0.12) 50%,
                        rgba(255, 215, 100, 0.15) 60%,
                        rgba(255, 215, 100, 0.08) 80%,
                        transparent 100%
                    );
                    animation: spotlightSweep 4s ease-in-out infinite;
                    z-index: 4;
                    pointer-events: none;
                }

                /* Anamorphic lens flare - horizontal light streak */
                .mega888-lens-flare {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 300%;
                    height: 3px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        transparent 20%,
                        rgba(100, 180, 255, 0.4) 35%,
                        rgba(255, 255, 255, 0.7) 45%,
                        rgba(255, 255, 255, 0.9) 50%,
                        rgba(255, 255, 255, 0.7) 55%,
                        rgba(100, 180, 255, 0.4) 65%,
                        transparent 80%,
                        transparent 100%
                    );
                    transform: translateX(-50%) scaleY(8);
                    animation: lensFlare 3s ease-in-out infinite;
                    z-index: 3;
                    pointer-events: none;
                    filter: blur(1px);
                }

                /* Golden shimmer text */
                .mega888-golden-shimmer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        110deg,
                        transparent 20%,
                        rgba(255, 215, 0, 0.4) 35%,
                        rgba(255, 255, 200, 0.8) 45%,
                        rgba(255, 215, 0, 0.6) 50%,
                        rgba(255, 200, 100, 0.5) 60%,
                        transparent 80%
                    );
                    background-size: 200% 100%;
                    animation: goldenShimmer 3s ease-in-out infinite;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    font-family: inherit;
                    font-weight: inherit;
                    letter-spacing: inherit;
                    font-size: inherit;
                    line-height: inherit;
                    z-index: 6;
                    pointer-events: none;
                    display: flex;
                }

                .mega888-golden-shimmer span {
                    display: inline-block;
                }

                /* Letter reveal animation for each letter */
                .mega888-letter-reveal .mega888-letter {
                    display: inline-block;
                    opacity: 0;
                    animation: letterReveal 0.6s ease-out forwards;
                }

                .mega888-letter-reveal .mega888-letter:nth-child(1) { animation-delay: 0.1s; }
                .mega888-letter-reveal .mega888-letter:nth-child(2) { animation-delay: 0.2s; }
                .mega888-letter-reveal .mega888-letter:nth-child(3) { animation-delay: 0.3s; }
                .mega888-letter-reveal .mega888-letter:nth-child(4) { animation-delay: 0.4s; }
                .mega888-letter-reveal .mega888-letter:nth-child(5) { animation-delay: 0.55s; }
                .mega888-letter-reveal .mega888-letter:nth-child(6) { animation-delay: 0.7s; }
                .mega888-letter-reveal .mega888-letter:nth-child(7) { animation-delay: 0.85s; }

                /* Special styling for 888 numbers */
                .mega888-letter-888 {
                    background: linear-gradient(
                        180deg,
                        #FFD700 0%,
                        #FFA500 30%,
                        #FF8C00 50%,
                        #FF6347 70%,
                        #FFD700 100%
                    );
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent !important;
                    text-shadow: none !important;
                    filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.4));
                }

                /* Testimonial Carousel Animations */
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-slide-in-right {
                    animation: slideInRight 0.5s ease-out forwards;
                }

                .animate-slide-in-left {
                    animation: slideInLeft 0.5s ease-out forwards;
                }
            `}</style>
        </>
    );
}
