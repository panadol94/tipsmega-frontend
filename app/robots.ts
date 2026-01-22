import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/profile"],
        },
        sitemap: "https://www.tipsmega888.com/sitemap.xml",
    };
}
