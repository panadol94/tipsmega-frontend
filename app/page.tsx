import HomeClient from "./HomeClient";

export const metadata = {
  title: "Mega888 AI Tips RTP 2026 | AI Scanner Percuma",
  description:
    "Gunakan Mega888 AI Tips RTP Scanner terbaru untuk analisis kemenangan anda. Sistem AI canggih untuk mengira peratusan RTP secara live. Percuma dan mudah.",
  openGraph: {
    title: "Mega888 AI Tips RTP 2026 | AI Scanner Percuma",
    description:
      "Analisis RTP Mega888 Live dengan AI. Dapatkan tips kemenangan tertinggi hari ini.",
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
    title: "Mega888 AI Tips RTP 2026",
    description:
      "Scan RTP Mega888 sekarang dengan AI kami. Percuma & mudah!",
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
            description: "Mega888 AI Tips RTP Scanner — Analisis RTP Live Percuma",
            inLanguage: "ms-MY",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://tipsmega888.com/games?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
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
            description: "Platform AI Scanner untuk analisis RTP Mega888 secara live. Tips, strategi, dan senarai company trusted.",
            sameAs: [],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["ms", "en"],
            },
          }),
        }}
      />

      <HomeClient />
    </>
  );
}

