"use client";

import { useMemo, useState, useEffect } from "react";

export default function ShareClient() {
    const [copied, setCopied] = useState(false);
    const [refCode, setRefCode] = useState("YOURCODE");

    // Load actual ref code
    useEffect(() => {
        const local = localStorage.getItem("tipsmega_my_ref_code");
        if (local && local !== "undefined") {
            // Avoid re-render if already set (though initial is "YOURCODE")
            setTimeout(() => {
                setRefCode((prev) => (prev !== local ? local : prev));
            }, 0);
        } else {
            // Fetch if missing
            const token = localStorage.getItem("tipsmega_token");
            if (token) {
                fetch("https://api.tipsmega888.com/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(r => r.json())
                    .then(d => {
                        if (d.ok && d.referralCode) {
                            setRefCode(d.referralCode);
                            localStorage.setItem("tipsmega_my_ref_code", d.referralCode);
                        }
                    })
                    .catch(() => { });
            }
        }
    }, []);

    const link = useMemo(() => {
        return `https://www.tipsmega888.com/?ref=${refCode}`;
    }, [refCode]);

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert("Manual copy required");
        }
    }

    function shareWhatsapp() {
        const text = `Mega888 RTP Scanner AI. Check this out: ${link}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }

    function shareTelegram() {
        const text = `Mega888 RTP Scanner AI\n${link}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, "_blank");
    }

    return (
        <>
            <div className="app-wrap min-h-screen bg-[#07090f]">
                <div className="app-shell pb-24">

                    {/* HEADER: Recruitment Protocol */}
                    <header className="card relative overflow-hidden p-6 mb-6 bg-[#0c1224] border-white/15">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-1.5 w-8 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                <span className="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase">Agent Access</span>
                            </div>
                            <h1 className="h1 italic text-2xl my-1.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                RECRUITMENT <span className="text-premium">PROTOCOL</span>
                            </h1>
                            <p className="font-mono text-[11px] text-white/60 leading-relaxed max-w-sm">
                                Jemput Komander baru ke dalam sistem. Anda akan menerima <span className="text-yellow-400 font-bold">1 STAR</span> bagi setiap pengaktifan berjaya.
                            </p>
                        </div>
                    </header>

                    {/* DATA CONTAINER */}
                    <div className="card bg-slate-900/80 border-white/10 overflow-hidden relative">

                        {/* Top Tech Line */}
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="p-6 flex flex-col items-center gap-6">

                            {/* REFERRAL LINK BOX */}
                            <div className="w-full">
                                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2">
                                    <span>Secure Uplink</span>
                                    <span>Status: Active</span>
                                </div>
                                <div className="relative">
                                    <input
                                        readOnly
                                        value={link}
                                        className="w-full bg-[#050b14] border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                    <button
                                        onClick={onCopy}
                                        className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 active:scale-95 transition-all"
                                    >
                                        {copied ? "COPIED!" : "COPY"}
                                    </button>
                                </div>
                            </div>

                            {/* SOCIAL ACTIONS */}
                            <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                <button
                                    onClick={shareWhatsapp}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 group transition-all"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">📱</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-white/90 group-hover:text-[#25D366]">WhatsApp</span>
                                </button>
                                <button
                                    onClick={shareTelegram}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-[#0088cc]/20 hover:border-[#0088cc]/40 group transition-all"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">✈️</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-white/90 group-hover:text-[#0088cc]">Telegram</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* RULES / FOOTER */}
                    <div className="mt-8 px-5 text-center">
                        <div className="text-xs font-bold text-white/90 mb-2 tracking-widest uppercase opacity-80">
                            Rules of Engagement
                        </div>
                        <p className="text-xs text-white/70 leading-loose max-w-xs mx-auto">
                            1. Reward diberi selepas verifikasi.<br />
                            2. Satu peranti, satu akaun sahaja.<br />
                            3. Spam akan menyebabkan ban.
                        </p>
                    </div>

                    {/* JOIN COMMUNITY */}
                    <div className="mt-8">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-black text-white tracking-wide">
                                🏆 Join Komuniti <span className="text-premium">Mega888</span>
                            </h2>
                            <p className="text-xs text-white/50 mt-1">
                                Sertai ribuan pemain untuk tips harian, strategi RTP &amp; update terkini
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {/* WhatsApp Community */}
                            <a
                                href="https://masuk10.com/Prospinner"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card bg-[#0c1224] border-[#25D366]/20 hover:border-[#25D366]/50 p-4 flex items-center gap-4 group transition-all hover:bg-[#25D366]/5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    💬
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                                        WhatsApp Community
                                    </div>
                                    <div className="text-[10px] text-white/40 mt-0.5">
                                        Grup Spin Mega888 • Tips Harian &amp; Strategi RTP
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-[#25D366]/60 group-hover:text-[#25D366] transition-colors">
                                    JOIN →
                                </div>
                            </a>

                            {/* Telegram Group */}
                            <a
                                href="https://t.me/tipsmega888chat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card bg-[#0c1224] border-[#0088cc]/20 hover:border-[#0088cc]/50 p-4 flex items-center gap-4 group transition-all hover:bg-[#0088cc]/5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#0088cc]/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    ✈️
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-white group-hover:text-[#0088cc] transition-colors">
                                        Telegram Group
                                    </div>
                                    <div className="text-[10px] text-white/40 mt-0.5">
                                        Channel Mega888 AI • Signal &amp; Update Terkini
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-[#0088cc]/60 group-hover:text-[#0088cc] transition-colors">
                                    JOIN →
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="mt-10">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            ⚡ Cara <span className="text-premium">Mendapatkan Stars</span>
                        </h2>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { step: "1", icon: "🔗", title: "Share Link", desc: "Copy & share referral link kau" },
                                { step: "2", icon: "👥", title: "Kawan Join", desc: "Kawan daftar & verify akaun" },
                                { step: "3", icon: "⭐", title: "Dapat Stars", desc: "1 Star setiap referral berjaya" },
                            ].map((s) => (
                                <div key={s.step} className="card bg-[#0c1224] border-white/10 p-4 text-center relative">
                                    <div className="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-black text-emerald-400">
                                        {s.step}
                                    </div>
                                    <div className="text-2xl mb-2">{s.icon}</div>
                                    <div className="text-xs font-bold text-white">{s.title}</div>
                                    <div className="text-[10px] text-white/40 mt-1">{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ SECTION (SEO-rich) */}
                    <div className="mt-10">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            ❓ Soalan <span className="text-premium">Lazim</span>
                        </h2>

                        <div className="space-y-3">
                            {[
                                {
                                    q: "Apa itu Mega888 AI Scanner?",
                                    a: "Mega888 AI Scanner adalah alat pintar yang menganalisis Return-to-Player (RTP) permainan slot Mega888 secara real-time. Ia membantu pemain membuat keputusan lebih bijak sebelum bermain."
                                },
                                {
                                    q: "Bagaimana cara mendapatkan Stars percuma?",
                                    a: "Share referral link anda kepada kawan. Apabila mereka mendaftar dan mengesahkan akaun, anda akan menerima 1 Star secara automatik. Tiada had referral!"
                                },
                                {
                                    q: "Apa kelebihan join komuniti WhatsApp / Telegram?",
                                    a: "Dalam komuniti, anda akan mendapat tips harian, strategi RTP terkini, alert game hot, serta berinteraksi dengan ribuan pemain lain untuk berkongsi pengalaman."
                                },
                                {
                                    q: "Adakah Mega888 AI Scanner percuma?",
                                    a: "Ya! Scanner asas adalah percuma. Stars yang diperolehi melalui referral boleh digunakan untuk membuka ciri-ciri premium seperti scan tanpa had dan analisis mendalam."
                                },
                                {
                                    q: "Bolehkah saya menggunakan scanner di telefon?",
                                    a: "Ya, Mega888 AI Scanner dioptimumkan sepenuhnya untuk peranti mudah alih. Akses melalui pelayar web — tiada muat turun diperlukan."
                                },
                            ].map((faq, i) => (
                                <details key={i} className="card bg-[#0c1224] border-white/10 group">
                                    <summary className="p-4 cursor-pointer text-sm font-bold text-white/90 hover:text-emerald-400 transition-colors list-none flex items-center justify-between">
                                        <span>{faq.q}</span>
                                        <span className="text-white/30 group-open:rotate-180 transition-transform text-xs">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-3">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* EXPLORE MORE (Internal Links) */}
                    <div className="mt-10 mb-4">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            🧭 Explore <span className="text-premium">Lagi</span>
                        </h2>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { href: "/", icon: "🎰", title: "AI Scanner", desc: "Scan RTP slot sekrang" },
                                { href: "/trusted", icon: "🛡️", title: "Trusted Agent", desc: "Senarai agent verified" },
                                { href: "/chat", icon: "💬", title: "Live Chat", desc: "Berbual dengan pemain" },
                                { href: "/info", icon: "📖", title: "Info & Panduan", desc: "Tips dan strategi" },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="card bg-[#0c1224] border-white/10 hover:border-emerald-500/30 p-4 text-center group transition-all hover:bg-emerald-500/5"
                                >
                                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{link.icon}</div>
                                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{link.title}</div>
                                    <div className="text-[10px] text-white/40 mt-0.5">{link.desc}</div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
