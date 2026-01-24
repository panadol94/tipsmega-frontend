"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavKey = "home" | "trusted" | "share" | "chat" | "profile";

export default function BottomNav({
  isBusy,
}: {
  isBusy?: boolean;
}) {
  const pathname = usePathname();

  const items: { key: NavKey; label: string; href: string }[] = [
    { key: "home", label: "Home", href: "/" },
    { key: "trusted", label: "Trusted", href: "/trusted" },
    { key: "chat", label: "Chat", href: "/chat" },
    { key: "share", label: "Share", href: "/share" },
    { key: "profile", label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
      <div className="nav-row">
        {items.map((it) => {
          let isActive = false;
          // Exact match for home, startsWith for others
          if (it.href === "/") isActive = pathname === "/";
          else isActive = pathname.startsWith(it.href);

          return (
            <Link
              key={it.key}
              href={isBusy ? "#" : it.href}
              className={`nav-btn ${isActive ? "active" : ""} ${isBusy ? "opacity-40 grayscale pointer-events-none" : ""}`}
              prefetch={false}
              onClick={(e) => {
                if (isBusy) {
                  e.preventDefault();
                  return;
                }
              }}
            >
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}