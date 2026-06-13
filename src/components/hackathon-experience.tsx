import { Code, ExternalLink, Users, Layers, Cpu, Github, Trophy } from 'lucide-react';
import Image from 'next/image';

const HackathonExperience = () => {
  const hackathons = [
    {
      name: 'Hackathone Portfolio (WebForge)',
      description: 'AI-powered interactive portfolio with a Gemini-based chatbot (Nova) that answers questions about skills, projects, and experience. Built with Next.js 15, Framer Motion, and streaming AI responses.',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Framer Motion'],
      image: '/hackathon-portfolio.png',
      githubUrl: 'https://github.com/RonitkumarSoni/Hackathone-Portfolio',
      liveUrl: 'https://ronitsoni-dev.vercel.app/',
    },
    {
      name: 'AI Game Bot',
      description: 'An intelligent game bot powered by AI that can play and strategize in real-time. Built during a hackathon to explore the intersection of AI and gaming with Python-based algorithms.',
      techStack: ['Python', 'AI/ML', 'Game Logic', 'Algorithms'],
      image: '/aibot-new.png',
      githubUrl: 'https://github.com/RonitkumarSoni/Ai-Game-bot-hackathone',
    },
    {
      name: 'Vector Minds',
      description: 'A collaborative project exploring vector-based AI applications, semantic search, and intelligent data processing. Built to push boundaries in AI-powered knowledge retrieval.',
      techStack: ['AI/ML', 'Vector DB', 'Python', 'APIs'],
      image: '/vector-minds.png',
      githubUrl: 'https://github.com/RonitkumarSoni/vector-minds',
      liveUrl: 'https://vector-minds.vercel.app',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl py-2">
      {/* Section Title */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Hackathon Experience
          </h2>
          <Trophy className="h-7 w-7 text-yellow-500" />
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-3xl">
          Real hackathon projects where I built innovative solutions under tight deadlines, 
          pushing creativity and technical skills to the limit.
        </p>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {hackathons.map((project, index) => (
          <div 
            key={index} 
            className="group flex flex-col bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            {/* Project Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 gap-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {project.name}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-3 pt-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonExperience;
