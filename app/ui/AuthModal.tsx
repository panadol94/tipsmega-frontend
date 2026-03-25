/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";

type AuthMode = "login" | "register" | "recovery";

interface AuthModalProps {
    initialMode?: AuthMode;
    deviceId: string;
    onClose: () => void;
    onLoginSuccess: (token: string, stars: number, username?: string) => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
const GROUP_LINK = "https://t.me/tipsmega888chat";




async function readJsonOrText(r: Response) {
    const text = await r.text().catch(() => "");
    let json: any = null;
    try {
        json = text ? JSON.parse(text) : null;
    } catch {
        json = null;
    }
    return { json, text };
}

function normalizePhone(input: string) {
    const raw = String(input || "").trim();
    // Remove all non-digit characters (keep + separately or logic handles it)
    // Actually, let's just strip everything except digits first
    const digits = raw.replace(/\D/g, "");

    // If empty
    if (!digits) return "";

    // Logic to handle Malaysia/Standard formats
    let finalDigits = digits;

    // Case: User entered local number "01..." => transform to "601..."
    if (finalDigits.startsWith("0")) {
        finalDigits = "60" + finalDigits.substring(1);
    }
    // Case: User entered "+01..." (digits would be "01...") => handled above

    // Length check (E.164 usually 8-15)
    if (finalDigits.length < 8 || finalDigits.length > 15) return "";

    return "+" + finalDigits;
}

export default function AuthModal({ initialMode = "login", deviceId, onClose, onLoginSuccess }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);

    // Fields
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");

    // States
    const [busy, setBusy] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState<"neutral" | "success" | "error">("neutral");

    // Clear fields on mode switch
    useEffect(() => {
        setMsg("");
        setMsgType("neutral");
        // We don't clear inputs to allow easy switching if user made mistake
    }, [mode]);

    // Helpers
    const showErr = (m: string) => {
        setMsg(m);
        setMsgType("error");
    };
    const showSuccess = (m: string) => {
        setMsg(m);
        setMsgType("success");
    };
    const showInfo = (m: string) => {
        setMsg(m);
        setMsgType("neutral");
    };

    // Logic
    async function requestOtp() {
        const p = normalizePhone(phone);
        if (!p) return showErr("❌ Nombor telefon tidak sah. Guna format: +60123456789");

        setBusy(true);
        showInfo("Sending OTP to Telegram...");

        try {
            const r = await fetch(`${API_BASE}/api/auth/request-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: p }),
            });
            const { json, text } = await readJsonOrText(r);

            if (!r.ok) {
                showErr(`❌ ${json?.error || json?.detail || text || "Request OTP gagal"}`);
                return;
            }

            setOtpSent(true);
            showSuccess("✅ OTP dihantar! Sila check Telegram bot.");
        } catch (e: any) {
            console.error("OTP Error:", e);
            if (e.message?.includes("Failed to fetch")) {
                showErr("⚠️ Network Error: Gagal connect server. Sila check internet/firewall.");
            } else {
                showErr(`❌ Error: ${e.message}`);
            }
        } finally {
            setBusy(false);
        }
    }

    async function handleRegister() {
        const p = normalizePhone(phone);
        if (!p) return showErr("❌ Phone invalid (+60...)");
        if (username.length < 3) return showErr("❌ Username min 3 huruf");
        if (password.length < 6) return showErr("❌ Password min 6 huruf");
        if (!/^\d{6}$/.test(otp)) return showErr("❌ OTP mesti 6 digit");

        setBusy(true);
        showInfo("Creating account...");

        try {
            const refCode = localStorage.getItem("tipsmega_joined_from_ref") || "";
            const r = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: p, username, password, otp, refCode }),
            });
            const { json, text } = await readJsonOrText(r);

            if (!r.ok) {
                showErr(`❌ ${json?.error || "Register Failed"} ${json?.detail ? `(${json.detail})` : ""}`);
                return;
            }

            showSuccess("✅ Akaun berjaya dicipta! Sila Login.");

            // Auto switch to login
            setTimeout(() => {
                setMode("login");
                setOtp("");
                setOtpSent(false);
                // Keep username/password for easy login
            }, 2000);
            setMode("login");
            setOtp("");
            setOtpSent(false);
            setPassword("");
        } catch (e: any) {
            console.error("Register Error:", e);
            if (e.message?.includes("Failed to fetch")) {
                showErr("⚠️ Network Error: Gagal connect server. Sila check internet/firewall.");
            } else {
                showErr(`❌ Error: ${e.message}`);
            }
        } finally {
            setBusy(false);
        }
    }

    async function handleLogin() {
        if (!username) return showErr("❌ Masukkan Username");
        if (!password) return showErr("❌ Masukkan Password");

        setBusy(true);
        showInfo("Logging in...");

        try {
            const r = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const { json, text } = await readJsonOrText(r);

            if (!r.ok) {
                showErr(`❌ ${json?.error || "Login Failed"} ${json?.detail ? `(${json.detail})` : ""}`);
                return;
            }

            const token = json?.token;
            if (token) {
                // Grant Device Stars
                const g = await fetch(`${API_BASE}/api/auth/grant-device`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ deviceId }),
                });
                const { json: gj } = await readJsonOrText(g);
                const stars = gj?.stars ?? 0;

                // Save My Ref Code
                if (json.referralCode) {
                    localStorage.setItem("tipsmega_my_ref_code", json.referralCode);
                }

                onLoginSuccess(token, stars, json.username || username || "User");
            } else {
                showErr("❌ Token missing in response");
            }
        } catch (e: any) {
            console.error("Login Error:", e);
            if (e.message?.includes("Failed to fetch")) {
                showErr("⚠️ Network Error: Gagal connect server. Sila check internet/firewall.");
            } else {
                showErr(`❌ Error: ${e.message}`);
            }
        } finally {
            setBusy(false);
        }
    }

    async function handleResetPassword() {
        const p = normalizePhone(phone);
        if (!p) return showErr("❌ Nombor telefon tidak sah");
        if (password.length < 6) return showErr("❌ Password baru min 6 huruf");
        if (!/^\d{6}$/.test(otp)) return showErr("❌ OTP mesti 6 digit");

        setBusy(true);
        showInfo("Resetting password...");

        try {
            const r = await fetch(`${API_BASE}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: p, otp, newPassword: password }),
            });
            const { json, text } = await readJsonOrText(r);

            if (!r.ok) {
                showErr(`❌ ${json?.error || "Reset Gagal"} ${json?.detail ? `(${json.detail})` : ""}`);
                return;
            }

            const username = json?.username || "Commander";
            showSuccess(`✅ Password telah ditukar! Username anda: ${username}`);

            // Auto switch to login after delay
            setTimeout(() => {
                setMode("login");
                setOtp("");
                setOtpSent(false);
                setPassword("");
            }, 3000);

        } catch (e: any) {
            console.error("Reset Error:", e);
            if (e.message?.includes("Failed to fetch")) {
                showErr("⚠️ Network Error: Gagal connect server. Sila check internet/firewall.");
            } else {
                showErr(`❌ Error: ${e.message}`);
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Main Card — premium glass */}
            <div
                className="relative w-full max-w-md rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-pop scrollbar-hide"
                style={{
                    background: "linear-gradient(180deg, rgba(15,22,42,0.97) 0%, rgba(8,10,18,0.99) 100%)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 80px rgba(79,142,255,0.06) inset",
                }}
            >

                {/* Ambient glow orbs — subtle */}
                <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(79,142,255,0.15) 0%, transparent 70%)",
                        transform: "translate(30%, -30%)",
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
                        transform: "translate(-30%, 30%)",
                    }}
                />

                {/* Header */}
                <div className="text-center mb-6 relative z-10">
                    {/* Premium gradient heading */}
                    <h2
                        className="text-2xl font-black tracking-wide uppercase mb-1"
                        style={{
                            background: "linear-gradient(135deg, #00e5cc 0%, #a855f7 50%, #ff6bd6 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 2px 12px rgba(123,215,255,0.3))",
                        }}
                    >
                        {mode === "login" ? "Welcome Back" : mode === "recovery" ? "Account Recovery" : "Create Account"}
                    </h2>
                    <p className="text-sm text-white/45 font-medium">
                        {mode === "login"
                            ? "Sign in to access your commander terminal"
                            : mode === "recovery"
                                ? "Reset your password via Telegram OTP"
                            : "Join 10,000+ Malaysian Mega888 players"}
                    </p>
                </div>

                {/* STATUS MESSAGE */}
                {msg && (
                    <div className={`mb-4 px-3 py-2 rounded-lg text-xs font-bold text-center animate-pulse ${msgType === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        msgType === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                            "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                        {msg}
                    </div>
                )}

                {/* Form Container */}
                {/* REGISTER MODE: Step-by-Step UI */}
                {mode === "register" && (
                    <div className="space-y-5">

                        {/* STEP 1: JOIN GROUP */}
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest">Langkah 1: Wajib Join Group</h3>
                                {/* Tick icon if clicked? Hard to track, just static */}
                            </div>
                            <p className="text-[10px] text-blue-200/60 leading-tight mb-3">
                                Anda mesti berada dalam group Telegram rasmi kami untuk menerima OTP.
                            </p>
                            <a
                                href={GROUP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/20"
                            >
                                <span>JOIN TELEGRAM GROUP</span>
                                <span>↗</span>
                            </a>
                        </div>

                        {/* STEP 2: START BOT & SHARE CONTACT */}
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest">Langkah 2: Start Bot & Share Contact</h3>
                            </div>
                            <p className="text-[10px] text-purple-200/60 leading-tight mb-3">
                                Start bot dan tekan "Share Contact" supaya kami boleh hantar OTP.
                            </p>
                            <a
                                href="https://t.me/TIPSMEGA888OTPBOT"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-900/20"
                            >
                                <span>START BOT & SHARE CONTACT</span>
                                <span>🤖</span>
                            </a>
                        </div>

                        {/* STEP 3: REQUEST OTP */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-black text-white/50 uppercase tracking-widest pl-1">Langkah 3: Dapatkan OTP</h3>
                            <div className="flex gap-2">
                                <input
                                    className={`flex-1 h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono ${otpSent ? "opacity-50 cursor-not-allowed" : ""}`}
                                    placeholder="No. Tel (e.g. 0123456789)"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={otpSent || busy}
                                />
                                <button
                                    onClick={requestOtp}
                                    disabled={busy || otpSent}
                                    className={`px-4 h-11 rounded-xl text-[10px] font-black uppercase tracking-wider border ${otpSent
                                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                                        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                                        } transition-all whitespace-nowrap`}
                                >
                                    {busy ? "..." : otpSent ? "OTP SENT ✓" : "MINTA OTP"}
                                </button>
                            </div>
                            {otpSent && (
                                <div className="flex items-center justify-between pl-1">
                                    <p className="text-[10px] text-green-400">✅ OTP telah dihantar!</p>
                                    <button
                                        onClick={() => {
                                            setOtpSent(false);
                                            setOtp("");
                                            setBusy(false);
                                        }}
                                        className="text-[10px] text-red-400 underline hover:text-red-300"
                                    >
                                        Tukar Nombor?
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* STEP 4: FILL DETAILS */}
                        <div className={`space-y-3 transition-all duration-500 ${otpSent ? "opacity-100" : "opacity-50 pointer-events-none grayscale"}`}>
                            <h3 className="text-xs font-black text-white/50 uppercase tracking-widest pl-1">Langkah 4: Cipta Akaun</h3>

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    className="h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono tracking-widest"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    className="w-full h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder-white/20 text-center text-lg tracking-[0.5em] focus:outline-none focus:border-green-500/50 transition-all font-mono"
                                    placeholder="OTP CODE"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>

                            {/* MAIN BUTTON — premium CTA */}
                            <button
                                disabled={busy}
                                onClick={handleRegister}
                                className={`w-full h-12 rounded-2xl font-black tracking-widest text-xs uppercase transition-all shadow-lg relative z-10 ${busy ? "bg-gray-600 text-gray-400 cursor-not-allowed" :
                                    "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 border border-white/10 text-white hover:-translate-y-0.5 active:translate-y-0"
                                    }`}
                                style={!busy ? {
                                    boxShadow: "0 8px 32px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                                } : {}}
                            >
                                {busy ? "SEDANG PROSES..." : "DAFTAR SEKARANG"}
                            </button>
                        </div>
                    </div>
                )}


                {/* RECOVERY MODE */}
                {mode === "recovery" && (
                    <div className="space-y-5">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2">Start Bot & Share Contact</h3>
                            <p className="text-[10px] text-purple-200/60 leading-tight mb-3">
                                Start bot dan tekan "Share Contact" untuk dapatkan OTP reset.
                            </p>
                            <a
                                href="https://t.me/TIPSMEGA888OTPBOT"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-900/20"
                            >
                                <span>OPEN BOT</span>
                                <span>🤖</span>
                            </a>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                                    placeholder="No. Tel (e.g. 0123456789)"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <button
                                    onClick={requestOtp}
                                    disabled={busy || otpSent}
                                    className={`px-4 h-11 rounded-xl text-[10px] font-black uppercase tracking-wider border ${otpSent
                                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                                        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                                        } transition-all whitespace-nowrap`}
                                >
                                    {busy ? "..." : otpSent ? "OTP SENT ✓" : "MINTA OTP"}
                                </button>
                            </div>
                        </div>

                        {/* RESET FORM */}
                        <div className={`space-y-3 transition-all duration-500 ${otpSent ? "opacity-100" : "opacity-50 pointer-events-none grayscale"}`}>
                            <input
                                type="password"
                                className="w-full h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono tracking-widest"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                className="w-full h-11 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder-white/20 text-center text-lg tracking-[0.5em] focus:outline-none focus:border-green-500/50 transition-all font-mono"
                                placeholder="OTP CODE"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <button
                                disabled={busy}
                                onClick={handleResetPassword}
                                className={`w-full h-12 rounded-xl font-black tracking-widest text-xs uppercase transition-all shadow-lg ${busy ? "bg-gray-600 text-gray-400 cursor-not-allowed" :
                                    "bg-gradient-to-r from-blue-500 to-blue-700 border border-blue-400 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                                    }`}
                            >
                                {busy ? "PROCESSING..." : "RESET PASSWORD"}
                            </button>
                        </div>
                    </div>
                )}

                {/* LOGIN MODE (Original UI slightly tweaked) */}
                {mode === "login" && (
                    <div className="space-y-4">
                        {/* USERNAME & PASSWORD */}
                        <div className="group">
                            <label className="block text-xs font-bold text-white/40 mb-1 ml-1 uppercase tracking-wider">Username</label>
                            <input
                                className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-bold"
                                placeholder="CommanderName"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-white/40 mb-1 ml-1 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-mono tracking-widest"
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* LOGIN BUTTON — premium CTA */}
                        <button
                            disabled={busy}
                            onClick={handleLogin}
                            className={`w-full h-14 mt-2 rounded-2xl font-black tracking-widest text-sm uppercase transition-all shadow-lg ${busy ? "bg-gray-600 text-gray-400 cursor-not-allowed" :
                                "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 border border-white/10 shadow-indigo-500/30 hover:shadow-indigo-500/60 hover:-translate-y-0.5 active:translate-y-0"
                                }`}
                            style={!busy ? {
                                boxShadow: "0 8px 32px rgba(79,142,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                            } : {}}
                        >
                            {busy ? "ACCESSING..." : "ACCESS TERMINAL"}
                        </button>

                        <div className="text-center mt-3">
                            <button
                                onClick={() => setMode("recovery")}
                                className="text-xs text-white/60 hover:text-white font-bold uppercase tracking-widest transition-colors border-b border-transparent hover:border-white/50 pb-0.5"
                            >
                                Lupa Password?
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Toggle — refined */}
                <div className="mt-6 text-center pt-4 border-t border-white/5">
                    <button
                        onClick={() => setMode(mode === "login" ? "register" : "login")}
                        className="text-white/40 text-[11px] font-bold hover:text-white transition-colors tracking-wide uppercase"
                    >
                        {mode === "login" ? "No Account? Register Now" : "Already a Member? Login"}
                    </button>
                </div>

                {/* Close Button — elegant glass */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                >
                    ✕
                </button>

            </div>
        </div >
    );
}
