'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Flashcard from '@/components/Flashcard';
import GameStats from '@/components/GameStats';
import Panda from '@/components/Panda';
import { FlashcardDeck } from '@/data';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

interface DeckContentProps {
  deck: FlashcardDeck;
}

export default function DeckContent({ deck }: DeckContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState(deck.cards);
  const [answeredCards, setAnsweredCards] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { gameState, addScore } = useGame();

  useEffect(() => {
    // Shuffle cards when the deck changes
    setShuffledCards([...deck.cards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setAnsweredCards(new Array(deck.cards.length).fill(false));
    setShowResults(false);
  }, [deck]);

  const handleNext = (isCorrect: boolean) => {
    // Add score based on correctness
    addScore(isCorrect ? 100 : 0, isCorrect);

    // Mark current card as answered
    const newAnsweredCards = [...answeredCards];
    newAnsweredCards[currentIndex] = true;
    setAnsweredCards(newAnsweredCards);

    // Check if all cards have been answered
    if (newAnsweredCards.every(answered => answered)) {
      setShowResults(true);
      return;
    }

    // Find next unanswered card
    let nextIndex = (currentIndex + 1) % shuffledCards.length;
    while (newAnsweredCards[nextIndex] && nextIndex !== currentIndex) {
      nextIndex = (nextIndex + 1) % shuffledCards.length;
    }
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    // Find previous answered card
    let prevIndex = (currentIndex - 1 + shuffledCards.length) % shuffledCards.length;
    while (!answeredCards[prevIndex] && prevIndex !== currentIndex) {
      prevIndex = (prevIndex - 1 + shuffledCards.length) % shuffledCards.length;
    }
    setCurrentIndex(prevIndex);
  };

  const handleRestartDeck = () => {
    setShuffledCards([...deck.cards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setAnsweredCards(new Array(deck.cards.length).fill(false));
    setShowResults(false);
  };

  const remainingCards = answeredCards.filter(answered => !answered).length;
  const completedCards = answeredCards.filter(answered => answered).length;
  const accuracy = gameState.totalAnswered > 0
    ? Math.round((gameState.correctAnswers / gameState.totalAnswered) * 100)
    : 0;

  return (
    <main className="min-h-screen space-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Link
                href={`/categories/${deck.id.split('-')[0]}`}
                className="text-white hover:text-indigo-200 transition-colors flex items-center gap-2"
              >
                <span>← Back to {deck.id.split('-')[0]}</span>
              </Link>
              <div className="text-white">
                {remainingCards} cards remaining
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 h-2 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${(completedCards / deck.cards.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {showResults ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  🎉 Deck Completed!
                </h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {gameState.score}
                    </div>
                    <div className="text-sm text-blue-600">Final Score</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {completedCards}
                    </div>
                    <div className="text-sm text-green-600">Cards Completed</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {accuracy}%
                    </div>
                    <div className="text-sm text-purple-600">Accuracy</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleRestartDeck}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <Link
                    href={`/categories/${deck.id.split('-')[0]}`}
                    className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Choose Another Deck
                  </Link>
                </div>
              </motion.div>
            ) : (
              <Flashcard
                card={shuffledCards[currentIndex]}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
          </div>

          {/* Side Panel */}
          <div className="lg:w-96 flex flex-col gap-8">
            <GameStats />
          </div>
        </div>
      </div>
    </main>
  );
} 