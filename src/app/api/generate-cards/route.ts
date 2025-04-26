import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // or 'nodejs' if you prefer

export async function POST(req: NextRequest) {
  const { prompt, numCards, cardType, difficulty, language, category } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  const n = typeof numCards === 'number' && numCards > 0 ? numCards : 5;
  const cardTypeText = cardType === 'true-false' ? 'true/false' : cardType === 'fill-blank' ? 'fill-in-the-blank' : 'multiple-choice';
  const difficultyText = difficulty ? `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}` : '';
  const languageText = language ? `Language: ${language.charAt(0).toUpperCase() + language.slice(1)}` : '';
  const categoryText = category ? `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}` : '';

  // Compose a prompt for OpenAI to generate flashcards
  const systemPrompt = `
You are a flashcard generator. Given a topic, generate ${n} ${cardTypeText} flashcards in JSON array format.
Each flashcard should have: question, options (array of 4 for multiple-choice, 2 for true/false, 1 for fill-in-the-blank), and correctAnswer.
${difficultyText}
${languageText}
${categoryText}
Return ONLY valid JSON, no explanation.

Example:
[
  {
    "question": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Madrid"],
    "correctAnswer": "Paris"
  }
]
Topic: ${prompt}
`;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set' }, { status: 500 });
  }

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    }),
  });

  const data = await openaiRes.json();
  const text = data.choices?.[0]?.message?.content?.trim();

  try {
    const cards = JSON.parse(text || '[]');
    return NextResponse.json({ cards });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to parse OpenAI response', raw: text }, { status: 500 });
  }
} 