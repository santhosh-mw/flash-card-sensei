'use client';

import { useEffect, useState } from 'react';
import { getDeckById } from '@/data';
import { GameProvider } from '@/context/GameContext';
import DeckContent from './DeckContent';
import { notFound } from 'next/navigation';
import { FlashcardDeck } from '@/data';

// Force dynamic rendering for development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface DeckPageProps {
  params: {
    id: string;
  };
}

export default function DeckPage({ params }: DeckPageProps) {
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await getDeckById(params.id);
        if (!fetchedDeck) {
          notFound();
        }
        setDeck(fetchedDeck);
      } catch (err) {
        console.error('Error fetching deck:', err);
        setError('Failed to load deck. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen space-background p-8">
        <div className="max-w-6xl mx-auto text-center text-white">
          <p>Loading deck...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen space-background p-8">
        <div className="max-w-6xl mx-auto text-center text-white">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!deck) {
    return notFound();
  }

  return (
    <GameProvider>
      <DeckContent deck={deck} />
    </GameProvider>
  );
} 