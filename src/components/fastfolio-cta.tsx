'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const quotes = [
  "I'm ready for impactful internships.",
  "Got an idea? Let's build it.",
  "Turning ideas into real products.",
  "Clean code. Scalable systems.",
  "Building the web, one commit at a time.",
  "Open to collaborations and innovation.",
  "From concept to production.",
  "Code. Create. Solve.",
];

export function FastfolioCTA() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const position = '';

  return (
    <motion.button
      className={`${position} cursor-pointer group flex items-center gap-2 rounded-full bg-transparent backdrop-blur-2xl  px-4 py-2.5 border hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex relative h-2.5 w-2.5 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>

      <div className="relative flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap"
          >
            {quotes[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform hidden sm:block" />
    </motion.button>
  );
}