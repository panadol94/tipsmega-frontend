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
  const title = `${game.name} Mega888 2026 | RTP, Cara Main & Tips`;
  const description = `${game.name} Mega888 dengan anggaran RTP ${game.rtpMin}% hingga ${game.rtpMax}%, penerangan volatiliti ${game.volatility}, dan panduan ringkas untuk rujukan sebelum bermain.`;
  return {
    title,
    description,
    keywords: [
      `${game.name.toLowerCase()} mega888`,
      `mega888 ${game.name.toLowerCase()}`,
      `${game.name.toLowerCase()} rtp`,
      `tips ${game.name.toLowerCase()}`,
      `${game.name.toLowerCase()} slot`,
      `cara main ${game.name.toLowerCase()}`,
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
