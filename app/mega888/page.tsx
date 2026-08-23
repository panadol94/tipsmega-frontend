
import Link from "next/link";
import SharedPageNav from "../ui/SharedPageNav";

export const metadata = {
  title: "Mega888 Malaysia 2026 | Login, Download, RTP & Trusted Company",
  description:
    "Halaman rujukan Mega888 Malaysia untuk login, daftar akaun, download APK Android atau iPhone, semak RTP, dan baca panduan trusted company dengan lebih tersusun.",
  keywords: [
    "mega888 malaysia 2026",
    "mega888 login",
    "mega888 register",
    "mega888 download apk",
    "mega888 ios",
    "mega888 android",
    "mega888 rtp live",
    "mega888 trusted agent",
    "mega888 withdraw",
    "tips mega888",
  ],
  alternates: { canonical: "https://tipsmega888.com/mega888" },
  openGraph: {
    title: "Mega888 Malaysia 2026 | Hub Panduan Lengkap",
    description: "Halaman hub Mega888 Malaysia untuk login, download, RTP, trusted company, dan panduan asas lain dalam satu tempat.",
    url: "https://tipsmega888.com/mega888",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 Malaysia 2026 - Hub Panduan Lengkap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega888 Malaysia 2026 | Hub Panduan Lengkap",
    description: "Halaman hub Mega888 Malaysia untuk login, download, RTP, trusted company, dan panduan asas lain dalam satu tempat.",
    images: ["https://tipsmega888.com/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const HUB_LINKS = [
  {
    title: "Tips Game Mega888 Hari Ini",
    href: "/blog/cara-menang-mega888",
    note: "Checklist semasa, cara menilai game, memahami RTP dan menetapkan had bajet.",
  },
  {
    title: "Cara Baca RTP Scanner Mega888",
    href: "/blog/rtp-scanner-mega888-cara-baca-data-live",
    note: "Panduan memahami bacaan scanner, RTP dan volatiliti tanpa menganggapnya sebagai jaminan hasil.",
  },
  {
    title: "Mega888 Login & Register Akaun 2026",
    href: "/blog/mega888-register-akaun-baru-2026",
    note: "Panduan masuk dan daftar akaun dengan lebih selamat sambil elak link palsu.",
  },
  {
    title: "Download Android APK Terbaru",
    href: "/blog/mega888-download-android-apk-terbaru-2026",
    note: "Install cepat + solusi App Not Installed.",
  },
  {
    title: "Download iOS Terbaru (iPhone/iPad)",
    href: "/blog/mega888-download-ios-terbaru-2026",
    note: "Panduan trust profile dan penyelesaian error biasa.",
  },
  {
    title: "RTP Live Malaysia 2026",
    href: "/blog/mega888-rtp-live-malaysia-2026",
    note: "Cara baca data live dan pilih game yang lebih sesuai.",
  },
  {
    title: "Withdraw Cepat Malaysia",
    href: "/blog/mega888-withdraw-cepat-malaysia-2026",
    note: "Kurangkan reject dan percepat proses payout.",
  },
  {
    title: "Trusted Agent Malaysia",
    href: "/blog/kiosk-mega888-trusted",
    note: "Checklist ejen selamat dan red flag scam.",
  },
  {
    title: "Mega888 vs 918Kiss Malaysia 2026",
    href: "/blog/mega888-vs-918kiss",
    note: "Perbandingan lengkap Mega888 dan 918Kiss — games, RTP, keselamatan, dan pengalaman pengguna.",
  },
  {
    title: "Free Credit No Deposit",
    href: "/blog/mega888-free-credit-no-deposit-2026",
    note: "Cara semak promo dengan lebih berhati-hati.",
  },
  {
    title: "Group WhatsApp Mega888 Malaysia",
    href: "/blog/group-whatsapp-mega888-malaysia-2026",
    note: "Cara join komuniti, guna update RTP, dan elak group scam.",
  },
  {
    title: "RTP Scanner Mega888",
    href: "/blog/rtp-scanner-mega888-cara-baca-data-live",
    note: "Cara baca data live, volatiliti, dan masa semakan sebelum pilih game.",
  },
  {
    title: "Mega888 Original vs Fake",
    href: "/blog/mega888-original-vs-fake",
    note: "Checklist membezakan aplikasi dan pautan sebenar daripada salinan yang meragukan.",
  },
];

const FAQS = [
  {
    q: "Apa itu Mega888 Malaysia?",
    a: "Mega888 biasanya dirujuk oleh pengguna Malaysia sebagai platform permainan mudah alih yang popular untuk slot dan game kasual. Pengguna sering mencari panduan login, download APK, RTP live, trusted agent, dan langkah withdraw yang lebih lancar.",
  },
  {
    q: "Macam mana nak mula guna Mega888?",
    a: "Biasanya pengguna akan mula dengan mencari panduan daftar akaun, kemudian download aplikasi yang sesuai untuk Android atau iPhone, semak panduan login, dan baca tips keselamatan sebelum terus bermain.",
  },
  {
    q: "Perlu ke semak RTP live dulu?",
    a: "Ramai pengguna suka semak RTP live atau pola game semasa terlebih dahulu kerana ia membantu memilih game yang lebih sesuai pada waktu tertentu. Di TipsMega888, anda boleh gunakan AI Scanner sebagai rujukan tambahan.",
  },
  {
    q: "Macam mana nak pilih trusted agent?",
    a: "Pilih ejen yang jelas dari segi identiti, support, arahan deposit/withdraw, dan rekod servis. Elakkan link pelik, janji terlalu keterlaluan, dan pihak yang mendesak anda bertindak terlalu cepat.",
  },
];

export default function Mega888HubPage() {
  return (
    <SharedPageNav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Mega888 Malaysia 2026 Hub",
            url: "https://tipsmega888.com/mega888",
            description:
              "Halaman hub Mega888 Malaysia untuk login, daftar, download, RTP live, trusted agent, dan rujukan panduan asas lain.",
            inLanguage: "ms-MY",
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
              { "@type": "ListItem", position: 2, name: "Mega888 Hub", item: "https://tipsmega888.com/mega888" },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem 4.5rem" }}>
        <header style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              padding: "7px 12px",
              border: "1px solid rgba(245,158,11,0.25)",
              background: "rgba(245,158,11,0.08)",
              color: "#ff4d4d",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Mega888 Malaysia Hub
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.25, margin: "0.9rem 0 0.7rem" }}>
            Mega888 Malaysia 2026 — Login, Download APK, RTP Live, Trusted Agent & Withdraw
          </h1>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 860, margin: 0 }}>
            Kalau anda cari maklumat paling penting tentang <strong>Mega888 Malaysia</strong>, ini ialah halaman rujukan utama.
            Dalam satu tempat, anda boleh terus pergi ke panduan login, cara daftar akaun baru, download Android APK,
            setup iPhone atau iPad, semak RTP live, pilih trusted agent, dan faham aliran asas dengan lebih tersusun.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1.4rem",
          }}
        >
          {[
            ["Panduan Scanner RTP", "/blog/rtp-scanner-mega888-cara-baca-data-live"],
            ["Login Guide", "/blog/mega888-register-akaun-baru-2026"],
            ["Download APK", "/blog/mega888-download-android-apk-terbaru-2026"],
            ["RTP Live", "/blog/mega888-rtp-live-malaysia-2026"],
            ["Trusted Agent", "/trusted"],
            ["Semua Game", "/games"],
            ["Group WhatsApp", "/blog/group-whatsapp-mega888-malaysia-2026"],
            ["Original vs Fake", "/blog/mega888-original-vs-fake"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "block",
                textDecoration: "none",
                color: "#e2e8f0",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: "0.95rem 1rem",
                fontWeight: 700,
              }}
            >
              {label} →
            </Link>
          ))}
        </div>

        <section
          style={{
            marginBottom: "1.6rem",
            padding: "1rem 1.1rem",
            borderRadius: 14,
            border: "1px solid rgba(16,185,129,0.28)",
            background: "rgba(16,185,129,0.08)",
          }}
        >
          <p style={{ margin: 0, fontWeight: 800 }}>💡 Quick route untuk pengguna baru</p>
          <p style={{ margin: "8px 0 12px", color: "#cbd5e1", lineHeight: 1.8 }}>
            Kalau anda baru nak mula, susunan paling mudah ialah: baca panduan daftar akaun, pilih panduan download ikut device,
            semak trusted agent, kemudian baru gunakan <Link href="/" style={{ color: "#ff6b6b" }}>AI Scanner</Link> untuk rujuk RTP live semasa.
          </p>
          <Link
            href="/"
            className="btn-primary btn-primary-green"
          >
            Buka AI Scanner →
          </Link>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 10 }}>📚 Artikel utama dalam cluster Mega888</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 0 }}>
            Halaman ini disusun sebagai hub supaya pengguna boleh faham struktur kandungan laman dengan lebih mudah.
            Setiap artikel di bawah fokus pada topik yang berbeza seperti login, APK, RTP, trusted agent, dan withdrawal.
          </p>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {HUB_LINKS.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-card card-entrance card-entrance-${Math.min(idx + 1, 8)}`}
              >
                <div style={{ fontWeight: 800, marginBottom: 5 }}>{item.title}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.94rem", lineHeight: 1.6 }}>{item.note}</div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: "2rem" }}>
          <article style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: "1rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: 0 }}>Kenapa orang cari Mega888?</h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 0 }}>
              Kebanyakan carian berkisar pada lima intent utama: <strong>login</strong>, <strong>register</strong>,
              <strong> download APK</strong>, <strong>RTP live</strong>, dan <strong>trusted agent</strong>.
              Sebab itu halaman hub ini menyusun semua topik tersebut secara terus tanpa memaksa pengguna melompat terlalu banyak kali.
            </p>
          </article>
          <article style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: "1rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: 0 }}>Di mana AI Scanner masuk?</h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 0 }}>
              AI Scanner lebih sesuai sebagai alat rujukan tambahan selepas pengguna sudah faham cara akses, download, dan pilih laluan yang betul.
              Dengan kata lain, hub ini jawab intent asas, manakala scanner bantu pada bahagian semakan pola dan pemilihan game.
            </p>
          </article>
          <article style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: "1rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: 0 }}>Cara pilih trusted agent</h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 0 }}>
              Semak nama brand, saluran support, kejelasan langkah deposit/withdraw, dan konsistensi maklumat.
              Jika anda ragu, rujuk dahulu halaman <Link href="/trusted" style={{ color: "#ff4d4d" }}>Trusted Agent</Link> sebelum klik sebarang pautan luar.
            </p>
          </article>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.28rem", fontWeight: 800, marginBottom: 10 }}>Panduan ringkas Mega888 untuk pengguna Malaysia</h2>
          <div style={{ color: "#cbd5e1", lineHeight: 1.9 }}>
            <p>
              Bagi ramai pengguna di Malaysia, carian tentang Mega888 biasanya bermula dengan soalan paling asas: di mana hendak login,
              macam mana hendak daftar, versi APK mana yang sesuai, dan agent mana yang boleh dipercayai. Dalam praktik sebenar,
              masalah yang selalu berlaku bukanlah semata-mata “tak jumpa app”, tetapi <strong>terkena link salah</strong>,
              fail yang tidak sesuai dengan device, atau maklumat yang tidak konsisten antara satu sumber dengan sumber yang lain.
            </p>
            <p>
              Atas sebab itu, lebih selamat jika anda gunakan satu flow yang tersusun. Mula dengan artikel daftar atau login.
              Lepas itu, pilih panduan download mengikut peranti — Android atau iPhone. Seterusnya, semak halaman trusted agent dan rujuk FAQ.
              Bila semua asas sudah jelas, barulah gunakan halaman seperti <Link href="/blog/mega888-rtp-live-malaysia-2026" style={{ color: "#38bdf8" }}>RTP Live Malaysia 2026</Link>
              {" "}atau AI Scanner untuk semakan tambahan.
            </p>
            <p>
              Strategi kandungan macam ini bukan sahaja bantu pengguna bergerak ikut urutan yang logik, tetapi juga bantu enjin carian faham bahawa
              halaman <strong>/mega888</strong> ialah pintu masuk utama untuk topik umum Mega888 di domain ini. Dari situ, artikel-artikel khusus boleh menyokong
              ranking long-tail seperti login, APK, trusted agent, free credit, atau withdraw.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 12 }}>Soalan lazim</h2>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: "0 0 8px" }}>{faq.q}</h3>
                <p style={{ color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            borderRadius: 14,
            border: "1px solid rgba(245,158,11,0.22)",
            background: "rgba(245,158,11,0.06)",
            padding: "1rem 1.1rem",
          }}
        >
          <h2 style={{ fontSize: "1.18rem", fontWeight: 800, margin: "0 0 8px" }}>Langkah seterusnya</h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8, marginTop: 0 }}>
            Jika anda sudah jumpa topik yang dicari, terus pilih artikel berkaitan di atas. Kalau anda mahu semakan corak dan rujukan tambahan,
            anda boleh kembali ke <Link href="/" style={{ color: "#ff4d4d" }}>homepage AI Scanner</Link>. Untuk semakan ejen pula,
            terus buka <Link href="/trusted" style={{ color: "#ff4d4d" }}>senarai trusted agent</Link>.
          </p>
        </section>
      </div>
    </SharedPageNav>
  );
}
