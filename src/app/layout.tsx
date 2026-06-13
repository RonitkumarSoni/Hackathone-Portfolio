import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Load Inter font for non-Apple devices
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ronit Soni | Full Stack MERN Developer & AI Enthusiast',
  description:
    'Full Stack Developer specializing in MERN, Next.js, and AI-powered web applications. Explore 13+ live projects, 18 certifications, and an interactive AI chat assistant. Open to collaboration and opportunities.',
  keywords: [
    'Ronit Soni',
    'Full Stack Developer',
    'MERN Stack',
    'Next.js Developer',
    'React Developer',
    'AI Portfolio',
    'Web Developer India',
    'Node.js',
    'TypeScript',
    'Tailwind CSS',
    'AWS Certified',
    'Frontend Developer',
    'Backend Developer',
    'Gemini AI',
    'Interactive Portfolio',
  ],
  authors: [
    {
      name: 'Ronit Soni',
      url: 'https://ronitsoni-dev.vercel.app',
    },
  ],
  creator: 'Ronit Soni',
  metadataBase: new URL('https://ronitsoni-dev.vercel.app'),
  verification: {
    google: '5aa7024bc3a1fec1',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ronitsoni-dev.vercel.app',
    title: 'Ronit Soni | Full Stack MERN Developer',
    description:
      'Full Stack Developer with 13+ projects, 18 certifications, and an AI-powered interactive portfolio. Skilled in React, Next.js, Node.js, and cloud technologies.',
    siteName: 'Ronit Soni — Developer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronit Soni | Full Stack MERN Developer',
    description:
      'Explore an AI-powered developer portfolio with live projects, certifications, and an interactive chat assistant built with Gemini AI.',
    creator: '@RonitkumarSoni',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.svg?v=2',
    apple: '/apple-touch-icon.svg?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" />

      </head>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          inter.variable
        )}
        suppressHydrationWarning
      >
        <main className="flex min-h-screen flex-col">{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
