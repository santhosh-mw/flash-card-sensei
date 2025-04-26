export interface Flashcard {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  language?: string;
}

export const flashcards: Flashcard[] = [
  { 
    id: 1, 
    question: 'Hola', 
    options: ['Hello', 'Goodbye', 'Thank you', 'Yes'], 
    correctAnswer: 'Hello', 
    language: 'Spanish' 
  },
  { 
    id: 2, 
    question: 'Merci', 
    options: ['Please', 'Excuse me', 'Thank you', 'Sorry'], 
    correctAnswer: 'Thank you', 
    language: 'French' 
  },
  { 
    id: 3, 
    question: 'お願いします (Onegaishimasu)', 
    options: ['Good morning', 'Please / Requesting favour', 'Delicious', 'Where is it?'], 
    correctAnswer: 'Please / Requesting favour', 
    language: 'Japanese' 
  },
]; 