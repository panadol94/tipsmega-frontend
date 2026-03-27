import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://tipsmega888.com"),
  title: "Mega888 Hack 2026 & AI RTP Scanner | TipsMega888 Malaysia",
  description:
    "Mencari cara godam slot? TipsMega888 menyediakan alternatif sah AI RTP Scanner percuma Mega888 Malaysia. Trusted by 10,000+ players. Updated daily.",
  keywords: [
    "mega888",
    "mega888 hack",
    "software hack mega888",
    "cara godam slot mega888",
    "mega888 hack 2026",
    "mega888 Malaysia",
    "mega888 RTP scanner",
    "mega888 online casino",
    "slot Malaysia",
    "TipsMega888",
  ],
  openGraph: {
    title: "Mega888 Hack 2026 & AI RTP Scanner Malaysia | TipsMega888",
    description:
      "Mencari tips godam? Check Mega888 slot RTP % percuma dengan AI-powered scanner instead. Trusted platform by 10,000+ players.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TipsMega888 - Mega888 Malaysia RTP Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega888 Hack 2026 & AI RTP Scanner Malaysia",
    description:
      "Strategi godam selamat: Check Mega888 slot RTP % percuma. AI-powered scanner updated daily.",
    images: ["https://tipsmega888.com/og-image.webp"],
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apa itu RTP Mega888?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RTP atau Return to Player Mega888 adalah anggaran peratusan sistem permainan akan membayar balik kepada pemain dalam jangka masa panjang. Fungsi TipsMega888 adalah memantau algoritma dan statistik RTP terkini bagi setiap slot di aplikasi Mega888 supaya anda boleh buat keputusan secara bijak."
          }
        },
        {
          "@type": "Question",
          name: "Bolehkah pengimbas TipsMega888 hack sistem Mega888?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tidak. Sistem ini TIDAK menggodam (hack) aplikasi Mega888. Kami menggunakan analisis AI berasaskan corak kemenangan dan kadar RTP purata harian untuk memberi ramalan kebarangkalian paling tinggi untuk mana-mana permainan slot Mega888."
          }
        },
        {
          "@type": "Question",
          name: "Macam mana nak download APK Mega888 2026 yang original?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anda dinasihatkan sentiasa muat turun (download) APK rasmi Mega888 daripada ejen dan pautan yang disahkan (Trusted Platforms). Elakkan memuat turun fail Mega888 dari sumber yang tidak berlesen untuk melindungi maklumat dan baki akaun anda."
          }
        }
      ]
    }
  ];

  return (
    <html lang="ms">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
