"use client";

import { useEffect, useMemo, useState } from "react";
import BottomNav from "../ui/BottomNav";

type Company = {
    id?: string;
    name: string;
    link?: string;
    caption?: string;
    status?: string;
    mediaType?: "photo" | "video" | string;
    storageUrl?: string;
};

const API_URL = "https://api.tipsmega888.com/api/companies";

// WhatsApp fallback bila link kosong
const WHATSAPP_NUMBER = "60108691034";
const WHATSAPP_TEXT = "Hi admin, saya nak minta link register untuk platform ini: ";

function normalizeUrl(url?: string) {
    if (!url) return "";
    const t = url.trim();
    if (!t) return "";
    if (t.startsWith("http://") || t.startsWith("https://")) return t;
    return `https://${t.replace(/^\/+/, "")}`;
}

function isVideo(c: Company) {
    const mt = (c.mediaType || "").toLowerCase();
    const u = (c.storageUrl || "").toLowerCase();
    return mt.includes("video") || u.endsWith(".mp4") || u.endsWith(".webm") || u.endsWith(".mov");
}

function openNewTab(url: string) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
}

export default function TrustedClient() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const list = useMemo(() => {
        return (companies || []).filter((c) => (c.status || "").toUpperCase() !== "HIDDEN");
    }, [companies]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(API_URL, { cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const arr = Array.isArray(json?.companies) ? json.companies : Array.isArray(json) ? json : [];
                if (!cancelled) setCompanies(arr);
            } catch (e: unknown) {
                if (!cancelled) {
                    const msg = e instanceof Error ? e.message : String(e);
                    setErr(msg);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-[#07090f] text-white app-bg">
            <div className="app-shell mx-auto px-4 py-8 pb-32">

                {/* HEADER SECTION - Identity Card Style */}
                <header className="card relative overflow-hidden p-6 mb-8 bg-[#0c1224] border-white/15">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-8 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black tracking-[0.3em] text-emerald-400/90 uppercase">Trusted Partners</span>
                        </div>
                        <h1 className="h1 italic text-2xl my-1.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            PLATFORM <span className="text-premium">VERIFIED</span>
                        </h1>
                        <p className="font-mono text-[10px] text-white/50 leading-relaxed max-w-lg mt-2">
                            Senarai <span className="text-yellow-400 font-bold">KIOSK RASMI MEGA888</span> paling <span className="text-red-400 font-bold">GACOR & PADU</span> 2026. Disahkan <span className="text-emerald-400 font-bold">100% TRUSTED & AUTO-CUCI</span> tanpa pening kepala. Lubuk Jackpot sebenar dengan <span className="text-blue-400 font-bold">RTP Tembus 99%</span> khas untuk Commander yang nak 'tapau' market harini!
                        </p>
                    </div>
                </header>

                {err && (
                    <div className="card p-4 border-red-500/20 bg-red-500/5 mb-6">
                        <p className="text-red-400 text-xs font-bold">⚠️ SYSTEM_ERROR: {err}</p>
                    </div>
                )}

                <div className="trusted-grid-container">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="trusted-card-wrap h-[280px] animate-pulse">
                                <div className="trusted-media-box bg-white/5" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 w-3/4 bg-white/5 rounded" />
                                    <div className="h-10 w-full bg-white/5 rounded-xl" />
                                </div>
                            </div>
                        ))
                    ) : list.map((c, idx) => {
                        const url = normalizeUrl(c.link);
                        const showVideo = isVideo(c);
                        const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_TEXT}${c.name}`)}`;

                        return (
                            <article key={c.id || idx} className="trusted-card-wrap">
                                <div className="trusted-media-box">
                                    {c.storageUrl ? (
                                        showVideo ? (
                                            <video src={c.storageUrl} muted playsInline loop autoPlay />
                                        ) : (
                                            <img src={c.storageUrl} alt={c.name} loading="lazy" />
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                            Data Lost
                                        </div>
                                    )}
                                </div>

                                <div className="trusted-content">
                                    <h2 className="trusted-title-text italic uppercase">{c.name}</h2>
                                    <p className="trusted-desc-text">
                                        {c.caption?.trim() ? c.caption : "Sistem analitik mengesahkan integriti platform ini dalam kategori Premium."}
                                    </p>

                                    <div className="trusted-btn-box">
                                        {url ? (
                                            <button
                                                onClick={() => openNewTab(url)}
                                                className="btn-cyber w-full py-2.5 text-[11px] font-black"
                                            >
                                                Access Base
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => openNewTab(waHref)}
                                                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-extrabold text-white/70 hover:bg-white/10 transition-all shadow-lg"
                                            >
                                                Link Request
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {!loading && list.length === 0 && (
                    <div className="card p-10 text-center opacity-30">
                        NO_CONNECTED_PARTNERS_FOUND
                    </div>
                )}

            </div>
            <BottomNav active="trusted" />
        </div>
    );
}
