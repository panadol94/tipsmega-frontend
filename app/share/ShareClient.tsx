"use client";

import { useMemo, useState, useEffect } from "react";
import SharedPageNav from "../ui/SharedPageNav";

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
        <SharedPageNav>
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
                                Jemput Komander baru ke dalam sistem. Anda akan menerima <span className="text-red-400 font-bold">1 STAR</span> bagi setiap pengaktifan berjaya.
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

                    {/* RULES / PANDUAN */}
                    <div className="mt-8">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            📋 Panduan <span className="text-premium">Referral</span>
                        </h2>

                        <div className="card bg-[#0c1224] border-white/10 p-5">
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: "✅",
                                        title: "Verifikasi Diperlukan",
                                        desc: "Star hanya diberikan selepas kawan anda berjaya mendaftar dan mengesahkan akaun mereka melalui Telegram bot."
                                    },
                                    {
                                        icon: "📱",
                                        title: "Satu Peranti, Satu Akaun",
                                        desc: "Setiap peranti hanya boleh mendaftarkan satu akaun sahaja. Akaun berganda akan dikesan secara automatik."
                                    },
                                    {
                                        icon: "🎁",
                                        title: "Reward Tanpa Had",
                                        desc: "Tiada had bilangan referral — lebih ramai kawan yang anda jemput, lebih banyak Stars yang anda perolehi!"
                                    },
                                    {
                                        icon: "⚡",
                                        title: "Kredit Automatik",
                                        desc: "Stars akan dikreditkan secara automatik ke akaun anda sebaik sahaja referral disahkan. Tiada perlu tunggu."
                                    },
                                    {
                                        icon: "🔗",
                                        title: "Link Unik Anda",
                                        desc: "Gunakan link referral peribadi anda di atas. Setiap pendaftaran melalui link ini akan dikaitkan dengan akaun anda."
                                    },
                                    {
                                        icon: "🚫",
                                        title: "Anti-Spam",
                                        desc: "Aktiviti spam atau pendaftaran palsu akan menyebabkan akaun anda disekat secara kekal tanpa amaran."
                                    },
                                ].map((rule, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className="text-xl mt-0.5 shrink-0">{rule.icon}</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{rule.title}</div>
                                            <div className="text-sm text-white/50 mt-0.5 leading-relaxed">{rule.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* JOIN COMMUNITY */}
                    <div className="mt-8">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-black text-white tracking-wide">
                                🏆 Join Komuniti <span className="text-premium">Mega888 Malaysia</span>
                            </h2>
                            <p className="text-sm text-white/50 mt-1">
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
                                    <div className="text-xs text-white/40 mt-0.5">
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
                                    <div className="text-xs text-white/40 mt-0.5">
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

                        <div className="space-y-3">
                            {[
                                { step: "1", icon: "🔗", title: "Copy Referral Link", desc: "Salin link referral peribadi anda dari bahagian atas halaman ini. Link ini unik untuk akaun anda sahaja." },
                                { step: "2", icon: "�", title: "Share kepada Kawan", desc: "Kongsikan link melalui WhatsApp, Telegram, Facebook, TikTok atau mana-mana platform sosial media." },
                                { step: "3", icon: "👥", title: "Kawan Daftar & Verify", desc: "Kawan anda klik link, mendaftar di tipsmega888.com dan mengesahkan akaun melalui Telegram bot kami." },
                                { step: "4", icon: "⭐", title: "Terima Stars Percuma", desc: "1 Star dikreditkan secara automatik sebaik sahaja kawan berjaya verify. Tiada had — share lebih, dapat lebih!" },
                            ].map((s) => (
                                <div key={s.step} className="card bg-[#0c1224] border-white/10 p-4 flex items-center gap-4 relative">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                        <span className="text-lg">{s.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">STEP {s.step}</span>
                                            <span className="text-sm font-bold text-white">{s.title}</span>
                                        </div>
                                        <div className="text-sm text-white/40 mt-1 leading-relaxed">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TIPS & STRATEGI (SEO Content Block) */}
                    <div className="mt-10">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            🎯 Tips <span className="text-premium">Mega888 AI Scanner</span>
                        </h2>

                        <div className="card bg-[#0c1224] border-white/10 p-5 space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-emerald-400 mb-2">📊 Apa Itu RTP dan Cara Baca Data Scanner?</h3>
                                <p className="text-sm text-white/50 leading-relaxed">
                                    RTP (Return-to-Player) adalah peratusan yang menunjukkan berapa banyak wang yang akan dikembalikan kepada pemain.
                                    Contohnya, jika sebuah game mempunyai RTP 96%, bermakna untuk setiap RM100 yang dimainkan, secara teori
                                    RM96 akan dikembalikan. Mega888 AI Scanner menganalisis RTP secara real-time untuk mengenal pasti game yang
                                    sedang &quot;hot&quot; dan mempunyai peluang menang lebih tinggi.
                                </p>
                            </div>

                            <div className="border-t border-white/5 pt-4">
                                <h3 className="text-sm font-bold text-emerald-400 mb-2">🎰 Strategi Memilih Game Mega888</h3>
                                <p className="text-sm text-white/50 leading-relaxed">
                                    Pilih game yang menunjukkan RTP tinggi (93% ke atas) pada scanner AI kami. Game dengan RTP yang sedang naik
                                    biasanya menandakan cycle bayaran yang aktif. Gunakan signal dari komuniti WhatsApp dan Telegram kami untuk
                                    mendapatkan maklumat terkini tentang game mana yang sedang panas.
                                </p>
                            </div>

                            <div className="border-t border-white/5 pt-4">
                                <h3 className="text-sm font-bold text-emerald-400 mb-2">💡 Cara Maksimumkan Stars Anda</h3>
                                <p className="text-sm text-white/50 leading-relaxed">
                                    Share referral link anda di group WhatsApp, status WhatsApp, story Instagram, dan post Facebook.
                                    Semakin ramai kawan yang join dan verify, semakin banyak Stars yang anda dapat. Stars boleh digunakan
                                    untuk membuka ciri premium seperti unlimited scans, signal eksklusif dan analisis RTP mendalam.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TESTIMONIALS / SOCIAL PROOF */}
                    <div className="mt-10">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            💬 Apa Kata <span className="text-premium">Pemain Lain</span>
                        </h2>

                        <div className="space-y-3">
                            {[
                                {
                                    name: "Ahmad R.",
                                    location: "Kuala Lumpur",
                                    text: "Scanner AI ni memang membantu. Sebelum ni main hentam je, sekarang boleh check RTP dulu sebelum spin. Komuniti WhatsApp pun aktif!",
                                    stars: 5,
                                },
                                {
                                    name: "Siti N.",
                                    location: "Johor Bahru",
                                    text: "Dah dapat 12 Stars dari referral. Kawan-kawan semua suka sebab scanner dia accurate. Tips dalam Telegram group pun berguna.",
                                    stars: 5,
                                },
                                {
                                    name: "Hafiz M.",
                                    location: "Penang",
                                    text: "Best la scanner ni, percuma pula tu. Signal game hot selalu tepat. Recommend kepada semua player Mega888.",
                                    stars: 4,
                                },
                            ].map((t, i) => (
                                <div key={i} className="card bg-[#0c1224] border-white/10 p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-sm font-black text-white/70">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{t.name}</div>
                                            <div className="text-xs text-white/30">{t.location}</div>
                                        </div>
                                        <div className="ml-auto text-sm">
                                            {"⭐".repeat(t.stars)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed italic">
                                        &quot;{t.text}&quot;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ SECTION (SEO-rich) */}
                    <div className="mt-10">
                        <h2 className="text-center text-lg font-black text-white tracking-wide mb-5">
                            ❓ Soalan Lazim <span className="text-premium">Mega888 AI</span>
                        </h2>

                        <div className="space-y-3">
                            {[
                                {
                                    q: "Apa itu Mega888 AI Scanner?",
                                    a: "Mega888 AI Scanner adalah alat pintar yang menganalisis Return-to-Player (RTP) permainan slot Mega888 secara real-time. Ia membantu pemain membuat keputusan lebih bijak sebelum bermain dengan menunjukkan game mana yang sedang 'hot'."
                                },
                                {
                                    q: "Bagaimana cara mendapatkan Stars percuma?",
                                    a: "Share referral link anda kepada kawan. Apabila mereka mendaftar dan mengesahkan akaun melalui Telegram bot, anda akan menerima 1 Star secara automatik. Tiada had referral — lebih ramai kawan, lebih banyak Stars!"
                                },
                                {
                                    q: "Apa kelebihan join komuniti WhatsApp / Telegram?",
                                    a: "Dalam komuniti, anda akan mendapat tips harian, strategi RTP terkini, alert game hot, serta berinteraksi dengan ribuan pemain lain untuk berkongsi pengalaman dan strategi menang."
                                },
                                {
                                    q: "Adakah Mega888 AI Scanner percuma?",
                                    a: "Ya! Scanner asas adalah percuma sepenuhnya. Stars yang diperolehi melalui referral boleh digunakan untuk membuka ciri premium seperti scan tanpa had, analisis mendalam, dan signal eksklusif."
                                },
                                {
                                    q: "Bolehkah saya gunakan scanner di telefon?",
                                    a: "Ya, Mega888 AI Scanner dioptimumkan sepenuhnya untuk peranti mudah alih termasuk Android dan iOS. Akses melalui pelayar web sahaja — tiada muat turun diperlukan."
                                },
                                {
                                    q: "Apa itu RTP dan mengapa ia penting?",
                                    a: "RTP (Return-to-Player) adalah peratusan yang menunjukkan berapa banyak wang yang akan dikembalikan kepada pemain dalam jangka panjang. RTP yang lebih tinggi bermakna peluang menang lebih baik. Scanner AI kami mengenal pasti game dengan RTP tertinggi pada masa tertentu."
                                },
                                {
                                    q: "Berapa lama Stars dikreditkan selepas referral?",
                                    a: "Stars dikreditkan secara automatik sebaik sahaja kawan anda berjaya mendaftar dan mengesahkan akaun melalui Telegram bot. Proses ini biasanya mengambil masa kurang dari 1 minit."
                                },
                                {
                                    q: "Stars boleh diguna untuk apa?",
                                    a: "Stars boleh digunakan untuk membuka ciri premium AI Scanner seperti unlimited scans, analisis RTP mendalam, signal game hot eksklusif, dan akses awal kepada ciri-ciri baru."
                                },
                                {
                                    q: "Adakah komuniti ini selamat?",
                                    a: "Ya! Komuniti kami diurus oleh admin berpengalaman. Kami mempunyai peraturan ketat terhadap spam, scam, dan aktiviti tidak sah untuk memastikan pengalaman yang selamat untuk semua ahli."
                                },
                                {
                                    q: "Bagaimana cara daftar Mega888 AI Scanner?",
                                    a: "Daftar adalah percuma dan mudah. Lawati tipsmega888.com, klik 'Daftar', dan ikuti arahan untuk mengesahkan akaun anda melalui Telegram bot. Selepas itu, anda boleh mula menggunakan scanner dan program referral."
                                },
                            ].map((faq, i) => (
                                <details key={i} className="card bg-[#0c1224] border-white/10 group">
                                    <summary className="p-4 cursor-pointer text-sm font-bold text-white/90 hover:text-emerald-400 transition-colors list-none flex items-center justify-between">
                                        <span>{faq.q}</span>
                                        <span className="text-white/30 group-open:rotate-180 transition-transform text-xs">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-3">
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
                                { href: "/", icon: "🎰", title: "AI Scanner", desc: "Scan RTP slot Mega888 sekarang" },
                                { href: "/trusted", icon: "🛡️", title: "Trusted Agent", desc: "Senarai agent verified Malaysia" },
                                { href: "/chat", icon: "💬", title: "Live Chat", desc: "Berbual dengan pemain lain" },
                                { href: "/info", icon: "📖", title: "Info & Panduan", desc: "Tips dan strategi lengkap" },
                                { href: "/profile", icon: "👤", title: "Profil Saya", desc: "Lihat Stars & statistik" },
                                { href: "https://t.me/tipsmega888chat", icon: "📢", title: "Telegram Channel", desc: "Signal & alert terkini" },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="card bg-[#0c1224] border-white/10 hover:border-emerald-500/30 p-4 text-center group transition-all hover:bg-emerald-500/5"
                                >
                                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{link.icon}</div>
                                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{link.title}</div>
                                    <div className="text-[11px] text-white/40 mt-0.5">{link.desc}</div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </SharedPageNav>
    );
}
