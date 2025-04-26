import { getDeckById } from '@/data';
import { GameProvider } from '@/context/GameContext';
import DeckContent from './DeckContent';
import { notFound } from 'next/navigation';

// Force dynamic rendering for development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface DeckPageProps {
  params: {
    id: string;
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const deck = await getDeckById(params.id);

  if (!deck) {
    notFound();
  }

  return (
    <GameProvider>
      <DeckContent deck={deck} />
    </GameProvider>
  );
} 