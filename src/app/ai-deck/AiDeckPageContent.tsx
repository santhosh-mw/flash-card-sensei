"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Flashcard from "@/components/Flashcard";
import AIGameStats from "@/components/AIGameStats";

interface FlashcardType {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function AiDeckPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get("prompt") || "";
  const numCards = Number(searchParams.get("numCards")) || 5;
  const cardType = searchParams.get("cardType") || 'multiple-choice';
  const difficulty = searchParams.get("difficulty") || 'easy';
  const language = searchParams.get("language") || 'english';
  const category = searchParams.get("category") || '';
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answeredCards, setAnsweredCards] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setCards([]);
    setCurrentIndex(0);
    setAnsweredCards([]);
    setShowResults(false);
    setScore(0);
    setCorrectAnswers(0);
    fetch("/api/generate-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, numCards, cardType, difficulty, language, category }),
    })
      .then((res) => res.json())
      .then((data) => {
        const cardsWithId = (data.cards || []).map((card: any, idx: number) => ({ ...card, id: idx + 1 }));
        setCards(cardsWithId);
        setAnsweredCards(new Array(cardsWithId.length).fill(false));
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [prompt, numCards, cardType, difficulty, language, category]);

  const handleNext = (isCorrect: boolean) => {
    setScore((prev) => prev + (isCorrect ? 100 : 0));
    setCorrectAnswers((prev) => prev + (isCorrect ? 1 : 0));
    const newAnswered = [...answeredCards];
    newAnswered[currentIndex] = true;
    setAnsweredCards(newAnswered);
    if (newAnswered.every((a) => a)) {
      setShowResults(true);
      return;
    }
    let nextIndex = (currentIndex + 1) % cards.length;
    while (newAnswered[nextIndex] && nextIndex !== currentIndex) {
      nextIndex = (nextIndex + 1) % cards.length;
    }
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    while (!answeredCards[prevIndex] && prevIndex !== currentIndex) {
      prevIndex = (prevIndex - 1 + cards.length) % cards.length;
    }
    setCurrentIndex(prevIndex);
  };

  const handleRestartDeck = () => {
    setCurrentIndex(0);
    setAnsweredCards(new Array(cards.length).fill(false));
    setShowResults(false);
    setScore(0);
    setCorrectAnswers(0);
  };

  const remainingCards = answeredCards.filter((a) => !a).length;
  const completedCards = answeredCards.filter((a) => a).length;
  const accuracy = completedCards > 0 ? Math.round((correctAnswers / completedCards) * 100) : 0;

  return (
    <main className="min-h-screen space-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.push("/")}
                className="text-white hover:text-indigo-200 transition-colors flex items-center gap-2"
              >
                <span>← Back to Home</span>
              </button>
              <div className="text-white">
                {remainingCards} cards remaining
              </div>
            </div>
            <div className="bg-white/20 h-2 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-white"
                style={{ width: `${(completedCards / (cards.length || 1)) * 100}%`, transition: 'width 0.3s' }}
              />
            </div>
            {loading ? (
              <div className="text-center text-white">Generating flashcards...</div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : showResults ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">🎉 Deck Completed!</h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{score}</div>
                    <div className="text-sm text-blue-600">Final Score</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">{completedCards}</div>
                    <div className="text-sm text-green-600">Cards Completed</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{accuracy}%</div>
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
                  <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Home
                  </button>
                </div>
              </div>
            ) : cards.length > 0 ? (
              <Flashcard
                card={cards[currentIndex]}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            ) : null}
          </div>
          {/* Side Panel */}
          <div className="lg:w-96 flex flex-col gap-8">
            <AIGameStats score={score} correctAnswers={correctAnswers} totalAnswered={completedCards} />
          </div>
        </div>
      </div>
    </main>
  );
} 