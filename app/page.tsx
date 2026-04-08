
import HomeClient from "./HomeClient";
import SlotMachineButton from "./components/SlotMachineButton";

export const metadata = {
  title: "Mega888 AI RTP Scanner Malaysia 2026 | TipsMega888",
  description:
    "Semak RTP Mega888 secara live, baca panduan scanner, dan rujuk halaman utama Mega888 Malaysia dalam satu tempat. TipsMega888 menghimpunkan scanner, panduan, dan halaman rujukan penting.",
  openGraph: {
    title: "Mega888 AI RTP Scanner Malaysia 2026 | TipsMega888",
    description:
      "Platform rujukan Mega888 Malaysia dengan AI scanner, panduan penggunaan, dan halaman trusted untuk rujukan lanjut.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TipsMega888 AI RTP Scanner Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Mega888 AI RTP Scanner Malaysia 2026 | TipsMega888",
    description:
      "Semak RTP secara live, baca panduan, dan rujuk halaman utama Mega888 Malaysia.",
    images: ["https://tipsmega888.com/og-image.webp"],
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
            description: "Platform rujukan Mega888 Malaysia dengan scanner, panduan penggunaan, dan halaman utama untuk topik berkaitan RTP, download, serta trusted agent.",
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
            description: "Platform rujukan Mega888 Malaysia dengan scanner, panduan, dan halaman trusted untuk rujukan tambahan.",
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
            description: "Alat rujukan berasaskan web untuk semakan RTP live dan panduan penggunaan di TipsMega888.",
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

      {/* ── INTERNAL LINK CARDS: compact above-the-fold design ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 0.75rem 0.75rem" }}>
        <p style={{ textAlign: "center", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: "0.5rem" }}>
          Explore Mega888 Malaysia
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.5rem" }}>
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
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: "0.6rem 0.75rem",
              }}
            >
              <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 2, fontSize: "0.82rem" }}>{label}</div>
              <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.4 }}>{note}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 mt-4 max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-[28px] border border-yellow-400/20 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_38%),linear-gradient(180deg,rgba(54,7,7,0.94),rgba(8,2,2,0.98))] p-3 shadow-[0_0_40px_rgba(255,140,0,0.14)]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
            <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] skew-x-[-18deg] animate-pulse" />
          </div>
          <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-300/80">Mega Jackpot Access</p>
              <h2 className="text-sm font-extrabold text-white">Spin terus masuk ke lobby komuniti VIP</h2>
            </div>
            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-yellow-200">
              3 Reel Bonus
            </span>
          </div>

          <SlotMachineButton
            href="https://masuk10.com/Prospinner"
            label="PLAY NOW"
            sublabel="3 reels, fast spin, instant jackpot vibe"
            pattern={["💎", "7", "💎"]}
          />
        </div>
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

      <div className="px-4 py-8 mb-6 mt-4 opacity-90 transition-opacity">
        <article className="prose prose-sm prose-invert max-w-none text-[11px] text-white/60 text-center space-y-3">
          <h2 className="text-white/80 font-bold mb-2">Tentang TipsMega888 AI Scanner</h2>
          <p>
            TipsMega888 menghimpunkan scanner, panduan, dan halaman rujukan untuk pengguna yang mahu melihat bacaan RTP semasa dan memahami topik berkaitan Mega888 Malaysia dengan lebih teratur.
          </p>
          <p>
            Scanner ini disediakan sebagai alat rujukan. Ia boleh membantu pengguna membaca bacaan RTP live dan menapis topik penting seperti download, trusted agent, dan panduan asas lain, tetapi ia bukan jaminan untuk hasil tertentu.
          </p>
          <p>
            Jika anda baru bermula, gunakan halaman ini untuk scan RTP, kemudian teruskan ke Mega888 Hub, blog, atau trusted page mengikut topik yang anda perlukan.
          </p>
        </article>
      </div>
    </>
  );
}
