import "./globals.css";
import { Exo_2 } from "next/font/google";
import Script from "next/script";
import Shell from "./ui/Shell";
import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const hasValidGA = /^G-[A-Z0-9]{6,}$/i.test(GA_MEASUREMENT_ID);
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || "";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://tipsmega888.com"),
  title: {
    default: "Mega888 AI Tips RTP 2026 | AI Scanner",
    template: "%s | Mega888 AI",
  },
  description:
    "Gunakan Mega888 AI Tips RTP Scanner terbaru untuk analisis kemenangan anda. Sistem AI canggih untuk mengira peratusan RTP secara live. Percuma dan mudah.",
  authors: [{ name: "TipsMega Admin" }],
  creator: "TipsMega AI Team",
  publisher: "TipsMega888",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mega888 AI Tips RTP 2026",
    description:
      "Analisis RTP Mega888 Live dengan AI. Dapatkan tips kemenangan tertinggi hari ini.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888 AI",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Mega888 AI RTP Scanner 2026 - 4.9 Rating',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega888 AI Tips RTP",
    description: "Scan RTP Mega888 sekarang dengan AI kami.",
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: 'https://tipsmega888.com',
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" suppressHydrationWarning className={exo2.className}>
      <head>
        {/* Google Analytics 4 (enabled only when NEXT_PUBLIC_GA_ID is valid) */}
        {hasValidGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <GlobalSettingsProvider>
          <main id="main-content">
            <Shell>{children}</Shell>
          </main>
        </GlobalSettingsProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TipsMega888",
              url: "https://tipsmega888.com",
              logo: "https://tipsmega888.com/og-image.webp",
              sameAs: [
                "https://tipsmega888.com/blog",
                "https://tipsmega888.com/trusted"
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TipsMega888",
              url: "https://tipsmega888.com",
              inLanguage: "ms-MY",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://tipsmega888.com/blog?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Mega888 AI Tips RTP",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "MYR",
              },
              description:
                "Sistem AI Canggih untuk analisis RTP Mega888 dan Tips Kemenangan.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1280",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}