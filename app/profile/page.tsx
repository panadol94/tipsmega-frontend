

import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Commander Profile | Mega888 AI Tips",
  description: "Manage your TipsMega AI profile. Check stars balance, view scan history, and access VIP settings.",
  openGraph: {
    title: "Commander Profile | Mega888 AI Tips",
    description: "Manage your TipsMega AI profile. Check stars balance and scan history.",
    url: "https://tipsmega888.com/profile",
    siteName: "TipsMega AI Scanner",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mega888 AI Commander Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commander Profile | Mega888 AI Tips",
    description: "Manage your TipsMega AI profile. Check stars balance and scan history.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://tipsmega888.com/profile",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ProfileClient />;
}