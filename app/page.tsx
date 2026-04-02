
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Mega888 AI RTP Scanner Malaysia 2026 — Scan RTP Live Percuma | TipsMega888",
  description:
    "Guna AI RTP Scanner Mega888 Malaysia untuk check RTP live, pola game, dan pilih game terbaik sebelum spin. Percuma untuk semua pemain Malaysia 2026.",
  openGraph: {
    title: "Mega888 AI RTP Scanner Malaysia 2026 — Scan RTP Live Percuma",
    description:
      "Platform AI Scanner untuk check RTP Mega888 Malaysia secara live, rujuk pola game, trusted company, dan game list.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888 AI",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI RTP Scanner Malaysia 2026 — Scan RTP Live Percuma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Mega888 AI RTP Scanner Malaysia 2026 — Scan RTP Live Percuma",
    description:
      "AI RTP Scanner Mega888 Malaysia — check RTP live, pola game, dan pilih game terbaik sebelum spin. Percuma!",
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
};

export default function Page() {
  return (
    <>
      {/* WebSite schema — enables sitelinks search box in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            description: "Platform AI Scanner untuk semakan RTP live dan panduan utama Mega888 Malaysia.",
            inLanguage: "ms-MY",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://tipsmega888.com/games?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
            ],
          }),
        }}
      />

      {/* Organization schema — Google Knowledge Panel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            logo: "https://tipsmega888.com/og-image.webp",
            description: "Platform rujukan Mega888 Malaysia dengan AI Scanner, panduan, dan halaman trusted agent.",
            sameAs: [
              "https://tipsmega888.com/mega888",
              "https://tipsmega888.com/blog",
              "https://tipsmega888.com/trusted"
            ],
          }),
        }}
      />

      {/* SoftwareApplication schema — AI Scanner tool */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TipsMega888 AI RTP Scanner",
            url: "https://tipsmega888.com",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "1280",
              bestRating: "5",
            },
            description: "AI-powered RTP scanner untuk Mega888 Malaysia. Semak RTP live percuma.",
          }),
        }}
      />

      <HomeClient>
        <section
          aria-label="Social proof"
          className="card p-4 border-red-500/20 bg-gradient-to-br from-red-950/30 to-slate-950/80"
          style={{ borderRadius: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ff6b6b", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              ⭐ Apa Kata Pengguna
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,107,107,0.15)", borderRadius: 1 }} />
          </div>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {[
              {
                name: "Ahmad R.",
                loc: "Kuala Lumpur",
                text: "AI Scanner这名堂真系Work! 头先scan紧个game先知系 high RTP，跟住中咗个大彩 🎰",
                stars: 5,
              },
              {
                name: "Siti M.",
                loc: "Johor Bahru",
                text: "Guna AI Scanner ni lepas tu menang konsisten sikit. Takdak guarantee tapi odds memang improves ✔️",
                stars: 5,
              },
              {
                name: "Chuan L.",
                loc: "Penang",
                text: "Best part — totally free. Daugunakan daily untuk check RTP sebelum main. Highly recommend!",
                stars: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: `hsl(${i * 60 + 180},70%,50%,0.2)`,
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e2e8f0" }}>{t.name}</span>
                    <span style={{ fontSize: "0.72rem", color: "#475569", marginLeft: 6 }}>{t.loc}</span>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#ef4444", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                    {"★".repeat(t.stars)}
                  </div>
                </div>
                <p style={{ fontSize: "0.83rem", color: "#64748b", lineHeight: 1.55, margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 12,
              padding: "0.7rem 1rem",
              borderRadius: 10,
              background: "rgba(255,77,77,0.06)",
              border: "1px solid rgba(255,77,77,0.12)",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {[
              { val: "4.9/5", lbl: "Rating Purata" },
              { val: "50K+", lbl: "Pengguna Aktif" },
              { val: "2024–2026", lbl: "Online" },
            ].map((s) => (
              <div key={s.lbl} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#ff6b6b" }}>{s.val}</div>
                <div style={{ fontSize: "0.68rem", color: "#334155", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </section>
      </HomeClient>

      {/* ── INTERNAL LINK CARDS: moved below scanner for better mobile above-the-fold UX ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1rem 1.5rem" }}>
        <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: "0.75rem" }}>
          Explore Mega888 Malaysia
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.65rem" }}>
          {[
            ["🔥 Trusted Company", "/trusted", "Verified agents & payout speed"],
            ["🎮 Semua Game", "/games", "197+ slot dengan RTP & volatiliti"],
            ["📝 Blog Tips & Strategi", "/blog", "Panduan, download, withdraw & more"],
            ["🧭 Mega888 Hub", "/mega888", "Login, APK, RTP live, trusted agent"],
          ].map(([label, href, note]) => (
            <a
              key={href}
              href={href}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: "0.85rem 1rem",
              }}
            >
              <div style={{ fontWeight: 800, color: "#e2e8f0", marginBottom: 3, fontSize: "0.88rem" }}>{label}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{note}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 mt-4 max-w-4xl mx-auto">
        <a href="https://masuk10.com/Prospinner" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl border border-[#25D366]/30 bg-black/60 backdrop-blur-md p-4 shadow-[0_0_20px_rgba(37,211,102,0.15)] group transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:border-[#25D366]/60">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-3xl group-hover:bg-[#25D366]/20 transition-all duration-500 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#128C7E]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-[#25D366] font-extrabold text-sm mb-1 flex items-start gap-1.5">
                🔥 <span className="uppercase tracking-wider">Akses VIP: Komuniti Spin Mega888</span>
              </h2>
              <p className="text-[11px] text-white/70 leading-relaxed mb-2">
                Bincang pola, dapatkan <strong className="text-white">Test ID percuma</strong> & sembang 'spin' bersama <strong className="text-white">10,000+ ahli</strong> aktif setiap hari!
              </p>
              <div className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Join Group WhatsApp
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-12 h-12 bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/10 border border-[#25D366]/20 rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0">
              <svg className="w-5 h-5 text-[#25D366] group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </a>
      </div>

      <div className="px-4 py-4 mb-2 mt-4 max-w-4xl mx-auto opacity-90 hover:opacity-100 transition-opacity">
        <div className="border border-red-500/20 bg-black/40 backdrop-blur-md rounded-2xl p-5 shadow-[0_0_15px_rgba(255,77,77,0.1)]">
          <h2 className="text-red-400 font-bold mb-3 text-sm flex items-center gap-2">
            <span className="text-lg">🎯</span> Strategi & Panduan Mega888 2026
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[11px] text-white/70">
            <li><a href="/blog/mega888-rtp-scanner-panduan-lengkap-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Rahsia Scanner AI RTP Mega888 2026</a></li>
            <li><a href="/blog/mega888-download-panduan-lengkap-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Panduan Selamat Download APK Mega888</a></li>
            <li><a href="/blog/mega888-free-credit-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Cara Claim Free Credit RM10 Anti-Scam</a></li>
            <li><a href="/blog/cara-menang-mega888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>5 Strategi Cara Menang Data-Driven</a></li>
            <li><a href="/blog/game-senang-jackpot" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>10 Slot Paling Mudah Menang (Data AI)</a></li>
            <li><a href="/blog/mega888-test-id-percuma-cara-guna-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Senarai Test ID Mega888 Percuma 2026</a></li>
            <li><a href="/blog/mega888-original-vs-fake" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Kenal Pasti Mega888 Original vs Fake</a></li>
            <li><a href="/blog/mega888-akaun-kena-block" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Mega888 Akaun Kena Block? Cara Selesaikan</a></li>
            <li><a href="/blog/mega888-vs-pussy888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Mega888 vs Pussy888: Mana Lebih Untung?</a></li>
            <li><a href="/blog/mega888-918kiss-beza" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Perbandingan Mega888 & 918Kiss 2026</a></li>
          </ul>
        </div>
      </div>

      <div className="px-4 py-8 mb-6 mt-4 opacity-70 hover:opacity-100 transition-opacity">
        <article className="prose prose-sm prose-invert max-w-none text-[11px] text-white/50 text-center space-y-3">
          <h2 className="text-white/80 font-bold mb-2">Mega888 Hack 2026 vs AI RTP Scanner</h2>
          <p>Mencari <strong>software hack Mega888</strong> atau aplikasi godam slot terkini? Hakikatnya, pelayan Mega888 sangat kebal dan sebarang cubaan menggodam adalah satu penipuan (scam).</p>
          <p>Namun anda masih boleh menang! Selamat datang ke <strong>TipsMega888</strong>, alternatif sah dan berkesan berbanding godam <strong className="text-red-400">Mega888</strong> di Malaysia. Daripada bergantung kepada aplikasi hack palsu, sistem pengimbas AI kami menganalisis algoritma dan corak probabiliti secara sah untuk mendedahkan kadar slot RTP secara langsung (Live RTP).</p>
          <p>Dengan beribu-ribu pemain aktif, strategi <strong>Live RTP Scanner</strong> jauh lebih dominan berbanding mencari <strong>cara hack slot Mega888</strong>. Panduan ini membina kelebihan statistik yang jelas tanpa risiko malware. Tinggalkan aplikasi godam, dan mula gunakan data AI sebenar hari ini.</p>
        </article>
      </div>
    </>
  );
}
