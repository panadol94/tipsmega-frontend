

import ShareClient from "./ShareClient";

export const metadata = {
  title: "Share & Earn Free Stars | Referral Mega888 AI Scanner 2026",
  description: "Jemput kawan dan dapatkan FREE STARS! Join komuniti Mega888 WhatsApp & Telegram untuk tips harian, strategi RTP slot terkini. Cara menang Mega888 dengan AI Scanner. Program referral percuma — share link, earn rewards.",
  keywords: [
    "mega888", "tips mega888", "rtp mega888", "mega888 scanner", "mega888 ai",
    "mega888 community", "mega888 whatsapp group", "mega888 telegram group",
    "slot mega888", "referral mega888", "cara menang mega888", "mega888 2026",
    "mega888 free credit", "mega888 rtp hari ini", "mega888 tips hari ini",
    "cara daftar mega888", "mega888 scanner ai percuma", "mega888 hack rtp",
    "komuniti mega888 malaysia", "mega888 strategy"
  ],
  openGraph: {
    title: "Share & Earn Free Stars | Referral Mega888 AI Scanner 2026",
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
        alt: "Mega888 AI Referral Program & Community — Dapatkan Free Stars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Share & Earn Free Stars | Referral Mega888 AI 2026",
    description: "Dapatkan FREE Stars untuk setiap kawan yang join! Join komuniti WhatsApp & Telegram Mega888.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://tipsmega888.com/share",
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
  const faqData = [
    {
      question: "Apa itu Mega888 AI Scanner?",
      answer: "Mega888 AI Scanner adalah alat pintar yang menganalisis Return-to-Player (RTP) permainan slot Mega888 secara real-time. Ia membantu pemain membuat keputusan lebih bijak sebelum bermain dengan menunjukkan game mana yang sedang 'hot' dan mempunyai peluang menang lebih tinggi."
    },
    {
      question: "Bagaimana cara mendapatkan Stars percuma?",
      answer: "Share referral link anda kepada kawan. Apabila mereka mendaftar dan mengesahkan akaun melalui Telegram bot, anda akan menerima 1 Star secara automatik. Tiada had referral — lebih ramai kawan, lebih banyak Stars!"
    },
    {
      question: "Apa kelebihan join komuniti WhatsApp / Telegram?",
      answer: "Dalam komuniti, anda akan mendapat tips harian, strategi RTP terkini, alert game hot, serta berinteraksi dengan ribuan pemain lain untuk berkongsi pengalaman dan strategi menang."
    },
    {
      question: "Adakah Mega888 AI Scanner percuma?",
      answer: "Ya! Scanner asas adalah percuma sepenuhnya. Stars yang diperolehi melalui referral boleh digunakan untuk membuka ciri-ciri premium seperti scan tanpa had, analisis mendalam, dan signal eksklusif."
    },
    {
      question: "Bolehkah saya menggunakan scanner di telefon?",
      answer: "Ya, Mega888 AI Scanner dioptimumkan sepenuhnya untuk peranti mudah alih termasuk Android dan iOS. Akses melalui pelayar web sahaja — tiada muat turun diperlukan."
    },
    {
      question: "Apa itu RTP dan mengapa ia penting?",
      answer: "RTP (Return-to-Player) adalah peratusan yang menunjukkan berapa banyak wang yang akan dikembalikan kepada pemain dalam jangka masa panjang. RTP yang lebih tinggi bermakna peluang menang lebih baik. Mega888 AI Scanner membantu anda mengenal pasti game dengan RTP tertinggi pada masa tertentu."
    },
    {
      question: "Berapa lama Stars akan dikreditkan selepas referral?",
      answer: "Stars dikreditkan secara automatik sebaik sahaja kawan anda berjaya mendaftar dan mengesahkan akaun melalui Telegram bot. Proses ini biasanya mengambil masa kurang dari 1 minit."
    },
    {
      question: "Bolehkah saya guna Stars untuk apa?",
      answer: "Stars boleh digunakan untuk membuka ciri premium AI Scanner seperti unlimited scans, analisis RTP mendalam, signal game hot eksklusif, dan akses awal kepada ciri-ciri baru yang akan datang."
    },
    {
      question: "Adakah komuniti ini selamat dan dipercayai?",
      answer: "Ya! Komuniti WhatsApp dan Telegram kami diurus oleh admin yang berpengalaman. Kami mempunyai peraturan ketat terhadap spam, scam, dan aktiviti tidak sah untuk memastikan pengalaman yang selamat untuk semua ahli."
    },
    {
      question: "Bagaimana cara daftar Mega888 AI Scanner?",
      answer: "Daftar adalah percuma dan mudah. Lawati tipsmega888.com, klik 'Daftar', dan ikuti arahan untuk mengesahkan akaun anda melalui Telegram bot. Selepas itu, anda boleh mula menggunakan scanner dan program referral."
    },
  ];

  const howToSteps = [
    {
      name: "Copy Referral Link",
      text: "Salin link referral peribadi anda dari halaman Share. Setiap pengguna mempunyai link unik.",
    },
    {
      name: "Share kepada Kawan",
      text: "Kongsikan link melalui WhatsApp, Telegram, atau mana-mana platform sosial media kepada kawan anda.",
    },
    {
      name: "Kawan Daftar dan Verify",
      text: "Kawan anda klik link, mendaftar di tipsmega888.com, dan mengesahkan akaun melalui Telegram bot.",
    },
    {
      name: "Terima Stars Percuma",
      text: "Anda akan menerima 1 Star secara automatik sebaik sahaja kawan berjaya verify akaun. Tiada had referral!",
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
            "name": "Share & Earn Free Stars — Mega888 AI Referral & Community",
            "description": "Jemput kawan dan dapatkan FREE STARS! Join komuniti Mega888 WhatsApp & Telegram untuk tips harian. Referral program Mega888 AI Scanner.",
            "url": "https://tipsmega888.com/share",
            "inLanguage": "ms-MY",
            "dateModified": "2026-02-15",
            "about": {
              "@type": "Product",
              "name": "Mega888 AI Referral Program",
              "description": "Earn 1 star for every successful friend referral. Join WhatsApp and Telegram community for daily tips, RTP strategy, and game alerts.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MYR",
                "description": "Free stars for sharing referral link"
              }
            }
          })
        }}
      />

      {/* SEO Schema: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://tipsmega888.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Share & Earn Stars",
                "item": "https://tipsmega888.com/share"
              }
            ]
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

      {/* SEO Schema: HowTo (Google Rich Result) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Cara Mendapatkan Stars Percuma Mega888",
            "description": "Panduan langkah demi langkah untuk mendapatkan Stars percuma melalui program referral Mega888 AI Scanner.",
            "totalTime": "PT2M",
            "step": howToSteps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.name,
              "text": s.text
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
            "logo": "https://tipsmega888.com/og-image.webp",
            "sameAs": [
              "https://t.me/tipsmega888chat",
              "https://masuk10.com/Prospinner"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "url": "https://t.me/tipsmega888chat",
              "availableLanguage": ["Malay", "English"]
            }
          })
        }}
      />

      {/* Server-side rendered SEO content (visible to Google crawlers) */}
      <div className="sr-only" aria-hidden="false">
        <h1>Program Referral Mega888 AI Scanner — Dapatkan Stars Percuma</h1>
        <p>
          Mega888 AI Scanner adalah platform analisis RTP slot terkemuka di Malaysia.
          Dengan teknologi AI, kami membantu pemain mengenal pasti permainan slot Mega888
          yang mempunyai Return-to-Player (RTP) tertinggi pada masa tertentu.
          Program referral kami membolehkan anda mendapatkan Stars percuma dengan
          mengajak kawan untuk mendaftar.
        </p>
        <h2>Cara Mendapatkan Stars Percuma Mega888</h2>
        <p>
          Langkah 1: Salin link referral peribadi anda.
          Langkah 2: Kongsikan melalui WhatsApp atau Telegram.
          Langkah 3: Kawan daftar dan verify akaun.
          Langkah 4: Terima 1 Star secara automatik.
        </p>
        <h2>Join Komuniti Mega888 Malaysia</h2>
        <p>
          Sertai lebih 5,000 pemain dalam komuniti WhatsApp dan Telegram Mega888 kami.
          Dapatkan tips harian, strategi RTP terkini, alert game hot, dan bantuan
          daripada pemain berpengalaman.
        </p>
        <h2>Kelebihan Mega888 AI Scanner</h2>
        <ul>
          <li>Analisis RTP real-time untuk semua game Mega888</li>
          <li>Signal game hot berdasarkan data AI</li>
          <li>Komuniti aktif dengan tips harian</li>
          <li>100% percuma untuk pengguna asas</li>
          <li>Optimumkan untuk telefon Android dan iOS</li>
        </ul>
      </div>

      <ShareClient />
    </>
  );
}
