'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  FileText, 
  Play, 
  MapPin, 
  Sparkles,
  Layers,
  Briefcase,
  User,
  Mail,
  Moon,
  Sun
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import FluidCursor from '@/components/FluidCursor';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardStackVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0a0a] transition-colors duration-500 font-sans`}>
      <FluidCursor />
      
      {/* Navigation Bar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 sm:gap-6 rounded-full border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl px-4 py-2.5 shadow-xl transition-all hover:bg-white/60 dark:hover:bg-black/60">
        <div className="flex items-center gap-2 pr-4 border-r border-black/10 dark:border-white/10">
          <div className="h-6 w-6 rounded-full bg-black dark:bg-white flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-white dark:text-black" />
          </div>
          <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Ronit Soni</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-6 px-4">
          <Link href="#projects" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Projects</Link>
          <Link href="#profiles" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Profiles</Link>
          <Link href="#about" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">About</Link>
          <Link href="#resume" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Resume</Link>
          <Link href="#contact" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Contact</Link>
        </div>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="ml-auto p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {isDarkMode ? <Sun className="h-4 w-4 text-neutral-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                Freelance Opportunities Welcome
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 shadow-sm">
                <MapPin className="h-3 w-3" />
                Kalol, Gujarat
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">
                Ronit Soni <br />
                <span className="text-neutral-400 dark:text-neutral-600">Portfolio</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="max-w-md text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
              <span className="font-bold text-neutral-900 dark:text-neutral-200">Web Developer.</span> MERN & JavaScript Specialist. 
              Exploring the language of 0s and 1s. Cybersecurity Enthusiast & Open Source Contributor.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="https://github.com/RonitkumarSoni" 
                target="_blank"
                className="group flex items-center gap-3 rounded-2xl bg-[#2d333b] px-6 py-3.5 text-white shadow-xl transition-all hover:scale-105 hover:bg-[#22272e] active:scale-95"
              >
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/20">
                  <Image src="https://github.com/RonitkumarSoni.png" alt="Ronit" fill className="object-cover" />
                </div>
                <span className="font-bold">See My Github</span>
              </Link>
              
              <Link 
                href="/resume.pdf" 
                target="_blank"
                className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-8 py-3.5 font-bold text-neutral-900 shadow-lg transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              >
                <FileText className="h-5 w-5" />
                Resume
              </Link>

              <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-indigo-500/25 active:scale-95">
                <Play className="h-4 w-4 fill-white" />
                Intro
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Real Project Card Stack Animation */}
          <motion.div 
            variants={cardStackVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative h-[550px] w-full">
              {/* Back Card (LMS Portal) */}
              <motion.div 
                animate={{ rotate: -8, x: -40, y: -20 }}
                whileHover={{ rotate: -5, x: -30 }}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 shadow-xl backdrop-blur-md"
              >
                <Image src="/lms-new.png" alt="LMS Portal" fill className="object-cover opacity-40" />
              </motion.div>

              {/* Middle Card (Canva Clone) */}
              <motion.div 
                animate={{ rotate: 4, x: 20, y: 10 }}
                whileHover={{ rotate: 2, x: 15 }}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md"
              >
                <Image src="/canva-new.png" alt="Canva Clone" fill className="object-cover opacity-60" />
              </motion.div>
              
              {/* Top Card (HOMIE Coffee) */}
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 0, y: -10 }}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl dark:bg-black/20"
              >
                <div className="relative h-full w-full">
                  <Image 
                    src="/homie-new.png" 
                    alt="HOMIE Coffee"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Brand Project</span>
                    </div>
                    <h3 className="text-3xl font-black text-white">HOMIE Coffee</h3>
                    <p className="text-white/60 font-medium">Pure Origin Premium Brand</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 flex flex-col gap-3"
              >
                <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-4 shadow-2xl border border-white/20">
                  <Layers className="h-6 w-6 text-indigo-500" />
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10"
              >
                <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-4 shadow-2xl border border-white/20">
                  <Sparkles className="h-6 w-6 text-amber-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
    </div>
  );
}
