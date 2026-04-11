"use client";

import { useEffect, useMemo, useState, useRef } from "react";
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

// ================================
// LAZY VIDEO COMPONENT (intersection observer)
// ================================
function LazyVideo({
  mediaUrl,
  title,
  poster,
}: {
  mediaUrl: string;
  title: string;
  poster: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px", threshold: 0.01 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="premium-media">
      {isVisible ? (
        <video
          src={mediaUrl}
          title={title}
          preload="metadata"
          className="premium-media"
          muted
          playsInline
          poster={poster}
          onCanPlay={(e) => {
            const v = e.currentTarget;
            v.muted = true;
            v.defaultMuted = true;
            v.playsInline = true;
          }}
          onClick={() => { try { e.currentTarget.play(); } catch {} }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={title} loading="lazy" className="premium-media" />
      )}
    </div>
  );
}

// ================================
// PREMIUM ANIMATED COUNTER
// ================================
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

// ================================
// PREMIUM TRUST METER BAR
// ================================
function TrustMeterBar({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const gradientColors = [
    "rgba(255,77,77,0.9)",
    "rgba(255,102,102,0.95)",
    "rgba(255,51,51,1)",
    "rgba(220,38,38,1)",
  ];

  return (
    <div className="trust-meter-item">
      <div className="trust-meter-header">
        <span className="trust-meter-label">{label}</span>
        <span className="trust-meter-value">{value}%</span>
      </div>
      <div className="trust-meter-track">
        <div
          className="trust-meter-fill"
          style={{
            width: filled ? `${value}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
          }}
        >
          <div className="trust-meter-shine" />
        </div>
      </div>
    </div>
  );
}

// ================================
// COMPACT PLAY NOW BUTTON
// ================================
function PlayNowButton({ hasLink, url, waHref, onClick }: {
  hasLink: boolean;
  url: string;
  waHref: string;
  onClick: (url: string) => void;
}) {
  const targetUrl = hasLink ? url : waHref;

  return (
    <div className="premium-play-cta-wrap">
      <button
        type="button"
        onClick={() => onClick(targetUrl)}
        className="premium-play-btn"
        aria-label="Play now"
      >
        <span className="premium-play-btn-edge" />
        <span className="premium-play-btn-glow" />
        <span className="premium-play-btn-shine" />
        <span className="premium-play-btn-label">Play Now</span>
      </button>
      <span className="premium-play-btn-helper">Tap here to register</span>
    </div>
  );
}
// ================================
// SOCIAL PROOF NOTIFICATION
// ================================
type SocialProofItem = {
  id: number;
  name: string;
  amount: string;
  game: string;
  time: string;
};

const SOCIAL_PROOF_POOL: Omit<SocialProofItem, "id">[] = [
  { name: "Ahmad R.", amount: "RM 2,340", game: "Fortune Dragon", time: " baru sekarang" },
  { name: "Syazwana M.", amount: "RM 8,920", game: "Ocean Princess", time: " baru sekarang" },
  { name: "Chen W.L.", amount: "RM 1,500", game: "Gates of Olympus", time: " baru sekarang" },
  { name: "Nurul H.", amount: "RM 4,200", game: "Sweet Bonanza", time: " baru sekarang" },
  { name: "Rajesh K.", amount: "RM 3,750", game: "Wild West Gold", time: " baru sekarang" },
  { name: "Siti A.", amount: "RM 6,100", game: "Aztec Gems", time: " baru sekarang" },
  { name: "Tan K.M.", amount: "RM 1,280", game: "Fire Joker", time: " baru sekarang" },
  { name: "Farah D.", amount: "RM 9,400", game: "Great Rhino", time: " baru sekarang" },
];

function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<SocialProofItem | null>(null);
  const queueRef = useRef<SocialProofItem[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const showNext = () => {
    if (queueRef.current.length === 0) {
      setVisible(false);
      return;
    }
    const next = queueRef.current.shift()!;
    setCurrent(next);
    setVisible(true);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(showNext, 800);
    }, 4000);
  };

  useEffect(() => {
    queueRef.current = SOCIAL_PROOF_POOL.map((item, i) => ({ ...item, id: i }));
    // Shuffle
    for (let i = queueRef.current.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queueRef.current[i], queueRef.current[j]] = [queueRef.current[j], queueRef.current[i]];
    }
    const initialDelay = setTimeout(showNext, 2000);
    return () => clearTimeout(initialDelay);
  }, []);

  if (!current) return null;

  return (
    <div className={`social-proof-toast ${visible ? "social-proof-visible" : "social-proof-hidden"}`}>
      <div className="social-proof-icon">🎉</div>
      <div className="social-proof-content">
        <div className="social-proof-name">{current.name}</div>
        <div className="social-proof-text">Win <span className="social-proof-amount">{current.amount}</span></div>
        <div className="social-proof-game">{current.game}{current.time}</div>
      </div>
    </div>
  );
}

// ================================
// PREMIUM HEADER SECTION
// ================================
function PremiumTrustHeader({ totalCompanies }: { totalCompanies: number }) {
  return (
    <div className="premium-trust-header">
      <div className="premium-header-bg" />
      
      <div className="premium-stats-row">
        <div className="premium-stat-card">
          <div className="premium-stat-value">
            <AnimatedCounter target={totalCompanies} duration={1500} />
          </div>
          <div className="premium-stat-label">Trusted Platforms</div>
        </div>
        <div className="premium-stat-card">
          <div className="premium-stat-value winner-counter">
            <AnimatedCounter target={12847} duration={2500} />
            <span className="winner-suffix">+</span>
          </div>
          <div className="premium-stat-label">Winners This Month</div>
        </div>
        <div className="premium-stat-card">
          <div className="premium-stat-value">
            <AnimatedCounter target={99} duration={1200} />
            <span className="winner-suffix">%</span>
          </div>
          <div className="premium-stat-label">Trust Score</div>
        </div>
      </div>

      <div className="trust-meters-section">
        <TrustMeterBar label="Platform Verification" value={97} delay={200} />
        <TrustMeterBar label="Withdrawal Speed" value={94} delay={400} />
        <TrustMeterBar label="Customer Support" value={96} delay={600} />
        <TrustMeterBar label="User Satisfaction" value={98} delay={800} />
      </div>
    </div>
  );
}

// ================================
// MAIN TRUSTED CLIENT
// ================================
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

function forcePlay(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.playsInline = true;
  const p = video.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

const COMPANIES_PER_PAGE = 16;

export default function TrustedClient() {
  const { playSound, triggerHaptic } = useGlobalSettings();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [visibleCount, setVisibleCount] = useState(COMPANIES_PER_PAGE);

  const list = useMemo(
    () => (companies || []).filter((c) => (c.status || "").toUpperCase() !== "HIDDEN"),
    [companies]
  );

  const visibleList = useMemo(() => list.slice(0, visibleCount), [list, visibleCount]);
  const hasMore = visibleCount < list.length;

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

  const handleLoadMore = () => {
    playSound("click");
    triggerHaptic(50);
    setVisibleCount((prev) => Math.min(prev + COMPANIES_PER_PAGE, list.length));
  };

  return (
    <section className="premium-trust-section">
      <SocialProofToast />

      {err && (
        <div className="premium-error-card">
          <div className="premium-error-icon">⚠️</div>
          <p className="premium-error-text">Connection Failed</p>
          <button onClick={fetchCompanies} className="premium-retry-btn">
            RETRY
          </button>
        </div>
      )}

      <PremiumTrustHeader totalCompanies={list.length} />

      <div className="premium-company-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-premium premium-skeleton-card" />
          ))
        ) : list.length === 0 && !err ? (
          <div className="premium-empty-state">
            <div className="premium-empty-icon">📭</div>
            <p className="premium-empty-text">No Partners Listed</p>
          </div>
        ) : (
          visibleList.map((c, idx) => {
            const url = normalizeUrl(c.link);
            const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_TEXT}${c.name}`)}`;
            const badges: Array<{ icon: string; text: string; className: string }> = [];
            if (idx === 0) badges.push({ icon: "🔥", text: "TOP RATED", className: "premium-badge-trending" });
            else if (idx === 1) badges.push({ icon: "⚡", text: "FAST WITHDRAW", className: "premium-badge-fast" });
            else if (c.caption) badges.push({ icon: "🎁", text: "EXCLUSIVE BONUS", className: "premium-badge-bonus" });

            const rating = idx === 0 ? 5.0 : 4.5 + ((idx % 4) * 0.1);
            const stars = Math.round(rating);

            return (
              <article
                key={c.id || idx}
                className="premium-company-card"
              >
                {badges.length > 0 && (
                  <div className="premium-badge-row">
                    {badges.map((badge, i) => (
                      <span key={i} className={`premium-badge ${badge.className}`}>
                        {badge.icon} {badge.text}
                      </span>
                    ))}
                  </div>
                )}

                <div className="premium-media-container">
                  {c.storageUrl ? (
                    (() => {
                      const isVideo =
                        c.mediaType?.toLowerCase() === "video" ||
                        c.storageUrl.match(/\.(mp4|webm|mov|avi|mkv|m4v|flv)$/i);
                      const mediaUrl = c.storageUrl.startsWith("http")
                        ? c.storageUrl
                        : `${API_BASE.replace(/\/$/, "")}/${c.storageUrl.startsWith("/") ? c.storageUrl.slice(1) : c.storageUrl}`;

                      return isVideo ? (
                        <LazyVideo mediaUrl={mediaUrl} title={`${c.name} - Mega888 Platform`} poster="/mega888.webp" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={mediaUrl} alt={c.name} loading="lazy" className="premium-media" />
                      );
                    })()
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/mega888.webp" alt="Mega888" loading="lazy" className="premium-media" />
                  )}
                  <div className="premium-media-overlay" />
                </div>

                <div className="premium-card-body">
                  <h2 className="premium-company-name">{c.name}</h2>

                  <div className="premium-rating-row">
                    <div className="premium-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`premium-star ${i < stars ? "premium-star-filled" : "premium-star-empty"}`}>⭐</span>
                      ))}
                    </div>
                    <span className="premium-rating-value">({rating.toFixed(1)})</span>
                  </div>

                  {c.caption && (
                    <div className="premium-caption">
                      <span>🎁</span> {c.caption}
                    </div>
                  )}

                  <div className="premium-btn-container">
                    {url ? (
                      <PlayNowButton hasLink={true} url={url} waHref={waHref} onClick={handleAction} />
                    ) : (
                      <button onClick={() => handleAction(waHref)} className="premium-get-link-btn">
                        <span>📱</span> GET LINK
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {!loading && hasMore && (
        <div className="premium-load-more-container">
          <button
            type="button"
            onClick={handleLoadMore}
            className="premium-load-more-btn"
            aria-label="Load more companies"
          >
            <span className="premium-load-more-glow" />
            <span className="premium-load-more-shine" />
            <span className="premium-load-more-label">
              Load More
              <span className="premium-load-more-count">
                ({Math.min(visibleCount + COMPANIES_PER_PAGE, list.length)} / {list.length})
              </span>
            </span>
            <svg className="premium-load-more-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </button>
        </div>
      )}

      {/* Showing count indicator */}
      {!loading && list.length > 0 && (
        <div className="premium-showing-count">
          Showing {visibleList.length} of {list.length} trusted platforms
        </div>
      )}
    </section>
  );
}
