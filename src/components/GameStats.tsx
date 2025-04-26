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
        <motion.div 
          className="star-wars-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-starwars-yellow">{score}</div>
          <div className="text-sm text-starwars-light">Score</div>
        </motion.div>
        <motion.div 
          className="star-wars-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-jedi-gold">
            {streak}
            {streak > 0 && <span className="ml-1">⚡</span>}
          </div>
          <div className="text-sm text-starwars-light">Streak</div>
        </motion.div>
        <motion.div 
          className="star-wars-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-jedi-green">
            {totalAnswered > 0
              ? Math.round((correctAnswers / totalAnswered) * 100)
              : 0}
            %
          </div>
          <div className="text-sm text-starwars-light">Accuracy</div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div 
        className="star-wars-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-bold mb-3 text-starwars-yellow star-wars-text">Achievements</h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-3 rounded-lg text-center transition-all ${
                achievement.unlocked
                  ? 'bg-jedi-blue/30 border-2 border-starwars-yellow'
                  : 'bg-black/30 border-2 border-starwars-gray opacity-50'
              }`}
              whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="font-medium text-sm text-starwars-light">
                {achievement.title}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Answer Feedback */}
      <AnimatePresence>
        {lastAnswerCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-4 p-4 rounded-xl text-center font-medium ${
              lastAnswerCorrect
                ? 'bg-jedi-green/20 text-jedi-green border border-jedi-green'
                : 'bg-jedi-red/20 text-jedi-red border border-jedi-red'
            }`}
          >
            {lastAnswerCorrect ? '✨ The Force is strong with this one!' : '💫 Trust in the Force, try again!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 