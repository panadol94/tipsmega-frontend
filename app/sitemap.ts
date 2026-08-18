import { MetadataRoute } from "next";
import { GAME_PAGES } from "./data/gamePages";
import { BLOG_ARTICLES } from "./data/blogArticles";
import { BLOG_REDIRECT_SOURCE_SLUGS } from "./data/blogRedirects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://tipsmega888.com";
    // Keep lastmod honest. Replacing it with every build date tells crawlers
    // unchanged pages were updated and wastes crawl budget.
    const coreLastModified = new Date("2026-08-18T01:30:00.000Z");

    // Core pages
    const corePages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: coreLastModified, changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/trusted`, lastModified: coreLastModified, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/info`, lastModified: new Date("2026-08-03T08:20:00.000Z"), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/blog`, lastModified: coreLastModified, changeFrequency: "weekly", priority: 0.85 },
        { url: `${baseUrl}/mega888`, lastModified: coreLastModified, changeFrequency: "weekly", priority: 0.95 },
        { url: `${baseUrl}/games`, lastModified: coreLastModified, changeFrequency: "weekly", priority: 0.85 },
        { url: `${baseUrl}/about`, lastModified: coreLastModified, changeFrequency: "yearly", priority: 0.4 },
        { url: `${baseUrl}/privacy-policy`, lastModified: coreLastModified, changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: coreLastModified, changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: coreLastModified, changeFrequency: "yearly", priority: 0.3 },
    ];

    // Blog article pages — high priority for indexing
    const blogPages: MetadataRoute.Sitemap = BLOG_ARTICLES
        .filter((article) => !BLOG_REDIRECT_SOURCE_SLUGS.has(article.slug))
        .map((article) => ({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: new Date(article.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));

    // Game pages
    const gamePages: MetadataRoute.Sitemap = GAME_PAGES.map((game) => ({
        url: `${baseUrl}/games/${game.slug}`,
        lastModified: coreLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
    }));

    return [...corePages, ...blogPages, ...gamePages];
}
