'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllDecks } from '@/data';
import { FlashcardDeck } from '@/data';

// Force dynamic rendering for development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const decks = await getAllDecks();
  const categories = Array.from(new Set(decks.map(deck => deck.category)));

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          LinguaFlash
        </h1>

        {categories.length === 0 ? (
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
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {deck.title}
                      </h3>
                      <p className="text-gray-600">{deck.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {deck.cards.length} cards
                        </span>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
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
