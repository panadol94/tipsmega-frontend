import Link from "next/link";
import SharedPageNav from "../ui/SharedPageNav";

export const metadata = {
  title: "Help & Panduan AI Scanner | TipsMega888",
  description:
    "Jawapan untuk soalan paling biasa tentang cara guna AI Scanner dan понятие RTP untuk permainan Mega888. Panduan lengkap cara scan, baca keputusan, dan tips.",
  alternates: { canonical: "https://tipsmega888.com/help" },
  openGraph: {
    title: "Help & Panduan AI Scanner | TipsMega888",
    description: "Jawapan soalan biasa tentang cara guna AI Scanner dan понятие RTP Mega888.",
    url: "https://tipsmega888.com/help",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "TipsMega888 Help Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help & Panduan AI Scanner | TipsMega888",
    description: "Panduan lengkap cara guna AI Scanner dan понятие RTP Mega888.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function HelpPage() {
    return (
        <SharedPageNav>
            <div className="app-wrap">
                <div className="app-shell">
                    {/* Page Header */}
                    <div className="page-header">
                        <div
                            className="page-header-eyebrow"
                            style={{
                                border: "1px solid rgba(123,215,255,0.25)",
                                background: "rgba(123,215,255,0.08)",
                                color: "#7bd7ff",
                            }}
                        >
                            <span>❓</span> Panduan
                        </div>
                        <h1
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-emerald-300"
                            style={{ fontStyle: "italic", fontWeight: 900 }}
                        >
                            Help &amp; Panduan
                        </h1>
                        <p>
                            Jawapan untuk soalan paling biasa tentang cara guna AI Scanner dan понятие RTP untuk permainan Mega888.
                        </p>
                    </div>

                    {/* Scanner Guide */}
                    <section
                        className="section-card"
                        style={{ borderColor: "rgba(123,215,255,0.2)", background: "linear-gradient(180deg, rgba(123,215,255,0.05), rgba(8,15,30,0.4))" }}
                    >
                        <h2
                            className="text-lg font-bold mb-4 flex items-center gap-2"
                            style={{ color: "#7bd7ff" }}
                        >
                            📡 Cara Guna AI RTP Scanner
                        </h2>
                        <ol className="space-y-3" style={{ color: "rgba(255,255,255,0.75)" }}>
                            <li className="flex gap-3 items-start">
                                <span
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                    style={{
                                        background: "rgba(123,215,255,0.15)",
                                        border: "1px solid rgba(123,215,255,0.3)",
                                        color: "#7bd7ff",
                                    }}
                                >
                                    1
                                </span>
                                <div>
                                    <p className="font-semibold text-white">Masukkan ID Mega888 Anda</p>
                                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Format: 12 digit (contoh: 123456789012 atau 091234567890)
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                    style={{
                                        background: "rgba(123,215,255,0.15)",
                                        border: "1px solid rgba(123,215,255,0.3)",
                                        color: "#7bd7ff",
                                    }}
                                >
                                    2
                                </span>
                                <div>
                                    <p className="font-semibold text-white">Tekan &ldquo;START SCAN&rdquo;</p>
                                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Tunggu 3-5 saat untuk analisis AI
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                    style={{
                                        background: "rgba(123,215,255,0.15)",
                                        border: "1px solid rgba(123,215,255,0.3)",
                                        color: "#7bd7ff",
                                    }}
                                >
                                    3
                                </span>
                                <div>
                                    <p className="font-semibold text-white">Lihat Keputusan RTP</p>
                                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Overall RTP dan senarai games dengan RTP tertinggi
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </section>

                    {/* FAQ */}
                    <section
                        className="section-card"
                        style={{ borderColor: "rgba(168,85,247,0.2)", background: "linear-gradient(180deg, rgba(168,85,247,0.05), rgba(8,15,30,0.4))" }}
                    >
                        <h2
                            className="text-lg font-bold mb-4"
                            style={{ color: "#c084fc" }}
                        >
                            ❓ Soalan Lazim
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    q: "Apa itu RTP?",
                                    a: "RTP (Return to Player) adalah peratus payout sesuatu game. Semakin tinggi RTP, semakin banyak pemain boleh menang dalam jangka panjang.",
                                },
                                {
                                    q: "Bagaimana AI Scanner berfungsi?",
                                    a: "AI menganalisis pattern game dan memberikan estimation RTP berdasarkan data dari servers Mega888.",
                                },
                                {
                                    q: "Berapa lama cooldown?",
                                    a: "Cooldown adalah 2 minit antara setiap scan untuk mengelakkan abuse sistem.",
                                },
                            ].map((faq) => (
                                <details
                                    key={faq.q}
                                    className="group"
                                    style={{
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        background: "rgba(0,0,0,0.2)",
                                        padding: "0.75rem 1rem",
                                    }}
                                >
                                    <summary
                                        className="flex items-center justify-between cursor-pointer font-semibold"
                                        style={{ color: "rgba(255,255,255,0.88)" }}
                                    >
                                        {faq.q}
                                        <span
                                            className="text-xs transition-transform group-open:rotate-180"
                                            style={{ color: "rgba(255,255,255,0.4)" }}
                                        >
                                            ▼
                                        </span>
                                    </summary>
                                    <p
                                        className="mt-2 text-sm leading-relaxed"
                                        style={{ color: "rgba(255,255,255,0.6)" }}
                                    >
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Links */}
                    <section className="grid grid-cols-2 gap-3">
                        {[
                            { href: "/disclaimer", emoji: "⚠️", label: "Disclaimer", border: "rgba(239,68,68,0.3)" },
                            { href: "/privacy-policy", emoji: "🔒", label: "Privacy Policy", border: "rgba(59,130,246,0.3)" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="section-card text-center transition-colors"
                                style={{ borderColor: item.border }}
                            >
                                <div className="text-2xl mb-1.5">{item.emoji}</div>
                                <div className="font-bold text-sm text-white">{item.label}</div>
                            </Link>
                        ))}
                    </section>
                </div>
            </div>
        </SharedPageNav>
    );
}
