"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

type NavKey = "home" | "trusted" | "share" | "chat" | "profile";

export default function BottomNav({
  isBusy,
}: {
  isBusy?: boolean;
}) {
  const pathname = usePathname();
  const { toggleChat, isChatOpen } = useGlobalSettings();

  const items: { key: NavKey; label: string; href: string }[] = [
    { key: "home", label: "Home", href: "/" },
    { key: "trusted", label: "Trusted", href: "/trusted" },
    { key: "chat", label: "Chat", href: "#" }, // Chat triggers toggle
    { key: "share", label: "Share", href: "/share" },
    { key: "profile", label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
      <div className="nav-row">
        {items.map((it) => {
          const isChat = it.key === "chat";

          let isActive = false;
          if (isChat) {
            isActive = isChatOpen;
          } else {
            // Exact match for home, startsWith for others
            if (it.href === "/") isActive = pathname === "/";
            else isActive = pathname.startsWith(it.href);
          }

          return (
            <Link
              key={it.key}
              href={isBusy || isChat ? "#" : it.href} // Block href if busy or chat
              className={`nav-btn ${isActive ? "active btn-red-spin" : ""} ${isBusy ? "opacity-40 grayscale pointer-events-none" : ""}`}
              prefetch={false}
              onClick={(e) => {
                if (isBusy) {
                  e.preventDefault();
                  return;
                }
                if (isChat) {
                  e.preventDefault();
                  // Toggle: Open if closed, Close if open
                  toggleChat();
                } else {
                  // If we are clicking another tab, close chat if it's open
                  if (isChatOpen) toggleChat(false);
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