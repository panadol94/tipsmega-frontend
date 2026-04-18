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

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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

  const items: { key: NavKey; label: string; href: string; icon: React.FC<{ className?: string }>; external?: boolean }[] = [
    { key: "home", label: "Home", href: "/", icon: HomeIcon },
    { key: "trusted", label: "Trusted", href: "/trusted", icon: TrustedIcon },
    { key: "hub", label: "Hub", href: "/mega888", icon: HubIcon },
    { key: "chat", label: "Komuniti", href: "https://masuk10.com/Prospinner", icon: WhatsappIcon, external: true },
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

          const isKomuniti = it.key === "chat";

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

              {/* Subtle pulse glow for Komuniti tab - only when not active */}
              {isKomuniti && !isActive && !isDisabled && (
                <>
                  {/* Breathing glow background */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-green-400/10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.95, 1.02, 0.95],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ borderRadius: 12 }}
                  />
                  {/* Subtle shimmer effect */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden rounded-xl"
                    style={{ borderRadius: 12 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </>
              )}

              <div className="relative z-20 flex flex-col items-center gap-1">
                <div className="relative">
                  <it.icon
                    className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-white scale-110 drop-shadow-md" : isKomuniti ? "text-emerald-300 hover:text-emerald-200" : "text-white/40 hover:text-white/70"
                      }`}
                  />
                  {/* Small pulsing dot indicator for Komuniti */}
                  {isKomuniti && !isActive && !isDisabled && (
                    <motion.span
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        boxShadow: "0 0 6px rgba(52, 211, 153, 0.6)",
                      }}
                    />
                  )}
                </div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? "text-white/90 translate-y-0" : isKomuniti ? "text-emerald-200/80 translate-y-0.5" : "text-white/30 translate-y-0.5"
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