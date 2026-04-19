"use client";

import Link from "next/link";
import SharedPageNav from "../../ui/SharedPageNav";
import { GAME_PAGES } from "../../data/gamePages";

interface Game {
  slug: string;
  name: string;
  icon: string;
  rtpMin: number;
  rtpMax: number;
  volatility: string;
  category: string;
  description: string;
  features: string[];
  tips: string[];
  faq: { q: string; a: string }[];
  relatedGames: string[];
}

export default function GameDetailClient({ game }: { game: Game }) {
  const volatilityColor = game.volatility === "Tinggi" ? "text-red-400" : game.volatility === "Sederhana" ? "text-yellow-400" : "text-green-400";
  const volatilityBg = game.volatility === "Tinggi" ? "bg-red-500/15" : game.volatility === "Sederhana" ? "bg-yellow-500/15" : "bg-green-500/15";
  const volatilityBorder = game.volatility === "Tinggi" ? "border-red-500/30" : game.volatility === "Sederhana" ? "border-yellow-500/30" : "border-green-500/30";

  return (
    <SharedPageNav>
      <div className="min-h-screen bg-[#07090f] text-white app-bg relative overflow-x-hidden">

        {/* Ambient Background */}
        <div className="fixed inset-0 bg-[url('/img/noise.png')] opacity-5 pointer-events-none" />
        <div className="fixed -top-32 -left-32 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed -top-32 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="app-shell mx-auto px-4 py-8 pb-32 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-white/40 mb-6 font-medium">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/games" className="hover:text-white/70 transition-colors">Games</Link>
            <span>/</span>
            <span className="text-amber-400">{game.name}</span>
          </nav>

          {/* HERO SECTION */}
          <div className="relative mb-8 rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(139,92,246,0.12) 50%, rgba(59,130,246,0.10) 100%)",
              }}
            />
            <div className="absolute inset-0 border border-white/10 rounded-2xl" />

            <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Game Icon */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-xl border border-white/10"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {game.icon}
              </div>

              {/* Game Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-4 bg-amber-400 rounded-full" />
                  <span className="text-[10px] font-black tracking-[0.25em] text-amber-400/80 uppercase">
                    MEGA888 GAME
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black italic text-white leading-tight mb-3 drop-shadow-lg">
                  {game.name}
                </h1>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-2">
                  {/* RTP Badge */}
                  <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-full">
                    <span className="text-[10px] font-black tracking-wider uppercase">RTP</span>
                    <span className="text-xs font-black">{game.rtpMin}â{game.rtpMax}%</span>
                  </div>

                  {/* Volatility Badge */}
                  <div className={`flex items-center gap-1.5 ${volatilityBg} border ${volatilityBorder} ${volatilityColor} px-3 py-1.5 rounded-full`}>
                    <span className="text-[10px] font-black tracking-wider uppercase">VOL</span>
                    <span className="text-xs font-black">{game.volatility}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-full">
                    <span className="text-[10px] font-black tracking-wider uppercase">TYPE</span>
                    <span className="text-xs font-black">{game.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="card p-5 sm:p-6 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-5 bg-red-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              <h2 className="text-sm font-black tracking-wider text-red-300 uppercase">
                About {game.name}
              </h2>
            </div>
            <p className="text-sm text-white/75 leading-relaxed font-medium">
              {game.description}
            </p>
          </section>

          {/* Features */}
          <section className="card p-5 sm:p-6 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <h2 className="text-sm font-black tracking-wider text-amber-400 uppercase">
                Key Features
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {game.features.map((f, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
                >
                  â¦ {f}
                </span>
              ))}
            </div>
          </section>

          {/* SEO Detailed Strategy Guide */}
          <section className="card p-5 sm:p-6 mb-5 border-teal-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-5 bg-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
              <h2 className="text-sm font-black tracking-wider text-teal-300 uppercase">
                Panduan & Semakan Penuh {game.name}
              </h2>
            </div>
            <div className="space-y-4 text-xs text-white/75 leading-relaxed font-medium">
              <p>
                Permainan slot <strong>{game.name}</strong> kini menjadi tumpuan ramai pemain di Malaysia yang mencari pengalaman kasino dalam talian yang menguntungkan. Dibangunkan khusus dengan kualiti grafik tinggi bertemakan <strong>{game.category}</strong>, slot ini memberikan kelainan dari segi mekanik dan cara ia membayar kemenangan. Disebabkan {game.name} direkodkan mempunyai tahap volatiliti (risiko) yang <strong>{game.volatility.toLowerCase()}</strong>, corak pembayarannya amat bersesuaian untuk strategi putaran yang memfokuskan kepada pengurusan modal (bankroll management) yang optimum sambil bersabar menanti pusingan bonus utama.
              </p>
              <p>
                Dari sudut potensi pulangan kepada pemain (RTP), <strong>{game.name}</strong> merekodkan bacaan yang sangat memberangsangkan, iaitu dari paras purata harian terendah <strong>{game.rtpMin}%</strong> sehingga memuncak ke paras tertinggi yang boleh melepasi <strong>{game.rtpMax}%</strong> pada waktu-waktu panas (hot hours). Statistik RTP Mega888 ini bukanlah satu angka statik, sebaliknya ia berfluktuasi mengikut lambakan pemain di server. Oleh itu, kami amat mengesyorkan agar anda sentiasa merujuk kepada TipsMega AI Scanner untuk mengkaji waktu dan graf RTP {game.name} yang sedang hijau sebelum membuat sebarang pusingan bet (taruhan).
              </p>
              <p>
                Tarikah utama dalam rancangan perisian {game.name} pastinya tertumpu kepada algoritma simbol dan features uniknya. Melalui tawaran ciri-ciri bonus gah seperti <strong>{game.features.join(", ")}</strong>, pemain dibukakan ruang untuk mencetuskan reaksi kombo yang melipatgandakan jumlah kemenangan. Bagi memaksimumkan peluang anda di {game.name}, petua emas yang perlu dipatuhi adalah mula bertaruh pada nilai rendah untuk membaca kestabilan papan (board) terlebih dahulu, dan gandakan taruhan hanya selepas {game.volatility.toLowerCase() === 'tinggi' ? 'anda yakin kitaran nasib mesin mula melepaskan simbol liar (wilds) bagi jackpot besar' : 'anda nampak kemenangan-kemenangan kecil yang konsisten (steady returns) menghujani pusingan anda'}.
              </p>
            </div>
          </section>

          {/* Tips */}
          <section className="card p-5 sm:p-6 mb-5 border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
              <h2 className="text-sm font-black tracking-wider text-purple-400 uppercase">
                Winning Tips
              </h2>
            </div>
            <ol className="space-y-3">
              {game.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/75 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[10px] font-black text-purple-300">
                    {i + 1}
                  </span>
                  <span className="font-medium pt-0.5">{tip}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="card p-5 sm:p-6 mb-5 border-emerald-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <h2 className="text-sm font-black tracking-wider text-emerald-400 uppercase">
                FAQ â {game.name}
              </h2>
            </div>
            <div className="space-y-4">
              {game.faq.map((f, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-xs font-bold text-amber-400 mb-1.5 uppercase tracking-wide">
                    {f.q}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Games */}
          {game.relatedGames.length > 0 && (
            <section className="card p-5 sm:p-6 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                <h2 className="text-sm font-black tracking-wider text-blue-400 uppercase">
                  Related Games
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {game.relatedGames.map((relSlug) => {
                  const rel = GAME_PAGES.find((g) => g.slug === relSlug);
                  if (!rel) return null;
                  return (
                    <Link
                      key={relSlug}
                      href={`/games/${relSlug}`}
                      className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                    >
                      <span className="text-base">{rel.icon}</span>
                      <span>{rel.name}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA Block */}
          <div
            className="rounded-2xl p-5 sm:p-6 text-center border"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(139,92,246,0.10))",
              borderColor: "rgba(245,158,11,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="text-2xl mb-2">ð¥</div>
            <p className="text-base font-black text-white mb-1">
              Scan RTP {game.name} Sekarang
            </p>
            <p className="text-xs text-white/50 mb-5 font-medium">
              Check live RTP with AI Scanner â free!
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider text-black transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                boxShadow: "0 6px 24px rgba(251,191,36,0.35)",
              }}
            >
              Buka AI Scanner â
            </Link>

            {/* Bottom nav links */}
            <div className="flex items-center justify-center gap-4 mt-6 text-xs font-medium">
              <Link href="/games" className="text-blue-400 hover:text-blue-300 transition-colors">
                â Semua Game
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/blog" className="text-amber-400 hover:text-amber-300 transition-colors">
                ð Blog Tips
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                ð  Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </SharedPageNav>
  );
}
