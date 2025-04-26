import { Flashcard } from '@/types/flashcard';

export const pythonBasics: Flashcard[] = [
  {
    id: 1,
    question: 'What is the output of: type(None)?',
    options: ['NoneType', 'null', 'undefined', 'void'],
    correctAnswer: 'NoneType',
    language: 'Python',
  },
  {
    id: 2,
    question: 'Which method is used to add an item to a list?',
    options: ['append()', 'push()', 'add()', 'insert()'],
    correctAnswer: 'append()',
    language: 'Python',
  },
  {
    id: 3,
    question: 'What is a list comprehension used for?',
    options: [
      'Creating a new list based on existing iterables',
      'Sorting a list in place',
      'Removing items from a list',
      'Combining two lists'
    ],
    correctAnswer: 'Creating a new list based on existing iterables',
    language: 'Python',
  },
  {
    id: 4,
    question: 'What does the "self" parameter represent in a class method?',
    options: [
      'The instance of the class',
      'The class itself',
      'The parent class',
      'The method name'
    ],
    correctAnswer: 'The instance of the class',
    language: 'Python',
  },
  {
    id: 5,
    question: 'Which keyword is used for defining a function?',
    options: ['def', 'function', 'fun', 'define'],
    correctAnswer: 'def',
    language: 'Python',
  },
]; 