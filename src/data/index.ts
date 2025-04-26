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
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return '';
  }
  
  // Server should use absolute URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return `http://localhost:${process.env.PORT || 3000}`;
};

export const getAllDecks = async (): Promise<FlashcardDeck[]> => {
  if (decksCache) {
    return decksCache;
  }

  try {
    const response = await fetch(`${getBaseUrl()}/api/decks`, {
      next: { revalidate: 60 } // Revalidate every minute
    });

    if (!response.ok) {
      throw new Error('Failed to fetch decks');
    }

    const decks = await response.json();
    decksCache = decks;
    return decks;
  } catch (error) {
    console.error('Error fetching decks:', error);
    return [];
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