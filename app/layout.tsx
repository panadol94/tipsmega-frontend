import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Mega888 Malaysia | TipsMega888 - AI RTP Scanner & Trusted Platform",
  description:
    "TipsMega888 - AI RTP Scanner percuma Mega888 Malaysia. Check real-time slot RTP %, live odds & trusted platform. Trusted by 10,000+ players. Updated daily.",
  keywords: [
    "mega888",
    "mega888 Malaysia",
    "mega888 RTP scanner",
    "mega888 online casino",
    "mega888 agent Malaysia",
    "online casino Malaysia",
    "slot Malaysia",
    "TipsMega888",
  ],
  openGraph: {
    title: "Mega888 Malaysia | TipsMega888 AI RTP Scanner",
    description:
      "Check Mega888 slot RTP % percuma. AI-powered scanner updated daily. Trusted platform by 10,000+ Malaysian players.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TipsMega888 - Mega888 Malaysia RTP Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega888 Malaysia | TipsMega888 AI RTP Scanner",
    description:
      "Check Mega888 slot RTP % percuma. AI-powered scanner updated daily.",
    images: ["https://tipsmega888.com/og-image.jpg"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TipsMega888",
    url: "https://tipsmega888.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tipsmega888.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="ms">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
