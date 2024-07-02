"use client";
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import Link from 'next/link';
import styles from './game.module.css';

interface Game {
  name: string;
  image: string;
}

const GameComponent: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/api/items');
        setGames(response.data.data);
      } catch (error) {
        setError('Failed to fetch games.');
        console.error('Failed to fetch games: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Games</h1>
      <div className={styles.content__container}>
        {games.map((game) => (
          <GameCard key={game.name} game={game} />
        ))}
      </div>
    </div>
  );
};

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => (
  <Link className={styles.content} href={`/game/${game.name}`}>
    <div className={styles.gameContainer}>
      <img className={styles.gameImage} src={`/uploads/${game.image}`} alt={game.name} />
      <p className={styles.title}>{game.name.toUpperCase()}</p>
    </div>
  </Link>
);

export default GameComponent;
