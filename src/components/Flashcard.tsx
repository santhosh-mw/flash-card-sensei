'use client';

import { useState, useEffect } from 'react';
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

  // Add effect to handle automatic advancement
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isRevealed) {
      timeoutId = setTimeout(() => {
        handleNext();
      }, 1500); // Wait 1.5 seconds before advancing
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRevealed]);

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
        ? 'bg-jedi-blue text-starwars-yellow lightsaber-glow'
        : 'bg-black/30 text-starwars-light hover:bg-black/40 force-hover';
    }

    if (option === card.correctAnswer) {
      return 'bg-black/30 text-starwars-light answer-correct';
    }

    if (selectedOption === option && option !== card.correctAnswer) {
      return 'bg-black/30 text-starwars-light answer-wrong';
    }

    return 'bg-black/30 text-starwars-light opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="star-wars-card hologram"
    >
      <div className="mb-8">
        <motion.h2 
          className="text-2xl font-bold text-starwars-yellow star-wars-text mb-4"
          animate={{ textShadow: ['0 0 10px rgba(255,232,31,0.5)', '0 0 20px rgba(255,232,31,0.8)', '0 0 10px rgba(255,232,31,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Question
        </motion.h2>
        <p className="text-xl text-starwars-light">{card.question}</p>
      </div>

      <div className="space-y-4 mb-8">
        {card.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`w-full p-4 rounded-xl transition-all duration-300 ${getOptionStyle(option)}`}
            disabled={isRevealed}
            whileHover={{ scale: isRevealed ? 1 : 1.02, x: isRevealed ? 0 : 5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between">
        {onPrevious && (
          <motion.button
            onClick={handlePrevious}
            className="star-wars-button"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
        )}
        <motion.button
          onClick={handleNext}
          disabled={!selectedOption}
          className="hidden star-wars-button disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: !selectedOption ? 1 : 1.05, x: 5 }}
          whileTap={{ scale: !selectedOption ? 1 : 0.95 }}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
} 