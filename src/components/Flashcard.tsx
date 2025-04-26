'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flashcard as FlashcardType } from '@/types/flashcard';

interface FlashcardProps {
  card: FlashcardType;
  onNext: (isCorrect: boolean) => void;
  onPrevious?: () => void;
}

export default function Flashcard({ card, onNext, onPrevious }: FlashcardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOptionClick = (option: string) => {
    if (isRevealed) return;
    setSelectedOption(option);
    setIsRevealed(true);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === card.correctAnswer;
    onNext(isCorrect);
    setSelectedOption(null);
    setIsRevealed(false);
  };

  const handlePrevious = () => {
    if (onPrevious) {
      setSelectedOption(null);
      setIsRevealed(false);
      onPrevious();
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isRevealed) {
      return selectedOption === option
        ? 'bg-indigo-600 text-white'
        : 'bg-white/10 text-white hover:bg-white/20';
    }

    if (option === card.correctAnswer) {
      return 'bg-green-500 text-white';
    }

    if (selectedOption === option && option !== card.correctAnswer) {
      return 'bg-red-500 text-white';
    }

    return 'bg-white/10 text-white';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Question</h2>
        <p className="text-xl text-white">{card.question}</p>
      </div>

      <div className="space-y-4 mb-8">
        {card.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`w-full p-4 rounded-xl transition-colors ${getOptionStyle(option)}`}
            disabled={isRevealed}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        {onPrevious && (
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
} 