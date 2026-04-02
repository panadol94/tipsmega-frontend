
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

      {/* ── INTERNAL LINK CARDS: money / conversion pages ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1rem 2rem" }}>
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

      <HomeClient />
    </>
  );
}

