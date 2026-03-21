import Link from "next/link";
import SharedPageNav from "../ui/SharedPageNav";

export default function HelpPage() {
    return (
        <SharedPageNav>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-emerald-300 mb-8">
                        ❓ Help & Panduan
                    </h1>

                    {/* Scanner Guide */}
                    <section className="card p-6 mb-6 border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-slate-950 rounded-3xl">
                        <h2 className="text-xl font-bold text-cyan-300 mb-4">📡 Cara Guna AI RTP Scanner</h2>
                        <ol className="space-y-3 text-white/80">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">1</span>
                                <div>
                                    <p className="font-semibold text-white">Masukkan ID Mega888 Anda</p>
                                    <p className="text-sm text-white/60">Format: 12 digit (contoh: 123456789012 atau 091234567890)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">2</span>
                                <div>
                                    <p className="font-semibold text-white">Tekan "START SCAN"</p>
                                    <p className="text-sm text-white/60">Tunggu 3-5 saat untuk analisis AI</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">3</span>
                                <div>
                                    <p className="font-semibold text-white">Lihat Keputusan RTP</p>
                                    <p className="text-sm text-white/60">Overall RTP dan senarai games dengan RTP tertinggi</p>
                                </div>
                            </li>
                        </ol>
                    </section>

                    {/* FAQ */}
                    <section className="card p-6 mb-6 border-purple-500/20 bg-purple-950/40 rounded-3xl">
                        <h2 className="text-xl font-bold text-purple-300 mb-4">❓ Soalan Lazim</h2>
                        <div className="space-y-4">
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer text-white font-semibold">
                                    Apa itu RTP?
                                    <span className="transition group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-2 text-white/70 text-sm">RTP (Return to Player) adalah peratus payout sesuatu game. Semakin tinggi RTP, semakin banyak pemain boleh menang dalam jangka panjang.</p>
                            </details>
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer text-white font-semibold">
                                    Bagaimana AI Scanner berfungsi?
                                    <span className="transition group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-2 text-white/70 text-sm">AI menganalisis pattern game dan memberikan estimation RTP berdasarkan data dari servers Mega888.</p>
                            </details>
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer text-white font-semibold">
                                    Berapa lama cooldown?
                                    <span className="transition group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-2 text-white/70 text-sm">Cooldown adalah 2 minit antara setiap scan untuk mengelakkan abuse sistem.</p>
                            </details>
                        </div>
                    </section>

                    {/* Links to other pages */}
                    <section className="grid grid-cols-2 gap-4">
                        <Link href="/disclaimer" className="card p-4 text-center border-white/10 hover:border-red-500/30 transition">
                            <div className="text-2xl mb-2">⚠️</div>
                            <div className="font-bold text-white">Disclaimer</div>
                        </Link>
                        <Link href="/privacy-policy" className="card p-4 text-center border-white/10 hover:border-blue-500/30 transition">
                            <div className="text-2xl mb-2">🔒</div>
                            <div className="font-bold text-white">Privacy Policy</div>
                        </Link>
                    </section>
                </div>
            </div>
        </SharedPageNav>
    );
}
