import SharedPageNav from "../ui/SharedPageNav";

export const metadata = {
  title: "Privacy Policy | TipsMega888",
  description:
    "Dasar privasi TipsMega888. Ketahui bagaimana maklumat asas, log pelawat, dan data akaun digunakan untuk operasi halaman serta pengalaman pengguna.",
  alternates: { canonical: "https://tipsmega888.com/privacy-policy" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <SharedPageNav>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem 5rem" }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</a>
          {" › "}
          <span style={{ color: "#f59e0b" }}>Privacy Policy</span>
        </nav>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem" }}>Privacy Policy</h1>
        <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
          TipsMega888 menghormati privasi pelawat dan pengguna. Halaman ini menerangkan secara ringkas jenis maklumat
          yang boleh diproses apabila anda menggunakan halaman, mendaftar akaun, atau berinteraksi dengan ciri seperti AI Scanner,
          referral, dan halaman kandungan.
        </p>

        <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
          {[
            ["Maklumat asas akaun", "Apabila anda mendaftar, kami mungkin memproses maklumat asas seperti ID akaun, rujukan pengguna, dan rekod penggunaan ciri halaman bagi membolehkan log masuk, bonus stars, dan anti-spam berfungsi dengan baik."],
            ["Data teknikal", "Server dan aplikasi boleh merekod alamat IP, jenis peranti, pelayar, halaman yang dilawati, dan data log lain untuk tujuan keselamatan, pencegahan penyalahgunaan, serta penambahbaikan prestasi halaman."],
            ["Cookies & storage", "Halaman boleh menggunakan local storage atau cookies yang diperlukan untuk mengekalkan sesi, menyimpan tetapan asas, dan mengingat status penggunaan tertentu seperti cooldown atau keutamaan paparan."],
            ["Penggunaan data", "Maklumat digunakan untuk operasi platform, pengesahan akaun, pencegahan penyalahgunaan, statistik asas, dan penambahbaikan pengalaman pengguna. Kami tidak menjual data peribadi pengguna kepada pihak ketiga."],
            ["Pautan pihak ketiga", "Sesetengah halaman mungkin mengandungi pautan ke Telegram, WhatsApp, atau halaman pihak ketiga. Dasar privasi mereka adalah berasingan dan tertakluk kepada platform masing-masing."],
            ["Kemaskini polisi", "Dasar ini boleh dikemaskini dari semasa ke semasa bagi mencerminkan perubahan operasi halaman, pematuhan, atau penambahbaikan keselamatan."],
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
    </SharedPageNav>
  );
}
