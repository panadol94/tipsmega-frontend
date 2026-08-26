
import HomeClient from "./HomeClient";
import SlotMachineButton from "./components/SlotMachineButton";
import SharedPageNav from "./ui/SharedPageNav";
import Link from "next/link";

export const metadata = {
  title: "RTP Mega888 Live Malaysia 2026 | TipsMega888 Scanner",
  description:
    "Semak RTP Mega888 live Malaysia 2026 melalui dashboard TipsMega888. Bandingkan bacaan game, kemudian rujuk panduan RTP, senarai game dan trusted company.",
  keywords: [
    "tips mega888",
    "tipsmega888",
    "scanner mega888",
    "rtp mega888",
    "rtp mega888 live malaysia",
    "mega888 scanner ai",
    "download apk mega888",
    "mega888 trusted company",
    "mega888 trusted agent",
    "mega888 rtp live",
  ],
  openGraph: {
    title: "RTP Mega888 Live Malaysia 2026 | TipsMega888 Scanner",
    description:
      "Semak RTP Mega888 live melalui dashboard TipsMega888 dan bandingkan bacaan game sebelum membaca panduan berkaitan.",
    url: "https://tipsmega888.com",
    siteName: "Tips Mega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/wins/win-4.jpg",
        width: 1200,
        height: 630,
        alt: "Tips Mega888 Malaysia - Panduan dan RTP Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "RTP Mega888 Live Malaysia 2026 | TipsMega888 Scanner",
    description:
      "Semak RTP Mega888 live melalui dashboard TipsMega888 dan bandingkan bacaan game sebelum membaca panduan berkaitan.",
    images: ["https://tipsmega888.com/wins/win-4.jpg"],
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
};

export default function Page() {
  return (
    <SharedPageNav>
      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
            ],
          }),
        }}
      />

      {/* Community Wins - Image Gallery Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Mega888 Community Wins",
            description: "Koleksi kemenangan ahli komuniti Mega888 Malaysia - big wins, jackpots, dan testimonials.",
            url: "https://tipsmega888.com",
            image: [
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-1.jpg",
                name: "Ultra Mega Big Win - RM 4,500",
                description: "Group WhatsApp Mega888 member big win screenshot"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-2.jpg",
                name: "Big Win - RM 750",
                description: "Group WhatsApp spin member win screenshot"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-3.jpg",
                name: "Gates of Olympus Win - RM 2,500",
                description: "Mega888 community member win"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-4.jpg",
                name: "CM8 Jackpot - RM 15,000,000",
                description: "Mega888 big jackpot community win"
              },
              {
                "@type": "ImageObject",
                url: "https://tipsmega888.com/wins/win-5.jpg",
                name: "Rush Xmas Win - RM 6,567",
                description: "Group WhatsApp Mega888 spin win"
              }
            ]
          }),
        }}
      />


      {/* Homepage FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question", "name": "Apa itu Tips Mega888?", "acceptedAnswer": {"@type": "Answer", "text": "Tips Mega888 ialah platform rujukan yang menyediakan analisis AI RTP secara real-time, senarai trusted agent dan panduan permainan. Scanner tidak mempunyai akses terus kepada RNG permainan dan tidak menjamin kemenangan."}},
            {"@type": "Question", "name": "Bagaimana cara guna RTP Scanner Mega888?", "acceptedAnswer": {"@type": "Answer", "text": "Masukkan ID pada bahagian Scanner untuk melihat bacaan AI real-time berdasarkan data dan signal semasa. Gunakan hasil untuk perbandingan dan bukan sebagai jaminan kemenangan."}},
            {"@type": "Question", "name": "Adakah Tips Mega888 selamat digunakan?", "acceptedAnswer": {"@type": "Answer", "text": "Ya, tipsmega888.com adalah laman rujukan maklumat sahaja. Kami tidak memerlukan maklumat peribadi atau data akaun anda. Platform ini hanya menyediakan data RTP dan panduan permainan untuk tatapan umum."}},
            {"@type": "Question", "name": "Apa itu trusted agent Mega888?", "acceptedAnswer": {"@type": "Answer", "text": "Trusted agent Mega888 adalah ejen yang telah disahkan mempunyai rekod pembayaran yang baik, respon pantas, dan reputasi positif dalam komuniti. Senarai trusted agent kami dikemaskini secara berkala berdasarkan maklum balas komuniti."}},
            {"@type": "Question", "name": "Boleh saya percayai bacaan RTP dari scanner ini?", "acceptedAnswer": {"@type": "Answer", "text": "Bacaan scanner ialah output analisis AI real-time TipsMega888 berdasarkan data dan signal semasa. Ia bukan keputusan rasmi operator, audit bebas atau jaminan keputusan permainan."}}
          ]
        })}}
      />

      <>
        <HomeClient />
      </>

      {/* ── INTERNAL LINK CARDS: compact above-the-fold design ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 0.75rem 0.75rem" }}>
        <p style={{ textAlign: "center", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: "0.5rem" }}>
          Explore Mega888 Malaysia
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.5rem" }}>
          {[
            ["🎯 Panduan RTP Live", "/blog/mega888-rtp-live-malaysia-2026", "Cara membaca RTP dan volatiliti game"],
            ["🔥 Trusted Company", "/trusted", "Verified agents & payout speed"],
            ["🎮 Semua Game", "/games", "197+ slot dengan RTP & volatiliti"],
            ["📝 Blog Tips & Strategi", "/blog", "Panduan, download, withdraw & more"],
            ["🧭 Mega888 Hub", "/mega888", "Login, APK, RTP live, trusted agent"],
          ].map(([label, href, note]) => (
            <a
              key={href}
              href={href}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: "0.6rem 0.75rem",
              }}
            >
              <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 2, fontSize: "0.82rem" }}>{label}</div>
              <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.4 }}>{note}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 mt-4 max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-[28px] border border-yellow-400/20 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_38%),linear-gradient(180deg,rgba(54,7,7,0.94),rgba(8,2,2,0.98))] p-3 shadow-[0_0_40px_rgba(255,140,0,0.14)]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
            <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] skew-x-[-18deg] animate-pulse" />
          </div>
          <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-300/80">Join Komuniti Mega888</p>
              <h2 className="text-sm font-extrabold text-white">Join komuniti VIP untuk spin, update, dan lobby access</h2>
            </div>
            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-yellow-200">
              3 Reel Bonus
            </span>
          </div>

          <SlotMachineButton
            href="https://masuk10.com/Prospinner"
            label="JOIN KOMUNITI VIP"
            sublabel="masuk group, spin lobby, dan akses komuniti terus"
            pattern={["💎", "7", "💎"]}
          />
        </div>
      </div>

      <div className="px-4 py-4 mb-2 mt-4 max-w-4xl mx-auto opacity-90 hover:opacity-100 transition-opacity">
        <div className="border border-red-500/20 bg-black/40 backdrop-blur-md rounded-2xl p-5 shadow-[0_0_15px_rgba(255,77,77,0.1)]">
          <h2 className="text-red-400 font-bold mb-3 text-sm flex items-center gap-2">
            <span className="text-lg">🎯</span> Strategi & Panduan Mega888 2026
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[11px] text-white/70">
            <li><Link href="/blog/cara-menang-mega888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Tips Game Mega888 Hari Ini & Checklist Selamat</Link></li>
            <li><Link href="/blog/rtp-scanner-mega888-cara-baca-data-live" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Cara Baca Scanner RTP Mega888</Link></li>
            <li><Link href="/blog/mega888-download-panduan-lengkap-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Panduan Selamat Download APK Mega888</Link></li>
            <li><Link href="/blog/mega888-free-credit-no-deposit-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Cara Semak Free Credit Anti-Scam</Link></li>
            <li><Link href="/blog/cara-menang-mega888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>5 Strategi Cara Menang Data-Driven</Link></li>
            <li><Link href="/blog/top-slot-mega888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Senarai Slot Mega888 & Ciri Game</Link></li>
            <li><Link href="/blog/mega888-test-id-percuma-cara-guna-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Senarai Test ID Mega888 Percuma 2026</Link></li>
            <li><Link href="/blog/mega888-original-vs-fake" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Kenal Pasti Mega888 Original vs Fake</Link></li>
            <li><Link href="/blog/mega888-akaun-kena-block" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Mega888 Akaun Kena Block? Cara Selesaikan</Link></li>
            <li><Link href="/blog/mega888-vs-pussy888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Mega888 vs Pussy888: Mana Lebih Untung?</Link></li>
            <li><Link href="/blog/mega888-vs-918kiss" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Perbandingan Mega888 & 918Kiss 2026</Link></li>
          </ul>
        </div>
      </div>

      {/* ── SEO LONG-FORM CONTENT ── */}
      <div className="px-4 py-8 mb-6 mt-4 max-w-4xl mx-auto border-t border-white/10">
        <article className="prose prose-sm prose-invert max-w-none">
          <h2 className="text-xl font-bold text-white mb-4 text-center">Cara Semak RTP Mega888 Live Malaysia</h2>

          <section className="space-y-4 text-[12px] text-white/70 leading-relaxed">
            <h3 className="text-lg font-semibold text-white/90 mt-6">Apa Maksud RTP Mega888?</h3>
            <p>
              <strong className="text-white">RTP (Return to Player)</strong> ialah kadar pulangan teori jangka panjang sesuatu game.
              Ia bukan ramalan untuk spin seterusnya. Dashboard ini menyusun bacaan AI real-time supaya pengguna boleh membandingkan game,
              manakala penerangan lebih lengkap tersedia dalam <Link href="/blog/mega888-rtp-live-malaysia-2026" className="text-red-400 hover:underline">panduan RTP Mega888 live</Link>.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mt-6">Cara Guna RTP Scanner</h3>
            <p>
              Masukkan ID dalam scanner, bandingkan bacaan yang dipaparkan dan semak volatiliti game sebelum membuat pilihan.
              Bacaan scanner ialah output analisis AI real-time, bukan sambungan terus kepada RNG dan tidak menjamin kemenangan.
              Baca juga <Link href="/blog/rtp-scanner-mega888-cara-baca-data-live" className="text-red-400 hover:underline">cara membaca data scanner RTP</Link>.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mt-6">Bandingkan Game dan Volatiliti</h3>
            <p>
              RTP perlu dibaca bersama volatiliti: game volatiliti rendah biasanya memberi hasil lebih kecil tetapi lebih kerap,
              manakala volatiliti tinggi mempunyai turun naik lebih besar. Lihat <Link href="/games" className="text-red-400 hover:underline">senarai game Mega888</Link>
              untuk membandingkan maklumat setiap game dalam satu halaman.
            </p>

            <h3 className="text-lg font-semibold text-white/90 mt-6">Rujukan Lanjutan</h3>
            <p>
              Untuk topik selain RTP, gunakan <Link href="/mega888" className="text-red-400 hover:underline"><strong>Mega888 Hub</strong></Link>
              sebagai halaman utama bagi panduan login, download, withdrawal dan keselamatan. Halaman
              <Link href="/trusted" className="text-red-400 hover:underline"> trusted company</Link> pula menyediakan checklist semakan platform.
            </p>
          </section>
        </article>
      </div>
    </SharedPageNav>
  );
}
