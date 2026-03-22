"use client";

import Link from "next/link";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type Props = {
  slug: string;
  title: string;
};

function trackEvent(eventName: string, params: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export default function BlogEngagement({ slug, title }: Props) {
  useEffect(() => {
    trackEvent("blog_article_view", {
      article_slug: slug,
      article_title: title,
      page_path: window.location.pathname,
    });

    const milestones = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const percent = Math.round((window.scrollY / maxScroll) * 100);
      [50, 75].forEach((target) => {
        if (percent >= target && !milestones.has(target)) {
          milestones.add(target);
          trackEvent("blog_scroll_depth", {
            article_slug: slug,
            depth_percent: target,
          });
        }
      });
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a,button") as HTMLElement | null;
      if (!el) return;

      const trackLabel = el.getAttribute("data-track");
      if (trackLabel) {
        trackEvent("blog_cta_click", {
          article_slug: slug,
          cta_label: trackLabel,
        });
      }

      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") || "";
        if (!href) return;
        const isExternal = href.startsWith("http") && !href.includes("tipsmega888.com");
        if (isExternal) {
          trackEvent("blog_outbound_click", {
            article_slug: slug,
            target_url: href,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [slug, title]);

  return (
    <div
      style={{
        position: "fixed",
        right: 14,
        bottom: 16,
        zIndex: 40,
      }}
    >
      <Link
        href="/"
        data-track="sticky_scan_rtp"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderRadius: 999,
          background: "linear-gradient(135deg, #059669, #10b981)",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: "0.85rem",
          textDecoration: "none",
          boxShadow: "0 8px 30px rgba(16,185,129,0.35)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        ⚡ AI Scanner
      </Link>
    </div>
  );
}
