"use client";

import { useEffect, useState } from "react";

const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const DISMISS_UNTIL_KEY = "trusted_scanner_prompt_dismissed_until";
const DISMISS_FOREVER_KEY = "trusted_scanner_prompt_dismissed_forever";

export default function InstallPrompt() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (localStorage.getItem(DISMISS_FOREVER_KEY) === "true") return;

        const dismissedUntil = localStorage.getItem(DISMISS_UNTIL_KEY);
        if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) return;

        const timer = window.setTimeout(() => setShow(true), 2200);
        return () => window.clearTimeout(timer);
    }, []);

    function handleTempDismiss() {
        localStorage.setItem(DISMISS_UNTIL_KEY, String(Date.now() + DISMISS_DURATION_MS));
        setShow(false);
    }

    function handlePermanentDismiss() {
        localStorage.setItem(DISMISS_FOREVER_KEY, "true");
        setShow(false);
    }

    function handleGoTrustedList() {
        if (typeof window === "undefined") return;
        localStorage.setItem(DISMISS_UNTIL_KEY, String(Date.now() + DISMISS_DURATION_MS));
        setShow(false);
        window.location.href = "/trusted";
    }

    if (!show) return null;

    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-end justify-center px-3 pb-4 sm:items-center sm:px-4 sm:pb-0 font-sans">
                <div
                    className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-500"
                    onClick={handleTempDismiss}
                />

                <div className="trusted-popup-card relative z-10 w-full max-w-[390px] overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#07111a] shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
                    <div className="trusted-grid absolute inset-0 opacity-[0.06]" />
                    <div className="trusted-beam trusted-beam-a" />
                    <div className="trusted-beam trusted-beam-b" />

                    <div className="relative z-10 max-h-[82vh] overflow-y-auto px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">
                                    Trusted Access
                                </div>
                            </div>
                            <button
                                onClick={handleTempDismiss}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-slate-950/90 text-lg font-black text-white shadow-[0_0_20px_rgba(0,0,0,0.35)] transition hover:bg-white hover:text-slate-950"
                                aria-label="Close popup"
                                title="Close"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4 text-left">
                            <h3 className="text-[1.15rem] font-black uppercase leading-tight text-white sm:text-[1.35rem]">
                                Pilih Company Dari <span className="bg-gradient-to-r from-cyan-200 via-white to-emerald-300 bg-clip-text text-transparent">Trusted List</span> Dulu
                            </h3>
                            <p className="mt-2 text-[12px] leading-relaxed text-slate-300/85 sm:text-[13px]">
                                Scanner result adalah berdasarkan <span className="font-black text-cyan-200">ID company</span> dari trusted list. Ambil ID dulu, baru scan untuk result yang lebih tepat.
                            </p>
                        </div>

                        <div className="mb-4 rounded-[22px] border border-cyan-400/15 bg-white/[0.03] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
                                    Live Trusted Flow
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Scanner Logic</div>
                            </div>

                            <div className="trusted-mini-panel rounded-2xl border border-white/10 bg-[#08131c] p-3">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200">Trusted Company List</div>
                                    <div className="rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200">Verified</div>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        ["WINBOX PRIME", "ID: 120456789012", false],
                                        ["MEGA ACE VIP", "ID: 218456782341", true],
                                    ].map(([label, id, active]) => (
                                        <div
                                            key={label}
                                            className={`rounded-xl border px-3 py-2 ${active ? "border-cyan-300/40 bg-cyan-400/12 shadow-[0_0_20px_rgba(34,211,238,0.08)]" : "border-white/8 bg-white/[0.03]"}`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className={`text-[11px] font-black uppercase tracking-[0.14em] ${active ? "text-cyan-100" : "text-white/70"}`}>{label}</span>
                                                {active && <span className="rounded-full bg-cyan-300/15 px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-cyan-100">Use This</span>}
                                            </div>
                                            <div className={`mt-1 text-xs font-semibold ${active ? "text-emerald-200" : "text-white/45"}`}>{id}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="my-3 flex items-center justify-center gap-2 py-1">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-cyan-200">
                                    ID → Scan
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                            </div>

                            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-3">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">Scanner Input</span>
                                    <span className="rounded-full bg-white/8 px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/65">Ready</span>
                                </div>
                                <div className="rounded-xl border border-white/8 bg-[#071019] px-3 py-3 text-left">
                                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">Selected Company ID</div>
                                    <div className="mt-1 text-sm font-black tracking-[0.16em] text-cyan-100">218456782341</div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-3 gap-2">
                            {[
                                ["1", "Buka List"],
                                ["2", "Pilih Company"],
                                ["3", "Guna ID"],
                            ].map(([step, text]) => (
                                <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-2.5 text-center">
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-200">Step {step}</div>
                                    <div className="mt-1 text-[10px] font-semibold leading-snug text-white/75">{text}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleGoTrustedList}
                            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 p-[1px] shadow-[0_12px_40px_-10px_rgba(34,211,238,0.45)] transition-transform active:scale-[0.985]"
                        >
                            <div className="flex items-center justify-center gap-2 rounded-[15px] bg-[#08131c]/96 px-4 py-3.5 transition-all duration-300 group-hover:bg-transparent">
                                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white transition-colors group-hover:text-[#03131b] sm:text-xs">Buka Trusted List</span>
                                <svg className="h-4 w-4 text-white transition-colors group-hover:text-[#03131b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M13 7h6m0 0v6m0-6L10 16m-4-9h3m-3 5h3m-3 5h7" />
                                </svg>
                            </div>
                        </button>

                        <button
                            onClick={handlePermanentDismiss}
                            className="mt-3 w-full text-center text-[10px] font-black uppercase tracking-[0.24em] text-white/35 transition hover:text-white/60"
                        >
                            Saya Dah Ada ID
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .trusted-popup-card {
                    animation: popupEnter 320ms ease-out;
                }

                .trusted-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px);
                    background-size: 28px 28px;
                    mask-image: radial-gradient(circle at center, black, transparent 78%);
                }

                .trusted-beam {
                    position: absolute;
                    width: 180px;
                    height: 180px;
                    border-radius: 999px;
                    filter: blur(55px);
                    opacity: 0.16;
                    pointer-events: none;
                }

                .trusted-beam-a {
                    top: -70px;
                    right: -40px;
                    background: rgba(56, 189, 248, 0.7);
                    animation: floatBeam 6s ease-in-out infinite;
                }

                .trusted-beam-b {
                    left: -60px;
                    bottom: -90px;
                    background: rgba(16, 185, 129, 0.5);
                    animation: floatBeam 7.2s ease-in-out infinite reverse;
                }

                .trusted-mini-panel {
                    position: relative;
                    overflow: hidden;
                }

                .trusted-mini-panel::after {
                    content: "";
                    position: absolute;
                    inset: 0 auto 0 -35%;
                    width: 35%;
                    background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.12), transparent);
                    animation: scanSweep 3.1s linear infinite;
                    pointer-events: none;
                }

                @keyframes popupEnter {
                    from {
                        opacity: 0;
                        transform: translateY(14px) scale(0.985);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes scanSweep {
                    0% { transform: translateX(0); opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { transform: translateX(420%); opacity: 0; }
                }

                @keyframes floatBeam {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(10px, -10px, 0) scale(1.05); }
                }
            `}</style>
        </>
    );
}
