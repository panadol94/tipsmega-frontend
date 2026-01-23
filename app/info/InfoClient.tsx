"use client";

import BottomNav from "../ui/BottomNav";
import Shell from "../ui/Shell";

export default function InfoClient() {
  return (
    <Shell>
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Info <span className="text-amber-200">Premium</span>
        </h1>
        <div className="text-sm text-white/60">
          Cara guna, rules, dan tips untuk pengalaman scan paling smooth.
        </div>
      </header>

      <section className="card p-4 glow">
        <div className="text-sm font-semibold">Cara guna (ringkas)</div>
        <ul className="mt-2 space-y-2 text-sm text-white/70 list-disc pl-5">
          <li>Masukkan ID Mega888 (12 digit, bermula 0/1/2).</li>
          <li>Tekan SCAN dan tunggu output terminal (mode suspense).</li>
          <li>Untuk dapat ⭐️, verify melalui Telegram (Share Contact).</li>
        </ul>
      </section>

      <section className="card p-4">
        <div className="text-sm font-semibold">FAQ</div>

        <div className="mt-3 space-y-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="font-semibold">Kenapa output lambat?</div>
            <div className="text-white/70 mt-1">
              Itu memang “suspense mode” supaya rasa decrypting & berdebar.
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="font-semibold">Macam mana nak dapat ⭐️?</div>
            <div className="text-white/70 mt-1">
              Join group → PM bot → tekan Share Contact → auto approve/approve admin.
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="font-semibold">Boleh share untuk dapat bonus?</div>
            <div className="text-white/70 mt-1">
              Ya. Bila user baru VERIFIED melalui referral anda, anda dapat ⭐️ bonus.
            </div>
          </div>
        </div>
      </section>

      <section className="card p-4">
        <div className="text-sm font-semibold">Support</div>
        <div className="mt-2 text-sm text-white/70">
          Kalau ada isu, rujuk admin dalam group Telegram.
        </div>
      </section>

      {/* ✅ penting: supaya button Info menyala gold */}
      <BottomNav />
    </Shell>
  );
}