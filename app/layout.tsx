import "./globals.css";
import { Exo_2 } from "next/font/google";
import Shell from "./ui/Shell";
import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.tipsmega888.com"),
  title: {
    default: "Mega888 AI Tips RTP 2026 | AI Scanner",
    template: "%s | Mega888 AI",
  },
  description:
    "Gunakan Mega888 AI Tips RTP Scanner terbaru untuk analisis kemenangan anda. Sistem AI canggih untuk mengira peratusan RTP secara live. Percuma dan mudah.",
  keywords: [
    "Mega888",
    "Mega888 Tips",
    "Mega888 RTP",
    "Mega888 Scanner",
    "Mega888 Hack",
    "Tips Mega888 Hari Ini",
    "Mega888 APK",
    "918Kiss RTP",
    "Scanner Mega888",
    "Mega888 Download",
    "Mega888 Original",
    "Mega888 Gacor 2026",
    "Mega888 Auto Cuci",
    "Kiosk Rasmi Mega888",
    "RTP Live Mega888",
    "Tips Mega888 Padu",
  ],
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
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" suppressHydrationWarning className={exo2.className}>
      <head>
        {/* DNS Prefetch & Preconnect for faster font loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <GlobalSettingsProvider>
          <Shell>{children}</Shell>
        </GlobalSettingsProvider>
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