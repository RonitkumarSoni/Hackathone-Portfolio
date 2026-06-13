'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function ResumeDownloadCTA() {
  console.log('ResumeDownloadCTA rendering');
  const position = 'fixed top-8 right-6 z-[60]';

  return (
    <motion.div
      className={position + " border-2 border-red-500"}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        <motion.button
          className="cursor-pointer group flex items-center gap-2 rounded-full bg-transparent backdrop-blur-2xl px-4 py-2.5 border hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex relative h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>

          <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
            View Resume
          </span>

          <ArrowUpRight className="h-4 w-4 group-hover:translate-y-0.5 transition-transform hidden sm:block" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
