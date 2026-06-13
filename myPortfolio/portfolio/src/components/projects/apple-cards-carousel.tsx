'use client';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconBrandGithub,
  IconExternalLink
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CardData = {
  src: string;
  title: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const CarouselContext = createContext<{
  currentIndex: number;
}>({
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
}: {
  items: React.ReactNode[];
  initialScroll?: number;
}) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const getScrollDistance = () => {
    // Card w-72 (288px) + gap-6 (24px)
    const cardWidth = 288;
    const gap = 24;
    return (cardWidth + gap) * (window.innerWidth < 768 ? 1 : 2);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -getScrollDistance(),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: getScrollDistance(),
        behavior: 'smooth',
      });
    }
  };

  return (
    <CarouselContext.Provider value={{ currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              'absolute right-0 z-[10] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
            )}
          ></div>

          <div
            className={cn(
              'flex flex-row justify-start gap-6',
              'mx-auto max-w-7xl px-4 md:px-8'
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: 'easeOut' as const,
                  },
                }}
                key={'card' + index}
                className="rounded-3xl shrink-0"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2 md:mr-20">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 disabled:opacity-50 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 disabled:opacity-50 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
}: {
  card: CardData;
  index: number;
}) => {
  return (
    <div
      className="relative z-10 flex h-[400px] w-72 md:w-80 flex-col overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10 group transition duration-300 hover:shadow-xl"
    >
      <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-black/80 via-black/20 to-black/80 group-hover:via-black/40 transition-all duration-500" />

      {/* Title section at the top */}
      <div className="relative z-40 p-5">
        <h3 className="text-left font-sans text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">
          {card.title}
        </h3>
      </div>

      {/* Buttons anchored to the bottom */}
      <div className="relative z-40 mt-auto p-6 flex items-center justify-between gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
        {card.githubUrl && (
          <a
            href={card.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 px-3 py-2 text-sm font-medium text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <IconBrandGithub size={16} />
            View Code
          </a>
        )}
        {card.liveUrl && (
          <a
            href={card.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md border border-white/10 px-3 py-2 text-sm font-medium text-white transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] transform hover:scale-105 active:scale-95"
          >
            <IconExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>

      <BlurImage
        src={card.src}
        alt={card.title}
        fill
        className="absolute inset-0 z-10 object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        'transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  );
};
