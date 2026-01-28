"use client";

import BottomNav from "../ui/BottomNav";
import FAQSection from "../ui/FAQSection";

// Metadata needs to be in a separate server component file
// We'll add it via head or script tags for client components

export default function Page() {
  return (
    <>
      {/* SEO Meta Tags via Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Mega888 AI Tips - Complete Guide & FAQ",
            "description": "Panduan lengkap Mega888 AI Scanner. Learn how to use AI technology untuk analyze RTP, cara scan ID, security info, dan FAQ lengkap.",
            "url": "https://tipsmega888.com/info",
            "inLanguage": "ms-MY",
            "publisher": {
              "@type": "Organization",
              "name": "TipsMega AI",
              "url": "https://tipsmega888.com"
            }
          })
        }}
      />
      <div className="app-wrap min-h-screen bg-[#07090f]">
        <div className="app-shell pb-24">

          {/* HEADER SECTION - Styled like Profile Identity Card */}
          <header className="card relative overflow-hidden p-6 bg-[#0c1224] border-white/15">
            {/* Background Elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 w-8 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-emerald-400 uppercase">System Intelligence</span>
              </div>
              <h1 className="h1 italic leading-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                MEGA888 <span className="text-premium">AI TIPS</span>
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/60 font-medium max-w-sm">
                Sistem analitik termaju untuk mengesan algoritma server dan memberikan data <span className="text-emerald-400 font-bold">Real-Time RTP</span> yang tepat.
              </p>
            </div>
          </header>

          {/* SEO CORE CONTENT */}
          <section className="space-y-4">

            {/* ARTICLE 1: APA ITU AI TIPS */}
            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-3 tracking-widest uppercase italic">Apa Itu AI Tips?</h2>
              <div className="text-[13px] leading-relaxed text-white/50 space-y-3">
                <p>
                  <strong>Mega888 AI Tips</strong> adalah sebuah platform berasaskan kecerdasan buatan (AI) yang direka khas untuk menganalisis corak kemenangan pada platform permainan digital.
                </p>
                <p>
                  Teknologi kami menggunakan <strong>Deep Learning</strong> untuk memproses beribu data transaksi setiap saat, membolehkan &quot;Commander&quot; melihat peratusan RTP secara visual.
                </p>
              </div>
            </div>

            {/* ARTICLE 2: CARA GUNA */}
            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-4 tracking-widest uppercase italic">Prosedur Network Scanning</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">01</div>
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1 uppercase">Validasi ID</h3>
                    <p className="text-[12px] text-white/40 leading-relaxed">Masukkan ID Mega888 anda. Sistem akan melakukan validasi rangkaian untuk memastikan sambungan selamat.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">02</div>
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1 uppercase">Analisis Hash</h3>
                    <p className="text-[12px] text-white/40 leading-relaxed">Pilih game dan tekan <strong>SCAN</strong>. AI akan memulakan proses dekripsi hash server untuk mendapatkan data RTP.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">03</div>
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1 uppercase">Interpretasi Data</h3>
                    <p className="text-[12px] text-white/40 leading-relaxed">Rujuk pada log status: <strong>HOT</strong> (90%+), <strong>HIGH</strong> (80%+). Gunakan maklumat ini sebagai panduan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ARTICLE 3: SECURITY */}
            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-3 tracking-widest uppercase italic">Keselamatan & Integriti</h2>
              <p className="text-[13px] leading-relaxed text-white/50">
                Sistem <strong>TipsMega AI</strong> mengamalkan polisi privasi yang ketat. Kami tidak menyimpan kata laluan anda. Proses scanning hanyalah bersifat analitik luaran.
              </p>
            </div>

          </section>

          {/* FAQ SECTION - SEO Enhancement with Schema Markup */}
          <div className="mt-6">
            <FAQSection />
          </div>

          {/* FOOTER KEYWORDS */}
          <div className="mt-8 px-4 text-center">
            <p className="text-[9px] text-white/20 leading-loose uppercase tracking-[0.2em] font-mono">
              System version 2.4.0 • AI Core Online<br />
              TipsMega Analytics © 2024
            </p>
          </div>

        </div>
      </div>
      <BottomNav />
    </div >
    </>
  );
}