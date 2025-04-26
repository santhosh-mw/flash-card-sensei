import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Flashcard from './Flashcard';

interface FlashcardType {
  question: string;
  options: string[];
  correctAnswer: string;
}

const CARD_TYPES = [
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'true-false', label: 'True/False' },
  { value: 'fill-blank', label: 'Fill in the Blank' },
];
const DIFFICULTIES = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];
const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
];
const CATEGORIES = [
  { value: '', label: 'Any Subject' },
  { value: 'geography', label: 'Geography' },
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' },
  { value: 'math', label: 'Math' },
  { value: 'literature', label: 'Literature' },
];

export default function PromptFlashcardGenerator() {
  const [prompt, setPrompt] = useState('');
  const [numCards, setNumCards] = useState(5);
  const [cardType, setCardType] = useState('multiple-choice');
  const [difficulty, setDifficulty] = useState('easy');
  const [language, setLanguage] = useState('english');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        prompt,
        numCards: String(numCards),
        cardType,
        difficulty,
        language,
        category,
      });
      router.push(`/ai-deck?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-black/40 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-starwars-yellow font-bold text-lg">
          Generate Flashcards with AI
        </label>
        <input
          type="text"
          className="star-wars-input"
          placeholder="Enter a topic or prompt (e.g. 'World Capitals')"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
        />
        <div className="flex items-center gap-2">
          <label className="text-starwars-light">Number of cards:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={numCards}
            onChange={e => setNumCards(Number(e.target.value))}
            className="star-wars-input w-20"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-starwars-light block mb-1">Card Type:</label>
            <select className="star-wars-input" value={cardType} onChange={e => setCardType(e.target.value)}>
              {CARD_TYPES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-starwars-light block mb-1">Difficulty:</label>
            <select className="star-wars-input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              {DIFFICULTIES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-starwars-light block mb-1">Language:</label>
            <select className="star-wars-input" value={language} onChange={e => setLanguage(e.target.value)}>
              {LANGUAGES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-starwars-light block mb-1">Category:</label>
            <select className="star-wars-input" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="star-wars-button w-fit self-end"
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
} 