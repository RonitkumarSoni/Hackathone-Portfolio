import type { Metadata } from 'next';
import AllProjects from '@/components/projects/AllProjects';

export const metadata: Metadata = {
    title: 'Projects — 13+ Live Web Applications',
    description: 'Explore Ronit Soni\'s portfolio of 13+ live projects including Canva Clone, RentEase Plus, LMS Portal, MedCompare, and more. Each project features pixel-perfect UI and modern tech stacks.',
};

export default function ProjectsPage() {
    const githubToken = process.env.GITHUB_TOKEN || '';
    const githubUsername = process.env.GITHUB_USERNAME || 'RonitkumarSoni';

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
            <div className="z-10 mt-16 w-full max-w-7xl px-4 md:px-0">
                <AllProjects githubToken={githubToken} githubUsername={githubUsername} />
            </div>
        </div>
    );
}
