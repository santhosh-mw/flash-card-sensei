# Project Spec: LinguaFlash - Next.js Language Learning Flashcard App

**Objective:** Build a slick, interactive flashcard web application using Next.js for language learning. The core experience revolves around presenting a word or sentence (the question) and allowing the user to select the correct translation/meaning from multiple choices, with smooth animations enhancing the user experience.

**Vibe:** Clean, modern, intuitive, and slightly playful with animations. Focus on a smooth user flow for learning.

---

## 1. Core Features

1.  **Flashcard Display:**
    * Show one flashcard at a time.
    * Each card has a "Question" area displaying a word or sentence in the target language.
    * Below the question, display multiple-choice options (e.g., 3-4) for the translation/meaning in the user's native language (or vice-versa).
    * Ensure only one option is the correct answer.
    * Randomize the display order of the multiple-choice options each time a card is shown.

2.  **Interaction:**
    * Users click/tap on one of the multiple-choice options to select their answer.
    * Provide immediate visual feedback upon selection (e.g., highlight selected option).
    * Include a "Reveal Answer" button or interaction. Clicking this should:
        * Clearly indicate the correct answer (e.g., green highlight/border).
        * If the user selected an incorrect answer, show that too (e.g., red highlight/border on their choice).
        * Prevent further selections on the current card after revealing.

3.  **Navigation:**
    * Implement "Next" and (optionally) "Previous" buttons to navigate through the flashcard deck.
    * Ensure smooth transitions between cards.

4.  **Animation:** This is key for the vibe!
    * **Card Transition:** Animate the transition when moving from one card to the next (e.g., slide, fade, carousel-like).
    * **Reveal Animation:** Implement a "good animation" when the answer is revealed. A card flip effect (`react-card-flip` or custom CSS/Framer Motion) showing the question on the front and the answer/feedback on the back would be ideal.
    * **Feedback Animation:** Subtle animation on selecting an option and on revealing the correct/incorrect status (e.g., slight scale-up/down, color transition).

5.  **Data:**
    * For initial development, use a hardcoded JSON array of flashcard objects directly within the frontend code.
    * Define a clear structure for the flashcard data (see Data Structure section).

---

## 2. Technology Stack

* **Framework:** Next.js (App Router preferred)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Configure for easy styling)
* **Animation:** Framer Motion (Recommended for smooth React animations) or CSS Animations.
* **State Management:** React `useState`, `useContext` (Sufficient for this scope)

---

## 3. Data Structure

Define a TypeScript interface for the flashcard data. Example:

```typescript
interface Flashcard {
  id: number; // Unique identifier
  question: string; // Word or sentence in the target language
  options: string[]; // Array of possible answers (translations/meanings)
  correctAnswer: string; // The correct string from the 'options' array
  language?: string; // Optional: specify language (e.g., 'Spanish', 'French')
}

// Example Data (Hardcoded for initial build)
const flashcards: Flashcard[] = [
  { id: 1, question: 'Hola', options: ['Hello', 'Goodbye', 'Thank you', 'Yes'], correctAnswer: 'Hello', language: 'Spanish' },
  { id: 2, question: 'Merci', options: ['Please', 'Excuse me', 'Thank you', 'Sorry'], correctAnswer: 'Thank you', language: 'French' },
  { id: 3, question: 'お願いします (Onegaishimasu)', options: ['Good morning', 'Please / Requesting favour', 'Delicious', 'Where is it?'], correctAnswer: 'Please / Requesting favour', language: 'Japanese' },
  // Add more cards...
];