import Link from "next/link";
import { BLOG_ARTICLES } from "../data/blogArticles";
import { BLOG_REDIRECT_SOURCE_SLUGS } from "../data/blogRedirects";

export const metadata = {
  title: "Blog Tips Mega888 | Strategi, Panduan & Tips Menang 2026",
  description:
    "Blog tips dan strategi Mega888 terkini 2026. Panduan lengkap cara menang, hack RTP, download APK, jackpot, dan tips dari pemain profesional.",
  keywords: [
    "blog mega888", "tips mega888", "strategi mega888", "panduan mega888",
    "mega888 hack", "download mega888", "jackpot mega888", "mega888 2026",
  ],
  alternates: { canonical: "https://tipsmega888.com/blog" },
  openGraph: {
    title: "Blog Tips Mega888 | Strategi & Panduan Menang 2026",
    description: "Koleksi tips, strategi, dan panduan Mega888 terkini dari pakar AI Scanner.",
    url: "https://tipsmega888.com/blog",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Blog Tips Mega888 - Strategi & Panduan Menang 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Tips Mega888 | Strategi & Panduan Menang 2026",
    description: "Koleksi tips, strategi, dan panduan Mega888 terkini dari pakar AI Scanner.",
    images: ["https://tipsmega888.com/og-image.webp"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const categoryMeta: Record<string, { label: string; bg: string; text: string; border: string }> = {
  tips:     { label: "💡 Tips",     bg: "rgba(245,158,11,0.12)",  text: "#f59e0b", border: "rgba(245,158,11,0.3)" },
  strategy: { label: "🎯 Strategi",  bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.3)" },
  guide:    { label: "📚 Panduan",   bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  news:     { label: "📰 Berita",    bg: "rgba(16,185,129,0.12)", text: "#34d399", border: "rgba(16,185,129,0.3)" },
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getWordCount(content: string) {
  return stripHtml(content).split(" ").filter(Boolean).length;
}

export default function BlogPage() {
  const visibleArticles = BLOG_ARTICLES.filter((a) => !BLOG_REDIRECT_SOURCE_SLUGS.has(a.slug));
  const [featured, ...rest] = visibleArticles;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog Tips Mega888",
            description: "Koleksi tips, strategi, dan panduan Mega888 terkini.",
            url: "https://tipsmega888.com/blog",
            publisher: {
              "@type": "Organization",
              name: "TipsMega888",
              url: "https://tipsmega888.com",
            },
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
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://tipsmega888.com/blog" },
            ],
          }),
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem 5rem" }}>

        {/* ── PAGE HEADER ── */}
        <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "0.6rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#f59e0b", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              TipsMega AI — Updated 2026
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 900, marginBottom: "0.5rem", lineHeight: 1.2 }}>
            📝 Blog Tips Mega888
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: 480, margin: "0 auto" }}>
            {visibleArticles.length} artikel strategi, panduan & tips menang dari pakar AI Scanner
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link
              href="/mega888"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 14px", borderRadius: 999,
                border: "1px solid rgba(245,158,11,0.3)",
                color: "#f59e0b", fontWeight: 700, fontSize: "0.82rem",
                textDecoration: "none", background: "rgba(245,158,11,0.06)",
              }}
            >
              🧭 Mega888 Hub
            </Link>
          </div>
        </header>

        {/* ── CONVERSION CTA BANNER ── */}
        <div style={{
          marginBottom: "2rem",
          padding: "1.1rem 1.25rem",
          borderRadius: 16,
          background: "linear-gradient(135deg, rgba(5,150,105,0.1), rgba(16,185,129,0.06))",
          border: "1px solid rgba(16,185,129,0.22)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: "0.95rem", color: "#e2e8f0" }}>
              ⚡ Check RTP sebelum spin!
            </p>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.83rem" }}>
              AI Scanner analisa RTP live Mega888 — percuma
            </p>
          </div>
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "9px 18px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #059669, #10b981)",
              color: "#fff", fontWeight: 800, fontSize: "0.85rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            Buka AI Scanner →
          </Link>
        </div>

        {/* ── FEATURED ARTICLE HERO ── */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            style={{
              display: "block",
              marginBottom: "2.5rem",
              borderRadius: 18,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(139,92,246,0.08) 100%)",
              transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
            className="link-card-featured"
          >
            {/* Featured badge */}
            <div style={{
              position: "absolute", top: 14, left: 14, zIndex: 10,
              padding: "4px 12px", borderRadius: 999,
              background: "rgba(245,158,11,0.9)", color: "#000",
              fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em",
            }}>
              ⭐ FEATURED
            </div>

            {/* Hero image — show real image when featuredImage is set, else gradient */}
            {featured.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={featured.featuredImage} alt={featured.title} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{
                height: 200,
                background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(139,92,246,0.2) 50%, rgba(59,130,246,0.15) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "3.5rem", opacity: 0.6 }}>
                  {featured.category === "tips" ? "💡" : featured.category === "strategy" ? "🎯" : featured.category === "guide" ? "📚" : "📰"}
                </span>
              </div>
            )}

            <div style={{ padding: "1.4rem 1.6rem 1.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
                {(() => {
                  const cat = categoryMeta[featured.category] || categoryMeta.tips;
                  return (
                    <span style={{
                      fontSize: "0.72rem", padding: "3px 10px", borderRadius: 99,
                      background: cat.bg, color: cat.text, fontWeight: 700,
                      border: `1px solid ${cat.border}`,
                    }}>
                      {cat.label}
                    </span>
                  );
                })()}
                <span style={{ fontSize: "0.75rem", color: "#475569" }}>
                  {Math.max(3, Math.round(getWordCount(featured.content) / 200))} min baca
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(1.1rem, 3vw, 1.35rem)", fontWeight: 800, lineHeight: 1.3, marginBottom: "0.5rem", color: "#f1f5f9" }}>
                {featured.title}
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                {featured.description}
              </p>

              <div style={{
                marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: 4,
                color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem",
              }}>
                Baca Artikel →
              </div>
            </div>
          </Link>
        )}

        {/* ── ARTICLE GRID ── */}
        {rest.length > 0 && (
          <div style={{ display: "grid", gap: "1rem" }}>
            {rest.map((article, idx) => {
              const cat = categoryMeta[article.category] || categoryMeta.tips;
              const wc = getWordCount(article.content);
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{
                    display: "flex", gap: "1rem", alignItems: "flex-start",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14, padding: "1.1rem 1.25rem",
                    textDecoration: "none", color: "inherit",
                    transition: "border-color 0.2s, transform 0.2s, background 0.2s",
                  }}
                  className="link-card"
                >
                  {/* Category icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: cat.bg, border: `1px solid ${cat.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem",
                  }}>
                    {article.category === "tips" ? "💡" : article.category === "strategy" ? "🎯" : article.category === "guide" ? "📚" : "📰"}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                      <span style={{
                        fontSize: "0.7rem", padding: "2px 8px", borderRadius: 99,
                        background: cat.bg, color: cat.text, fontWeight: 700,
                        border: `1px solid ${cat.border}`,
                      }}>
                        {cat.label}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#475569" }}>
                        {Math.max(3, Math.round(wc / 200))} min
                      </span>
                    </div>
                    <h3 style={{
                      fontSize: "0.98rem", fontWeight: 700, marginBottom: 4,
                      lineHeight: 1.35, color: "#e2e8f0",
                    }}>
                      {article.title}
                    </h3>
                    <p style={{
                      color: "#64748b", fontSize: "0.83rem", lineHeight: 1.55,
                      margin: 0, display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {article.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── FOOTER NAV ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "0.5rem", marginTop: "3rem",
          padding: "1.25rem", borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <Link href="/games" style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>🎮 Semua Game</Link>
          <span style={{ color: "#1e293b", margin: "0 0.25rem" }}>|</span>
          <Link href="/mega888" style={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>🧭 Mega888 Hub</Link>
          <span style={{ color: "#1e293b", margin: "0 0.25rem" }}>|</span>
          <Link href="/trusted" style={{ color: "#34d399", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>🔥 Trusted Agents</Link>
          <span style={{ color: "#1e293b", margin: "0 0.25rem" }}>|</span>
          <Link href="/" style={{ color: "#60a5fa", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>🏠 Home</Link>
        </div>
      </div>

    </>
  );
}
