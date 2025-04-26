'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllDecks } from '@/data';
import { FlashcardDeck } from '@/data';
import PromptFlashcardGenerator from '@/components/PromptFlashcardGenerator';

// Force dynamic rendering for development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await getAllDecks();
        setDecks(fetchedDecks);
        setError(null);
      } catch (err) {
        console.error('Error fetching decks:', err);
        setError('Failed to load flashcard decks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const categories = Array.from(new Set(decks.map(deck => deck.category)));

  return (
    <main className="min-h-screen space-background p-8">
      <div className="max-w-6xl mx-auto">
        <PromptFlashcardGenerator />
        {loading ? (
          <div className="text-center text-white">
            <p>Loading flashcard decks...</p>
          </div>
        ) : error ? (
          <div className="text-center text-white">
            <p>{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-white">
            <p>No flashcard decks found. Please add some flashcards to get started!</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {decks
                  .filter((deck) => deck.category === category)
                  .map((deck) => (
                    <Link
                      key={deck.id}
                      href={`/deck/${deck.id}`}
                      className="star-wars-card force-hover"
                    >
                      <h3 className="text-xl font-semibold text-starwars-yellow mb-2">
                        {deck.title}
                      </h3>
                      <p className="text-starwars-light">{deck.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-starwars-light">
                          {deck.cards.length} cards
                        </span>
                        <span className="px-3 py-1 bg-black/30 text-starwars-yellow rounded-full text-sm border border-starwars-yellow">
                          {deck.language}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
