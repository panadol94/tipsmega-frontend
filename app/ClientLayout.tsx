"use client";

import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalSettingsProvider>{children}</GlobalSettingsProvider>;
}
