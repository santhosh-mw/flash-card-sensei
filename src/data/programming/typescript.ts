import { Flashcard } from '@/types/flashcard';

export const typescriptBasics: Flashcard[] = [
  {
    id: 1,
    question: 'What is the purpose of the "interface" keyword in TypeScript?',
    options: [
      'To define a contract for object structure',
      'To create a new class',
      'To import modules',
      'To define a function'
    ],
    correctAnswer: 'To define a contract for object structure',
    language: 'TypeScript',
  },
  {
    id: 2,
    question: 'What does the "?" symbol mean in a type definition?',
    options: [
      'Optional property',
      'Required property',
      'Nullable type',
      'Union type'
    ],
    correctAnswer: 'Optional property',
    language: 'TypeScript',
  },
  {
    id: 3,
    question: 'What is the type of: const x = [1, "hello"]?',
    options: [
      '(number | string)[]',
      'Array<any>',
      '[number, string]',
      'object[]'
    ],
    correctAnswer: '[number, string]',
    language: 'TypeScript',
  },
  {
    id: 4,
    question: 'What is a generic type in TypeScript?',
    options: [
      'A type that can work with multiple data types',
      'A type that only works with numbers',
      'A type for global variables',
      'A type for functions only'
    ],
    correctAnswer: 'A type that can work with multiple data types',
    language: 'TypeScript',
  },
  {
    id: 5,
    question: 'What is the "as" keyword used for?',
    options: [
      'Type assertion',
      'Type definition',
      'Type alias',
      'Type conversion'
    ],
    correctAnswer: 'Type assertion',
    language: 'TypeScript',
  },
]; 