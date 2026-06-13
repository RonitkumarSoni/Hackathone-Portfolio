import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chat with Nova — AI Assistant',
    description: 'Ask Nova anything about Ronit Soni — skills, projects, experience, certifications, or just have a friendly conversation. Powered by Google Gemini AI with real-time streaming responses.',
};

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
