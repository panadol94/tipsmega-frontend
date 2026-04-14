import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import BackgroundMusic from "@/components/BackgroundMusic";

export const metadata: Metadata = {
  metadataBase: new URL("https://tipsmega888.com"),
  title: {
    default: "Tips Mega888 Malaysia 2026 | Tips, RTP Scanner & Trusted Company",
    template: "%s | Tips Mega888 Malaysia"
  },
  description:
    "Tips Mega888 Malaysia 2026 dengan panduan ringkas, semakan RTP Scanner, trusted company, dan rujukan download APK untuk pengguna baru dan lama.",
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
    title: "Tips Mega888 Malaysia 2026 | Tips, RTP Scanner & Trusted Company",
    description:
      "Tips Mega888 Malaysia 2026 dengan panduan ringkas, semakan RTP Scanner, trusted company, dan rujukan download APK untuk pengguna baru dan lama.",
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
    title: "Tips Mega888 Malaysia 2026 | Tips, RTP Scanner & Trusted Company",
    description:
      "Tips Mega888 Malaysia 2026 dengan panduan ringkas, semakan RTP Scanner, trusted company, dan rujukan download APK.",
    images: ["https://tipsmega888.com/wins/win-4.jpg"],
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apa itu RTP Mega888 dan cara mengira kebarangkalian menang?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RTP atau Return to Player Mega888 ialah peratusan bayaran balik sistem slot Mega888 kepada pemain dalam jangka masa panjang. Contohnya, RTP 96% bermaksud setiap RM100 bet, sistem slot Mega888 akan pulangkan purata RM96. TipsMega888 menyediakan AI Scanner percuma yang menganalisis corak RTP Mega888 setiap slot supaya anda boleh pilih slot dengan kebarangkalian menang paling tinggi."
          }
        },
        {
          "@type": "Question",
          name: "Bagaimana TipsMega888 hack atau godam aplikasi Mega888?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TIPSMEGA888 TIDAK MENGEDAH (HACK) SISTEM MEGA888. Platform kami menggunakan algoritma AI yang menganalisis data RTP, corak kemenangan, dan statistik slot Mega888 untuk memberi ramalan berasaskan data. Ini adalah cara legal dan selamat untuk meningkatkan peluang menang di Mega888 tanpa risiko akaun kena hack atau disekat."
          }
        },
        {
          "@type": "Question",
          name: "Di mana nak download APK Mega888 2026 versi original Malaysia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anda boleh muat turun APK Mega888 2026 versi asal Malaysia melalui Trusted Platforms yang disenaraikan di TipsMega888. Kami menyediakan pautan sahih ke ejen Mega888 berlesen di Malaysia. Elakkan memuat turun fail APK Mega888 dari laman web tidak dikenali untuk melindungi maklumat peribadi dan baki akaun anda daripada scammers."
          }
        },
        {
          "@type": "Question",
          name: "Adakah TipsMega888 dan RTP scanner percuma untuk guna?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya, kebanyakan ciri TipsMega888 adalah PERCUMA termasuk AI RTP Scanner, tips slot, dan maklumat komuniti. Anda hanya perlu mendaftar akaun percuma untuk mengakses analisis lengkap RTP Mega888 dan sertai group WhatsApp Mega888 Malaysia kami."
          }
        },
        {
          "@type": "Question",
          name: "Berapa kerap data RTP Mega888 dikemas kini di TipsMega888?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Data RTP Mega888 dikemas kini SECARA LANGSUNG (real-time) setiap kali pengguna menggunakan AI Scanner kami. Sistem kami mengumpul beribu-ribu data scan setiap hari untuk memastikan ramalan RTP Mega888 paling tepat dan terkini untuk para pemain di Malaysia."
          }
        },
        {
          "@type": "Question",
          name: "Apakah slot Mega888 paling senang menang (gacor) tahun 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Berdasarkan data AI Scanner TipsMega888, slot Mega888 yang paling gacor dan senang menang termasuk: Fortune Dragon, Ocean Princess, Sweet Bonanza, dan Gates of Olympus. RTP slot ini sering melebihi 95% pada waktu-waktu tertentu. Gunakan AI Scanner kami untuk semak slot gacor hari ini secara live."
          }
        },
        {
          "@type": "Question",
          name: "Macam mana nak sertai group WhatsApp Mega888 Malaysia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anda boleh sertai group WhatsApp Mega888 Malaysia melalui TipsMega888. Kami ada beberapa grup komuniti aktif dengan ribuan ahli yang berkonggikan tips menang, screenshot jackpot, dan maklumat slot gacor. Daftar akaun percuma di TipsMega888 untuk dapatkan pautan group WhatsApp Mega888 Malaysia."
          }
        },
        {
          "@type": "Question",
          name: "Apakah risiko guna software hack mega888 atau apk hack?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GUNA SOFTWARE HACK MEGA888 ATAU APK HACK SANGAT BERBAHAYA! Anda berisiko: (1) Akaun Mega888 kena hack dan duit dicuri, (2) Virus/malware dalam APK hack merosakkan telefon, (3) Data peribadi dicuri, (4) Akaun kena ban atau disekat kekal. TipsMega888 menyarankan gunakan AI Scanner legal kami untuk meningkatkan peluang menang dengan selamat."
          }
        },
        {
          "@type": "Question",
          name: "TipsMega888 vs platform lain — apa kelebihan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kelebihan TipsMega888: (1) AI RTP Scanner percuma dengan data real-time, (2) Komuniti aktif 50,000+ ahli group WhatsApp Mega888, (3) Tips slot gacor yang dikemas kini setiap hari, (4) Trusted company list ejen Mega888 berlesen, (5) Sistem selamat tanpa hack atau APK mod. Platform kami adalah pilihan utama pemain Mega888 Malaysia."
          }
        },
        {
          "@type": "Question",
          name: "Apakah cara deposit dan withdraw di Mega888?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Proses deposit dan withdraw di Mega888 mudah melalui ejen trusted yang disenaraikan di TipsMega888. Deposit minimum serendah RM10-20 melalui bank transfer, e-wallet (Touch n Go, GrabPay, Boost), atau QR Pay. Withdraw cepat dalam masa 5-15 minit ke akaun bank anda. Semua ejen dalam trusted list kami disahkan berlesen dan selamat."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://tipsmega888.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Mega888 Community",
          item: "https://tipsmega888.com/games"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Trusted Platforms",
          item: "https://tipsmega888.com/trusted"
        }
      ]
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "50000"
      },
      description: "AI-powered RTP scanner percuma untuk analisis slot Mega888 Malaysia. Tingkatkan peluang menang dengan data real-time dan komuniti 50,000+ ahli."
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
