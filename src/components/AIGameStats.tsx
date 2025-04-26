import React from 'react';

interface AIGameStatsProps {
  score: number;
  correctAnswers: number;
  totalAnswered: number;
}

export default function AIGameStats({ score, correctAnswers, totalAnswered }: AIGameStatsProps) {
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="star-wars-card">
          <div className="text-2xl font-bold text-starwars-yellow">{score}</div>
          <div className="text-sm text-starwars-light">Score</div>
        </div>
        <div className="star-wars-card">
          <div className="text-2xl font-bold text-jedi-gold">{correctAnswers}</div>
          <div className="text-sm text-starwars-light">Correct</div>
        </div>
        <div className="star-wars-card">
          <div className="text-2xl font-bold text-jedi-green">{accuracy}%</div>
          <div className="text-sm text-starwars-light">Accuracy</div>
        </div>
      </div>
    </div>
  );
} 