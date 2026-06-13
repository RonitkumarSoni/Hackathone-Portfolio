'use client';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import WelcomeModal from '@/components/welcome-modal';
import HelperBoost from './HelperBoost';
import { ArrowUp, CornerDownRight, Square, ArrowUpRight } from 'lucide-react';
import { FastfolioCTA } from '@/components/fastfolio-cta';

// ClientOnly component for client-side rendering
//@ts-ignore
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps {
  hasActiveTool: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isTalking: boolean;
}

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool, videoRef, isTalking }: AvatarProps) => {
      // This function will only execute on the client
      const isIOS = () => {
        // Multiple detection methods
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const maxTouchPoints = window.navigator.maxTouchPoints || 0;

        // UserAgent-based check
        const isIOSByUA =
          //@ts-ignore
          /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

        // Platform-based check
        const isIOSByPlatform = /iPad|iPhone|iPod/.test(platform);

        // iPad Pro check
        const isIPadOS =
          //@ts-ignore
          platform === 'MacIntel' && maxTouchPoints > 1 && !window.MSStream;

        // Safari check
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

        return isIOSByUA || isIOSByPlatform || isIPadOS || isSafari;
      };

      // Conditional rendering based on detection
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            {isIOS() ? (
              <img
                src="/landing-memojis.png"
                alt="iOS avatar"
                className="h-full w-full scale-[1.8] object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full scale-[1.8] object-contain"
                muted
                playsInline
                loop
              >
                <source src="/final_memojis.webm" type="video/webm" />
                <source src="/final_memojis_ios.mp4" type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      );
    }),
  { ssr: false }
);

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
} as const;

const Chat = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const avatarWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const isProjectsSectionRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const hasReachedLimit = false;

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeData, setKnowledgeData] = useState<any>(null);

  useEffect(() => {
    import('@/data/knowledge.json').then((data) => setKnowledgeData(data.default || data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const stop = () => setIsLoading(false);
  const reload = () => Promise.resolve(null);
  const addToolResult = () => { };

  const getSmartLocalResponse = (query: string) => {
    const q = query.trim().toLowerCase();

    // Exactly match the UI internal quick-action "Pills" and main nav interactions so they open the tool cleanly:
    if (q === 'who are you? i want to know more about you.' || q === 'who are you?' || q === 'presentation' || q === 'demo') {
      return { text: "Sure! Let me show that to you right away.", tool: 'getPresentation' };
    }
    if (q === 'what are your projects? what are you working on right now?' || q === 'projects' || q === 'work' || q === 'what projects have you worked on?') {
      return { text: "Sure! Let me show that to you right away.", tool: 'getProjects' };
    }
    if (q === 'can you show me your hackathon projects and experiences?' || q === 'hackathons' || q === 'fun') {
      return { text: "Sure! Let me show that to you right away.", tool: 'getHackathons' };
    }
    if (q === 'what are your skills? give me a list of your soft and hard skills.' || q === 'skills' || q === 'what are your skills?') {
      return { text: "Sure! Let me show that to you right away.", tool: 'getSkills' };
    }
    if (q === 'what certifications do you have? show me your certificates.' || q === 'certificates') {
      return { text: "Sure! Let me show that to you right away.", tool: 'getCertificates' };
    }
    if (q === 'how can i contact you? what are your email and social links?' || q === 'contact' || q === 'how can i contact you?') {
      return { text: "Sure! Let me show that to you right away.", tool: 'getContact' };
    }

    // Default: Return null so the request gets handed over to the powerful Gemini API
    return null;
  };

  const append = async (message: { role: string; content: string }) => {
    const newMsg = { ...message, id: Date.now().toString() };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    if (message.role === 'user') {
      setIsLoading(true);
      setLoadingSubmit(true);

      const localResponse = getSmartLocalResponse(message.content);

      if (localResponse) {
        setTimeout(() => {
          setMessages((prev) => {
            const aiMessage: any = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: localResponse.text,
            };

            if (localResponse.tool) {
              aiMessage.toolInvocations = [{
                toolCallId: 'local-' + Date.now(),
                toolName: localResponse.tool,
                args: {},
              }];
            }

            return [...prev, aiMessage];
          });

          setIsLoading(false);
          setLoadingSubmit(false);
          isSubmittingRef.current = false;
          setIsTalking(true);

          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
          }

          // Auto stop talking based on text length
          setTimeout(() => {
            setIsTalking(false);
            if (videoRef.current) videoRef.current.pause();
          }, 3000);
        }, 600);
        return;
      }

      // Fetch from Gemini API with streaming
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!response.ok) {
          let errMsg = 'Failed to fetch from Gemini';
          try { const e = await response.json(); errMsg = e.error || errMsg; } catch (_) {}
          throw new Error(errMsg);
        }

        // Create empty assistant message first
        const assistantId = (Date.now() + 1).toString();
        setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);
        setIsLoading(false);
        setLoadingSubmit(false);
        isSubmittingRef.current = false;
        setIsTalking(true);
        if (videoRef.current) videoRef.current.play().catch(console.error);

        // Stream text chunks into the message in real-time
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => m.id === assistantId ? { ...m, content: fullText } : m)
          );
        }

        setTimeout(() => {
          setIsTalking(false);
          if (videoRef.current) videoRef.current.pause();
        }, 2000);

      } catch (error: any) {
        console.error("Chat Error:", error);
        toast.error("Failed to fetch response from Gemini. Please check your API key.");
        setIsLoading(false);
        setLoadingSubmit(false);
        isSubmittingRef.current = false;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isSubmittingRef.current || isLoading) return;
    submitQuery(input);
    setInput('');
  };


  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    const activeTool = messages.some(
      (m) => m.toolInvocations && m.toolInvocations.length > 0
    );

    // Track whether Projects section is active via ref (no state = no re-render)
    isProjectsSectionRef.current = messages.some(
      (m) => m.toolInvocations?.some((tool: any) => tool.toolName === 'getProjects')
    );

    const result = {
      currentAIMessage:
        latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: activeTool,
    };

    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
    }

    return result;
  }, [messages]);

  const isToolInProgress = false;

  //@ts-ignore
  const submitQuery = (query) => {
    if (!query.trim() || isSubmittingRef.current || isLoading || loadingSubmit) return;

    isSubmittingRef.current = true;
    setLoadingSubmit(true);
    append({
      role: 'user',
      content: query,
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.pause();
    }

    if (initialQuery && !autoSubmitted) {
      setAutoSubmitted(true);
      setInput('');
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted]);

  useEffect(() => {
    if (videoRef.current) {
      if (isTalking) {
        videoRef.current.play().catch((error) => {
          console.error('Failed to play video:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isTalking]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();

    if (!input.trim() || isSubmittingRef.current || isLoading || loadingSubmit) return;
    submitQuery(input);
    setInput('');
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
    setIsTalking(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Check if this is the initial empty state (no messages)
  const isEmptyState =
    !currentAIMessage && !latestUserMessage && !loadingSubmit;

  // Scroll-based avatar visibility — direct DOM manipulation, zero state updates
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const avatarEl = avatarWrapperRef.current;
      if (!avatarEl) return;

      const currentScrollTop = container.scrollTop;
      if (currentScrollTop > 100) {
        if (currentScrollTop > lastScrollTopRef.current) {
          // Scrolling down — hide avatar
          avatarEl.style.opacity = '0';
          avatarEl.style.transform = 'translateY(-20px)';
        } else {
          // Scrolling up — show avatar
          avatarEl.style.opacity = '1';
          avatarEl.style.transform = 'translateY(0)';
        }
      } else {
        avatarEl.style.opacity = '1';
        avatarEl.style.transform = 'translateY(0)';
      }
      lastScrollTopRef.current = currentScrollTop;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []); // Runs once — reads refs dynamically, no dependencies needed

  // Calculate header height based on hasActiveTool
  const headerHeight = hasActiveTool ? 100 : 140;

  return (
    <div className="relative h-screen overflow-hidden">
      <FastfolioCTA />

      <button
        onClick={() => {
          console.log('Download Resume clicked');
          window.open('/resume.pdf', '_blank');
        }}
        className="fixed top-8 right-6 z-[100] cursor-pointer group flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-2xl px-4 py-2.5 border border-white/20 hover:bg-white/20 hover:backdrop-blur-3xl hover:shadow-xl transition-all duration-300 shadow-sm"
      >
        <ArrowUpRight className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
        <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
          View Resume
        </span>
      </button>

      {/* Fixed Avatar Header with Gradient */}
      <div
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}
        >
          <div className="flex justify-center">
            <ClientOnly>
              <div
                ref={avatarWrapperRef}
                style={{ transition: 'opacity 0.35s ease, transform 0.35s ease' }}
              >
                <Avatar
                  hasActiveTool={hasActiveTool}
                  videoRef={videoRef}
                  isTalking={isTalking}
                />
              </div>
            </ClientOnly>
          </div>

          <AnimatePresence>
            {latestUserMessage && !currentAIMessage && (
              <motion.div
                initial={MOTION_CONFIG.initial}
                animate={MOTION_CONFIG.animate}
                exit={MOTION_CONFIG.exit}
                transition={MOTION_CONFIG.transition}
                className="mx-auto flex max-w-3xl px-4"
              >
                <ChatBubble variant="sent">
                  <ChatBubbleMessage>
                    <ChatMessageContent
                      message={latestUserMessage}
                      isLast={true}
                      isLoading={false}
                      reload={() => Promise.resolve(null)}
                    />
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto flex h-full max-w-3xl flex-col">
        {/* Scrollable Chat Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-2 scroll-smooth"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <AnimatePresence mode="wait">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                initial={MOTION_CONFIG.initial}
                animate={MOTION_CONFIG.animate}
                exit={MOTION_CONFIG.exit}
                transition={MOTION_CONFIG.transition}
              >
                <ChatLanding submitQuery={submitQuery} hasReachedLimit={hasReachedLimit} />
              </motion.div>
            ) : currentAIMessage ? (
              <div className="pb-0 pt-2">
                <SimplifiedChatView
                  message={currentAIMessage}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                />
              </div>
            ) : (
              loadingSubmit && (
                <motion.div
                  key="loading"
                  initial={MOTION_CONFIG.initial}
                  animate={MOTION_CONFIG.animate}
                  exit={MOTION_CONFIG.exit}
                  transition={MOTION_CONFIG.transition}
                  className="px-4 pt-18"
                >
                  <ChatBubble variant="received">
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="sticky bottom-0 bg-white px-2 pt-1 md:px-0 md:pb-2 z-50">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost submitQuery={submitQuery} setInput={setInput} hasReachedLimit={hasReachedLimit} isLoading={isLoading || loadingSubmit} />
            <ChatBottombar
              input={hasReachedLimit ? "You've reached your message limit." : input}
              handleInputChange={hasReachedLimit ? () => { } : handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={isToolInProgress || hasReachedLimit}
              disabled={hasReachedLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
