"use client";

import { useEffect, useMemo, useState } from "react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

type Company = {
  id?: string;
  name: string;
  link?: string;
  caption?: string;
  status?: string;
  mediaType?: "photo" | "video" | string;
  storageUrl?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";
const API_URL = `${API_BASE}/api/companies`;
const WHATSAPP_NUMBER = "60108691034";
const WHATSAPP_TEXT = "Hi admin, saya nak minta link register untuk platform ini: ";

function normalizeUrl(url?: string) {
  if (!url) return "";
  const t = url.trim();
  if (!t) return "";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return `https://${t.replace(/^\/+/, "")}`;
}

function openNewTab(url: string) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function TrustedClient() {
  const { playSound, triggerHaptic } = useGlobalSettings();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const list = useMemo(
    () => (companies || []).filter((c) => (c.status || "").toUpperCase() !== "HIDDEN"),
    [companies]
  );

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const arr = Array.isArray(json?.companies) ? json.companies : Array.isArray(json) ? json : [];
      setCompanies(arr);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAction = (url: string) => {
    playSound("click");
    triggerHaptic(50);
    openNewTab(url);
  };

  return (
    <section className="mt-8">
      {err && (
        <div className="card p-6 border-red-500/20 bg-red-500/5 mb-6 text-center animate-in fade-in zoom-in">
          <div className="text-2xl mb-2 emoji-glow-red">⚠️</div>
          <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4">Connection Failed</p>
          <button
            onClick={fetchCompanies}
            className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-red-500/40 transition-all active:scale-95"
          >
            RETRY CONNECTION
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-premium rounded-xl h-[160px]" />
          ))
        ) : list.length === 0 && !err ? (
          <div className="col-span-3 text-center py-20 opacity-40">
            <div className="text-4xl mb-4 grayscale">📭</div>
            <p className="text-[10px] font-bold tracking-widest uppercase">No Partners Listed</p>
          </div>
        ) : (
          list.map((c, idx) => {
            const url = normalizeUrl(c.link);
            const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_TEXT}${c.name}`)}`;
            const badges: Array<{ icon: string; text: string; color: string }> = [];
            if (idx === 0) badges.push({ icon: "🔥", text: "TRENDING", color: "bg-red-500/90" });
            else if (idx === 1) badges.push({ icon: "⚡", text: "FAST", color: "bg-red-500/90" });
            else if (c.caption) badges.push({ icon: "🎁", text: "BONUS", color: "bg-purple-500/90" });

            const rating = idx === 0 ? 5.0 : 4.5 + ((idx % 4) * 0.1);
            const stars = Math.round(rating);

            return (
              <article
                key={c.id || idx}
                className="group relative bg-[#151c27] border border-white/10 rounded-xl shadow-lg transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,217,255,0.16)] hover:-translate-y-1 active:scale-95"
              >
                {badges.length > 0 && (
                  <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1 max-w-[80%]">
                    {badges.map((badge, i) => (
                      <span
                        key={i}
                        className={`${badge.color} text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap`}
                      >
                        {badge.icon} {badge.text}
                      </span>
                    ))}
                  </div>
                )}

                <div className="h-44 w-full bg-black relative overflow-hidden">
                  {c.storageUrl ? (
                    (() => {
                      const isVideo =
                        c.mediaType?.toLowerCase() === "video" ||
                        c.storageUrl.match(/\.(mp4|webm|mov|avi|mkv|m4v|flv)$/i);

                      const mediaUrl = c.storageUrl.startsWith("http")
                        ? c.storageUrl
                        : `${API_BASE.replace(/\/$/, "")}${c.storageUrl.startsWith("/") ? "" : "/"}${c.storageUrl}`;

                      return isVideo ? (
                        <video
                          data-src={mediaUrl}
                          ref={(el) => {
                            if (!el) return;
                            const observer = new IntersectionObserver(
                              (entries) => {
                                const nextSrc = el.dataset.src;
                                if (entries[0]?.isIntersecting && nextSrc) {
                                  el.src = nextSrc;
                                  observer.disconnect();
                                }
                              },
                              { threshold: 0.1 }
                            );
                            observer.observe(el);
                          }}
                          title={`${c.name} - Trusted Mega888 Platform Video | Verified Agent ${new Date().getFullYear()}`}
                          aria-label={`${c.name} promotional video - Verified Mega888 gaming platform`}
                          preload="metadata"
                          className="w-full h-full object-cover object-center transition-opacity hover:opacity-90"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={mediaUrl}
                          alt={`${c.name} - Trusted Mega888 Agent Logo | Verified Platform ${new Date().getFullYear()}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-opacity"
                        />
                      );
                    })()
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/mega888.webp"
                      alt="Mega888 Default Logo | Verified Gaming Platform"
                      loading="lazy"
                      className="w-full h-full object-cover opacity-50"
                    />
                  )}
                </div>

                <div className="p-3 flex flex-col items-center text-center">
                  <div className="w-full space-y-2">
                    <h2 className="text-[14px] font-black italic text-white uppercase tracking-wide truncate w-full">
                      {c.name}
                    </h2>

                    <div className="flex items-center justify-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-[10px] ${i < stars ? "text-red-400 emoji-glow-gold" : "text-white/20"}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-white/50 text-[10px] font-mono">({rating.toFixed(1)})</span>
                    </div>

                    {c.caption && (
                      <div className="min-h-[28px] flex items-center justify-center">
                        <p className="text-[12px] font-bold text-red-400 leading-tight px-1"><span className="emoji-glow-gold">🎁</span> {c.caption}</p>
                      </div>
                    )}

                    <div className="w-full">
                      {url ? (
                        <button
                          onClick={() => handleAction(url)}
                          className="w-full bg-gradient-to-r from-red-600 to-red-600 border border-white/10 text-white font-bold text-[12px] uppercase py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-red-500/40 active:scale-95 transition-all duration-200"
                        >
                          <span className="emoji-glow-static">🚀</span> PLAY NOW
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(waHref)}
                          className="w-full bg-white/5 border border-white/10 text-white/70 font-bold text-[12px] uppercase py-2 rounded-xl active:scale-95"
                        >
                          <span className="emoji-glow-green">📱</span> GET LINK
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
