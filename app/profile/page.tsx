
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
  },
  alternates: {
    canonical: "https://tipsmega888.com/profile",
  },
};

export default function Page() {
  return <ProfileClient />;
}