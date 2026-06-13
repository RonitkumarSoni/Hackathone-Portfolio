'use client';

import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { motion } from 'framer-motion';
import ChatMessageContent, { Message } from './chat-message-content';
import ToolRenderer from './tool-renderer';

interface SimplifiedChatViewProps {
  message: Message;
  isLoading: boolean;
  reload: () => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
}

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut' as const,
  },
};

export function SimplifiedChatView({
  message,
  isLoading,
  reload,
  addToolResult,
}: SimplifiedChatViewProps) {
  if (message.role !== 'assistant') return null;

  const hasTextContent = message.content && message.content.trim().length > 0;
  // @ts-ignore
  const hasToolInvocations = message.toolInvocations && message.toolInvocations.length > 0;

  return (
    <motion.div {...MOTION_CONFIG} className="flex w-full flex-col">
      {/* Container without fixed height or nested scroll */}
      <div className="flex w-full flex-col">
        {/* Text content wrapped in a bubble for that conversational feel */}
        {hasTextContent && (
          <div className="w-full px-4">
            <ChatBubble variant="received" className="w-full">
              <ChatBubbleMessage className="w-full">
                <ChatMessageContent
                  message={message}
                  isLast={true}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                  skipToolRendering={true}
                />
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        )}

        {/* Tool content (The "Data" sections) rendered bare and full-width */}
        {hasToolInvocations && (
          <div className="mt-0 w-full">
            <ToolRenderer
              // @ts-ignore
              toolInvocations={message.toolInvocations}
              messageId={message.id}
            />
          </div>
        )}

        {/* Add some padding at the bottom for spacing */}
      </div>
    </motion.div>
  );
}
