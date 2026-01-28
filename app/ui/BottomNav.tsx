"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Inline Icons (Lucide Style) ---
const HomeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TrustedIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const ProfileIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

type NavKey = "home" | "trusted" | "chat" | "share" | "profile" | "info";

export default function BottomNav({ isBusy }: { isBusy?: boolean }) {
  const pathname = usePathname();

  const items: { key: NavKey; label: string; href: string; icon: React.FC<{ className?: string }> }[] = [
    { key: "home", label: "Home", href: "/", icon: HomeIcon },
    { key: "trusted", label: "Trusted", href: "/trusted", icon: TrustedIcon },
    { key: "chat", label: "Chat", href: "/chat", icon: ChatIcon },
    { key: "share", label: "Share", href: "/share", icon: ShareIcon },
    { key: "info", label: "Info", href: "/info", icon: InfoIcon },
    { key: "profile", label: "Profile", href: "/profile", icon: ProfileIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pb-4 px-4 pointer-events-none">
      {/* 
            Gempak Container: 
            - Floating (pb-4)
            - Glassmorphism (backdrop-blur-xl) 
            - Border Glow 
            */}
      <div className="pointer-events-auto bg-[#0f162a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden ring-1 ring-white/5 mx-auto max-w-md w-full justify-between">

        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent pointer-events-none" />

        {items.map((it) => {
          let isActive = false;
          if (it.href === "/") isActive = pathname === "/";
          else isActive = pathname.startsWith(it.href);

          return (
            <Link
              key={it.key}
              href={isBusy ? "#" : it.href}
              className={`relative z-10 flex-1 flex flex-col items-center justify-center py-2 px-1 transition-all duration-300 ${isBusy ? "opacity-40 grayscale pointer-events-none" : ""
                }`}
              onClick={(e) => isBusy && e.preventDefault()}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-blob"
                  className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{ borderRadius: 12 }}
                />
              )}

              <div className="relative z-20 flex flex-col items-center gap-1">
                <it.icon
                  className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-white scale-110 drop-shadow-md" : "text-white/40 hover:text-white/70"
                    }`}
                />
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? "text-white/90 translate-y-0" : "text-white/30 translate-y-0.5"
                    }`}
                >
                  {it.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}