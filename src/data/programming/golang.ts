import { Flashcard } from '@/types/flashcard';

export const golangBasics: Flashcard[] = [
  {
    id: 1,
    question: 'What is a goroutine in Go?',
    options: [
      'A lightweight thread managed by Go runtime',
      'A type of variable',
      'A loop construct',
      'An error handling mechanism'
    ],
    correctAnswer: 'A lightweight thread managed by Go runtime',
    language: 'Go',
  },
  {
    id: 2,
    question: 'What is the purpose of channels in Go?',
    options: [
      'To communicate between goroutines',
      'To define variables',
      'To handle errors',
      'To import packages'
    ],
    correctAnswer: 'To communicate between goroutines',
    language: 'Go',
  },
  {
    id: 3,
    question: 'What does the ":=" operator do in Go?',
    options: [
      'Declares and initializes a variable',
      'Compares two values',
      'Assigns a value to an existing variable',
      'Creates a constant'
    ],
    correctAnswer: 'Declares and initializes a variable',
    language: 'Go',
  },
  {
    id: 4,
    question: 'What is a slice in Go?',
    options: [
      'A dynamic array',
      'A fixed-size array',
      'A string operation',
      'A type of loop'
    ],
    correctAnswer: 'A dynamic array',
    language: 'Go',
  },
  {
    id: 5,
    question: 'What is the purpose of defer in Go?',
    options: [
      'Delays execution until surrounding function returns',
      'Stops program execution',
      'Creates a new thread',
      'Handles errors'
    ],
    correctAnswer: 'Delays execution until surrounding function returns',
    language: 'Go',
  },
]; 