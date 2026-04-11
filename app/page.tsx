
import HomeClient from "./HomeClient";
import SlotMachineButton from "./components/SlotMachineButton";
import SharedPageNav from "./ui/SharedPageNav";

export const metadata = {
  title: "TipsMega888 | AI RTP Scanner Mega888 2026 & Komuniti Slot Malaysia",
  description:
    "TipsMega888 platform komuniti Mega888 Malaysia #1 dengan AI RTP Scanner percuma. Join group WhatsApp Mega888, tips slot gacor 2026, trusted company list. Data RTP live, jackpot community wins.",
  keywords: [
    "tipsmega888",
    "mega888",
    "mega888 hack",
    "scanner mega888",
    "rtp mega888",
    "tips mega888",
    "group whatsapp mega888",
    "mega888 community",
    "mega888 scanner ai",
    "download apk mega888",
    "mega888 trusted company",
  ],
  openGraph: {
    title: "TipsMega888 | AI RTP Scanner Mega888 2026 & Komuniti Slot Malaysia",
    description:
      "Platform #1 komuniti Mega888 Malaysia dengan AI RTP Scanner percuma. Join group WhatsApp, tips slot gacor, trusted company.",
    url: "https://tipsmega888.com",
    siteName: "TipsMega888",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/wins/win-4.jpg",
        width: 1200,
        height: 630,
        alt: "TipsMega888 - AI RTP Scanner Mega888 Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "TipsMega888 | AI RTP Scanner Mega888 2026 & Komuniti Slot Malaysia",
    description:
      "AI RTP Scanner percuma Mega888 Malaysia. Join group WhatsApp, tips slot gacor.",
    images: ["https://tipsmega888.com/wins/win-4.jpg"],
  },
  alternates: {
    canonical: "https://tipsmega888.com",
  },
  other: {
    preload: [
      { rel: 'preload', href: '/carousel/image-1-1.png', as: 'image', type: 'image/png' }
    ],
  },
};

export default function Page() {
  return (
    <SharedPageNav>
      {/* WebSite schema — enables sitelinks search box in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            description: "Platform rujukan Mega888 Malaysia dengan scanner, panduan penggunaan, dan halaman utama untuk topik berkaitan RTP, download, serta trusted agent.",
            inLanguage: "ms-MY",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://tipsmega888.com/games?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

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

      {/* Organization schema — Google Knowledge Panel with Community */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TipsMega888",
            url: "https://tipsmega888.com",
            logo: "https://tipsmega888.com/og-image.webp",
            description: "Platform rujukan Mega888 Malaysia dengan scanner, panduan, dan komuniti pemain aktif.",
            sameAs: [
              "https://tipsmega888.com/mega888",
              "https://tipsmega888.com/blog",
              "https://tipsmega888.com/trusted",
              "https://t.me/tipsmega888chat"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              url: "https://t.me/tipsmega888chat",
              availableLanguage: ["Malay", "English"]
            }
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

      {/* Community Social Proof - Aggregate Rating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Mega888 AI RTP Scanner & Community",
            description: "AI-powered RTP scanner untuk Mega888 dengan komuniti aktif Malaysia",
            brand: {
              "@type": "Brand",
              name: "TipsMega888"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "50000",
              bestRating: "5",
              worstRating: "1"
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "MYR",
              availability: "https://schema.org/InStock"
            }
          }),
        }}
      />

      {/* SoftwareApplication schema — AI Scanner tool */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TipsMega888 AI RTP Scanner",
            url: "https://tipsmega888.com",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
            description: "Alat rujukan berasaskan web untuk semakan RTP live dan panduan penggunaan di TipsMega888.",
          }),
        }}
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
            <li><a href="/blog/mega888-rtp-scanner-panduan-lengkap-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Rahsia Scanner AI RTP Mega888 2026</a></li>
            <li><a href="/blog/mega888-download-panduan-lengkap-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Panduan Selamat Download APK Mega888</a></li>
            <li><a href="/blog/mega888-free-credit-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Cara Claim Free Credit RM10 Anti-Scam</a></li>
            <li><a href="/blog/cara-menang-mega888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>5 Strategi Cara Menang Data-Driven</a></li>
            <li><a href="/blog/game-senang-jackpot" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>10 Slot Paling Mudah Menang (Data AI)</a></li>
            <li><a href="/blog/mega888-test-id-percuma-cara-guna-2026" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Senarai Test ID Mega888 Percuma 2026</a></li>
            <li><a href="/blog/mega888-original-vs-fake" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Kenal Pasti Mega888 Original vs Fake</a></li>
            <li><a href="/blog/mega888-akaun-kena-block" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Mega888 Akaun Kena Block? Cara Selesaikan</a></li>
            <li><a href="/blog/mega888-vs-pussy888" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Mega888 vs Pussy888: Mana Lebih Untung?</a></li>
            <li><a href="/blog/mega888-918kiss-beza" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span>Perbandingan Mega888 & 918Kiss 2026</a></li>
          </ul>
        </div>
      </div>

      <div className="px-4 py-8 mb-6 mt-4 opacity-90 transition-opacity">
        <article className="prose prose-sm prose-invert max-w-none text-[11px] text-white/60 text-center space-y-3">
          <h2 className="text-white/80 font-bold mb-2">Tentang TipsMega888 AI Scanner</h2>
          <p>
            TipsMega888 menghimpunkan scanner, panduan, dan halaman rujukan untuk pengguna yang mahu melihat bacaan RTP semasa dan memahami topik berkaitan Mega888 Malaysia dengan lebih teratur.
          </p>
          <p>
            Scanner ini disediakan sebagai alat rujukan. Ia boleh membantu pengguna membaca bacaan RTP live dan menapis topik penting seperti download, trusted agent, dan panduan asas lain, tetapi ia bukan jaminan untuk hasil tertentu.
          </p>
          <p>
            Jika anda baru bermula, gunakan halaman ini untuk scan RTP, kemudian teruskan ke Mega888 Hub, blog, atau trusted page mengikut topik yang anda perlukan.
          </p>
        </article>
      </div>

      {/* ── SEO LONG-FORM CONTENT ── */}
      <div className="px-4 py-8 mb-6 mt-4 max-w-4xl mx-auto border-t border-white/10">
        <article className="prose prose-sm prose-invert max-w-none">
          <h1 className="text-xl font-bold text-white mb-4 text-center">TipsMega888: Platform #1 Komuniti Mega888 Malaysia 2026</h1>
          
          <section className="space-y-4 text-[12px] text-white/70 leading-relaxed">
            <h2 className="text-lg font-semibold text-white/90 mt-6">Apa Itu TipsMega888?</h2>
            <p>
              <strong className="text-white">TipsMega888</strong> ialah platform <strong>komuniti Mega888 Malaysia</strong> yang menyediakan <strong>AI RTP Scanner percuma</strong> untuk analisis slot secara real-time. 
              Dengan lebih 50,000 ahli aktif dalam <strong>group WhatsApp Mega888</strong>, kami menjadi pilihan utama pemain 
              yang mencari <strong>tips mega888</strong>, <strong>scanner mega888</strong>, dan maklumat <strong>rtp mega888</strong> terkini.
            </p>

            <h2 className="text-lg font-semibold text-white/90 mt-6">Cara Guna AI RTP Scanner TipsMega888</h2>
            <p>
              Sistem <strong>AI Scanner Mega888</strong> kami menganalisis ribuan data setiap hari untuk memberi ramalan 
              <strong>slot gacor</strong> dengan kebarangkalian menang tertinggi. Berbeza dengan 
              <strong>mega888 hack</strong> atau <strong>software hack mega888</strong> yang berbahaya dan haram, 
              AI Scanner kami menggunakan analisis data sahih untuk meningkatkan peluang anda secara legal.
            </p>

            <h2 className="text-lg font-semibold text-white/90 mt-6">Download APK Mega888 Original Malaysia</h2>
            <p>
              Kami menyediakan <strong>download APK Mega888</strong> versi original melalui 
              <strong>Trusted Company</strong> yang disahkan. Elakkan 
              <strong>APK hack mega888</strong> atau <strong>mega888 mod</strong> yang boleh merosakkan telefon dan curi data peribadi. 
              Dapatkan <strong>APK Mega888 original</strong> sahaja daripada ejen berlesen dalam senarai trusted kami.
            </p>

            <h2 className="text-lg font-semibold text-white/90 mt-6">Komuniti Mega888 Malaysia & Group WhatsApp</h2>
            <p>
              Sertai <strong>group WhatsApp spin Mega888</strong> kami untuk berkongsi 
              <strong>mega888 community wins</strong>, <strong>big jackpot</strong>, dan 
              <strong>tips slot mega888</strong> secara live. Ahli komuniti aktif berkongsi 
              screenshot menang, strategi terkini, dan maklumat slot yang sedang <strong>gacor</strong>.
            </p>

            <h2 className="text-lg font-semibold text-white/90 mt-6">Tips Slot Mega888 2026: Cara Menang Consisten</h2>
            <p>
              Berdasarkan data <strong>rtp mega888</strong> daripada AI Scanner, slot yang paling senang menang termasuk 
              Fortune Dragon, Ocean Princess, Sweet Bonanza, dan Gates of Olympus. 
              Gunakan <strong>tips mega hari ini</strong> yang dikemas kini setiap hari untuk pilih slot dengan 
              <strong>RTP tertinggi</strong>.
            </p>

            <h2 className="text-lg font-semibold text-white/90 mt-6">Mega888 Trusted Company List</h2>
            <p>
              Halaman <a href="/trusted" className="text-red-400 hover:underline"><strong>Mega888 Trusted Company</strong></a> kami menyenaraikan 
              29 ejen berlesen dengan rating, review, dan statistik withdraw. 
              Pilih platform dengan <strong>withdrawal speed</strong> terpantas dan 
              <strong>customer support</strong> 24/7 untuk pengalaman terbaik.
            </p>

            <h2 className="text-lg font-semibold text-white/90 mt-6">Kesimpulan: TipsMega888 vs Hack Mega888</h2>
            <p>
              <strong className="text-white">TipsMega888</strong> menawarkan cara <strong>selamat dan legal</strong> untuk 
              meningkatkan peluang menang dengan <strong>analisis data</strong>. 
              Jangan guna <strong>mega888 hack</strong>, <strong>apk hack mega888</strong>, atau 
              <strong>software godam slot</strong> yang boleh menyebabkan akaun kena ban, 
              virus, atau penipuan. Daftar percuma di TipsMega888 sekarang!
            </p>
          </section>
        </article>
      </div>
    </SharedPageNav>
  );
}
