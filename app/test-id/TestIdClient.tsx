"use client";

import Link from "next/link";
import { CheckCircle2, ShieldCheck, Gamepad2, AlertTriangle, ArrowRight, Star } from "lucide-react";
import ClientLayout from "../ClientLayout";

export default function TestIdClient() {
  const testIds = [
    { username: "test1000", status: "KOSONG" },
    { username: "test1500", status: "DIGUNAKAN" },
    { username: "test2000", status: "KOSONG" },
    { username: "test3333", status: "DIGUNAKAN" },
    { username: "test4500", status: "KOSONG" },
    { username: "test8888", status: "KOSONG" },
    { username: "test9999", status: "DIGUNAKAN" },
  ];

  return (
    <ClientLayout showBottomNav={true}>
      <main className="min-h-screen bg-black text-white relative flex flex-col items-center pb-24">
        {/* Particle/Gradient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[150px]" />
        </div>

        {/* Header Block */}
        <section className="relative z-10 w-full max-w-4xl px-4 pt-8 pb-4 mt-8 flex flex-col items-center flex-grow text-center">
          <div className="inline-flex items-center space-x-2 bg-red-950/40 border border-red-500/30 px-3 py-1 rounded-full mb-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            <Gamepad2 className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-100">Official Demo Server 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-400">
              Test ID Mega888
            </span>{" "}
            <br className="md:hidden" />
            Percuma 2026
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Dapatkan pengalaman penuh Mega888 tanpa deposit! Gunakan akaun demo rasmi untuk mencuba sistem <strong>RTP Scanner AI</strong> kami secara percuma.
          </p>

          {/* Test ID Live Allocation Card */}
          <div className="w-full relative p-[1px] rounded-2xl bg-gradient-to-b from-red-500/30 to-black mb-8 shadow-2xl">
            <div className="bg-zinc-950/90 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/5">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Live Allocation Test ID
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                {/* ID List Table */}
                <div className="bg-black/50 border border-red-900/30 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-red-950/50 border-b border-red-900/30 text-red-200">
                        <th className="px-4 py-3 font-semibold text-left">Username (Pilih Satu)</th>
                        <th className="px-4 py-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testIds.map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-mono text-gray-200">{item.username}</td>
                          <td className="px-4 py-3 text-right">
                            {item.status === "KOSONG" ? (
                              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">AVAILABLE</span>
                            ) : (
                              <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">IN USE</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-xs text-center p-2 text-gray-500 italic border-t border-white/5">
                    *Username lain dari test1000 hingga test9999 juga boleh dicuba.
                  </div>
                </div>

                {/* Password Box */}
                <div className="flex flex-col gap-4">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-6 flex flex-col items-center justify-center text-center flex-1">
                    <p className="text-gray-400 text-sm mb-2">Password Untuk Semua Test ID:</p>
                    <div className="w-full bg-black border border-white/10 rounded-lg py-3 font-mono text-2xl tracking-widest text-indigo-300 font-bold">
                      Aa1234
                    </div>
                  </div>
                  <div className="bg-yellow-950/30 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-200/80">
                      <strong>Amaran Keras:</strong> Wang dalam Test ID adalah kredit virtual semata-mata. Semua kemenangan dan Jackpot dari akaun test <strong>TIDAK BOLEH DICUCI</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Trap CTA */}
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-zinc-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-3">
                  Sudah Pandai Guna Scanner?
                </h3>
                <p className="text-gray-300 mb-8 max-w-xl">
                  Test ID hanya membuang masa jika anda mula pecah cip Mega888. Gunakan kepakaran anda daftar ID sebenar dan mula cuci kemenangan sebenar <strong>seratus peratus dijamin bayar</strong>.
                </p>
                
                <Link
                  href="/trusted"
                  className="w-full md:w-auto relative inline-flex h-16 items-center justify-center px-8 py-3 overflow-hidden font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl shadow-2xl hover:scale-[1.02] transition-transform duration-300 active:scale-95"
                >
                  <div className="absolute inset-x-0 h-[2px] top-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="flex items-center gap-2 text-lg">
                    Daftar Original Agent Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500"/> RM5 Minimum Deposit</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500"/> Auto Cuci 2 Minit</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/> Dipercayai 120,000+ Ahli</span>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </ClientLayout>
  );
}
