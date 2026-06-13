'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export function Presentation() {
  // Personal information
  const profile = {
    name: 'Ronit Soni',
    age: '21 years old',
    location: 'India',
    description:
      "Hey 👋\nI'm Ronit, a Full Stack Developer specializing in the MERN stack. I'm passionate about building modern web applications, AI-powered tools, and responsive user interfaces.",
    longBio: "I am Ronit Soni, a Full Stack Developer from India. I enjoy building modern web applications and exploring new horizons in software engineering. Currently, I am working as a Virtual Intern at Algonive, focusing on building production-ready applications and improving my system design skills.",
    src: '/finalPortfolioImage.jpg',
    fallbackSrc:
      'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3',
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="mx-auto w-full max-w-5xl py-2 font-sans px-4 text-left">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {/* Image section */}
        <div className="relative mx-auto aspect-square w-full max-w-sm md:mx-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full overflow-hidden rounded-3xl"
          >
            <img
              src={profile.src}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text content section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight md:text-5xl">
              {profile.name}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-medium text-lg">
              <span>{profile.age}</span>
              <span className="text-neutral-300 dark:text-neutral-700 mx-1">•</span>
              <span>{profile.location}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {profile.description}
            </p>
          </motion.div>

          {/* Tags/Keywords */}
          <motion.div
            variants={itemVariants}
            className="mt-4 flex flex-wrap justify-start gap-2"
          >
            {['MERN Stack', 'Full Stack', 'React', 'Node.js'].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full px-4 py-1.5 text-sm font-semibold"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Second Bio Paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed max-w-4xl">
          {profile.longBio}
        </p>
      </motion.div>
    </div>
  );
}

export default Presentation;
