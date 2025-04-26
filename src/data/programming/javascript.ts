import { Flashcard } from '@/types/flashcard';

export const javascriptBasics: Flashcard[] = [
  {
    id: 1,
    question: 'What is the result of typeof null?',
    options: ['undefined', 'object', 'null', 'number'],
    correctAnswer: 'object',
    language: 'JavaScript',
  },
  {
    id: 2,
    question: 'Which method adds an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
    language: 'JavaScript',
  },
  {
    id: 3,
    question: 'What is the output of: 2 + "2"?',
    options: ['4', '22', 'NaN', 'TypeError'],
    correctAnswer: '22',
    language: 'JavaScript',
  },
  {
    id: 4,
    question: 'Which operator is used for strict equality?',
    options: ['==', '===', '=', '!='],
    correctAnswer: '===',
    language: 'JavaScript',
  },
  {
    id: 5,
    question: 'What is a closure in JavaScript?',
    options: [
      'A function with access to variables in its outer scope',
      'A way to close a browser window',
      'A method to end a loop',
      'A type of array'
    ],
    correctAnswer: 'A function with access to variables in its outer scope',
    language: 'JavaScript',
  },
]; 