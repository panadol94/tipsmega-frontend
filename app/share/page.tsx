"use client";

import { useMemo, useState, useEffect } from "react";


export default function Page() {
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState("YOURCODE");

  // Load actual ref code
  useEffect(() => {
    const local = localStorage.getItem("tipsmega_my_ref_code");
    if (local && local !== "undefined") {
      setRefCode(local);
    } else {
      // Fetch if missing
      const token = localStorage.getItem("tipsmega_token");
      if (token) {
        fetch("https://api.tipsmega888.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(r => r.json())
          .then(d => {
            if (d.ok && d.referralCode) {
              setRefCode(d.referralCode);
              localStorage.setItem("tipsmega_my_ref_code", d.referralCode);
            }
          })
          .catch(() => { });
      }
    }
  }, []);

  const link = useMemo(() => {
    return `https://www.tipsmega888.com/?ref=${refCode}`;
  }, [refCode]);



  async function onCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Manual copy required");
    }
  }

  function shareWhatsapp() {
    const text = `Mega888 RTP Scanner AI. Check this out: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function shareTelegram() {
    const text = `Mega888 RTP Scanner AI\n${link}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <>
      {/* SEO Schema for Referral Program */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Share & Earn - Mega888 AI Referral Program",
            "description": "Jemput kawan dan dapatkan FREE STARS! Referral program Mega888 AI Scanner - share link, earn rewards. Unlimited referrals, instant bonuses.",
            "url": "https://tipsmega888.com/share",
            "inLanguage": "ms-MY",
            "about": {
              "@type": "Product",
              "name": "Mega888 AI Referral Program",
              "description": "Earn 1 star for every successful friend referral",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MYR",
                "description": "Free stars for sharing"
              }
            }
          })
        }}
      />
      <div className="app-wrap min-h-screen bg-[#07090f]">
        <div className="app-shell pb-24">

          {/* HEADER: Recruitment Protocol */}
          <header className="card relative overflow-hidden p-6 mb-6 bg-[#0c1224] border-white/15">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1.5 w-8 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                <span className="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase">Agent Access</span>
              </div>
              <h1 className="h1 italic text-2xl my-1.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                RECRUITMENT <span className="text-premium">PROTOCOL</span>
              </h1>
              <p className="font-mono text-[11px] text-white/60 leading-relaxed max-w-sm">
                Jemput Komander baru ke dalam sistem. Anda akan menerima <span className="text-yellow-400 font-bold">1 STAR</span> bagi setiap pengaktifan berjaya.
              </p>
            </div>
          </header>

          {/* DATA CONTAINER */}
          <div className="card bg-slate-900/80 border-white/10 overflow-hidden relative">

            {/* Top Tech Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="p-6 flex flex-col items-center gap-6">



              {/* REFERRAL LINK BOX */}
              <div className="w-full">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2">
                  <span>Secure Uplink</span>
                  <span>Status: Active</span>
                </div>
                <div className="relative">
                  <input
                    readOnly
                    value={link}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <button
                    onClick={onCopy}
                    className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 active:scale-95 transition-all"
                  >
                    {copied ? "COPIED!" : "COPY"}
                  </button>
                </div>
              </div>

              {/* SOCIAL ACTIONS */}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button
                  onClick={shareWhatsapp}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 group transition-all"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">📱</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 group-hover:text-[#25D366]">WhatsApp</span>
                </button>
                <button
                  onClick={shareTelegram}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-[#0088cc]/20 hover:border-[#0088cc]/40 group transition-all"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">✈️</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90 group-hover:text-[#0088cc]">Telegram</span>
                </button>
              </div>

            </div>
          </div>

          {/* RULES / FOOTER */}
          {/* RULES / FOOTER */}
          <div className="mt-8 px-5 text-center">
            <div className="text-xs font-bold text-white/90 mb-2 tracking-widest uppercase opacity-80">
              Rules of Engagement
            </div>
            <p className="text-xs text-white/70 leading-loose max-w-xs mx-auto">
              1. Reward diberi selepas verifikasi.<br />
              2. Satu peranti, satu akaun sahaja.<br />
              3. Spam akan menyebabkan ban.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}