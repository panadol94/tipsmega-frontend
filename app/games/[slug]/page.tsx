import Link from "next/link";
import { GAME_PAGES, getGameBySlug } from "../../data/gamePages";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return GAME_PAGES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) return {};
  const title = `${game.name} Mega888: RTP ${game.rtpMin}%-${game.rtpMax}%, Tips & Strategi 2026`;
  const description = `${game.name} Mega888 — RTP ${game.rtpMin}% hingga ${game.rtpMax}%. Tips menang, analisis volatiliti ${game.volatility}, dan strategi untuk game ${game.name}. Guna AI Scanner untuk check RTP live.`;
  return {
    title,
    description,
    keywords: [
      `${game.name.toLowerCase()} mega888`,
      `mega888 ${game.name.toLowerCase()}`,
      `${game.name.toLowerCase()} rtp`,
      `tips ${game.name.toLowerCase()}`,
      `${game.name.toLowerCase()} slot`,
      "mega888", "rtp mega888", "tips mega888",
    ],
    alternates: { canonical: `https://tipsmega888.com/games/${game.slug}` },
    openGraph: {
      title, description,
      url: `https://tipsmega888.com/games/${game.slug}`,
      siteName: "TipsMega AI Scanner",
      locale: "ms_MY",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) return notFound();

  return (
    <>
      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `${game.name} - Mega888`,
            applicationCategory: "GameApplication",
            operatingSystem: "Android, iOS",
            description: game.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
          }),
        }}
      />

      {/* Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
              { "@type": "ListItem", position: 2, name: "Games", item: "https://tipsmega888.com/games" },
              { "@type": "ListItem", position: 3, name: game.name, item: `https://tipsmega888.com/games/${game.slug}` },
            ],
          }),
        }}
      />

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: game.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ color: "#64748b" }}>Home</Link>{" › "}
          <Link href="/games" style={{ color: "#64748b" }}>Games</Link>{" › "}
          <span style={{ color: "#f59e0b" }}>{game.name}</span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>{game.icon}</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 8 }}>
            {game.name} Mega888
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(245,158,11,0.15)", color: "#f59e0b", fontSize: "0.85rem", fontWeight: 600 }}>
              RTP: {game.rtpMin}%-{game.rtpMax}%
            </span>
            <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(139,92,246,0.15)", color: "#8b5cf6", fontSize: "0.85rem", fontWeight: 600 }}>
              Volatiliti: {game.volatility}
            </span>
            <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(59,130,246,0.15)", color: "#3b82f6", fontSize: "0.85rem", fontWeight: 600 }}>
              {game.category}
            </span>
          </div>
        </header>

        {/* Description */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            📖 Tentang {game.name}
          </h2>
          <p style={{ color: "#e2e8f0", lineHeight: 1.8 }}>{game.description}</p>
        </section>

        {/* Features */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            ⭐ Feature Utama
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {game.features.map((f, i) => (
              <span key={i} style={{
                padding: "6px 14px", borderRadius: 8,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                fontSize: "0.9rem",
              }}>
                {f}
              </span>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            💡 Tips Menang {game.name}
          </h2>
          <ol style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
            {game.tips.map((tip, i) => (
              <li key={i} style={{ marginBottom: "0.5rem", color: "#e2e8f0" }}>{tip}</li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            ❓ Soalan Lazim — {game.name}
          </h2>
          {game.faq.map((f, i) => (
            <div key={i} style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f59e0b", marginBottom: 4 }}>{f.q}</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </section>

        {/* Related Games */}
        {game.relatedGames.length > 0 && (
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              🎮 Game Berkaitan
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {game.relatedGames.map((slug) => {
                const rel = GAME_PAGES.find((g) => g.slug === slug);
                if (!rel) return null;
                return (
                  <Link key={slug} href={`/games/${slug}`} style={{
                    padding: "6px 14px", borderRadius: 8,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0", fontSize: "0.85rem", textDecoration: "none",
                  }}>
                    {rel.icon} {rel.name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <div style={{
          padding: "1.5rem", borderRadius: 12, textAlign: "center",
          background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.1))",
          border: "1px solid rgba(245,158,11,0.2)",
        }}>
          <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
            🔥 Scan RTP {game.name} Sekarang
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 12 }}>
            Check RTP live {game.name} dengan AI Scanner — percuma!
          </p>
          <Link href="/" style={{
            display: "inline-block", padding: "10px 24px", borderRadius: 8,
            background: "#f59e0b", color: "#000", fontWeight: 700, textDecoration: "none",
          }}>
            Buka AI Scanner →
          </Link>
        </div>

        {/* Nav */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link href="/games" style={{ color: "#3b82f6" }}>← Semua Game</Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/blog" style={{ color: "#f59e0b" }}>📝 Blog Tips</Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/" style={{ color: "#10b981" }}>🏠 Home</Link>
        </div>
      </div>
    </>
  );
}
