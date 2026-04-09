

import InfoClient from "./InfoClient";

export const metadata = {
  title: "Panduan Guna AI Scanner Mega888 | TipsMega888",
  description: "Panduan ringkas tentang cara guna AI Scanner di TipsMega888, cara baca keputusan RTP, dan perkara penting yang perlu difahami sebelum menggunakan scanner.",
  openGraph: {
    title: "Panduan Guna AI Scanner Mega888 | TipsMega888",
    description: "Fahami cara guna scanner, cara baca keputusan, dan limitasi ringkas sebelum membuat semakan RTP.",
    url: "https://tipsmega888.com/info",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "article",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Panduan AI Scanner TipsMega888",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panduan Guna AI Scanner Mega888 | TipsMega888",
    description: "Cara guna scanner, baca keputusan RTP, dan fahami limitasi asas di TipsMega888.",
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
            "name": "Panduan Guna AI Scanner TipsMega888",
            "description": "Panduan ringkas tentang cara guna scanner, cara baca keputusan RTP, dan perkara penting yang perlu difahami sebelum menggunakan AI Scanner di TipsMega888.",
            "url": "https://tipsmega888.com/info",
            "inLanguage": "ms-MY",
            "publisher": {
              "@type": "Organization",
              "name": "TipsMega888",
              "url": "https://tipsmega888.com"
            }
          })
        }}
      />
      <InfoClient />
    </>
  );
}