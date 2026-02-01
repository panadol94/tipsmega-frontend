
import ShareClient from "./ShareClient";

export const metadata = {
  title: "Share & Earn Free Stars | Mega888 AI Referral",
  description: "Jemput kawan dan dapatkan FREE STARS! Referral program Mega888 AI Scanner - share link, earn rewards. Unlimited referrals, instant bonuses.",
  openGraph: {
    title: "Share & Earn Free Stars | Mega888 AI Referral",
    description: "Dapatkan FREE Stars untuk setiap kawan yang join! Referral program rasmi Mega888 AI Scanner.",
    url: "https://tipsmega888.com/share",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI Referral Program",
      },
    ],
  },
  alternates: {
    canonical: "https://tipsmega888.com/share",
  },
};

export default function Page() {
  return (
    <>
      {/* SEO Schema for Referral Program */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Share & Earn - Mega888 AI Referral Program",
            "description": "Jemput kawan dan dapatkan FREE STARS! Referral program Mega888 AI Scanner - share link, earn rewards. Unlimited referrals, instant bonuses.",
            "url": "https://tipsmega888.com/share",
            "inLanguage": "ms-MY",
            "about": {
              "@type": "Product",
              "name": "Mega888 AI Referral Program",
              "description": "Earn 1 star for every successful friend referral",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MYR",
                "description": "Free stars for sharing"
              }
            }
          })
        }}
      />
      <ShareClient />
    </>
  );
}