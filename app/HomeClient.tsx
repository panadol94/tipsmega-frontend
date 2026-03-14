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

    // Entrance animation (runs on mount and page show)
    // Android Chrome can be finicky with first-paint + bfcache restores.
    // Goal: never leave elements stuck at opacity=0 if animation doesn't run.
    //
    // IMPORTANT: useLayoutEffect so we can apply the initial hidden styles *before* the first paint.
    // On some Android devices, useEffect can run late enough that the user never perceives the entrance.
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

            // Ensure elements are hidden before animating
            applyInitialHiddenState();

            // Double rAF helps ensure styles are committed before Anime reads layout on some Android devices.
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
                        // If Anime fails for any reason, never leave UI hidden.
                        forceFinalState();
                    }
                });
            });

            // Safety net: in case complete never fires (tab suspend / throttling)
            if (safetyTimeout) window.clearTimeout(safetyTimeout);
            safetyTimeout = window.setTimeout(forceFinalState, 2000);
        };

        const handlePageShow = (event: PageTransitionEvent) => {
            // Run animation if page is shown from bfcache
            if (event.persisted) animateIn();
        };

        const handleVisibilityChange = () => {
            // Fallback for browsers that might not fire pageshow consistently
            if (document.visibilityState === "visible") {
                const { heroEls } = queryEls();
                const isHidden = heroEls.some((el) => el.style.opacity === "0");
                if (isHidden) animateIn();
            }
        };

        // Run animation on initial load
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

        // stop previous animation
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
                // 1 decimal place
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
                // Fallback to empty array if API fails
                setGames([]);
            } finally {
                // Games loaded
            }
        };
        fetchGames();
    }, []);

    // Check cooldown on mount - calculate initial value
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

        // ⚡ IP Change Detection
        const checkIpChange = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                const currentIp = data.ip;

                const storedIp = localStorage.getItem('user_last_ip');

                if (storedIp && storedIp !== currentIp) {
                    // IP changed! Show warning
                    showToast(
                        `⚠️ IP berubah! Lama: ${storedIp.substring(0, 8)}... → Baru: ${currentIp.substring(0, 8)}... Cooldown masih aktif per device.`,
                        "error"
                    );
                    playSound("error");
                    triggerHaptic(300);
                }

                // Update stored IP
                localStorage.setItem('user_last_ip', currentIp);
            } catch (error) {
                console.error('IP check failed:', error);
            }
        };

        checkIpChange();

        apiInit(did)
            .then((d) => setStars(d?.stars ?? 0))
            .catch(() => setStars(0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ✨ AUTO STAR SYNC - Polls server every 5 seconds for new bonus stars
    useStarSync({
        token: typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null,
        deviceId: resolvedDeviceId,
        enabled: isLoggedIn,
        onStarsUpdated: (newStars, claimedAmount) => {
            setStars(newStars);
            // Show success notification when stars are claimed
            if (claimedAmount > 0) {
                const message = `✅ Claimed ${claimedAmount} stars! New total: ${newStars}`;
                setStarNotification(message);
                showToast(message, "success");
                playSound("success");
                triggerHaptic(100);
                // Auto-hide notification after 5 seconds
                setTimeout(() => setStarNotification(null), 5000);
            }
        },
        onPendingDetected: (pending) => {
            // Notify user about pending stars
            const message = `✨ You have ${pending} pending stars!`;
            setStarNotification(message);
            playSound("click");
            triggerHaptic(50);
            // Auto-hide notification after 5 seconds
            setTimeout(() => setStarNotification(null), 5000);
        },
    });

    async function runScan() {
        if (busy) return;

        // Check cooldown
        if (cooldownRemaining > 0) {
            const minutes = Math.floor(cooldownRemaining / 60);
            const seconds = cooldownRemaining % 60;
            showToast(`⏱️ Cooldown active: ${minutes}:${seconds.toString().padStart(2, '0')} remaining`, "error");
            playSound("error");
            return;
        }

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
        setShowHackerOverlay(true);
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
            await sleep(3200); // Extended to let hacker animation play

            const out = await apiScan(resolvedDeviceId, id);

            if (out?.error) {
                if (out.error.includes("no stars")) {
                    // Just show toast
                    showToast("Stars habis! Login sekarang untuk refresh limit.", "error");
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

                // ✅ trigger TerminalScan rerun
                setShowHackerOverlay(false);
                setRunKey(`${Date.now()}_${id}`);

                // 🔒 Block navigation while showing results
                setScanActive(true);

                // ⏱️ Start 2-minute cooldown
                localStorage.setItem("last_scan_time", Date.now().toString());
                setCooldownRemaining(COOLDOWN_DURATION);

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

    // Legacy auth functions removed (moved to AuthModal)

    return (
        <>
            {/* ✅ HACKER SCAN OVERLAY */}
            {showHackerOverlay && (
                <HackerScanOverlay megaId={megaId} />
            )}

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
                                    "text": "Mudah sahaja! 1) Masukkan 12-digit Mega888 ID anda (start dengan 1, 2, atau 09). 2) Klik START AI SCAN button. 3) Tunggu 3-5 saat untuk AI analysis. 4) Result akan keluar dengan RTP percentage dan recommendation game terbaik untuk dimainkan."
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

                {/* VIDEO BACKGROUND (Full Fill) - Auto-play Scanner Trial */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/scanner-trial.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-60 mix-blend-screen"
                    />
                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90" />
                </div>

                {/* TOP CONTENT */}
                <div className="relative z-10 p-5 pb-0">
                    <div className="tm-hero text-[10px] text-white/60 font-mono tracking-widest uppercase mb-1">TipsMega888 AI System</div>
                    <h1 className="tm-hero text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg">
                        MEGA888 AI RTP SCANNER
                    </h1>
                </div>

                {/* BOTTOM CONTENT (Badge + Buttons) */}
                <div className="relative z-10 p-5 mt-auto bg-gradient-to-t from-black to-transparent pt-10">
                    <div className="tm-hero badge border border-white/10 bg-white/5 backdrop-blur-md mb-4 shadow-lg">
                        <span style={{ fontSize: 18 }} className="animate-pulse text-yellow-400">★</span>
                        <div>
                            <div className="text-sm" style={{ fontWeight: 900 }}>
                                [ACCESS] Stars: {Math.max(0, stars)}
                            </div>
                            <p className="text-xs text-white/55">Use carefully ! Do Not Spam Our Server</p>
                        </div>
                    </div>

                    {!isLoggedIn ? (
                        <div className="tm-hero flex gap-3">
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
                        <div className="tm-hero flex gap-3 items-center">
                            <button
                                className="btn-ghost backdrop-blur-md hover:bg-white/10 h-[52px] px-4 border-white/20"
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

            <section className="card relative overflow-hidden p-4 sm:p-5 tm-scan tm-scan-pulse border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40">
                <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.10)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="pointer-events-none absolute -right-16 top-6 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="relative z-10 space-y-4 sm:space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                            Live AI System
                        </span>
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
                            {busy ? "Signal Locked" : isValidMegaId ? "Target Ready" : "Awaiting Target"}
                        </span>
                    </div>

                    <div>
                        <h2 className="text-[1.7rem] leading-none sm:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-emerald-300 drop-shadow">
                            SCAN RTP MEGA888 ANDA SEKARANG
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-white/70 max-w-2xl">
                            Command center AI kami analyse live pattern, detect RTP signal semasa, dan cadangkan game yang lebih sesuai untuk ID anda — cepat, clear, dan rasa premium.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                            ["98%", "Prediction Accuracy"],
                            ["1,280+", "Verified Scans"],
                            ["< 5s", "Response Time"],
                            [stars > 0 ? `${stars}` : "0", "Stars Available"],
                        ].map(([value, label]) => (
                            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                                <div className="text-lg font-black text-white">{value}</div>
                                <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-2 sm:grid-cols-3">
                        {[
                            ["01", "Masukkan ID 12 digit"],
                            ["02", "Tekan Start AI Scan"],
                            ["03", "Dapatkan result & game suggestion"],
                        ].map(([step, label]) => (
                            <div key={step} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm">
                                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Step {step}</div>
                                <div className="mt-1 text-sm font-semibold text-white/80">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-[28px] border border-cyan-400/20 bg-black/35 p-3 sm:p-4 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_24px_80px_rgba(6,182,212,0.12)] backdrop-blur-xl">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">Target ID</div>
                                <div className="mt-1 text-sm text-white/65">Contoh format: <span className="font-bold text-white">123456789012</span> atau <span className="font-bold text-white">091234567890</span></div>
                            </div>
                            <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-300">Secure</span>
                                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-300">Live Sync</span>
                                <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-violet-300">AI Powered</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3">
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                                <span>Live Validation</span>
                                <span className={`rounded-full px-2.5 py-1 text-[10px] tracking-[0.18em] ${megaId.trim().length === 0
                                        ? "border border-white/10 bg-white/5 text-white/45"
                                        : isValidMegaId
                                            ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                            : "border border-amber-400/20 bg-amber-400/10 text-amber-300"
                                    }`}>
                                    {megaId.trim().length === 0 ? "WAITING INPUT" : isValidMegaId ? "FORMAT VALID" : "CHECK FORMAT"}
                                </span>
                            </div>

                            <input
                                className={`tm-scan-item input input-premium text-sm sm:text-base ${inputError ? 'shake-error' : ''}`}
                                value={megaId}
                                onChange={(e) => setMegaId(e.target.value)}
                                inputMode="numeric"
                                placeholder="Masukkan 12-digit Mega888 ID"
                            />

                            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/55">
                                <span>{megaId.trim().length === 0 ? "Masukkan ID untuk unlock live scan." : isValidMegaId ? "ID valid — sistem ready untuk scan." : "ID mesti 12 digit dan bermula dengan 1, 2, atau 09."}</span>
                                <span>{megaId.trim().length}/12+</span>
                            </div>
                        </div>

                        <div className="scanner-terminal-shell mt-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                            <div className="scanner-terminal-line" />
                            <TypewriterText text="[AI SCANNER] SIGNAL LOCKED • READING LIVE RTP STREAM • PREPARING TARGET ANALYSIS..." speed={24} />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/55">
                            <span>First time guna? Cuma masukkan ID dan tekan scan.</span>
                            <span>{stars > 0 ? "1 scan = 1 star" : "Login untuk claim bonus stars"}</span>
                        </div>

                        <button
                            className={cooldownRemaining > 0 ? "tm-scan-item tm-scan-cta btn-cooldown" : "tm-scan-item tm-scan-cta btn-green-spin ripple-effect"}
                            style={{ marginTop: 20, marginBottom: 8, opacity: (!isValidMegaId || busy || cooldownRemaining > 0) ? 0.6 : 1 }}
                            onClick={runScan}
                            disabled={busy || cooldownRemaining > 0 || !isValidMegaId}
                        >
                            <span className={cooldownRemaining > 0 ? "" : "btn-green-spin-content"}>
                                {busy ? "LOCKING LIVE SIGNAL..." :
                                    cooldownRemaining > 0 ? `⏱️ COOLDOWN: ${Math.floor(cooldownRemaining / 60)}:${(cooldownRemaining % 60).toString().padStart(2, '0')}` :
                                        "START AI SCAN"}
                            </span>
                        </button>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
                            <span>Estimated result: 3–5 saat</span>
                            <span>{busy ? "AI analysis in progress" : isValidMegaId ? "Ready to scan" : "Input required"}</span>
                        </div>

                        {busy && (
                            <div className="mt-4 space-y-3">
                                <div className="scan-live-grid grid grid-cols-1 gap-2 sm:grid-cols-3">
                                    {[
                                        ["Target Link", "Connected"],
                                        ["Pattern Read", "Scanning"],
                                        ["RTP Matrix", "Decoding"],
                                    ].map(([label, state], index) => (
                                        <div key={label} className="scan-live-card rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-3 py-3">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">{label}</span>
                                                <span className={`scan-live-dot ${index === 0 ? "is-ready" : ""}`} />
                                            </div>
                                            <div className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200">{state}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="scan-beam-wrap rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                                    <div className="scan-beam-line" />
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                                        <span>Live scan sequence running</span>
                                        <span>Decrypting target signal...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isLoggedIn && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    className="flex-1 min-w-[160px] rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-red-200 transition hover:bg-red-500/15"
                                    onClick={() => setAuthOpen("register")}
                                >
                                    Register Bonus Stars
                                </button>
                                <button
                                    className="flex-1 min-w-[160px] rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-500/15"
                                    onClick={() => setAuthOpen("login")}
                                >
                                    Login Existing Account
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add cooldown button style */}
                <style jsx>{`
          .btn-cooldown {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            border: 2px solid rgba(255, 107, 53, 0.3);
            border-radius: 14px;
            color: white;
            font-weight: bold;
            font-size: 15px;
            cursor: not-allowed;
            transition: all 0.3s ease;
            opacity: 0.78;
            animation: pulse-cooldown 2s ease-in-out infinite;
            min-height: 58px;
          }

          .tm-scan-cta {
            min-height: 58px;
          }

          @keyframes pulse-cooldown {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.985); }
          }

          .scanner-terminal-shell {
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02), 0 0 30px rgba(34, 211, 238, 0.06);
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

          .scan-live-card {
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.05), 0 10px 30px rgba(0, 0, 0, 0.18);
          }

          .scan-live-card::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent 0%, rgba(34, 211, 238, 0.08) 45%, transparent 70%);
            transform: translateX(-120%);
            animation: scanCardSweep 2.4s linear infinite;
            pointer-events: none;
          }

          .scan-live-dot {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: #22d3ee;
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.55);
            animation: scanDotPulse 1.5s ease-in-out infinite;
          }

          .scan-live-dot.is-ready {
            background: #34d399;
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.55);
          }

          .scan-beam-wrap {
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 20px rgba(34, 211, 238, 0.08);
          }

          .scan-beam-line {
            position: absolute;
            inset: 0 auto 0 -35%;
            width: 35%;
            background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.22), rgba(167, 139, 250, 0.18), transparent);
            filter: blur(3px);
            animation: scanBeam 1.7s linear infinite;
            pointer-events: none;
          }

          @keyframes scannerSweep {
            0% { transform: translateX(0); opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { transform: translateX(430%); opacity: 0; }
          }

          @keyframes scanBeam {
            0% { transform: translateX(0); opacity: 0; }
            12% { opacity: 1; }
            88% { opacity: 1; }
            100% { transform: translateX(420%); opacity: 0; }
          }

          @keyframes scanDotPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.35); }
            50% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(34, 211, 238, 0); }
          }

          @keyframes scanCardSweep {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(130%); }
          }

          @media (max-width: 640px) {
            .tm-scan-cta {
              min-height: 56px;
            }

            .btn-cooldown {
              font-size: 14px;
              letter-spacing: 0.08em;
            }
          }
        `}</style>

                {/* Progress Bar */}
                {busy && (
                    <div className="progress-bar">
                        <div className="progress-bar-fill" />
                    </div>
                )}
            </section>

            {/* RTP RESULT (animated) */}
            {lastRtp !== null && !busy ? (
                <section className="card p-5 mt-4 border-cyan-500/20 bg-cyan-500/5">
                    <div className="text-[10px] text-white/60 font-mono tracking-widest uppercase mb-2">
                        [RESULT] Overall RTP
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="tm-rtp-number text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 to-cyan-500 drop-shadow">
                            {rtpDisplay.toFixed(1)}%
                        </div>
                        <div className="text-xs text-white/60 pb-2">estimated</div>
                    </div>
                </section>
            ) : null}

            {/* ✅ TERMINAL STREAM (pakai TerminalScan, bukan lines/setLines) */}
            {runKey ? (
                <div className="relative">
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
            ) : null}

            {/* SEO Content Expansion - Educational Information */}
            {!runKey && (
                <section className="mt-6 space-y-6">
                    {/* What is RTP Scanner */}
                    <article className="card p-6 border-cyan-500/20 bg-cyan-500/5 stagger-fade-1 card-lift">
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
                    <article className="card p-6 border-purple-500/20 bg-purple-500/5 stagger-fade-2 card-lift">
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
                    <article className="card p-6 border-green-500/20 bg-green-500/5 stagger-fade-3 card-lift">
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
                <section className="card mt-6 p-6 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-purple-500/5 text-center stagger-fade-4 card-lift">
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

            {/* Star Notification - Premium Design */}
            {starNotification && (
                <div
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-4 fade-in duration-500"
                    style={{ minWidth: 300, maxWidth: '90%' }}
                >
                    {/* Premium Card with Glassmorphism */}
                    <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(234,179,8,0.4)]">

                        {/* Background noise texture */}
                        <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />

                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                        {/* Content */}
                        <div className="relative flex items-center gap-4 px-5 py-4">
                            {/* Star icon with background */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center backdrop-blur-sm animate-pulse">
                                <span className="text-2xl">⭐</span>
                            </div>

                            {/* Message */}
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-white text-sm tracking-wide leading-relaxed">
                                    {starNotification}
                                </p>
                            </div>
                        </div>

                        {/* Bottom shine effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
                    </div>
                </div>
            )}


        </>
    );
}
