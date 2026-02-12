"use client";

import { usePathname } from "next/navigation";
import MegaLogo from "./MegaLogo";
import MatrixRain from "./MatrixRain";
import BottomNav from "./BottomNav";
import VisitorTracker from "./VisitorTracker";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Admin pages use their own layout - skip user-facing shell
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="app-bg">
      <MatrixRain />
      {/* Top Brand Header */}
      <div className="top-brand">
        <div className="top-brand-inner">
          <div className="brand-left">
            <div className="brand-logo">
              <MegaLogo />
            </div>

            <div className="brand-text">
              <div className="brand-title">MEGA888 AI</div>
              <div className="brand-sub">Tips • RTP • VIP Scanner</div>
            </div>
          </div>

          <div className="brand-chip">Premium</div>
        </div>
      </div>

      {/* Content */}
      <div className="app-wrap">
        <div className="app-shell">{children}</div>
      </div>

      {/* GLOBAL CHATROOM & NAV */}
      <BottomNav />

      {/* Visitor notification - sends alert to admin Telegram group */}
      <VisitorTracker />
    </div>
  );
}