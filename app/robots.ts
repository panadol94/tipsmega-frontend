import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "OAI-SearchBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/profile/", "/chat/"],
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
                disallow: ["/admin/", "/api/", "/profile/", "/chat/"],
            },
            {
                userAgent: "GPTBot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/profile/", "/chat/"],
            },
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/", "/api/", "/profile/", "/chat/"],
            },
        ],
        sitemap: "https://tipsmega888.com/sitemap.xml",
        host: "https://tipsmega888.com",
    };
}
