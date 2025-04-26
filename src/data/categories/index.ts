export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string; // Material Icons name or emoji
  path: string;
}

export const categories: Category[] = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'Master different languages through interactive flashcards',
    icon: '🌎',
    path: '/categories/languages',
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Learn programming concepts and syntax',
    icon: '💻',
    path: '/categories/programming',
  },
  {
    id: 'geography',
    title: 'Geography',
    description: 'Explore world capitals, countries, and landmarks',
    icon: '🗺️',
    path: '/categories/geography',
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
}; 