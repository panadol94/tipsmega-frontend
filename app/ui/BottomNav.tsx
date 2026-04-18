"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

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

  const items: {
    key: NavKey;
    label: string;
    href: string;
    icon: React.FC<{ className?: string }>;
    external?: boolean;
    accent: string;
  }[] = [
    { key: "home", label: "Home", href: "/", icon: HomeIcon, accent: "from-slate-500/20 to-white/5" },
    { key: "trusted", label: "Trusted", href: "/trusted", icon: TrustedIcon, accent: "from-red-500/20 to-orange-400/10" },
    { key: "hub", label: "Hub", href: "/mega888", icon: HubIcon, accent: "from-violet-500/20 to-fuchsia-400/10" },
    { key: "chat", label: "Komuniti", href: "https://masuk10.com/Prospinner", icon: WhatsappIcon, external: true, accent: "from-emerald-500/30 to-green-400/15" },
    { key: "share", label: "Share", href: "/share", icon: ShareIcon, accent: "from-sky-500/20 to-cyan-400/10" },
    { key: "profile", label: "Profile", href: "/profile", icon: ProfileIcon, accent: "from-amber-500/20 to-yellow-300/10" },
  ];

  const isDisabled = isBusy || scanActive;

  return (
    <nav className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto relative mx-auto grid w-full max-w-md grid-cols-6 gap-1 rounded-[24px] border border-white/10 bg-[rgba(8,12,24,0.92)] p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-300/30 to-transparent" />

        {items.map((it) => {
          const isActive = it.href === "/" ? pathname === "/" : !it.external && pathname.startsWith(it.href);
          const isKomuniti = it.key === "chat";

          return (
            <Link
              key={it.key}
              href={isDisabled ? "#" : it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noreferrer" : undefined}
              className={`group relative flex min-h-[62px] flex-col items-center justify-center gap-1 overflow-hidden rounded-[18px] px-1 py-2 transition-all duration-200 ${
                isDisabled ? "pointer-events-none opacity-40 grayscale" : "active:scale-[0.98]"
              }`}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${it.accent} ${isActive ? "opacity-100" : isKomuniti ? "opacity-90" : "opacity-0"}`} />

              {isActive && (
                <motion.div
                  layoutId="nav-blob"
                  className="absolute inset-0 rounded-[18px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,95,95,0.92),rgba(220,38,38,0.82))] shadow-[0_10px_24px_rgba(255,77,77,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {!isActive && (
                <div className="absolute inset-0 rounded-[18px] border border-transparent transition-all duration-200 group-hover:border-white/10 group-hover:bg-white/[0.04]" />
              )}

              {isKomuniti && !isActive && !isDisabled && (
                <motion.div
                  className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-emerald-500/20 to-green-400/8"
                  animate={{ opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
                      : isKomuniti
                        ? "bg-emerald-400/12"
                        : "bg-white/[0.03] group-hover:bg-white/[0.07]"
                  }`}
                >
                  <it.icon
                    className={`h-[18px] w-[18px] transition-all duration-200 ${
                      isActive
                        ? "scale-110 text-white"
                        : isKomuniti
                          ? "text-emerald-200"
                          : "text-white/55 group-hover:text-white/80"
                    }`}
                  />
                  {isKomuniti && !isActive && !isDisabled && (
                    <motion.span
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>

                <span
                  className={`text-[9px] font-extrabold uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive ? "text-white" : isKomuniti ? "text-emerald-200/90" : "text-white/38 group-hover:text-white/65"
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
