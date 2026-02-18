
import InfoClient from "./InfoClient";

export const metadata = {
  title: "Mega888 AI Tips - Complete Guide & FAQ | 2026",
  description: "Panduan lengkap Mega888 AI Scanner. Learn how to use AI technology untuk analyze RTP, cara scan ID, security info, dan FAQ lengkap.",
  openGraph: {
    title: "Mega888 AI Tips - Complete Guide & FAQ | 2026",
    description: "Panduan lengkap Mega888 AI Scanner. Ketahui cara guna AI Scanner untuk analisis RTP live.",
    url: "https://tipsmega888.com/info",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "article",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI Tips Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega888 AI Tips - Complete Guide & FAQ | 2026",
    description: "Panduan lengkap Mega888 AI Scanner. Ketahui cara guna AI Scanner untuk analisis RTP live.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://tipsmega888.com/info",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Page() {
  return (
    <>
      {/* SEO Meta Tags via JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Mega888 AI Tips - Complete Guide & FAQ",
            "description": "Panduan lengkap Mega888 AI Scanner. Learn how to use AI technology untuk analyze RTP, cara scan ID, security info, dan FAQ lengkap.",
            "url": "https://tipsmega888.com/info",
            "inLanguage": "ms-MY",
            "publisher": {
              "@type": "Organization",
              "name": "TipsMega AI",
              "url": "https://tipsmega888.com"
            }
          })
        }}
      />
      <InfoClient />
    </>
  );
}