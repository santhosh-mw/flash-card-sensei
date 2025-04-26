'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export default function GameStats() {
  const { gameState } = useGame();
  const { score, streak, correctAnswers, totalAnswered, achievements, lastAnswerCorrect } = gameState;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-500">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-500">
            {streak}
            {streak > 0 && <span className="ml-1">🔥</span>}
          </div>
          <div className="text-sm text-gray-600">Streak</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-500">
            {totalAnswered > 0
              ? Math.round((correctAnswers / totalAnswered) * 100)
              : 0}
            %
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Achievements</h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg text-center transition-all ${
                achievement.unlocked
                  ? 'bg-yellow-50 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="font-medium text-sm">
                {achievement.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Feedback */}
      <AnimatePresence>
        {lastAnswerCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-4 p-4 rounded-xl text-center font-medium ${
              lastAnswerCorrect
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {lastAnswerCorrect ? '🎉 Correct!' : '😔 Try again!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 