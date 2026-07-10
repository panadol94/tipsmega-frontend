import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import BackgroundMusic from "@/components/BackgroundMusic";

export const metadata: Metadata = {
  metadataBase: new URL("https://tipsmega888.com"),
  title: {
    default: "TipsMega888 — Tips, Tricks & Live RTP Mega888 Malaysia",
    template: "%s | TipsMega888"
  },
  description:
    "Panduan Mega888 Malaysia 2026: tips harian, RTP live, download APK terkini & senarai trusted company. Mula semakan ringkas & main selamat hari ini.",
  keywords: [
    "tipsmega888",
    "tips mega888",
    "mega888 malaysia",
    "scanner mega888",
    "rtp mega888",
    "mega888 tips",
    "mega888 scanner ai",
    "download apk mega888",
    "mega888 trusted company",
    "mega888 trusted",
    "panduan mega888",
    "mega888 download",
    "mega888 2026",
    "mega888 tips hari ini",
    "trusted agent mega888",
    "mega888 ai",
  ],
  openGraph: {
    title: "TipsMega888 — Tips, Tricks & Live RTP Mega888 Malaysia",
    description:
      "Panduan Mega888 Malaysia 2026: tips harian, RTP live, download APK terkini & senarai trusted company. Mula semakan ringkas & main selamat hari ini.",
    url: "https://tipsmega888.com",
    siteName: "Tips Mega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/wins/win-4.jpg",
        width: 1200,
        height: 630,
        alt: "Tips Mega888 Malaysia - AI RTP Scanner & Komuniti Slot #1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TipsMega888 — Tips, Tricks & Live RTP Mega888 Malaysia",
    description:
      "Panduan Mega888 Malaysia 2026: tips harian, RTP live, download APK & senarai trusted company. Mula main selamat hari ini.",
    images: ["https://tipsmega888.com/wins/win-4.jpg"],
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "TipsMega888",
      url: "https://tipsmega888.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://tipsmega888.com/games?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "TipsMega888",
      url: "https://tipsmega888.com",
      logo: "https://tipsmega888.com/mega888.webp",
      description: "Platform komuniti Mega888 Malaysia dengan AI RTP Scanner dan tips slot terkini",
      sameAs: [
        "https://www.facebook.com/tipsmega888",
        "https://www.tiktok.com/@tipsmega888"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+60108691034",
        contactType: "customer support",
        areaServed: "MY",
        availableLanguage: "Malaysian"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Tips Mega888 AI RTP Scanner",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Android, iOS, Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "MYR"
      },
      description: "Alat rujukan percuma untuk menyusun bacaan RTP slot Mega888 Malaysia. Bacaan tidak menjamin keputusan permainan."
    }
  ];

  return (
    <html lang="ms">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <BackgroundMusic />
      </body>
    </html>
  );
}
