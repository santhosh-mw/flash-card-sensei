import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export default function Panda() {
  const { gameState } = useGame();

  const getPandaState = () => {
    if (gameState.lastAnswerCorrect === null) return 'neutral';
    if (gameState.lastAnswerCorrect) {
      if (gameState.streak >= 3) return 'excited';
      return 'happy';
    }
    return 'sad';
  };

  const pandaState = getPandaState();

  return (
    <div className="relative w-64 h-64">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Body with Gradient and Shadow */}
        <div className="absolute w-56 h-56 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
          {/* Inner Shadow for Depth */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-gray-300 opacity-20" />
          
          {/* Ears with Gradient and Shadow */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-b from-gray-800 to-black rounded-full shadow-md">
            <div className="absolute top-2 left-2 w-8 h-8 bg-gray-700 rounded-full" />
          </div>
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-b from-gray-800 to-black rounded-full shadow-md">
            <div className="absolute top-2 right-2 w-8 h-8 bg-gray-700 rounded-full" />
          </div>
          
          {/* Eyes with Depth */}
          <div className="absolute top-16 left-10 w-10 h-10 bg-black rounded-full shadow-lg">
            <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full" />
            <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full" />
            <motion.div
              className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"
              animate={{
                scale: pandaState === 'excited' ? [1, 1.2, 1] : 1,
                y: pandaState === 'sad' ? 2 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="absolute top-16 right-10 w-10 h-10 bg-black rounded-full shadow-lg">
            <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" />
            <motion.div
              className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"
              animate={{
                scale: pandaState === 'excited' ? [1, 1.2, 1] : 1,
                y: pandaState === 'sad' ? 2 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Nose with Gradient */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-gray-800 to-black rounded-full shadow-md" />
          
          {/* Mouth with Expression */}
          <motion.div
            className="absolute top-32 left-1/2 transform -translate-x-1/2 w-20 h-10"
            animate={{
              scaleY: pandaState === 'happy' ? 0.5 : pandaState === 'sad' ? 1.5 : 1,
              rotate: pandaState === 'happy' ? 0 : pandaState === 'sad' ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full border-b-4 border-black rounded-full" />
          </motion.div>

          {/* Cheeks with Gradient and Animation */}
          <motion.div
            className="absolute top-28 left-6 w-8 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full opacity-50"
            animate={{
              scale: pandaState === 'happy' ? [1, 1.2, 1] : 1,
              opacity: pandaState === 'happy' ? 0.7 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-28 right-6 w-8 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full opacity-50"
            animate={{
              scale: pandaState === 'happy' ? [1, 1.2, 1] : 1,
              opacity: pandaState === 'happy' ? 0.7 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Cookie with Gradient and Shadow */}
        {gameState.lastAnswerCorrect && (
          <motion.div
            className="absolute top-36 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full shadow-md"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-600 rounded-full" />
          </motion.div>
        )}

        {/* Streak Effect with Gradient Glow */}
        {gameState.streak >= 3 && (
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full opacity-20" />
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl"
              animate={{ y: [-10, 0, -10] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🥋
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 