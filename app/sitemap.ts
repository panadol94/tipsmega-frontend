import { MetadataRoute } from "next";
import { GAME_PAGES } from "./data/gamePages";
import { BLOG_ARTICLES } from "./data/blogArticles";
import { BLOG_REDIRECT_SOURCE_SLUGS } from "./data/blogRedirects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://tipsmega888.com";
    const now = new Date();

    // Core pages
    const corePages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
        { url: `${baseUrl}/trusted`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/share`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/info`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${baseUrl}/mega888`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
        { url: `${baseUrl}/games`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ];

    // Blog article pages
    const blogPages: MetadataRoute.Sitemap = BLOG_ARTICLES
        .filter((article) => !BLOG_REDIRECT_SOURCE_SLUGS.has(article.slug))
        .map((article) => ({
            url: `${baseUrl}/blog/${article.slug}`,
            lastModified: new Date(article.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));

    // Game pages
    const gamePages: MetadataRoute.Sitemap = GAME_PAGES.map((game) => ({
        url: `${baseUrl}/games/${game.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...corePages, ...blogPages, ...gamePages];
}
