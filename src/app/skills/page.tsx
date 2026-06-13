import type { Metadata } from 'next';
import Skills from '@/components/skills';

export const metadata: Metadata = {
    title: 'Skills — React, Node.js, AWS & More',
    description: 'Technical skills and expertise of Ronit Soni — MERN stack, Next.js, TypeScript, AWS, Azure, Python, and 18 professional certifications from HackerRank, AWS, Microsoft, and Google.',
};

export default function SkillsPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
            <div className="z-10 mt-16 w-full max-w-5xl px-4 md:px-0">
                <Skills />
            </div>
        </div>
    );
}
