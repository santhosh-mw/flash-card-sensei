'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  score: number;
  streak: number;
  totalAnswered: number;
  correctAnswers: number;
  lastAnswerCorrect: boolean | null;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface GameContextType {
  gameState: GameState;
  addScore: (points: number, isCorrect: boolean) => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  score: 0,
  streak: 0,
  totalAnswered: 0,
  correctAnswers: 0,
  lastAnswerCorrect: null,
  achievements: [
    {
      id: 'first_correct',
      title: 'First Step',
      description: 'Answer your first question correctly',
      unlocked: false,
    },
    {
      id: 'streak_3',
      title: 'Hot Streak',
      description: 'Get 3 correct answers in a row',
      unlocked: false,
    },
    {
      id: 'perfect_score',
      title: 'Perfect Score',
      description: 'Get all answers correct in a deck',
      unlocked: false,
    },
  ],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const addScore = (points: number, isCorrect: boolean) => {
    setGameState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCorrectAnswers = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      
      // Check achievements
      const achievements = [...prev.achievements];
      if (isCorrect && !achievements.find(a => a.id === 'first_correct')?.unlocked) {
        achievements.find(a => a.id === 'first_correct')!.unlocked = true;
      }
      if (newStreak >= 3 && !achievements.find(a => a.id === 'streak_3')?.unlocked) {
        achievements.find(a => a.id === 'streak_3')!.unlocked = true;
      }

      return {
        ...prev,
        score: prev.score + points,
        streak: newStreak,
        totalAnswered: prev.totalAnswered + 1,
        correctAnswers: newCorrectAnswers,
        lastAnswerCorrect: isCorrect,
        achievements,
      };
    });
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider value={{ gameState, addScore, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 