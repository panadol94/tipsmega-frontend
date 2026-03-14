import Link from "next/link";

export const metadata = {
  title: "Disclaimer | TipsMega888",
  description:
    "Penafian rasmi untuk kandungan rujukan, panduan, dan alat yang dipaparkan di TipsMega888.",
  alternates: { canonical: "https://tipsmega888.com/disclaimer" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 5rem" }}>
      <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
        <Link href="/" style={{ color: "#64748b" }}>Home</Link>
        {" › "}
        <span style={{ color: "#f59e0b" }}>Disclaimer</span>
      </nav>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem" }}>Disclaimer</h1>
      <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
        Semua maklumat di TipsMega888 disediakan untuk tujuan rujukan umum, pendidikan kandungan, dan panduan penggunaan laman.
        Kami tidak memberi jaminan terhadap hasil tertentu, keputusan menang, atau prestasi mana-mana platform pihak ketiga.
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {[
          ["Tiada jaminan keputusan", "Sebarang tips, analisis, atau kandungan yang diterbitkan tidak menjamin kemenangan, keuntungan, atau pulangan tertentu. Pengguna bertanggungjawab sepenuhnya terhadap keputusan sendiri."],
          ["Maklumat pihak ketiga", "Laman mungkin memaut kepada sumber, komuniti, atau penyedia pihak ketiga. Kami tidak mengawal dan tidak menjamin kandungan, operasi, atau polisi pihak ketiga tersebut."],
          ["Kandungan boleh berubah", "Artikel, senarai, metadata, dan kandungan panduan boleh berubah dari semasa ke semasa. Kami berusaha memastikan kandungan relevan, tetapi tidak menjamin semua maklumat sentiasa lengkap atau terkini."],
          ["Tiada hubungan rasmi", "Melainkan dinyatakan secara jelas, laman ini tidak semestinya mewakili, dimiliki, atau dioperasikan oleh mana-mana jenama pihak ketiga yang disebut dalam artikel atau halaman rujukan."],
          ["Penggunaan atas risiko sendiri", "Dengan menggunakan laman ini, anda memahami bahawa semua penggunaan kandungan, pautan, dan ciri yang tersedia adalah atas risiko dan pertimbangan anda sendiri."],
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
