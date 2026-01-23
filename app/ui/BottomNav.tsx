"use client";

import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

type NavKey = "home" | "trusted" | "share" | "chat" | "profile";

export default function BottomNav({
  active,
  isBusy,
}: {
  active: NavKey;
  isBusy?: boolean;
}) {
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
          // If chat is open, mark chat as active (optional visual cue)
          // But usually we want to keep the underlying page active. 
          // Let's just highlight Chat if isOpen? 
          // The USER probably wants it to feel like a "page" or "popup". 
          // If popup, maybe don't highlight as active page, but highlight button.

          const isChat = it.key === "chat";
          const isActive = active === it.key || (isChat && isChatOpen);

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
                  toggleChat();
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