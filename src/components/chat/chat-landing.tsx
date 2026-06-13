'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Award, Code, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  hasReachedLimit?: boolean;
}

interface SuggestedQuestion {
  icon: React.ReactNode;
  text: string;
}

const ChatLanding: React.FC<ChatLandingProps> = ({
  submitQuery,
  hasReachedLimit = false,
}) => {
  // Suggested questions that the user can click on
  const suggestedQuestions: SuggestedQuestion[] = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      text: 'Who are you?',
    },
    {
      icon: <Code className="h-4 w-4" />,
      text: 'What projects have you worked on?',
    },
    {
      icon: <Award className="h-4 w-4" />,
      text: 'What are your skills?',
    },
    {
      icon: <Mail className="h-4 w-4" />,
      text: 'How can I contact you?',
    },
  ];

  // Animation variants for staggered animation
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
      transition: {
        duration: 0.4,
        ease: 'easeOut' as any,
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">How can I help you today?</h2>
        <p className="text-muted-foreground">Ask me anything about Ronit's experience, skills, or projects.</p>
      </motion.div>

      <div className="mb-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestedQuestions.map((q, i) => (
          <motion.button
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => submitQuery(q.text)}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent"
            disabled={hasReachedLimit}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {q.icon}
            </div>
            <span className="text-sm font-medium">{q.text}</span>
          </motion.button>
        ))}
      </div>

      <motion.div variants={itemVariants}>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-xl active:scale-95"
        >
          <ArrowUpRight className="h-5 w-5" />
          Download My Resume
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
