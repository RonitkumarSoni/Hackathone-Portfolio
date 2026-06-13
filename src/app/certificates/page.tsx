import type { Metadata } from 'next';
import Certificate from '@/components/certificate';

export const metadata: Metadata = {
    title: 'Certifications — 18 Professional Certificates',
    description: 'View all 18 professional certifications of Ronit Soni including AWS, Microsoft Azure, Google AI Studio, HackerRank (React, Node.js, Python, Problem Solving), and more.',
};

export default function CertificatesPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
            <div className="z-10 mt-16 w-full max-w-5xl px-4 md:px-0">
                <Certificate />
            </div>
        </div>
    );
}
