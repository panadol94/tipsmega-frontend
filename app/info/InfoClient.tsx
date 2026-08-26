"use client";


import FAQSection from "../ui/FAQSection";

export default function InfoClient() {
  return (
    <>
      <div className="app-wrap min-h-screen bg-[#07090f]">
        <div className="app-shell pb-24">
          <header className="card relative overflow-hidden p-6 bg-[#0c1224] border-white/15">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 w-8 bg-red-500 rounded-full" />
                <span className="text-[10px] font-black tracking-[0.2em] text-red-400 uppercase">Panduan Scanner</span>
              </div>
              <h1 className="h1 italic leading-tight text-white">
                Cara Guna <span className="text-premium">AI Scanner</span>
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/60 font-medium max-w-xl">
                Halaman ini menerangkan secara ringkas apa yang scanner buat, cara baca keputusan RTP, dan perkara penting yang perlu difahami sebelum anda guna semakan di TipsMega888.
              </p>
            </div>
          </header>

          <section className="space-y-4 mt-4">
            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-3 tracking-widest uppercase italic">Apa fungsi scanner ini?</h2>
              <div className="text-[13px] leading-relaxed text-white/60 space-y-3">
                <p>
                  AI Scanner di TipsMega888 memproses data dan signal semasa secara real-time untuk membantu pengguna membandingkan bacaan RTP setiap game dengan lebih teratur.
                </p>
                <p>
                  Ia tidak mempunyai akses kepada RNG, pelayan atau rekod pusingan operator Mega888. Ia bukan alat untuk menggodam sistem dan bukan ramalan atau jaminan untuk menang.
                </p>
              </div>
            </div>

            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-4 tracking-widest uppercase italic">Cara guna</h2>
              <div className="space-y-4 text-[13px] text-white/60 leading-relaxed">
                <div>
                  <h3 className="text-xs font-bold text-white mb-1 uppercase">1. Masukkan ID</h3>
                  <p>Masukkan Mega ID anda pada ruang yang disediakan di homepage scanner.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-1 uppercase">2. Jalankan scan</h3>
                  <p>Tekan butang scan dan tunggu sistem memproses bacaan semasa.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-1 uppercase">3. Baca keputusan</h3>
                  <p>Lihat bacaan AI real-time yang dipaparkan dan gunakan ia untuk membandingkan game, bukan sebagai jaminan keputusan pusingan seterusnya.</p>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-3 tracking-widest uppercase italic">Cara baca keputusan RTP</h2>
              <div className="text-[13px] leading-relaxed text-white/60 space-y-3">
                <p>
                  RTP sebenar ialah ukuran pulangan teori dalam jangka panjang. Ia tidak menerangkan peluang menang untuk satu sesi dan tidak semestinya berubah mengikut waktu atau jumlah pemain.
                </p>
                <p>
                  Bacaan pada scanner ini ialah output analisis AI real-time berdasarkan data dan signal semasa yang diproses oleh sistem TipsMega888. Ia bukan keputusan rasmi operator atau audit bebas.
                </p>
              </div>
            </div>

            <div className="card p-6 bg-slate-900/80 border-amber-400/20">
              <h2 className="text-xs font-black text-amber-300 mb-3 tracking-widest uppercase italic">Metodologi &amp; limitasi data</h2>
              <div className="text-[13px] leading-relaxed text-white/60 space-y-3">
                <p>
                  Sistem TipsMega888 memproses data semasa, signal platform dan parameter setiap game melalui enjin AI untuk menghasilkan bacaan yang dikemas kini secara real-time.
                </p>
                <p>
                  TipsMega888 tidak mendakwa mempunyai sambungan terus kepada algoritma permainan, sejarah pertaruhan pengguna atau keputusan RNG. Untuk RTP rasmi, rujuk maklumat yang diterbitkan oleh pembangun atau operator game.
                </p>
                <p>
                  Tarikh semakan metodologi terakhir: 26 Ogos 2026. Perubahan besar pada cara pengiraan akan diterangkan pada halaman ini.
                </p>
              </div>
            </div>

            <div className="card p-6 bg-slate-900/80 border-white/5">
              <h2 className="text-xs font-black text-white/90 mb-3 tracking-widest uppercase italic">Perkara penting yang perlu tahu</h2>
              <div className="text-[13px] leading-relaxed text-white/60 space-y-3">
                <p>
                  Scanner ini tidak meminta kata laluan anda. Jika ada pihak meminta maklumat login penuh, anggap itu sebagai amaran dan jangan teruskan.
                </p>
                <p>
                  TipsMega888 menyediakan scanner sebagai alat rujukan kandungan dan bacaan semasa. Penggunaan akhir, pemilihan platform, dan keputusan bermain tetap di bawah pertimbangan pengguna sendiri.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-6">
            <FAQSection />
          </div>
        </div>
      </div>

    </>
  );
}
