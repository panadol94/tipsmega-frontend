import TestIdClient from "./TestIdClient";

export const metadata = {
  title: "Test ID Mega888 2026 (Password Terkini) - Akaun Demo Percuma",
  description:
    "Dapatkan Test ID Mega888 percuma berserta password terkini 2026. Cuba main slot dan Scanner tanpa modal. Jika menang besar di demo, register trusted agent kami.",
  openGraph: {
    title: "Test ID Mega888 2026 (Password Terkini)",
    description:
      "Senarai Test ID Mega888 percuma untuk pengguna. Cuba main sebelum deposit wang sebenar.",
    url: "https://tipsmega888.com/test-id",
    siteName: "TipsMega888 AI",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Test ID Mega888 Percuma 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Test ID Mega888 Percuma 2026",
    description: "Senarai Test ID Mega888 percuma berserta password kilang.",
    images: ["https://tipsmega888.com/og-image.webp"],
  },
  alternates: {
    canonical: "https://tipsmega888.com/test-id",
  },
};

export default function TestIdPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://tipsmega888.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Test ID Mega888",
                item: "https://tipsmega888.com/test-id",
              },
            ],
          }),
        }}
      />
      
      {/* FAQ Schema specific for Test ID */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Apakah Test ID Mega888?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Test ID Mega888 ialah akaun demo yang diberikan percuma oleh ejen sah untuk pemain mencuba pelbagai slot tanpa mengeluarkan modal. Wang di dalam akaun Test ID adalah wang virtual.",
                },
              },
              {
                "@type": "Question",
                name: "Berapakah password untuk Test ID Mega888?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Kesemua Test ID dari 'test1000' hingga 'test9999' menggunakan laluan masuk piawai (password) iaitu Aa1234 atau Aaa1234.",
                },
              },
              {
                "@type": "Question",
                name: "Adakah duit menang dalam Test ID boleh dicuci (withdraw)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tidak. Jika anda ingin cuci (withdraw) kemenangan anda, anda perlu mendaftar dan menggunakan ID Sebenar (Real Money) melalui senarai Ejen Trusted Company di halaman rasmi kami.",
                },
              },
            ],
          }),
        }}
      />

      <TestIdClient />
    </>
  );
}
