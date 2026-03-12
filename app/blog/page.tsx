import Link from "next/link";
import { BLOG_ARTICLES } from "../data/blogArticles";

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
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  tips: { label: "💡 Tips", color: "#f59e0b" },
  strategy: { label: "🎯 Strategi", color: "#8b5cf6" },
  guide: { label: "📚 Panduan", color: "#3b82f6" },
  news: { label: "📰 Berita", color: "#10b981" },
};

export default function BlogPage() {
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

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            📝 Blog Tips Mega888
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
            Strategi, panduan, dan tips menang dari pakar AI Scanner — updated 2026
          </p>
          <div style={{ marginTop: "0.9rem" }}>
            <Link
              href="/mega888"
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(245,158,11,0.35)",
                color: "#f59e0b",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.86rem",
              }}
            >
              🧭 Buka Mega888 Hub
            </Link>
          </div>
        </header>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {BLOG_ARTICLES.map((article) => {
            const cat = categoryLabels[article.category] || categoryLabels.tips;
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "1.5rem",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "2px 10px",
                      borderRadius: 99,
                      background: `${cat.color}22`,
                      color: cat.color,
                      fontWeight: 600,
                    }}
                  >
                    {cat.label}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 6 }}>
                  {article.title}
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  {article.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/games" style={{ color: "#f59e0b", fontWeight: 600 }}>
            🎮 Lihat Semua Game Mega888 →
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
