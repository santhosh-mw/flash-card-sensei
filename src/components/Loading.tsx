'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="w-48">
        <div className="lightsaber-progress" />
      </div>
      <motion.div
        className="text-starwars-yellow star-wars-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Channeling the Force...
      </motion.div>
    </div>
  );
} 