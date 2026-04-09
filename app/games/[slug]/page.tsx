import Link from "next/link";
import { GAME_PAGES, getGameBySlug } from "../../data/gamePages";
import { notFound } from "next/navigation";
import GameDetailClient from "./GameDetailClient";

export async function generateStaticParams() {
  return GAME_PAGES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const title = `${game.name} Mega888: RTP ${game.rtpMin}%-${game.rtpMax}%, Tips & Strategi 2026`;
  const description = `${game.name} Mega888 — RTP ${game.rtpMin}% hingga ${game.rtpMax}%. Tips menang, analisis volatiliti ${game.volatility}, dan strategi untuk game ${game.name}. Guna AI Scanner untuk check RTP live.`;
  return {
    title,
    description,
    keywords: [
      `${game.name.toLowerCase()} mega888`,
      `mega888 ${game.name.toLowerCase()}`,
      `${game.name.toLowerCase()} rtp`,
      `tips ${game.name.toLowerCase()}`,
      `${game.name.toLowerCase()} slot`,
      "mega888", "rtp mega888", "tips mega888",
    ],
    alternates: { canonical: `https://tipsmega888.com/games/${game.slug}` },
    openGraph: {
      title, description,
      url: `https://tipsmega888.com/games/${game.slug}`,
      siteName: "TipsMega AI Scanner",
      locale: "ms_MY",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return notFound();

  return <GameDetailClient game={game} />;
}
