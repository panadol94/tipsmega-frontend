"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGlobalSettings } from "../context/GlobalSettingsContext";


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

const HubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
    <path d="M12 7v10" />
    <path d="M5 9l7 4 7-4" />
  </svg>
);

type NavKey = "home" | "trusted" | "chat" | "share" | "profile" | "hub";

export default function BottomNav({ isBusy }: { isBusy?: boolean }) {
  const pathname = usePathname();
  const { scanActive } = useGlobalSettings();

  const items: { key: NavKey; label: string; href: string; icon: React.FC<{ className?: string }> }[] = [
    { key: "home", label: "Home", href: "/", icon: HomeIcon },
    { key: "trusted", label: "Trusted", href: "/trusted", icon: TrustedIcon },
    { key: "hub", label: "Hub", href: "/mega888", icon: HubIcon },
    { key: "chat", label: "Chat", href: "/chat", icon: ChatIcon },
    { key: "share", label: "Share", href: "/share", icon: ShareIcon },
    { key: "profile", label: "Profile", href: "/profile", icon: ProfileIcon },
  ];

  const isDisabled = isBusy || scanActive;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pb-4 px-4 pointer-events-none">
      {/* Premium floating glassmorphism navigation */}
      <div
        className="pointer-events-auto flex items-center p-1.5 mx-auto max-w-md w-full justify-between"
        style={{
            background: "rgba(11,16,32,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Ambient top-edge glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent pointer-events-none" />


        {items.map((it) => {
          let isActive = false;
          if (it.href === "/") isActive = pathname === "/";
          else isActive = pathname.startsWith(it.href);

          return (
            <Link
              key={it.key}
              href={isDisabled ? "#" : it.href}
              className={`relative z-10 flex-1 flex flex-col items-center justify-center py-2 px-1 transition-all duration-300 ${isDisabled ? "opacity-40 grayscale pointer-events-none" : ""
                }`}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-blob"
                  className="absolute inset-0 bg-gradient-to-tr from-red-600 to-rose-400 rounded-xl shadow-[0_0_30px_rgba(255,77,77,0.5),0_0_15px_rgba(255,77,77,0.3)]"
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