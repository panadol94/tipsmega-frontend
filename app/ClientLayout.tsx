"use client";

import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";
import VisitorTracker from "./ui/VisitorTracker";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalSettingsProvider>
      {children}
      <VisitorTracker />
    </GlobalSettingsProvider>
  );
}
