"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useGlobalSettings } from "../context/GlobalSettingsContext";
import SharedPageNav from "../ui/SharedPageNav";

const API_BASE = "https://api.tipsmega888.com";

const mockHistory = [
    { ts: "Hari ini 11:12 PM", id: "01**01", rtp: 91 },
    { ts: "Semalam 02:40 AM", id: "02**77", rtp: 86 },
    { ts: "Semalam 01:10 AM", id: "01**45", rtp: 79 },
];

export default function ProfileClient() {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState("Guest");
    const [username, setUsername] = useState("");
    const [stars, setStars] = useState(0);
    const [deviceId, setDeviceId] = useState("");

    const { soundEnabled, hapticEnabled, toggleSound, toggleHaptic, refreshUser } = useGlobalSettings();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [friendRequests, setFriendRequests] = useState<any[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
            const localDid = localStorage.getItem("tipsmega_device_id");
            if (localDid) setDeviceId(localDid);

            const token = localStorage.getItem("tipsmega_token");
            if (token) {
                setStatus("Member");
                // Fetch User Info (Username)
                fetch(`${API_BASE}/api/auth/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(r => r.json())
                    .then(d => {
                        if (d.username) setUsername(d.username);
                    })
                    .catch(e => console.error("Me fetch error", e));

                // Fetch Pending Friend Requests
                fetch(`${API_BASE}/api/friend-requests`, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(r => r.json())
                    .then(d => {
                        if (d.ok && Array.isArray(d.requests)) {
                            setFriendRequests(d.requests);
                        }
                    })
                    .catch(e => console.error("Friend req fetch error", e));
            }

            if (localDid) {
                fetch(`${API_BASE}/api/init`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ deviceId: localDid }),
                })
                    .then((r) => r.json())
                    .then((d) => {
                        if (d?.stars) setStars(d.stars);
                    })
                    .catch((e) => console.error("Profile sync fail", e));
            }
        }, 0);
    }, []);

    function logout() {
        if (confirm("DISCONNECT SYSTEM?")) {
            localStorage.removeItem("tipsmega_token");
            window.location.href = "/";
        }
    }

    const handleFriendAction = async (requestId: string, action: "accept" | "reject") => {
        const token = localStorage.getItem("tipsmega_token");
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE}/api/friend-requests/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ requestId })
            });
            const json = await res.json();
            if (json.ok) {
                setFriendRequests(prev => prev.filter(r => r._id !== requestId));
                if (action === "accept") {
                    refreshUser();
                    alert("Friend Accepted!");
                } else {
                    alert("Request Rejected");
                }
            } else {
                alert("Action failed: " + (json.error || "Unknown"));
            }
        } catch (e) {
            console.error("Friend action error", e);
            alert("Network error");
        }
    };

    if (!mounted) return null;

    return (
        <SharedPageNav>
        <div className="app-wrap">
            <div className="app-shell pb-20">

                {/* HERO SECTION - Identity Card */}
                <header className="card relative overflow-hidden p-6 min-h-[220px] flex flex-col justify-between bg-[#0c1224] border-white/15">
                    {/* Background Aura */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-8 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black tracking-[0.3em] text-emerald-400/90 uppercase">Identity Card</span>
                        </div>
                        <h1 className="h1 italic text-2xl my-1.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            {status === "Member" ? "COMMANDER ACCESS" : "GUEST VISITOR"}
                        </h1>
                        <div className="font-mono text-[10px] text-white/40 flex flex-col gap-1 mt-1">
                            <div className="flex items-center gap-2">
                                <span className="opacity-40 select-none min-w-[36px]">OPERATOR:</span>
                                <span className="truncate max-w-[160px] text-emerald-400 font-black tracking-widest text-xs uppercase">{username || "UNKNOWN_UNIT"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="opacity-40 select-none min-w-[36px]">D-ID:</span>
                                <span className="truncate max-w-[160px] text-emerald-500/60 font-bold tracking-tight">{deviceId || "UNREGISTERED"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex gap-3 mt-8">
                        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-inner">
                            <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-bold">System Status</div>
                            <div className={`text-[13px] font-black italic tracking-wide ${status === "Member" ? "text-premium" : "text-white/40"}`}>
                                {status === "Member" ? "VIP ELITE" : "RESTRICTED"}
                            </div>
                        </div>
                        <div className="flex-1 bg-yellow-400/[0.03] border border-yellow-400/10 rounded-2xl p-4 backdrop-blur-xl relative shadow-inner overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
                            <div className="text-[9px] uppercase tracking-[0.2em] text-yellow-500/40 mb-1.5 font-bold">Credit Balance</div>
                            <div className="flex items-baseline gap-1.5 font-black text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                                <span className="text-xl">{stars}</span>
                                <span className="text-[10px] opacity-60">STARS</span>
                            </div>
                            <a href="https://t.me/cyberslotadmin" target="_blank" className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 hover:bg-yellow-400 hover:text-black transition-all shadow-lg">+</a>
                        </div>
                    </div>
                </header>

                {/* FRIEND REQUESTS NOTIFICATION AREA */}
                {friendRequests.length > 0 && (
                    <section className="card p-5 mt-4 bg-blue-900/20 border-blue-500/30 animate-pulse-slow">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            <h3 className="text-xs font-black tracking-widest text-blue-300 uppercase">Incoming Transmissions ({friendRequests.length})</h3>
                        </div>
                        <div className="space-y-3">
                            {friendRequests.map(req => (
                                <div key={req._id} className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-200 text-xs font-bold">
                                            {req.from.substring(0, 1).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white uppercase">{req.from}</div>
                                            <div className="text-[9px] text-white/40">Requesting connection...</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleFriendAction(req._id, "reject")}
                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                        >
                                            ✕
                                        </button>
                                        <button
                                            onClick={() => handleFriendAction(req._id, "accept")}
                                            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                                        >
                                            ✓ Accept
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SYSTEM SETTINGS */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                        onClick={toggleSound}
                        className="card flex items-center justify-between p-4 active:scale-95 transition-all group bg-slate-900/70 border-white/5"
                    >
                        <span className="text-[11px] font-black text-white/50 tracking-[0.2em] group-hover:text-white/80 transition-colors">SOUND FX</span>
                        <div className={`w-9 h-4.5 rounded-full p-0.5 flex items-center transition-all duration-300 ${soundEnabled ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-white/5 border border-white/10'}`}>
                            <div className={`w-3 h-3 rounded-full shadow-lg transition-all duration-300 transform ${soundEnabled ? 'translate-x-[18px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'translate-x-0 bg-white/20'}`} />
                        </div>
                    </button>
                    <button
                        onClick={toggleHaptic}
                        className="card flex items-center justify-between p-4 active:scale-95 transition-all group bg-slate-900/70 border-white/5"
                    >
                        <span className="text-[11px] font-black text-white/50 tracking-[0.2em] group-hover:text-white/80 transition-colors">HAPTIC</span>
                        <div className={`w-9 h-4.5 rounded-full p-0.5 flex items-center transition-all duration-300 ${hapticEnabled ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-white/5 border border-white/10'}`}>
                            <div className={`w-3 h-3 rounded-full shadow-lg transition-all duration-300 transform ${hapticEnabled ? 'translate-x-[18px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'translate-x-0 bg-white/20'}`} />
                        </div>
                    </button>
                </div>

                {/* QUICK ACTIONS */}
                <div className="flex flex-col gap-4 mt-4">
                    {status !== "Member" && (
                        <Link href="/" className="btn-red-spin h-14 flex items-center justify-center font-black italic tracking-widest rounded-[18px]">
                            <span className="btn-red-spin-content">INITIATE SYSTEM ACCESS</span>
                        </Link>
                    )}

                    {/* WhatsApp Community CTA */}
                    <a
                        href="https://chat.whatsapp.com/BaT1bAuntOe1Z5jMiLhF9L?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card relative overflow-hidden p-5 active:scale-[0.98] transition-all bg-[#0a1a0f] border-emerald-500/20 hover:border-emerald-400/40 group"
                    >
                        {/* Green glow background */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 flex items-center gap-4">
                            {/* WhatsApp Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-emerald-400 group-hover:fill-emerald-300 transition-colors">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>

                            {/* Text content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">Join Komuniti</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                </div>
                                <p className="text-[10px] text-white/40 tracking-wide">Komuniti VIP • Tips Harian • Alert Terkini</p>
                            </div>

                            {/* Arrow */}
                            <div className="text-emerald-500/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </div>
                    </a>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/share" className="card flex flex-col items-center justify-center gap-2 p-5 active:scale-95 transition-all bg-slate-900/70 border-white/5">
                            <div className="text-2xl mb-1">🤝</div>
                            <span className="text-[10px] font-black tracking-widest text-white/70 uppercase">Referral</span>
                        </Link>
                        <a href="https://t.me/cyberslotadmin" target="_blank" className="card flex flex-col items-center justify-center gap-2 p-5 active:scale-95 transition-all bg-slate-900/70 border-white/5">
                            <div className="text-2xl mb-1">🛠️</div>
                            <span className="text-[10px] font-black tracking-widest text-white/70 uppercase">Support</span>
                        </a>
                    </div>
                </div>

                {/* SCAN LOGS */}
                <section className="card p-6 bg-slate-900/90 border-white/10 mt-4">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                            <span className="text-xs font-black italic tracking-[0.2em] text-white">ACTIVITY LOGS</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-500/40">LIVE_SYNC: OK</span>
                    </div>

                    <div className="space-y-4">
                        {mockHistory.map((h, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all">
                                <div>
                                    <div className="font-mono text-xs font-bold text-emerald-400">{h.id}</div>
                                    <div className="text-[9px] text-white/30 uppercase tracking-tight mt-1">{h.ts}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-black italic text-yellow-500 leading-none">{h.rtp}%</div>
                                    <div className="text-[8px] text-white/20 uppercase tracking-tighter mt-1">RTP SCORE</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {status === "Member" && (
                        <button
                            onClick={logout}
                            className="mt-8 w-full p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-500/10 active:scale-95 transition-all"
                        >
                            TERMINATE CURRENT SESSION
                        </button>
                    )}
                </section>

            </div>

        </div>
        </SharedPageNav>
    );
}
