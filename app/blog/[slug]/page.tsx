import Link from "next/link";
import { BLOG_ARTICLES, getArticleBySlug } from "../../data/blogArticles";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `https://tipsmega888.com/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://tipsmega888.com/blog/${article.slug}`,
      siteName: "TipsMega AI Scanner",
      locale: "ms_MY",
      type: "article",
      images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/og-image.webp"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            url: `https://tipsmega888.com/blog/${article.slug}`,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { "@type": "Organization", name: "TipsMega AI" },
            publisher: {
              "@type": "Organization", name: "TipsMega888",
              url: "https://tipsmega888.com",
              logo: { "@type": "ImageObject", url: "https://tipsmega888.com/og-image.webp" },
            },
            inLanguage: "ms-MY",
          }),
        }}
      />

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://tipsmega888.com/blog" },
              { "@type": "ListItem", position: 3, name: article.title, item: `https://tipsmega888.com/blog/${article.slug}` },
            ],
          }),
        }}
      />

      {/* FAQ JSON-LD */}
      {article.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: article.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Breadcrumb Nav */}
        <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ color: "#64748b" }}>Home</Link>
          {" › "}
          <Link href="/blog" style={{ color: "#64748b" }}>Blog</Link>
          {" › "}
          <span style={{ color: "#f59e0b" }}>{article.title}</span>
        </nav>

        {/* Article Header */}
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "0.75rem" }}>
            {article.title}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            {article.description}
          </p>
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#64748b" }}>
            📅 Dikemaskini: {article.updatedAt} &nbsp;|&nbsp; ⏱️ 5 min baca
          </div>
        </header>

        {/* Article Content */}
        <article
          className="seo-article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{ lineHeight: 1.8, fontSize: "1rem", color: "#e2e8f0" }}
        />

        {/* FAQ Section */}
        {article.faq.length > 0 && (
          <section style={{ marginTop: "3rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>
              ❓ Soalan Lazim (FAQ)
            </h2>
            {article.faq.map((f, i) => (
              <div key={i} style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4, color: "#f59e0b" }}>{f.q}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        {/* Related Articles */}
        {article.relatedArticles.length > 0 && (
          <section style={{ marginTop: "3rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>📖 Artikel Berkaitan</h2>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {article.relatedArticles.map((slug) => {
                const rel = BLOG_ARTICLES.find((a) => a.slug === slug);
                if (!rel) return null;
                return (
                  <Link key={slug} href={`/blog/${slug}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
                    → {rel.title}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Games */}
        {article.relatedGames.length > 0 && (
          <section style={{ marginTop: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>🎮 Game Berkaitan</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {article.relatedGames.map((slug) => (
                <Link
                  key={slug}
                  href={`/games/${slug}`}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                  }}
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.1))",
            border: "1px solid rgba(245,158,11,0.2)",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
            🔥 Cuba AI Scanner Sekarang — Percuma!
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 12 }}>
            Scan RTP live dan pilih game terbaik hari ini
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              borderRadius: 8,
              background: "#f59e0b",
              color: "#000",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Buka AI Scanner →
          </Link>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link href="/blog" style={{ color: "#3b82f6" }}>← Kembali ke Blog</Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/games" style={{ color: "#f59e0b" }}>🎮 Semua Game</Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/" style={{ color: "#10b981" }}>🏠 Home</Link>
        </div>
      </div>
    </>
  );
}
