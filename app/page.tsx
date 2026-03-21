
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Mega888 RTP Scanner Percuma 2026 | Semak RTP Live AI",
  description:
    "Semak RTP Mega888 secara live dengan AI Scanner percuma. Rujuk pola permainan, panduan asas, dan akses cepat ke hub Mega888 Malaysia.",
  openGraph: {
    title: "Mega888 RTP Scanner Percuma 2026 | Semak RTP Live AI",
    description:
      "Semak RTP Mega888 live dengan AI Scanner dan akses panduan Mega888 Malaysia dalam satu platform.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888 AI",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI RTP Scanner 2026 - 4.9 Rating",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Mega888 RTP Scanner Percuma 2026",
    description:
      "Semak RTP Mega888 live dengan AI Scanner percuma dan baca panduan utama di TipsMega888.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
};

export default function Page() {
  return (
    <>
      {/* WebSite schema — enables sitelinks search box in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            description: "Platform AI Scanner untuk semakan RTP live dan panduan utama Mega888 Malaysia.",
            inLanguage: "ms-MY",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://tipsmega888.com/games?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
            ],
          }),
        }}
      />

      {/* Organization schema — Google Knowledge Panel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            logo: "https://tipsmega888.com/og-image.webp",
            description: "Platform rujukan Mega888 Malaysia dengan AI Scanner, panduan, dan halaman trusted agent.",
            sameAs: [
              "https://tipsmega888.com/mega888",
              "https://tipsmega888.com/blog",
              "https://tipsmega888.com/trusted"
            ],
          }),
        }}
      />

      <HomeClient />
    </>
  );
}

