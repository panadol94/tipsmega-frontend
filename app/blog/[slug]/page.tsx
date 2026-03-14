import Link from "next/link";
import { BLOG_ARTICLES, getArticleBySlug } from "../../data/blogArticles";
import { notFound } from "next/navigation";
import BlogEngagement from "./BlogEngagement";

type InternalLinkRule = {
  phrase: string;
  slug: string;
};

function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getHeroImageFromContent(content: string, fallbackSlug: string) {
  const m = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  const raw = m?.[1] || `/blog/images/${fallbackSlug}.webp`;
  return raw.startsWith("http") ? raw : `https://tipsmega888.com${raw}`;
}

function buildInternalLinkRules(currentSlug: string, relatedSlugs: string[]): InternalLinkRule[] {
  const rules: InternalLinkRule[] = [];

  relatedSlugs.forEach((slug) => {
    if (!slug || slug === currentSlug) return;
    const rel = BLOG_ARTICLES.find((a) => a.slug === slug);
    if (!rel) return;

    const candidates = [
      rel.keywords?.[0],
      rel.keywords?.[1],
      rel.title,
    ]
      .filter(Boolean)
      .map((v) => v!.trim())
      .filter((v) => v.length >= 10);

    candidates.forEach((phrase) => {
      rules.push({ phrase, slug });
    });
  });

  const dedup = new Map<string, InternalLinkRule>();
  rules.forEach((r) => {
    const key = `${r.slug}::${r.phrase.toLowerCase()}`;
    if (!dedup.has(key)) dedup.set(key, r);
  });

  return Array.from(dedup.values()).slice(0, 8);
}

function autoLinkArticleContent(content: string, rules: InternalLinkRule[], maxLinks = 4) {
  if (!rules.length) return content;

  const parts = content.split(/(<[^>]+>)/g);
  const usedSlugs = new Set<string>();
  let total = 0;

  for (let i = 0; i < parts.length; i++) {
    const chunk = parts[i];
    if (!chunk || chunk.startsWith("<") || total >= maxLinks) continue;

    let updated = chunk;

    for (const rule of rules) {
      if (total >= maxLinks) break;
      if (usedSlugs.has(rule.slug)) continue;

      const re = new RegExp(`\\b${escapeRegex(rule.phrase)}\\b`, "i");
      if (!re.test(updated)) continue;

      updated = updated.replace(
        re,
        `<a href="/blog/${rule.slug}" style="color:#38bdf8;text-decoration:underline;font-weight:600">$&</a>`
      );

      usedSlugs.add(rule.slug);
      total += 1;
    }

    parts[i] = updated;
  }

  return parts.join("");
}

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const imageUrl = getHeroImageFromContent(article.content, article.slug);

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
      images: [{ url: imageUrl, width: 1200, height: 675, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

const CORE_CLUSTER_LINKS = [
  { label: "Mega888 Hub", href: "/mega888" },
  { label: "Login Guide", href: "/blog/mega888-login-link-terkini-2026" },
  { label: "Android APK", href: "/blog/mega888-download-android-apk-terbaru-2026" },
  { label: "iPhone / iPad", href: "/blog/mega888-download-ios-terbaru-2026" },
  { label: "RTP Live", href: "/blog/mega888-rtp-live-malaysia-2026" },
  { label: "Trusted Agent", href: "/trusted" },
];

const TRUST_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  const heroImage = getHeroImageFromContent(article.content, article.slug);
  const internalLinkRules = buildInternalLinkRules(article.slug, article.relatedArticles);
  const linkedContent = autoLinkArticleContent(article.content, internalLinkRules);
  const wordCount = stripHtml(article.content).split(" ").filter(Boolean).length;

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
            image: [heroImage],
            url: `https://tipsmega888.com/blog/${article.slug}`,
            mainEntityOfPage: `https://tipsmega888.com/blog/${article.slug}`,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            wordCount,
            articleSection: article.category,
            inLanguage: "ms-MY",
            author: { "@type": "Organization", name: "TipsMega AI" },
            publisher: {
              "@type": "Organization",
              name: "TipsMega888",
              url: "https://tipsmega888.com",
              logo: { "@type": "ImageObject", url: "https://tipsmega888.com/og-image.webp" },
            },
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
              { "@type": "ListItem", position: 2, name: "Mega888 Hub", item: "https://tipsmega888.com/mega888" },
              { "@type": "ListItem", position: 3, name: "Blog", item: "https://tipsmega888.com/blog" },
              { "@type": "ListItem", position: 4, name: article.title, item: `https://tipsmega888.com/blog/${article.slug}` },
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

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 5rem" }}>
        {/* Breadcrumb Nav */}
        <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ color: "#64748b" }}>Home</Link>
          {" › "}
          <Link href="/mega888" style={{ color: "#64748b" }}>Mega888 Hub</Link>
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
            📅 Dikemaskini: {article.updatedAt} &nbsp;|&nbsp; ⏱️ {Math.max(3, Math.round(wordCount / 200))} min baca
          </div>
        </header>

        {/* Cluster Links */}
        <section
          style={{
            margin: "0 0 1.5rem",
            padding: "1rem",
            borderRadius: 12,
            background: "rgba(56,189,248,0.07)",
            border: "1px solid rgba(56,189,248,0.22)",
          }}
        >
          <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}>
            🧭 Pautan penting dalam cluster Mega888
          </p>
          <p style={{ margin: "6px 0 12px", color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.7 }}>
            Jika anda sedang baca artikel ini, besar kemungkinan anda juga perlukan panduan hub, login, APK, RTP live, atau trusted agent.
            Gunakan pautan di bawah untuk bergerak ikut intent yang betul.
          </p>
          <div style={{ display: "grid", gap: "0.7rem", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
            {CORE_CLUSTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "0.8rem 0.9rem",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#e2e8f0",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <div
          style={{
            margin: "0 0 1.5rem",
            padding: "1rem",
            borderRadius: 12,
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.28)",
          }}
        >
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.98rem" }}>
            🎯 Nak check game mana tengah panas sekarang?
          </p>
          <p style={{ margin: "6px 0 10px", color: "#94a3b8", fontSize: "0.9rem" }}>
            Buka AI Scanner untuk semak RTP live sebelum spin.
          </p>
          <Link
            href="/"
            data-track="mid_article_scanner"
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: 8,
              background: "#10b981",
              color: "#052e16",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Buka AI Scanner →
          </Link>
        </div>

        {/* Article Content (auto-internal-linking enabled) */}
        <article
          className="seo-article-content"
          dangerouslySetInnerHTML={{ __html: linkedContent }}
          style={{ lineHeight: 1.8, fontSize: "1rem", color: "#e2e8f0" }}
        />

        <section
          style={{
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: 12,
            background: "rgba(245,158,11,0.06)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <p style={{ margin: 0, fontWeight: 800, fontSize: "0.98rem" }}>
            🔒 Halaman trust & rujukan tambahan
          </p>
          <p style={{ margin: "6px 0 12px", color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Untuk signal trust yang lebih kuat dan pengalaman pengguna yang lebih jelas, rujuk juga halaman latar platform dan polisi asas di bawah.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {TRUST_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e2e8f0",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

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
              {article.relatedArticles.map((relatedSlug) => {
                const rel = BLOG_ARTICLES.find((a) => a.slug === relatedSlug);
                if (!rel) return null;
                return (
                  <Link
                    key={relatedSlug}
                    href={`/blog/${relatedSlug}`}
                    data-track="related_article_click"
                    style={{ color: "#3b82f6", textDecoration: "none" }}
                  >
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
              {article.relatedGames.map((gameSlug) => (
                <Link
                  key={gameSlug}
                  href={`/games/${gameSlug}`}
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
                  {gameSlug.replace(/-/g, " ")}
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
            data-track="bottom_article_scanner"
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
          <Link href="/mega888" style={{ color: "#f59e0b" }}>🧭 Mega888 Hub</Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/games" style={{ color: "#f59e0b" }}>🎮 Semua Game</Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>|</span>
          <Link href="/" style={{ color: "#10b981" }}>🏠 Home</Link>
        </div>
      </div>

      <BlogEngagement slug={article.slug} title={article.title} />
    </>
  );
}
