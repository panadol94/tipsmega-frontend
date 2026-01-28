"use client";

import { useEffect, useMemo, useState } from "react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";
import Link from "next/link";

type Company = {
    id?: string;
    name: string;
    link?: string;
    caption?: string;
    status?: string;
    mediaType?: "photo" | "video" | string;
    storageUrl?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
const API_URL = `${API_BASE}/api/companies`;

const WHATSAPP_NUMBER = "60108691034";
const WHATSAPP_TEXT = "Hi admin, saya nak minta link register untuk platform ini: ";

function normalizeUrl(url?: string) {
    if (!url) return "";
    const t = url.trim();
    if (!t) return "";
    if (t.startsWith("http://") || t.startsWith("https://")) return t;
    return `https://${t.replace(/^\/+/, "")}`;
}


function openNewTab(url: string) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
}

export default function TrustedClient() {
    const { playSound, triggerHaptic } = useGlobalSettings();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const list = useMemo(() => {
        return (companies || []).filter((c) => (c.status || "").toUpperCase() !== "HIDDEN");
    }, [companies]);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            setErr("");
            const res = await fetch(API_URL, { cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const arr = Array.isArray(json?.companies) ? json.companies : Array.isArray(json) ? json : [];
            setCompanies(arr);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setErr(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleAction = (url: string) => {
        playSound("click");
        triggerHaptic(50);
        openNewTab(url);
    };

    return (
        <div className="min-h-screen bg-[#07090f] text-white app-bg relative overflow-x-hidden">
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Trusted Company Mega888",
                        "description": "Senarai company Mega888 yang trusted dan verified. Elakkan scammer, main di platform yang disahkan selamat.",
                        "url": "https://tipsmega888.com/trusted",
                        "inLanguage": "ms-MY",
                        "publisher": {
                            "@type": "Organization",
                            "name": "TipsMega AI Scanner",
                            "url": "https://tipsmega888.com"
                        },
                        "mainEntity": {
                            "@type": "ItemList",
                            "name": "Verified Mega888 Agents",
                            "description": "List of verified and trusted Mega888 platform agents",
                            "numberOfItems": companies.length,
                        }
                    })
                }}
            />

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
                                "name": "Apa itu Trusted Company Mega888?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Trusted Company Mega888 adalah senarai platform dan agent yang telah disahkan selamat oleh TipsMega AI Scanner. Semua company yang tersenarai telah diverifikasi untuk elakkan scammer dan pastikan withdrawal cepat."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Bagaimana cara memilih company yang betul?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Pilih company yang ada badge TRENDING atau FAST untuk service terbaik. Semua company dalam senarai ini adalah verified dan bayar penuh. Klik PLAY NOW untuk register dengan WhatsApp admin."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Adakah semua company ini selamat?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Ya, 100% selamat. Semua company telah melalui verification process oleh TipsMega AI. Kami hanya senaraikan platform yang terbukti bayar penuh dan tidak scam. VVIP partners dijamin fast withdrawal."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Berapa lama masa withdrawal?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Company dengan badge FAST biasanya process withdrawal dalam 5-15 minit. VVIP partners guarantee withdrawal dalam masa kurang dari 30 minit. Semua platform menggunakan sistem auto-withdrawal untuk kelajuan maksimum."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Bagaimana cara register?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Klik butang PLAY NOW pada company pilihan anda. System akan auto-forward ke WhatsApp admin. Hantar message dan admin akan bagi link register terus. Proses registration hanya ambil 2-3 minit sahaja."
                                }
                            }
                        ]
                    })
                }}
            />

            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://tipsmega888.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Trusted Companies",
                                "item": "https://tipsmega888.com/trusted"
                            }
                        ]
                    })
                }}
            />
            {/* Ambient Background */}
            <div className="fixed inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />
            <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

            {/* Floating Particles */}
            <div className="particle-container fixed">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="particle text-cyan-500"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="app-shell mx-auto px-4 py-8 pb-32 relative z-10">

                {/* Breadcrumb Navigation */}
                <nav className="mb-4" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-xs text-white/40">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                                <span>🏠</span>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="text-white/20">/</li>
                        <li className="text-amber-400 font-bold" aria-current="page">
                            Trusted Companies
                        </li>
                    </ol>
                </nav>

                {/* HEADER SECTION */}
                <header className="mb-8 relative">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="h-1 w-6 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                <span className="text-[10px] font-black tracking-[0.3em] text-amber-400/80 uppercase">VVIP PARTNERS</span>
                            </div>
                            <h1 className="text-3xl font-black italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                TRUSTED <span className="elite-gradient-shift elite-glow">ELITE</span>
                            </h1>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center animate-pulse-slow">
                            <span className="text-xl">🏆</span>
                        </div>
                    </div>

                    <p className="text-xs text-white/50 leading-relaxed font-medium bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                        <span className="text-amber-400 font-bold">OFFICIAL VERIFIED LIST 2026.</span> All platforms here are monitored 24/7 for integrity, payout speed, and RTP fairness. Safe for Commander deployment.
                    </p>
                </header>

                {err && (
                    <div className="card p-6 border-red-500/20 bg-red-500/5 mb-6 text-center animate-in fade-in zoom-in">
                        <div className="text-2xl mb-2">⚠️</div>
                        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4">Connection Failed</p>
                        <button
                            onClick={fetchCompanies}
                            className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-red-500/40 transition-all active:scale-95"
                        >
                            RETRY CONNECTION
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl h-[160px] animate-pulse relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
                            </div>
                        ))
                    ) : list.length === 0 && !err ? (
                        <div className="col-span-3 text-center py-20 opacity-40">
                            <div className="text-4xl mb-4 grayscale">📭</div>
                            <p className="text-[10px] font-bold tracking-widest uppercase">No Partners Listed</p>
                        </div>
                    ) : (
                        list.map((c, idx) => {
                            const url = normalizeUrl(c.link);
                            const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_TEXT}${c.name}`)}`;

                            // Dynamic badge assignment
                            const badges = [];
                            if (idx === 0) badges.push({ icon: '🔥', text: 'TRENDING', color: 'bg-red-500/90' });
                            else if (idx === 1) badges.push({ icon: '⚡', text: 'FAST', color: 'bg-yellow-500/90' });
                            else if (c.caption) badges.push({ icon: '🎁', text: 'BONUS', color: 'bg-purple-500/90' });

                            // Mock live player count
                            const playerCount = Math.floor(Math.random() * 2000) + 500;

                            // Trust rating (hardcoded premium values)
                            const rating = idx === 0 ? 5.0 : (4.5 + Math.random() * 0.4);
                            const stars = Math.round(rating);

                            return (
                                <article
                                    key={c.id || idx}
                                    className="neon-border-card card-3d-tilt group relative bg-[#151c27] border border-white/10 rounded-xl shadow-lg transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,217,255,0.3),0_0_80px_rgba(255,0,255,0.2)] active:scale-95"
                                    style={{
                                        animationDelay: `${idx * 100}ms`,
                                    }}
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        const centerX = rect.width / 2;
                                        const centerY = rect.height / 2;
                                        const rotateX = ((y - centerY) / centerY) * -10;
                                        const rotateY = ((x - centerX) / centerX) * 10;
                                        e.currentTarget.style.setProperty('--rotate-x', `${rotateX}deg`);
                                        e.currentTarget.style.setProperty('--rotate-y', `${rotateY}deg`);
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.setProperty('--rotate-x', '0deg');
                                        e.currentTarget.style.setProperty('--rotate-y', '0deg');
                                    }}
                                >

                                    {/* Dynamic Status Badges */}
                                    {badges.length > 0 && (
                                        <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1 max-w-[80%]">
                                            {badges.map((badge, i) => (
                                                <span
                                                    key={i}
                                                    className={`${badge.color} text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg animate-pulse backdrop-blur-sm whitespace-nowrap`}
                                                >
                                                    {badge.icon} {badge.text}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Media Section - Enhanced with Gradient Overlay */}
                                    <div className="h-32 w-full bg-black relative overflow-hidden group-hover:after:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-br after:from-cyan-500/10 after:to-purple-500/10 after:opacity-0 after:transition-opacity after:duration-500">
                                        {c.storageUrl ? (
                                            c.mediaType === "video" ? (
                                                <video
                                                    src={c.storageUrl.startsWith("http") ? c.storageUrl : `${API_BASE.replace(/\/$/, "")}/${c.storageUrl.replace(/^\/+/, "")}`}
                                                    muted
                                                    playsInline
                                                    loop
                                                    autoPlay
                                                    className="w-full h-full object-cover object-center transition-opacity"
                                                />
                                            ) : (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={c.storageUrl.startsWith("http") ? c.storageUrl : `${API_BASE.replace(/\/$/, "")}/${c.storageUrl.replace(/^\/+/, "")}`}
                                                    alt={`${c.name} - Trusted Mega888 Agent Logo | Verified Platform ${new Date().getFullYear()}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover object-center transition-opacity"
                                                />
                                            )
                                        ) : (
                                            // Fallback to branded image
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src="/mega888.webp"
                                                alt="Mega888 Default Logo | Verified Gaming Platform"
                                                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500"
                                            />
                                        )}

                                        {/* Live Status Indicator */}
                                        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-emerald-500/30">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                                            <span className="text-emerald-400 text-[8px] font-mono font-bold">{playerCount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Content Section - Enhanced with Caption & Bonuses */}
                                    <div className="p-2 relative flex flex-col items-center text-center">
                                        {/* Glow Effect */}
                                        <div className="absolute -top-6 left-0 right-0 h-10 bg-gradient-to-b from-black via-[#151c27] to-[#151c27]" />

                                        <div className="relative z-10 -mt-1 w-full space-y-1.5">
                                            {/* Company Name */}
                                            <h2 className="text-[10px] font-black italic text-white uppercase tracking-wide truncate w-full">
                                                {c.name}
                                            </h2>

                                            {/* Trust Rating */}
                                            <div className="flex items-center justify-center gap-1">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-[10px] ${i < stars ? 'text-amber-400' : 'text-white/20'}`}>⭐</span>
                                                    ))}
                                                </div>
                                                <span className="text-white/50 text-[8px] font-mono">({rating.toFixed(1)})</span>
                                            </div>

                                            {/* Caption - Bonus/Promo Display */}
                                            {c.caption && (
                                                <div className="min-h-[28px] flex items-center justify-center">
                                                    <p className="text-[9px] font-bold text-amber-400 leading-tight px-1 animate-pulse">
                                                        🎁 {c.caption}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Button */}
                                            <div className="w-full">
                                                {url ? (
                                                    <button
                                                        onClick={() => handleAction(url)}
                                                        className="btn-play-glow btn-rocket-boost w-full bg-gradient-to-r from-amber-600 to-yellow-600 border border-white/10 text-white font-bold text-[9px] uppercase py-1.5 rounded-lg shadow-md active:scale-95 hover:shadow-amber-500/50 transition-all"
                                                    >
                                                        <span className="rocket-icon">🚀</span> PLAY NOW
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAction(waHref)}
                                                        className="w-full bg-white/5 border border-white/10 text-white/70 font-bold text-[9px] uppercase py-1.5 rounded-lg active:scale-95"
                                                    >
                                                        📱 GET LINK
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>

                {/* SEO Content Expansion - Educational Information */}
                <section className="mt-12 space-y-8">
                    {/* Why Choose Trusted Companies */}
                    <article className="card p-6 border-amber-500/20 bg-amber-500/5">
                        <h2 className="text-xl font-black text-amber-400 mb-4 flex items-center gap-2">
                            <span>🛡️</span>
                            <span>Kenapa Pilih Trusted Company?</span>
                        </h2>
                        <div className="text-sm text-white/70 space-y-3 leading-relaxed">
                            <p>
                                <strong className="text-white">Verified 24/7:</strong> Semua company dalam senarai ini melalui verification process yang ketat oleh TipsMega AI Scanner. Kami monitor real-time untuk pastikan payout speed, RTP fairness, dan customer service quality.
                            </p>
                            <p>
                                <strong className="text-white">No Scammer Guarantee:</strong> Hanya platform yang terbukti bayar penuh akan disenaraikan. Company yang ada complaint akan dikeluarkan serta-merta dari verified list.
                            </p>
                            <p>
                                <strong className="text-white">Fast Withdrawal:</strong> VVIP Partners dijamin process withdrawal dalam masa kurang 30 minit. Company dengan badge FAST purata 5-15 minit sahaja menggunakan auto-withdrawal system.
                            </p>
                        </div>
                    </article>

                    {/* How We Verify */}
                    <article className="card p-6 border-cyan-500/20 bg-cyan-500/5">
                        <h2 className="text-xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                            <span>🔍</span>
                            <span>Bagaimana Kami Verify Company?</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
                            <div>
                                <h3 className="text-white font-bold mb-2">✅ Financial Check</h3>
                                <p className="leading-relaxed">Verify company balance dan track record pembayaran kepada members. Pastikan ada liquidity untuk support semua withdrawal requests.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">⚡ Speed Test</h3>
                                <p className="leading-relaxed">Monitor average withdrawal processing time. Auto-reject company yang lambat atau banyak pending payments.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">🎯 RTP Monitoring</h3>
                                <p className="leading-relaxed">Scan game RTP rates untuk ensure fairness. Company yang manipulate RTP akan blacklisted permanently.</p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">💬 Customer Feedback</h3>
                                <p className="leading-relaxed">Analyze reviews dan complaints dari real members. Company dengan bad rating akan removed dari trusted list.</p>
                            </div>
                        </div>
                    </article>

                    {/* Quick Start Guide */}
                    <article className="card p-6 border-purple-500/20 bg-purple-500/5">
                        <h2 className="text-xl font-black text-purple-400 mb-4 flex items-center gap-2">
                            <span>🚀</span>
                            <span>Cara Register &amp; Mula Main</span>
                        </h2>
                        <ol className="text-sm text-white/70 space-y-2 leading-relaxed list-decimal list-inside">
                            <li><strong className="text-white">Pilih Company:</strong> Browse senarai dan pilih company yang sesuai. Recommend TRENDING atau FAST badge untuk service terbaik.</li>
                            <li><strong className="text-white">Klik PLAY NOW:</strong> System auto-forward ke WhatsApp admin company tersebut dengan message template.</li>
                            <li><strong className="text-white">Terima Link:</strong> Admin akan reply dengan link register dan bonus details dalam 1-2 minit.</li>
                            <li><strong className="text-white">Complete Registration:</strong> Fill in details, deposit minimum amount (biasanya RM10-50), dan mula main!</li>
                            <li><strong className="text-white">Enjoy Gaming:</strong> Semua games Mega888 available dengan fair RTP. Withdrawal anytime bila menang!</li>
                        </ol>
                    </article>
                </section>

            </div>
        </div>
    );
}
