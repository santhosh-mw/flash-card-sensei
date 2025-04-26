import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Flashcard from './Flashcard';

interface FlashcardType {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function PromptFlashcardGenerator() {
  const [prompt, setPrompt] = useState('');
  const [numCards, setNumCards] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Optionally, you can validate prompt or do a test fetch here
      // But for now, just redirect
      router.push(`/ai-deck?prompt=${encodeURIComponent(prompt)}&numCards=${numCards}`);
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