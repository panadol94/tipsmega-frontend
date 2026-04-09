
import Link from "next/link";

export const metadata = {
  title: "About TipsMega888 | Platform AI Scanner Mega888 Malaysia",
  description:
    "Ketahui fokus TipsMega888 sebagai platform rujukan Mega888 Malaysia dengan AI Scanner, panduan kandungan, dan halaman trusted agent.",
  alternates: { canonical: "https://tipsmega888.com/about" },
  openGraph: {
    title: "About TipsMega888 | Platform AI Scanner Mega888 Malaysia",
    description: "Ketahui fokus TipsMega888 sebagai platform rujukan Mega888 Malaysia dengan AI Scanner, panduan kandungan, dan halaman trusted agent.",
    url: "https://tipsmega888.com/about",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "TipsMega888 - About" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TipsMega888 | Platform AI Scanner Mega888 Malaysia",
    description: "Platform rujukan Mega888 Malaysia dengan AI Scanner dan panduan kandungan.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 5rem" }}>
      <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
        <Link href="/" style={{ color: "#64748b" }}>Home</Link>
        {" › "}
        <span style={{ color: "#ef4444" }}>About</span>
      </nav>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem" }}>About TipsMega888</h1>
      <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
        TipsMega888 dibina sebagai platform rujukan untuk pengguna yang mencari panduan Mega888 Malaysia dalam satu tempat.
        Fokus utama laman ini ialah AI Scanner, kandungan panduan, senarai trusted agent, serta artikel berkaitan login, APK, RTP live,
        dan topik asas yang sering dicari pengguna.
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {[
          ["Apa yang ada di sini", "Laman ini menghimpunkan AI Scanner, halaman hub Mega888, artikel panduan, senarai trusted agent, dan info tambahan untuk membantu pengguna menavigasi topik berkaitan dengan lebih teratur."],
          ["Fokus kandungan", "Kami susun kandungan mengikut intent carian biasa seperti login, register, download Android/iOS, RTP live, trusted agent, dan withdraw supaya pengguna boleh cari jawapan dengan lebih cepat."],
          ["Cara guna laman", "Anda boleh mula dari homepage untuk scanner, buka /mega888 untuk hub utama, pergi ke /blog untuk artikel mendalam, atau semak /trusted untuk senarai agent yang dipaparkan di laman."],
          ["Pendekatan", "Matlamat utama laman adalah untuk memudahkan rujukan kandungan dan pengalaman pengguna. Setiap halaman direka supaya lebih jelas, lebih mudah dicapai, dan lebih senang difahami pada telefon mahupun desktop."],
        ].map(([title, body]) => (
          <section
            key={title}
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{title}</h2>
            <p style={{ color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
