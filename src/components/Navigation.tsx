'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/categories';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-starwars-yellow/20">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚔️
            </motion.span>
            <span className="font-bold text-xl text-starwars-yellow star-wars-text">Flash Cards Sensei</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${pathname.startsWith(category.path)
                    ? 'bg-jedi-blue/30 text-starwars-yellow border border-starwars-yellow/50'
                    : 'text-starwars-light hover:bg-black/30 hover:text-starwars-yellow'
                  }`}
              >
                <span>{category.icon}</span>
                <span>{category.title}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-starwars-yellow hover:bg-black/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-starwars-yellow/20 bg-black/50 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-300
                    ${pathname.startsWith(category.path)
                      ? 'bg-jedi-blue/30 text-starwars-yellow border border-starwars-yellow/50'
                      : 'text-starwars-light hover:bg-black/30 hover:text-starwars-yellow'
                    }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <div>{category.title}</div>
                    <div className="text-sm text-starwars-light/70">{category.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 