import Link from "next/link";
import { GAME_PAGES } from "../data/gamePages";

export const metadata = {
  title: "Senarai Game Mega888 Malaysia 2026 | RTP, Tips & 197+ Slot",
  description:
    "Senarai game Mega888 Malaysia 2026 dengan 197+ slot. Semak RTP, kategori, tips asas, dan pilih game terbaik menggunakan rujukan AI Scanner.",
  keywords: [
    "game mega888", "senarai game mega888", "slot mega888", "mega888 game list",
    "mega888 slot terbaik", "mega888 2026",
  ],
  alternates: { canonical: "https://tipsmega888.com/games" },
  openGraph: {
    title: "Semua Game Mega888 2026 | 197+ Slot",
    description: "Senarai lengkap game Mega888 dengan RTP, tips, dan strategi.",
    url: "https://tipsmega888.com/games",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Group games by category
function groupByCategory(games: typeof GAME_PAGES) {
  const groups: Record<string, typeof GAME_PAGES> = {};
  games.forEach((g) => {
    if (!groups[g.category]) groups[g.category] = [];
    groups[g.category].push(g);
  });
  return groups;
}

export default function GamesPage() {
  const grouped = groupByCategory(GAME_PAGES);
  const categories = Object.keys(grouped);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Semua Game Mega888",
            description: "Senarai lengkap 197+ game slot Mega888",
            url: "https://tipsmega888.com/games",
            numberOfItems: GAME_PAGES.length,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
              { "@type": "ListItem", position: 2, name: "Games", item: "https://tipsmega888.com/games" },
            ],
          }),
        }}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1rem" }}>
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            🎮 Semua Game Mega888
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
            {GAME_PAGES.length}+ slot dengan RTP, tips & strategi — pilih game terbaik anda
          </p>
        </header>

        {categories.map((cat) => (
          <section key={cat} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
              {grouped[cat][0].icon} {cat} ({grouped[cat].length} game)
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {grouped[cat].map((game) => (
                <Link
                  key={game.slug}
                  href={`/games/${game.slug}`}
                  style={{
                    display: "block",
                    padding: "0.75rem 1rem",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>
                    {game.icon} {game.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    RTP: {game.rtpMin}%-{game.rtpMax}% &nbsp;|&nbsp; {game.volatility}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/blog" style={{ color: "#ef4444", fontWeight: 600 }}>
            📝 Baca Tips & Strategi →
          </Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/" style={{ color: "#3b82f6", fontWeight: 600 }}>
            🏠 Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </>
  );
}
