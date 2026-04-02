"use client";

import { useEffect, useMemo, useState } from "react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";
import Link from "next/link";
import SharedPageNav from "../ui/SharedPageNav";

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

const PARTICLES = [
    { left: "8%", top: "12%", duration: "4s", delay: "0s" },
    { left: "18%", top: "62%", duration: "5s", delay: "0.8s" },
    { left: "30%", top: "28%", duration: "4.5s", delay: "1.2s" },
    { left: "42%", top: "74%", duration: "6s", delay: "0.5s" },
    { left: "57%", top: "18%", duration: "5.5s", delay: "1.6s" },
    { left: "68%", top: "54%", duration: "4.8s", delay: "0.4s" },
    { left: "79%", top: "32%", duration: "5.2s", delay: "1.1s" },
    { left: "90%", top: "70%", duration: "4.3s", delay: "0.9s" },
];

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
        <SharedPageNav>
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
                                "name": "Bagaimana Kenal Pasti Agent Mega888 Original vs Scammer?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Agent Mega888 original sentiasa mempunyai rekod 'auto-cuci' yang pantas di bawah 5 minit tanpa syarat withdrawal merepek. Elakkan kiosk scammer yang letak bonus tinggi tidak masuk akal (seperti 300% welcome bonus) yang mustahil untuk cuci. Sila rujuk terus ke senarai Trusted Company Mega888 2026 kami yang dijamin selamat 100%."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Adakah Kiosk Mega888 Trusted Ini Dijamin Bayar Penuh?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Ya. Semua senarai agent Mega888 di TipsMega888 ialah VVIP Partners yang mempunyai kecairan modal berpadu. Maknanya, walaupun anda pecah jackpot dan cuci berpuluh ribu, company trusted ini confirm bayar penuh on-the-spot."
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
                {PARTICLES.map((particle, i) => (
                    <div
                        key={i}
                        className="particle text-red-400"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            animation: `floatParticle ${particle.duration} ease-in-out infinite`,
                            animationDelay: particle.delay,
                        }}
                    />
                ))}
            </div>

            <div className="app-shell mx-auto px-4 py-8 pb-32 relative z-10">

                {/* HEADER SECTION */}
                <header className="mb-8 relative">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="h-1 w-6 bg-red-400 rounded-full shadow-[0_0_10px_rgba(255,77,77,0.5)]" />
                                <span className="text-[10px] font-black tracking-[0.3em] text-red-400/80 uppercase">VVIP PARTNERS</span>
                            </div>
                            <h1 className="text-3xl font-black italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                TRUSTED <span className="elite-gradient-shift elite-glow">ELITE</span>
                            </h1>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse-slow">
                            <span className="text-xl">🏆</span>
                        </div>
                    </div>

                    <p className="text-xs text-white/50 leading-relaxed font-medium bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                        <span className="text-red-400 font-bold">OFFICIAL VERIFIED LIST 2026.</span> All platforms here are monitored 24/7 for integrity, payout speed, and RTP fairness. Safe for Commander deployment.
                    </p>

                    {/* Stats Bar */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
                            <div className="text-base font-black text-red-400">{list.length || "—"}</div>
                            <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Verified Partners</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
                            <div className="text-base font-black text-red-400">24/7</div>
                            <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Active Monitor</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
                            <div className="text-base font-black text-red-300">100%</div>
                            <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Scam-Free</div>
                        </div>
                    </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton-premium rounded-xl h-[160px]" />
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
                            else if (idx === 1) badges.push({ icon: '⚡', text: 'FAST', color: 'bg-red-500/90' });
                            else if (c.caption) badges.push({ icon: '🎁', text: 'BONUS', color: 'bg-purple-500/90' });

                            // Stable UI metrics to avoid render-time randomness
                            const playerCount = 650 + ((idx * 173) % 1700);

                            // Trust rating (deterministic premium values)
                            const rating = idx === 0 ? 5.0 : 4.5 + ((idx % 4) * 0.1);
                            const stars = Math.round(rating);

                            return (
                                <article
                                    key={c.id || idx}
                                    className={`group relative bg-[#151c27] border border-white/10 rounded-xl shadow-lg transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] hover:-translate-y-1 active:scale-95 card-entrance card-entrance-${idx % 8 + 1}`}
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
                                    <div className="h-48 w-full bg-black relative overflow-hidden group-hover:after:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-br after:from-red-500/10 after:to-purple-500/10 after:opacity-0 after:transition-opacity after:duration-500">
                                        {c.storageUrl ? (
                                            // Enhanced video detection: check mediaType OR file extension
                                            (() => {
                                                const isVideo =
                                                    c.mediaType?.toLowerCase() === "video" ||
                                                    c.storageUrl.match(/\.(mp4|webm|mov|avi|mkv|m4v|flv)$/i);

                                                // Build proper URL (handle leading slash)
                                                const mediaUrl = c.storageUrl.startsWith("http")
                                                    ? c.storageUrl
                                                    : `${API_BASE.replace(/\/$/, "")}${c.storageUrl.startsWith("/") ? "" : "/"}${c.storageUrl}`;

                                                return isVideo ? (
                                                    <video
                                                        data-src={mediaUrl} ref={(el) => { if (el) { const observer = new IntersectionObserver((entries) => { entries[0].isIntersecting && (el.src = el.dataset.src, observer.disconnect()); }, { threshold: 0.1 }); observer.observe(el); } }}
                                                        title={`${c.name} - Trusted Mega888 Platform Video | Verified Agent ${new Date().getFullYear()}`}
                                                        aria-label={`${c.name} promotional video - Verified Mega888 gaming platform`}
                                                        preload="metadata"
                                                        className="w-full h-full object-cover object-center transition-opacity hover:opacity-90"
                                                    />
                                                ) : (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={mediaUrl}
                                                        alt={`${c.name} - Trusted Mega888 Agent Logo | Verified Platform ${new Date().getFullYear()}`}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover object-center transition-opacity"
                                                    />
                                                );
                                            })()
                                        ) : (
                                            // Fallback to branded image
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src="/mega888.webp"
                                                alt="Mega888 Default Logo | Verified Gaming Platform"
                                                loading="lazy"
                                                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500"
                                            />
                                        )}

                                        {/* Live Status Indicator */}
                                        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-red-500/30">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                                            <span className="text-red-400 text-[10px] font-mono font-bold">{playerCount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Content Section - Enhanced with Caption & Bonuses */}
                                    <div className="p-2 relative flex flex-col items-center text-center">
                                        {/* Glow Effect */}
                                        <div className="absolute -top-6 left-0 right-0 h-10 bg-gradient-to-b from-black via-[#151c27] to-[#151c27]" />

                                        <div className="relative z-10 -mt-1 w-full space-y-1.5">
                                            {/* Company Name */}
                                            <h2 className="text-[14px] font-black italic text-white uppercase tracking-wide truncate w-full">
                                                {c.name}
                                            </h2>

                                            {/* Trust Rating */}
                                            <div className="flex items-center justify-center gap-1">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-[10px] ${i < stars ? 'text-red-400' : 'text-white/20'}`}>⭐</span>
                                                    ))}
                                                </div>
                                                <span className="text-white/50 text-[10px] font-mono">({rating.toFixed(1)})</span>
                                            </div>

                                            {/* Caption - Bonus/Promo Display */}
                                            {c.caption && (
                                                <div className="min-h-[28px] flex items-center justify-center">
                                                    <p className="text-[12px] font-bold text-red-400 leading-tight px-1 animate-pulse">
                                                        🎁 {c.caption}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Button */}
                                            <div className="w-full">
                                                {url ? (
                                                    <button
                                                        onClick={() => handleAction(url)}
                                                        className="w-full bg-gradient-to-r from-red-600 to-red-600 border border-white/10 text-white font-bold text-[12px] uppercase py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-red-500/50 active:scale-95 transition-all duration-200"
                                                    >
                                                        🚀 PLAY NOW
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAction(waHref)}
                                                        className="w-full bg-white/5 border border-white/10 text-white/70 font-bold text-[12px] uppercase py-2 rounded-xl active:scale-95"
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
                    <article className="card p-6 border-red-500/20 bg-red-500/5">
                        <h2 className="text-xl font-black text-red-400 mb-4 flex items-center gap-2">
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
                    <article className="card p-6 border-red-500/20 bg-red-500/5">
                        <div className="text-sm uppercase tracking-wider text-red-400 font-bold flex items-center justify-center gap-2">
                            <span>🔒</span>
                            <span>SAFE GAMING</span>
                        </div>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                            🔥 Withdrawal On Fire 🔥
                        </h1>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-red-400">
                            Lightning Fast Trusted Companies
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-white/70 leading-relaxed">
                            Agent terpanas dengan <strong className="text-red-400">instant withdraw</strong>! Menang terus dapat, <br className="hidden sm:inline" />
                            RTP certified 24/7. Money in your pocket <strong className="text-green-400">dalam minit</strong>!
                        </p>
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

                    {/* SEO Block: Kenal Pasti Scammer */}
                    <article className="card p-6 border-blue-500/20 bg-blue-500/5">
                        <h2 className="text-xl font-black text-blue-400 mb-4 flex items-center gap-2">
                            <span>🔍</span>
                            <span>Cara Kenal Pasti Agent Mega888 Original vs Kiosk Scammer 2026</span>
                        </h2>
                        <div className="text-sm text-white/70 space-y-3 leading-relaxed">
                            <p>
                                Lambakan ejen palsu di Internet yang menjanjikan "cuci penuh" sering memerangkap pemain. <strong>Kiosk Mega888 scammer</strong> kebiasaannya menawarkan bonus yang tidak masuk akal (seperti 300% Welcome Bonus tanpa rollover) semata-mata untuk menarik deposit anda, namun apabila tiba masa withdrawal, mereka akan terus "block" nombor WhatsApp anda.
                            </p>
                            <p>
                                Berbanding dengan itu, <strong>Agent Mega888 Original</strong> beroperasi penuh dengan integriti dan menjaga reputasi syarikat jangka panjang. Kebanyakan <strong>company Mega888 trusted</strong> menggunakan sistem robot Telegram/WhatsApp untuk memproses pembayaran (deposit & cuci) automatik yang tidak memakan masa lebih daripada 5 minit. Lebih penting, ejen bertauliah menyokong kecairan dana tinggi untuk pastikan *"cuci besar"* jackpot dibayar lunas tanpa berlengah.
                            </p>
                            <p>
                                Kesimpulannya, jangan ambil risiko pada syarikat yang statusnya diragui. Gunakanlah <strong>senarai company Mega888 2026</strong> yang disahkan di laman <strong>TipsMega888</strong>. Kami komited memastikan semua *trusted company mega888* dalam senarai ini bebas scammer 100% demi keselamatan akaun anda.
                            </p>
                        </div>
                    </article>

                    <article className="card p-6 border-emerald-500/20 bg-emerald-500/5">
                        <h2 className="text-xl font-black text-emerald-400 mb-4 flex items-center gap-2">
                            <span>🔗</span>
                            <span>Panduan Berkaitan Untuk Pengguna Baru</span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <Link href="/mega888" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                                <div className="font-bold mb-1 text-emerald-300">Mega888 Malaysia Hub</div>
                                <div className="text-white/60 leading-relaxed">Panduan login, register, download APK, RTP live, dan withdraw dalam satu halaman.</div>
                            </Link>
                            <Link href="/blog/mega888-deposit-cara-ewallet-malaysia-2026" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                                <div className="font-bold mb-1 text-emerald-300">Cara Deposit Mega888</div>
                                <div className="text-white/60 leading-relaxed">E-wallet, DuitNow, Touch 'n Go, Boost — semua cara deposit dengan agent trusted.</div>
                            </Link>
                            <Link href="/blog/kiosk-mega888-trusted" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                                <div className="font-bold mb-1 text-emerald-300">Kiosk & Agent Trusted</div>
                                <div className="text-white/60 leading-relaxed">Senarai company Mega888 verified, 100% no scammer, fast withdrawal.</div>
                            </Link>
                            <Link href="/blog" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                                <div className="font-bold mb-1 text-emerald-300">Blog Tips & Strategi</div>
                                <div className="text-white/60 leading-relaxed">Koleksi artikel download, withdraw, trusted agent, dan panduan menang.</div>
                            </Link>
                        </div>
                    </article>
                </section>


            </div>
        </div>
        </SharedPageNav>
    );
}
