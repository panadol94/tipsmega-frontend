
import HomeClient from "./HomeClient";
import SlotMachineButton from "./components/SlotMachineButton";
import SharedPageNav from "./ui/SharedPageNav";

export const metadata = {
  title: "Mega888 Community Wins | Group WhatsApp Mega888 & AI RTP Scanner Malaysia 2026 | TipsMega888",
  description:
    "Join group WhatsApp spin Mega888 Malaysia. See community wins, big jackpots & member wins. Semak RTP Mega888 secara live dengan AI Scanner. TipsMega888 menghimpunkan scanner, panduan, dan komuniti pemain.",
  keywords: [
    "group whatsapp mega888",
    "group whatsapp spin",
    "mega888 community",
    "mega888 community wins",
    "mega888 jackpot",
    "mega888 big win",
    "mega888 malaysia",
    "mega888 ai scanner",
    "mega888 rtp",
    "tipsmega888"
  ],
  openGraph: {
    title: "Mega888 Community Wins | Group WhatsApp Mega888 & AI RTP Scanner 2026",
    description:
      "Join group WhatsApp spin Mega888. See member wins and big jackpots. Community wins & AI RTP scanner Malaysia.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/wins/win-4.jpg",
        width: 1200,
        height: 630,
        alt: "Mega888 Community Wins - Big Jackpot Win Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Mega888 Community Wins | Group WhatsApp Mega888 & AI RTP Scanner 2026",
    description:
      "Join group WhatsApp spin Mega888. See member wins and big jackpots.",
    images: ["https://tipsmega888.com/wins/win-4.jpg"],
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
};

export default function Page() {
  return (
    <SharedPageNav>
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

      {/* Organization schema — Google Knowledge Panel with Community */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            logo: "https://tipsmega888.com/og-image.webp",
            description: "Platform rujukan Mega888 Malaysia dengan scanner, panduan, dan komuniti pemain aktif.",
            sameAs: [
              "https://tipsmega888.com/mega888",
              "https://tipsmega888.com/blog",
              "https://tipsmega888.com/trusted",
              "https://t.me/tipsmega888chat"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              url: "https://t.me/tipsmega888chat",
              availableLanguage: ["Malay", "English"]
            }
          }),
        }}
      />

      {/* Community Wins - Image Gallery Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Mega888 Community Wins",
            description: "Koleksi kemenangan ahli komuniti Mega888 Malaysia - big wins, jackpots, dan testimonials.",
            url: "https://tipsmega888.com",
            image: [
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-1.jpg",
                name: "Ultra Mega Big Win - RM 4,500",
                description: "Group WhatsApp Mega888 member big win screenshot"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-2.jpg",
                name: "Big Win - RM 750",
                description: "Group WhatsApp spin member win screenshot"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-3.jpg",
                name: "Gates of Olympus Win - RM 2,500",
                description: "Mega888 community member win"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-4.jpg",
                name: "CM8 Jackpot - RM 15,000,000",
                description: "Mega888 big jackpot community win"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-5.jpg",
                name: "Rush Xmas Win - RM 6,567",
                description: "Group WhatsApp Mega888 spin win"
              }
            ]
          }),
        }}
      />

      {/* Community Social Proof - Aggregate Rating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Mega888 AI RTP Scanner & Community",
            description: "AI-powered RTP scanner untuk Mega888 dengan komuniti aktif Malaysia",
            brand: {
              "@type": "Brand",
              name: "TipsMega888"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "50000",
              bestRating: "5",
              worstRating: "1"
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "MYR",
              availability: "https://schema.org/InStock"
            }
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

      <>
        <HomeClient />
      </>

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
    </SharedPageNav>
  );
}
