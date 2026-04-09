import Link from "next/link";

export const metadata = {
  title: "Terms of Use | TipsMega888",
  description:
    "Terma penggunaan laman TipsMega888, termasuk penggunaan kandungan, akses ciri laman, pendaftaran akaun, dan had tanggungjawab umum.",
  alternates: { canonical: "https://tipsmega888.com/terms" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 5rem" }}>
      <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
        <Link href="/" style={{ color: "#64748b" }}>Home</Link>
        {" › "}
        <span style={{ color: "#ef4444" }}>Terms of Use</span>
      </nav>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem" }}>Terms of Use</h1>
      <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
        Dengan mengakses atau menggunakan TipsMega888, anda bersetuju untuk mematuhi terma penggunaan asas ini.
        Tujuannya adalah untuk memastikan penggunaan laman yang teratur, selamat, dan adil untuk semua pengguna.
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {[
          ["Penggunaan laman", "Anda bertanggungjawab menggunakan laman secara sah dan tidak menyalahgunakan mana-mana fungsi, termasuk pendaftaran akaun berulang, spam, atau cubaan memintas sistem keselamatan dan had penggunaan."],
          ["Kandungan & panduan", "Semua artikel, tips, senarai rujukan, dan paparan analisis di laman ini disediakan untuk tujuan maklumat dan rujukan umum. Kandungan tidak boleh dianggap sebagai jaminan hasil, nasihat kewangan, atau jaminan kemenangan."],
          ["Akaun pengguna", "Jika anda mendaftar akaun, anda bertanggungjawab memastikan maklumat yang diberikan adalah betul dan tidak menyamar sebagai pihak lain. Kami berhak mengehadkan atau menamatkan akses jika berlaku penyalahgunaan."],
          ["Ketersediaan servis", "Kami boleh mengubah, menghentikan, atau mengemaskini mana-mana ciri laman pada bila-bila masa tanpa notis awal, termasuk AI Scanner, referral, atau halaman komuniti."],
          ["Hak milik kandungan", "Reka bentuk, kandungan editorial, susun atur, dan elemen penjenamaan laman adalah hak milik pemilik laman atau rakan kandungan masing-masing dan tidak boleh disalin semula tanpa kebenaran."],
          ["Had tanggungjawab", "Pemilik laman tidak bertanggungjawab ke atas sebarang kerugian, gangguan, kehilangan data, atau keputusan penggunaan pihak ketiga yang timbul daripada penggunaan laman atau kandungan yang dipaparkan."],
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
