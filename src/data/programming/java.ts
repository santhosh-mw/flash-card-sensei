import { Flashcard } from '@/types/flashcard';

export const javaBasics: Flashcard[] = [
  {
    id: 1,
    question: 'What is the difference between "==" and ".equals()" in Java?',
    options: [
      '== compares references, .equals() compares content',
      '== compares content, .equals() compares references',
      'They are exactly the same',
      'Neither compares content'
    ],
    correctAnswer: '== compares references, .equals() compares content',
    language: 'Java',
  },
  {
    id: 2,
    question: 'What is the purpose of the "final" keyword?',
    options: [
      'To make a variable unchangeable',
      'To end a program',
      'To define the last method',
      'To terminate a loop'
    ],
    correctAnswer: 'To make a variable unchangeable',
    language: 'Java',
  },
  {
    id: 3,
    question: 'What is the parent class of all classes in Java?',
    options: ['Object', 'Main', 'Parent', 'Super'],
    correctAnswer: 'Object',
    language: 'Java',
  },
  {
    id: 4,
    question: 'What is a static method?',
    options: [
      'A method that belongs to the class rather than instance',
      'A method that cannot be changed',
      'A method that runs slowly',
      'A method without parameters'
    ],
    correctAnswer: 'A method that belongs to the class rather than instance',
    language: 'Java',
  },
  {
    id: 5,
    question: 'What is the purpose of the "this" keyword?',
    options: [
      'To refer to the current instance',
      'To call a method',
      'To create a new object',
      'To access static members'
    ],
    correctAnswer: 'To refer to the current instance',
    language: 'Java',
  },
]; 