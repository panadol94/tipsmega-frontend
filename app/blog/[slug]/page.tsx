import Link from "next/link";
import { BLOG_ARTICLES, getArticleBySlug, type BlogArticle } from "../../data/blogArticles";
import { BLOG_REDIRECTS, BLOG_REDIRECT_SOURCE_SLUGS } from "../../data/blogRedirects";
import { notFound } from "next/navigation";
import BlogEngagement from "./BlogEngagement";
import SharedPageNav from "../../ui/SharedPageNav";

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

/** Resolve the best hero image: featuredImage field > first content img > slug fallback */
function resolveHeroImage(article: BlogArticle) {
  if (article.featuredImage) return article.featuredImage;
  return getHeroImageFromContent(article.content, article.slug);
}

function buildInternalLinkRules(currentSlug: string, relatedSlugs: string[]): InternalLinkRule[] {
  const rules: InternalLinkRule[] = [];
  // Primary: use article title (exact phrase, highest relevance)
  relatedSlugs.forEach((slug) => {
    if (!slug || slug === currentSlug) return;
    const rel = BLOG_ARTICLES.find((a) => a.slug === slug);
    if (!rel) return;
    // Prefer title phrase first — most natural anchor text
    if (rel.title && rel.title.length >= 10) {
      rules.push({ phrase: rel.title, slug });
    }
    // Then keyword variants
    const kwPhrase = rel.keywords?.[0];
    if (kwPhrase && kwPhrase.length >= 10) {
      rules.push({ phrase: kwPhrase, slug });
    }
    const kw2 = rel.keywords?.[1];
    if (kw2 && kw2.length >= 10) {
      rules.push({ phrase: kw2, slug });
    }
  });
  const dedup = new Map<string, InternalLinkRule>();
  rules.forEach((r) => {
    const key = `${r.slug}::${r.phrase.toLowerCase()}`;
    if (!dedup.has(key)) dedup.set(key, r);
  });
  return Array.from(dedup.values()).slice(0, 12);
}

function autoLinkArticleContent(content: string, rules: InternalLinkRule[], maxLinks = 6) {
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
  const redirectTarget = BLOG_REDIRECTS[slug];
  const canonicalSlug = redirectTarget ?? article.slug;
  const canonicalUrl = `https://tipsmega888.com/blog/${canonicalSlug}`;
  const imageUrl = resolveHeroImage(article);
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      siteName: "TipsMega888",
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
      // Keep redirect-source slugs non-indexable, but allow real article pages to index.
      index: !BLOG_REDIRECT_SOURCE_SLUGS.has(slug),
      follow: true,
      googleBot: {
        index: !BLOG_REDIRECT_SOURCE_SLUGS.has(slug),
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const CORE_CLUSTER_LINKS = [
  { label: "Mega888 Hub",       href: "/mega888" },
  { label: "Login Guide",       href: "/blog/mega888-register-akaun-baru-2026" },
  { label: "Download APK",      href: "/blog/mega888-download-android-apk-terbaru-2026" },
  { label: "iOS Install",       href: "/blog/mega888-download-ios-terbaru-2026" },
  { label: "RTP Live",          href: "/blog/mega888-rtp-live-malaysia-2026" },
  { label: "Trusted Agent",     href: "/trusted" },
];

/** Fallback to popular articles if relatedArticles is empty */
function getRelatedArticles(article: BlogArticle, fallbackCount = 4): string[] {
  // Return explicit relatedArticles if available
  if (article.relatedArticles.length > 0) return article.relatedArticles;
  // Fallback: pick articles from same category, otherwise any popular ones, excluding self
  const sameCategory = BLOG_ARTICLES.filter(a => a.slug !== article.slug && a.category === article.category).slice(0, fallbackCount);
  if (sameCategory.length >= fallbackCount) return sameCategory.map(a => a.slug);
  // If not enough same-category, add some popular others
  const popularFallback = BLOG_ARTICLES.filter(a => a.slug !== article.slug && a.category !== article.category).slice(0, fallbackCount - sameCategory.length);
  return [...sameCategory, ...popularFallback].map(a => a.slug);
}

const TRUST_LINKS = [
  { label: "About",          href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms",         href: "/terms" },
  { label: "Disclaimer",    href: "/disclaimer" },
];

const categoryMeta: Record<string, { label: string; bg: string; text: string; border: string; icon: string }> = {
  tips:     { label: "💡 Tips",     bg: "rgba(245,158,11,0.12)",  text: "#f59e0b", border: "rgba(245,158,11,0.3)",  icon: "💡" },
  strategy: { label: "🎯 Strategi",  bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.3)", icon: "🎯" },
  guide:    { label: "📚 Panduan",   bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.3)", icon: "📚" },
  news:     { label: "📰 Berita",    bg: "rgba(16,185,129,0.12)", text: "#34d399", border: "rgba(16,185,129,0.3)", icon: "📰" },
  panduan:  { label: "📖 Panduan",   bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.3)", icon: "📖" },
  info:     { label: "🔍 Info",      bg: "rgba(16,185,129,0.12)", text: "#34d399", border: "rgba(16,185,129,0.3)", icon: "🔍" },
  download: { label: "⬇️ Download",  bg: "rgba(239,68,68,0.12)",   text: "#f87171", border: "rgba(239,68,68,0.3)",  icon: "⬇️" },
};

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();
  const redirectTarget = BLOG_REDIRECTS[slug];

  const heroImage = resolveHeroImage(article);
  
  return (
    <SharedPageNav>
      <BlogArticleContent slug={slug} article={article} redirectTarget={redirectTarget} heroImage={heroImage} />
    </SharedPageNav>
  );
}

async function BlogArticleContent({ slug, article, redirectTarget, heroImage }: { 
  slug: string; 
  article: BlogArticle; 
  redirectTarget: string | undefined;
  heroImage: string;
}) {
  const internalLinkRules = buildInternalLinkRules(article.slug, article.relatedArticles);
  const linkedContent = autoLinkArticleContent(article.content, internalLinkRules);
  const wordCount = stripHtml(article.content).split(" ").filter(Boolean).length;
  const cat = categoryMeta[article.category] || categoryMeta.tips;

  return (
    <>
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
            author: { "@type": "Person", name: "TipsMega AI Team", url: "https://tipsmega888.com/about" },
            publisher: {
              "@type": "Organization",
              name: "TipsMega888",
              url: "https://tipsmega888.com",
              logo: { "@type": "ImageObject", url: "https://tipsmega888.com/og-image.webp" },
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
              { "@type": "ListItem", position: 2, name: "Mega888 Hub", item: "https://tipsmega888.com/mega888" },
              { "@type": "ListItem", position: 3, name: "Blog", item: "https://tipsmega888.com/blog" },
              { "@type": "ListItem", position: 4, name: article.title, item: `https://tipsmega888.com/blog/${article.slug}` },
            ],
          }),
        }}
      />

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

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "1.5rem 1rem 5rem" }}>

        {/* ── BREADCRUMB ── */}
        <nav style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" style={{ color: "#475569", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/mega888" style={{ color: "#475569", textDecoration: "none" }}>Mega888 Hub</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/blog" style={{ color: "#475569", textDecoration: "none" }}>Blog</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: cat.text, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {article.title}
          </span>
        </nav>

        {/* ── ARTICLE HEADER ── */}
        <header style={{ marginBottom: "2rem" }}>
          {/* Category + meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.8rem", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.72rem", padding: "3px 10px", borderRadius: 99,
              background: cat.bg, color: cat.text, fontWeight: 700,
              border: `1px solid ${cat.border}`,
            }}>
              {cat.icon} {cat.label}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#475569" }}>
              📅 {article.updatedAt}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#475569" }}>
              ⏱️ {Math.max(3, Math.round(wordCount / 200))} min baca
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
            fontWeight: 900, lineHeight: 1.25,
            marginBottom: "0.75rem", color: "#f1f5f9",
          }}>
            {article.title}
          </h1>

          <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.65, margin: 0 }}>
            {article.description}
          </p>

          {/* Divider */}
          <div style={{ marginTop: "1.25rem", height: 1, background: "rgba(255,255,255,0.07)", borderRadius: 1 }} />
        </header>

        {/* ── HERO IMAGE ── */}
        {article.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.featuredImage}
            alt={article.title}
            style={{
              width: "100%",
              maxHeight: 320,
              objectFit: "cover",
              borderRadius: 14,
              marginBottom: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "block",
            }}
          />
        ) : (
          <div style={{
            marginBottom: "2rem", borderRadius: 14, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.1))",
            minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "4rem", opacity: 0.5 }}>{cat.icon}</span>
          </div>
        )}

        {/* ── CLUSTER LINKS ── */}
        <section style={{
          margin: "0 0 1.5rem",
          padding: "1.1rem",
          borderRadius: 14,
          background: "rgba(56,189,248,0.05)",
          border: "1px solid rgba(56,189,248,0.18)",
        }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: "0.9rem", color: "#e2e8f0" }}>
            🧭 Pautan penting dalam cluster Mega888
          </p>
          <p style={{ margin: "6px 0 12px", color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6 }}>
            Navigasi pantas ke halaman paling dicari dalam ekosistem Mega888.
          </p>
          <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))" }}>
            {CORE_CLUSTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.65rem 0.85rem",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#cbd5e1",
                  fontWeight: 700, fontSize: "0.82rem",
                  textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                className="cluster-link"
              >
                {item.label}
                <span style={{ fontSize: "0.7rem", color: "#475569" }}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── MID CTA ── */}
        <div style={{
          margin: "0 0 2rem",
          padding: "1.1rem",
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05))",
          border: "1px solid rgba(16,185,129,0.25)",
          display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: "0.95rem", color: "#e2e8f0" }}>
              🎯 Check RTP game sebelum spin!
            </p>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.83rem" }}>
              AI Scanner analisa RTP live — pilih game terbaik hari ini
            </p>
          </div>
          <Link
            href="/"
            data-track="mid_article_scanner"
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

        {/* ── ARTICLE CONTENT ── */}
        {redirectTarget && (
          <div className="card mb-4 border-amber-500/20 bg-amber-500/5 p-4 text-sm text-white/75">
            Artikel ini telah digabungkan ke halaman yang lebih utama untuk elak pertindihan topik.
            <Link href={`/blog/${redirectTarget}`} className="ml-2 font-bold text-amber-300 underline">
              Buka artikel utama →
            </Link>
          </div>
        )}

        <article
          className="seo-article-content"
          dangerouslySetInnerHTML={{ __html: linkedContent }}
          style={{ lineHeight: 1.85, fontSize: "0.97rem", color: "#cbd5e1" }}
        />

        {/* ── TRUST SECTION ── */}
        <section style={{
          marginTop: "2.5rem",
          padding: "1.1rem",
          borderRadius: 14,
          background: "rgba(245,158,11,0.05)",
          border: "1px solid rgba(245,158,11,0.18)",
        }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: "0.9rem", color: "#e2e8f0" }}>
            🔒 Rujukan & maklumat tambahan
          </p>
          <p style={{ margin: "6px 0 12px", color: "#64748b", fontSize: "0.83rem", lineHeight: 1.6 }}>
            Laman trust, dasar privasi, dan maklumat operasi platform.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {TRUST_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  fontWeight: 700,
                  transition: "background 0.2s, color 0.2s",
                }}
                className="trust-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ SECTION ── */}
        {article.faq.length > 0 && (
          <section style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem", color: "#f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
              ❓ Soalan Lazim
            </h2>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {article.faq.map((f, i) => (
                <div key={i} style={{
                  padding: "1rem 1.1rem",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 6, color: "#f59e0b" }}>{f.q}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.65, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── HUB NAVIGATION ── */}
        <section style={{
          marginTop: "2.5rem",
          padding: "1.25rem",
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%)",
          borderRadius: "14px",
          border: "1px solid rgba(168,85,247,0.2)",
        }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a855f7", marginBottom: "0.75rem" }}>
            🧭 Pautan Penting Dalam Cluster Mega888
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { href: "/mega888", label: "🎰 Mega888 Hub", desc: "Semua tentang Mega888" },
              { href: "/blog", label: "📖 Blog", desc: "Tips & strategi" },
              { href: "/games", label: "🎮 Games", desc: "200+ game tersedia" },
              { href: "/trusted", label: "🛡️ Trusted", desc: "Platform verified" },
              { href: "/", label: "🎯 AI Scanner", desc: "Scan RTP live" },
            ].map((hub) => (
              <a
                key={hub.href}
                href={hub.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.4rem 0.9rem",
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  borderRadius: "100px",
                  color: "#c084fc",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {hub.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── RELATED ARTICLES ── */}
        {(() => {
          const related = getRelatedArticles(article, 4);
          return related.length > 0 ? (
            <section style={{ marginTop: "2.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.9rem", color: "#f1f5f9" }}>📖 Artikel Berkaitan</h2>
              <div style={{ display: "grid", gap: "0.65rem" }}>
                {related.map((relatedSlug) => {
                  const rel = BLOG_ARTICLES.find((a) => a.slug === relatedSlug);
                  if (!rel) return null;
                  const relCat = categoryMeta[rel.category] || categoryMeta.tips;
                  return (
                    <Link
                      key={relatedSlug}
                      href={`/blog/${relatedSlug}`}
                      data-track="related_article_click"
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "0.85rem 1rem",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        textDecoration: "none", color: "inherit",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      className="related-article-link"
                    >
                      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{relCat.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.72rem", color: relCat.text, fontWeight: 700, marginBottom: 2 }}>{relCat.label}</div>
                        <div style={{ fontSize: "0.87rem", fontWeight: 700, color: "#e2e8f0", lineHeight: 1.3 }}>{rel.title}</div>
                      </div>
                      <span style={{ color: "#334155", fontSize: "0.8rem", flexShrink: 0 }}>→</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null;
        })()}

        {/* ── RELATED GAMES ── */}
        {article.relatedGames.length > 0 && (
          <section style={{ marginTop: "2rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.9rem", color: "#f1f5f9" }}>🎮 Game Berkaitan</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {article.relatedGames.map((gameSlug) => (
                <Link
                  key={gameSlug}
                  href={`/games/${gameSlug}`}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94a3b8",
                    fontSize: "0.83rem",
                    textDecoration: "none",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  className="related-game-link"
                >
                  {gameSlug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── BOTTOM CTA ── */}
        <div style={{
          marginTop: "2.5rem",
          padding: "1.5rem",
          borderRadius: 16,
          background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.1))",
          border: "1px solid rgba(245,158,11,0.22)",
          textAlign: "center",
        }}>
          <p style={{ fontWeight: 900, fontSize: "1.1rem", marginBottom: 6, color: "#f1f5f9" }}>
            🔥 Cuba AI Scanner — Percuma!
          </p>
          <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: 14 }}>
            Scan RTP live & pilih game terbaik hari ini
          </p>
          <Link
            href="/"
            data-track="bottom_article_scanner"
            style={{
              display: "inline-block",
              padding: "10px 28px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #059669, #10b981)",
              color: "#ffffff", fontWeight: 800, fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 4px 18px rgba(16,185,129,0.35)",
            }}
          >
            Buka AI Scanner →
          </Link>
        </div>

        {/* ── FOOTER NAV ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "0.5rem", marginTop: "2rem",
          padding: "1rem", borderRadius: 12,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <Link href="/blog" style={{ color: "#60a5fa", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>← Blog</Link>
          <span style={{ color: "#1e293b", margin: "0 0.25rem" }}>|</span>
          <Link href="/mega888" style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>🧭 Mega888 Hub</Link>
          <span style={{ color: "#1e293b", margin: "0 0.25rem" }}>|</span>
          <Link href="/games" style={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>🎮 Games</Link>
          <span style={{ color: "#1e293b", margin: "0 0.25rem" }}>|</span>
          <Link href="/" style={{ color: "#34d399", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>🏠 Home</Link>
        </div>
      </div>

      <BlogEngagement slug={article.slug} title={article.title} />

    </>
  );
}
