"use client";

import Link from "next/link";

type NavKey = "home" | "trusted" | "share" | "info" | "profile";

export default function BottomNav({
  active,
  isBusy,
}: {
  active: NavKey;
  isBusy?: boolean;
}) {
  const items: { key: NavKey; label: string; href: string }[] = [
    { key: "home", label: "Home", href: "/" },
    { key: "trusted", label: "Trusted", href: "/trusted" },
    { key: "share", label: "Share", href: "/share" },
    { key: "info", label: "Info", href: "/info" },
    { key: "profile", label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
      <div className="nav-row">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <Link
              key={it.key}
              href={isBusy ? "#" : it.href} // Block href if busy
              className={`nav-btn ${isActive ? "active btn-red-spin" : ""} ${isBusy ? "opacity-40 grayscale pointer-events-none" : ""}`}
              prefetch={false}
              onClick={(e) => {
                if (isBusy) {
                  e.preventDefault();
                }
              }}
            >
              <span className={isActive ? "btn-red-spin-content" : ""}>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}