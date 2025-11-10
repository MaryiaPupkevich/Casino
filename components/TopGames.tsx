"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getGames,
  getGamesType,
  GAMES_IMAGE_BASE,
  type Game,
} from "@/app/lib/api";

type TopGamesProps = {
  firstOfferId: number | string;
  websiteType: string;
};

function getRandomGames(games: Game[], count = 12): Game[] {
  const shuffled = [...games].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function TopGames({ firstOfferId, websiteType }: TopGamesProps) {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function loadGames() {
      if (!websiteType) return;

      const type = getGamesType(websiteType);
      const allGames = await getGames(type);
      const random12 = getRandomGames(allGames, 12);
      setGames(random12);
    }

    loadGames();
  }, [websiteType]);

  if (!games.length) return null;

  const casinoLink = `/casino/${firstOfferId}`;

  return (
    <section className="top-games-section">
        <div className="container">
      <h2 className="top-games-title">TOP GAMES</h2>

     <div className="top-games-grid">
  {games.map((game) => (
    <Link
      key={game.id}
      href={casinoLink}
      className="game-card">
      <img
        src={`${GAMES_IMAGE_BASE}${game.image}`}
        alt={game.name}
        className="game-card-image"
      />

      <div className="game-card-overlay">
        <div className="game-card-name">{game.name}</div>
         <div className="game-card-play">
        <button className="game-card-button">▶</button>
        <button className="game-card-btn-pn">Play now</button>
</div>
      </div>
    </Link>
  ))}
</div>

 <div className="top-games-all-wrapper">
      <Link href={casinoLink} className="top-games-all-button">
        ALL GAMES
      </Link>
      </div>
      </div>
    </section>
    
  );
}
