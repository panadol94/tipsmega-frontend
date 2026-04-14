import SharedPageNav from "../ui/SharedPageNav";
import TrustedClient from "./TrustedClient";
import Link from "next/link";
import { Trophy, Shield, CheckCircle, Zap, Target, MessageCircle, Lock, Rocket, Link2, Search } from "lucide-react";

export const metadata = {
  title: "Mega888 Trusted Company Malaysia 2026 | Senarai & Panduan",
  description:
    "Rujuk senarai Mega888 trusted company di TipsMega888, bersama panduan ringkas untuk semak platform, support, deposit, dan perkara penting sebelum memilih.",
  keywords: [
    "trusted company mega888",
    "agent mega888 malaysia",
    "senarai trusted mega888",
    "platform mega888 malaysia",
    "cara pilih agent mega888",
    "tipsmega888 trusted",
  ],
  alternates: {
    canonical: "https://tipsmega888.com/trusted",
  },
  openGraph: {
    title: "Mega888 Trusted Company Malaysia 2026 | Senarai & Panduan",
    description:
      "Senarai Mega888 trusted company di TipsMega888 dengan panduan ringkas untuk semak platform dan memilih dengan lebih yakin.",
    url: "https://tipsmega888.com/trusted",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://tipsmega888.com/og-trusted.png",
        width: 1200,
        height: 630,
        alt: "Agent Mega888 Original Trusted Company 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega888 Trusted Company Malaysia 2026 | Senarai & Panduan",
    description: "Rujuk trusted company Mega888 bersama panduan ringkas sebelum memilih platform.",
    images: ["https://tipsmega888.com/og-trusted.png"],
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

export default function TrustedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Mega888 Trusted Company",
            description:
              "Senarai Mega888 trusted company dengan panduan ringkas tentang perkara yang patut diperhatikan sebelum memilih platform.",
            url: "https://tipsmega888.com/trusted",
            inLanguage: "ms-MY",
            publisher: {
              "@type": "Organization",
              name: "TipsMega888",
              url: "https://tipsmega888.com",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Trusted Company Mega888",
              description: "Senarai platform yang dipaparkan untuk rujukan awal pengguna",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Bagaimana kenal pasti platform yang patut dipertimbangkan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Semak kejelasan maklumat platform, cara deposit dan withdrawal, saluran support, serta sama ada arahan yang diberi konsisten. Elakkan platform yang membuat janji terlalu besar atau memberi maklumat yang bercanggah.",
                },
              },
              {
                "@type": "Question",
                name: "Adakah senarai ini jamin selamat atau jamin menang?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tidak. Senarai ini disediakan sebagai rujukan untuk membantu pengguna menilai pilihan yang ada. Pengguna masih perlu membuat semakan sendiri dan menggunakan pertimbangan sendiri sebelum berurusan dengan mana-mana platform.",
                },
              },
              {
                "@type": "Question",
                name: "Berapa lama proses withdrawal biasanya berlaku?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tempoh withdrawal boleh berbeza mengikut platform dan keadaan semasa. TipsMega888 tidak menjamin tempoh tertentu, jadi pengguna disaran semak maklumat terkini terus dengan platform yang dipilih.",
                },
              },
            ],
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://tipsmega888.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Trusted Companies",
                item: "https://tipsmega888.com/trusted",
              },
            ],
          }),
        }}
      />

      <SharedPageNav>
        <div className="min-h-screen bg-[#07090f] text-white app-bg relative overflow-x-hidden">
          <div className="fixed inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

          <div className="app-shell mx-auto px-4 py-8 pb-32 relative z-10">
            <header className="mb-8 relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-6 bg-red-400 rounded-full shadow-[0_0_10px_rgba(255,77,77,0.5)]" />
                    <span className="text-[10px] font-black tracking-[0.3em] text-red-400/80 uppercase">Trusted List</span>
                  </div>
                  <h1 className="text-3xl font-black italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight">
                    Trusted Company <span className="elite-gradient-shift elite-glow">Mega888 Malaysia 2026</span>
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-white/55 max-w-xl leading-relaxed">
                    Halaman rujukan untuk menilai beberapa platform Mega888 Malaysia dengan lebih tersusun sebelum anda membuat pilihan sendiri.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-400 premium-icon-glow-gold" />
                </div>
              </div>

              <p className="text-xs text-white/50 leading-relaxed font-medium bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-red-400 font-bold">Rujukan pilihan 2026.</span> Halaman ini menghimpunkan platform yang dipaparkan bersama nota ringkas supaya pengguna boleh buat semakan awal dengan lebih teratur.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
                  <div className="text-base font-black text-red-400">Live</div>
                  <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Company List</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
                  <div className="text-base font-black text-red-400">24/7</div>
                  <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Active Monitor</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
                  <div className="text-base font-black text-red-300">Semak</div>
                  <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Dengan Teliti</div>
                </div>
              </div>
            </header>

            <TrustedClient />

            <section className="mt-12 space-y-8">
              <article className="card p-6 border-red-500/20 bg-red-500/5">
                <h2 className="text-xl font-black text-red-400 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400 premium-icon-glow-red" />
                  <span>Kenapa Pilih Trusted Company?</span>
                </h2>
                <div className="text-sm text-white/70 space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-white">Rujukan awal:</strong> Senarai ini disediakan untuk membantu pengguna menilai beberapa pilihan platform dalam satu tempat.
                  </p>
                  <p>
                    <strong className="text-white">Semak maklumat penting:</strong> Fokus pada kejelasan langkah daftar, arahan deposit dan withdrawal, serta konsistensi saluran support.
                  </p>
                  <p>
                    <strong className="text-white">Guna pertimbangan sendiri:</strong> TipsMega888 tidak memberi jaminan terhadap mana-mana platform, jadi pengguna tetap perlu menyemak sendiri sebelum membuat keputusan.
                  </p>
                </div>
              </article>

              <article className="card p-6 border-red-500/20 bg-red-500/5">
                <div className="text-sm uppercase tracking-wider text-red-400 font-bold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 premium-icon-glow" />
                  <span>Cara Semakan</span>
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-red-400">Gunakan halaman ini sebagai rujukan, bukan jaminan</h2>
                <p className="mt-4 max-w-3xl mx-auto text-white/70 leading-relaxed">
                  Fokus pada maklumat, kejelasan proses, dan respons support, bukan janji yang terlalu cantik atau tuntutan yang sukar dibuktikan.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70 mt-5">
                  <div>
                    <h3 className="text-white font-bold mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-400 premium-icon-glow-green" /> Maklumat asas</h3>
                    <p className="leading-relaxed">Semak sama ada penerangan platform, langkah daftar, dan pautan yang diberi kelihatan jelas serta konsisten.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2 flex items-center gap-1"><Zap className="w-4 h-4 text-cyan-400 premium-icon-glow-cyan" /> Respons support</h3>
                    <p className="leading-relaxed">Lihat sama ada saluran support mudah dihubungi dan memberi penerangan yang masuk akal sebelum anda teruskan.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2 flex items-center gap-1"><Target className="w-4 h-4 text-purple-400 premium-icon-glow-purple" /> Syarat penggunaan</h3>
                    <p className="leading-relaxed">Semak syarat bonus, deposit, dan withdrawal supaya anda tidak terlepas maklumat penting sebelum mendaftar.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2 flex items-center gap-1"><MessageCircle className="w-4 h-4 text-blue-400 premium-icon-glow-blue" /> Penilaian sendiri</h3>
                    <p className="leading-relaxed">Gunakan maklumat pada halaman ini sebagai panduan awal, kemudian buat semakan tambahan sendiri jika perlu.</p>
                  </div>
                </div>
              </article>

              <article className="card p-6 border-purple-500/20 bg-purple-500/5">
                <h2 className="text-xl font-black text-purple-400 mb-4 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-purple-400 premium-icon-glow-purple" />
                  <span>Cara Register &amp; Mula Main</span>
                </h2>
                <ol className="text-sm text-white/70 space-y-2 leading-relaxed list-decimal list-inside">
                  <li><strong className="text-white">Pilih platform:</strong> semak senarai dan pilih platform yang anda mahu nilai dengan lebih lanjut.</li>
                  <li><strong className="text-white">Buka pautan:</strong> gunakan butang yang disediakan untuk melihat saluran admin atau pautan berkaitan.</li>
                  <li><strong className="text-white">Semak penerangan:</strong> pastikan arahan daftar, syarat, dan maklumat penting diterangkan dengan jelas.</li>
                  <li><strong className="text-white">Tanya soalan penting:</strong> semak proses deposit, withdrawal, dan sokongan sebelum anda meneruskan.</li>
                  <li><strong className="text-white">Buat keputusan sendiri:</strong> gunakan pertimbangan sendiri sebelum mendaftar atau berurusan dengan mana-mana platform.</li>
                </ol>
              </article>

              <article className="card p-6 border-blue-500/20 bg-blue-500/5">
                <h2 className="text-xl font-black text-blue-400 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-400 premium-icon-glow-blue" />
                  <span>Cara Kenal Pasti Agent Mega888 Original vs Kiosk Scammer 2026</span>
                </h2>
                <div className="text-sm text-white/70 space-y-3 leading-relaxed">
                  <p>
                    Banyak ejen palsu jual mimpi dengan bonus terlalu tinggi atau janji cuci terlalu mudah. Biasanya bila sampai masa withdraw, mula keluar alasan pelik atau terus hilang.
                  </p>
                  <p>
                    Sebaliknya, <strong>agent Mega888 original</strong> selalunya lebih konsisten dari segi payment flow, komunikasi, dan trust signal. Itulah sebab page ini wujud — untuk bantu tapis pilihan anda sebelum deposit.
                  </p>
                  <p>
                    Jangan ambil risiko dengan company yang statusnya diragui. Gunakan trusted list ini bersama halaman <strong>TipsMega888</strong> lain supaya flow anda lebih selamat dan lebih efisien.
                  </p>
                </div>
              </article>

              <article className="card p-6 border-emerald-500/20 bg-emerald-500/5">
                <h2 className="text-xl font-black text-emerald-400 mb-4 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-emerald-400 premium-icon-glow-green" />
                  <span>Panduan Berkaitan Untuk Pengguna Baru</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <Link href="/mega888" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                    <div className="font-bold mb-1 text-emerald-300">Mega888 Malaysia Hub</div>
                    <div className="text-white/60 leading-relaxed">Panduan login, register, download APK, RTP live, dan withdraw dalam satu halaman.</div>
                  </Link>
                  <Link href="/blog/mega888-deposit-cara-ewallet-malaysia-2026" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                    <div className="font-bold mb-1 text-emerald-300">Cara Deposit Mega888</div>
                    <div className="text-white/60 leading-relaxed">E-wallet, DuitNow, Touch 'n Go, Boost — semua cara deposit dengan agent trusted.</div>
                  </Link>
                  <Link href="/blog/kiosk-mega888-trusted" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                    <div className="font-bold mb-1 text-emerald-300">Kiosk & Agent Trusted</div>
                    <div className="text-white/60 leading-relaxed">Senarai company Mega888 verified, 100% no scammer, fast withdrawal.</div>
                  </Link>
                  <Link href="/blog" className="rounded-xl border border-white/10 bg-white/5 p-4 text-white no-underline hover:border-emerald-400/40 transition-colors">
                    <div className="font-bold mb-1 text-emerald-300">Blog Tips & Strategi</div>
                    <div className="text-white/60 leading-relaxed">Koleksi artikel download, withdraw, trusted agent, dan panduan menang.</div>
                  </Link>
                </div>
              </article>
            </section>
          </div>
        </div>
      </SharedPageNav>
    </>
  );
}
