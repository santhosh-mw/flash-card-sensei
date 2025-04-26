import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Flashcard } from '@/types/flashcard';

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  language: string;
  cards: Flashcard[];
  category: string;
}

// Function to convert filename to deck ID
const filenameToDeckId = (filename: string): string => {
  return filename.replace(/\.ts$/, '').toLowerCase();
};

// Function to convert filename to title
const filenameToTitle = (filename: string): string => {
  return filename
    .replace(/\.ts$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to safely parse flashcards from file content
const parseFlashcards = (content: string): Flashcard[] | null => {
  try {
    // Remove any imports
    content = content.replace(/import.*?;/g, '');
    
    // Find the array in the content
    const arrayMatch = content.match(/=\s*(\[[\s\S]*?\])\s*;/);
    if (!arrayMatch) return null;
    
    // Extract just the array part
    const arrayContent = arrayMatch[1];
    
    // Use Function constructor to evaluate the array
    const fn = new Function(`return ${arrayContent}`);
    const result = fn();
    
    if (Array.isArray(result) && result.length > 0) {
      return result;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing flashcards:', error);
    return null;
  }
};

export async function GET() {
  try {
    const decks: FlashcardDeck[] = [];
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    // Get all category directories
    const categories = await fs.readdir(dataDir, { withFileTypes: true });
    const categoryDirs = categories
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => !dirent.name.startsWith('.')) // Ignore hidden directories
      .map(dirent => dirent.name);

    for (const category of categoryDirs) {
      const categoryPath = path.join(dataDir, category);
      const files = await fs.readdir(categoryPath);
      const tsFiles = files.filter(file => file.endsWith('.ts') && file !== 'index.ts');

      for (const file of tsFiles) {
        try {
          const id = filenameToDeckId(file);
          const title = filenameToTitle(file);
          
          // Read and parse the flashcard file
          const filePath = path.join(categoryPath, file);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          
          const cards = parseFlashcards(fileContent);
          if (cards) {
            decks.push({
              id: `${category}-${id}`,
              title: title,
              description: `Learn ${title}`,
              language: title.split(' ')[0], // Use first word of title as language
              cards: cards,
              category: category,
            });
          }
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
          continue;
        }
      }
    }

    if (decks.length === 0) {
      return NextResponse.json({ error: 'No decks found' }, { status: 404 });
    }

    return NextResponse.json(decks);
  } catch (error) {
    console.error('Error loading decks:', error);
    return NextResponse.json(
      { error: 'Failed to load decks', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 