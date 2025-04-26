'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryById } from '@/data/categories';
import Flashcard from '@/components/Flashcard';
import GameStats from '@/components/GameStats';
import { GameProvider } from '@/context/GameContext';
import { getDecksByCategory } from '@/data';
import { Flashcard as FlashcardType } from '@/types/flashcard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Force dynamic rendering for development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const decks = await getDecksByCategory(params.category);

  if (!decks.length) {
    notFound();
  }

  return (
    <main className="min-h-screen space-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-white hover:text-indigo-200 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Categories</span>
          </Link>
          <h1 className="text-4xl font-bold text-white text-center capitalize">
            {params.category}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
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
    </main>
  );
} 