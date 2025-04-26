import { Flashcard } from '@/types/flashcard';

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  language: string;
  cards: Flashcard[];
  category: string;
}

let decksCache: FlashcardDeck[] | null = null;

const getBaseUrl = () => {
  // During build time, we should use the absolute URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For local development
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}`;
  }

  // Fallback to relative URL for client-side requests
  return '';
};

export const getAllDecks = async (): Promise<FlashcardDeck[]> => {
  if (decksCache) {
    return decksCache;
  }

  try {
    const response = await fetch(`${getBaseUrl()}/api/decks`, {
      next: { revalidate: 0 } // Disable caching for now to debug
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      throw new Error(error.error || 'Failed to fetch decks');
    }

    const decks = await response.json();
    
    if (!Array.isArray(decks)) {
      console.error('Invalid response format:', decks);
      throw new Error('Invalid deck data received');
    }

    decksCache = decks;
    return decks;
  } catch (error) {
    console.error('Error fetching decks:', error);
    throw error; // Let the component handle the error
  }
};

export const getDeckById = async (id: string): Promise<FlashcardDeck | undefined> => {
  const decks = await getAllDecks();
  return decks.find(deck => deck.id === id);
};

export const getRandomDeck = async (): Promise<FlashcardDeck> => {
  const decks = await getAllDecks();
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