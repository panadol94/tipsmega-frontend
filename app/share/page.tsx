
import ShareClient from "./ShareClient";

export const metadata = {
  title: "Share & Earn Free Stars | Join Komuniti Mega888 AI",
  description: "Jemput kawan dan dapatkan FREE STARS! Join komuniti Mega888 WhatsApp & Telegram untuk tips harian, strategi RTP slot terkini. Referral program Mega888 AI Scanner - share link, earn rewards.",
  keywords: ["mega888", "tips mega888", "rtp mega888", "mega888 scanner", "mega888 community", "mega888 whatsapp", "mega888 telegram", "slot mega888", "mega888 ai", "referral mega888"],
  openGraph: {
    title: "Share & Earn Free Stars | Join Komuniti Mega888 AI",
    description: "Dapatkan FREE Stars untuk setiap kawan yang join! Join komuniti WhatsApp & Telegram Mega888 untuk tips harian & strategi RTP.",
    url: "https://tipsmega888.com/share",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI Referral Program & Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Share & Earn Free Stars | Join Komuniti Mega888 AI",
    description: "Dapatkan FREE Stars untuk setiap kawan yang join! Join komuniti WhatsApp & Telegram Mega888.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://tipsmega888.com/share",
  },
};

export default function Page() {
  const faqData = [
    {
      question: "Apa itu Mega888 AI Scanner?",
      answer: "Mega888 AI Scanner adalah alat pintar yang menganalisis Return-to-Player (RTP) permainan slot Mega888 secara real-time. Ia membantu pemain membuat keputusan lebih bijak sebelum bermain."
    },
    {
      question: "Bagaimana cara mendapatkan Stars percuma?",
      answer: "Share referral link anda kepada kawan. Apabila mereka mendaftar dan mengesahkan akaun, anda akan menerima 1 Star secara automatik. Tiada had referral!"
    },
    {
      question: "Apa kelebihan join komuniti WhatsApp / Telegram?",
      answer: "Dalam komuniti, anda akan mendapat tips harian, strategi RTP terkini, alert game hot, serta berinteraksi dengan ribuan pemain lain untuk berkongsi pengalaman."
    },
    {
      question: "Adakah Mega888 AI Scanner percuma?",
      answer: "Ya! Scanner asas adalah percuma. Stars yang diperolehi melalui referral boleh digunakan untuk membuka ciri-ciri premium seperti scan tanpa had dan analisis mendalam."
    },
    {
      question: "Bolehkah saya menggunakan scanner di telefon?",
      answer: "Ya, Mega888 AI Scanner dioptimumkan sepenuhnya untuk peranti mudah alih. Akses melalui pelayar web — tiada muat turun diperlukan."
    },
  ];

  return (
    <>
      {/* SEO Schema: WebPage + Referral Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Share & Earn - Mega888 AI Referral & Community",
            "description": "Jemput kawan dan dapatkan FREE STARS! Join komuniti Mega888 WhatsApp & Telegram untuk tips harian. Referral program Mega888 AI Scanner.",
            "url": "https://tipsmega888.com/share",
            "inLanguage": "ms-MY",
            "about": {
              "@type": "Product",
              "name": "Mega888 AI Referral Program",
              "description": "Earn 1 star for every successful friend referral. Join our WhatsApp and Telegram community for daily tips.",
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

      {/* SEO Schema: FAQ (Google Rich Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* SEO Schema: Organization with Social Links */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TipsMega888",
            "url": "https://tipsmega888.com",
            "sameAs": [
              "https://t.me/tipsmega888chat",
              "https://masuk10.com/Prospinner"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "url": "https://t.me/tipsmega888chat"
            }
          })
        }}
      />

      <ShareClient />
    </>
  );
}
