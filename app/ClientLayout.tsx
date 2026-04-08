"use client";

import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";
import VisitorTracker from "./ui/VisitorTracker";

export default function ClientLayout({
  children,
  showBottomNav = true,
}: {
  children: React.ReactNode;
  showBottomNav?: boolean;
}) {
  return (
    <GlobalSettingsProvider>
      {children}
      {showBottomNav && <VisitorTracker />}
    </GlobalSettingsProvider>
  );
}
