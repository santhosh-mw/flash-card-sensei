import { Flashcard } from '@/types/flashcard';

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  language: string;
  cards: Flashcard[];
  category: string;
}

interface ApiResponse {
  success: boolean;
  data?: FlashcardDeck[];
  error?: string;
  details?: string;
  count?: number;
}

let decksCache: FlashcardDeck[] | null = null;

const getBaseUrl = () => {
  // For production Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For local development
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}`;
  }

  // For client-side requests in production
  return window.location.origin;
};

export const getAllDecks = async (): Promise<FlashcardDeck[]> => {
  if (decksCache) {
    return decksCache;
  }

  try {
    const response = await fetch(`${getBaseUrl()}/api/decks`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch decks');
    }

    if (!result.data) {
      return [];
    }

    decksCache = result.data;
    return result.data;
  } catch (error) {
    console.error('Error fetching decks:', error);
    return [];
  }
};

export const getDeckById = async (id: string): Promise<FlashcardDeck | undefined> => {
  const decks = await getAllDecks();
  return decks.find(deck => deck.id === id);
};

export const getRandomDeck = async (): Promise<FlashcardDeck | undefined> => {
  const decks = await getAllDecks();
  if (decks.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * decks.length);
  return decks[randomIndex];
};

export const getDecksByCategory = async (categoryId: string): Promise<FlashcardDeck[]> => {
  const decks = await getAllDecks();
  return decks.filter(deck => deck.category === categoryId);
};

// Shuffle the cards in a deck
export const shuffleDeck = (deck: FlashcardDeck): Flashcard[] => {
  return [...deck.cards].sort(() => Math.random() - 0.5);
}; 