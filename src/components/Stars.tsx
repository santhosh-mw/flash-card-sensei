'use client';

import { useEffect, useRef } from 'react';

export default function Stars() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    // Create stars
    const createStars = () => {
      const container = starsRef.current;
      if (!container) return;

      // Clear existing stars
      container.innerHTML = '';

      // Create new stars
      const numberOfStars = 100;
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle duration
        star.style.setProperty('--twinkle-duration', `${2 + Math.random() * 3}s`);
        
        container.appendChild(star);
      }
    };

    createStars();

    // Recreate stars on window resize
    const handleResize = () => {
      createStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={starsRef} className="stars" />;
} 