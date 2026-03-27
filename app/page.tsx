
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Mega888 Hack 2026? Guna AI RTP Scanner Percuma | TipsMega888",
  description:
    "Mencari software hack Mega888? Godam slot adalah mustahil. Gunakan alternatif SAH ini: TipsMega888 AI RTP Scanner untuk analisis live data. Platform trusted 2026.",
  openGraph: {
    title: "Mega888 Hack 2026? Guna AI RTP Scanner Percuma | TipsMega888",
    description:
      "Mencari software hack Mega888? Gunakan alternatif sah AI Scanner untuk RTP live.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888 AI",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI RTP Scanner 2026 - Alternatif Hack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Mega888 Hack 2026? Guna AI RTP Scanner Percuma",
    description:
      "Semak RTP Mega888 live dengan AI Scanner percuma sebagai strategi selamat.",
    images: ["https://tipsmega888.com/og-image.webp"],
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

      {/* SoftwareApplication schema — AI Scanner tool */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TipsMega888 AI RTP Scanner",
            url: "https://tipsmega888.com",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "1280",
              bestRating: "5",
            },
            description: "AI-powered RTP scanner untuk Mega888 Malaysia. Semak RTP live percuma.",
          }),
        }}
      />

      <HomeClient />
    </>
  );
}

