import { Code, ExternalLink, Users, Layers, Cpu } from 'lucide-react';
import Image from 'next/image';

const HackathonExperience = () => {
  const hackathons = [
    {
      name: 'Hackathon Project 1',
      description: 'Built during a university hackathon where our team created a rapid prototype to solve a real-world problem under time constraints.',
      techStack: ['Next.js', 'Node.js', 'Tailwind', 'AI API'],
      image: 'https://via.placeholder.com/600x400?text=Hackathon+Project+1', // Placeholder as requested
    },
    {
      name: 'Hackathon Project 2',
      description: 'A collaborative hackathon project focused on building an innovative web solution with a clean UI and functional backend.',
      techStack: ['React', 'Express', 'MongoDB'],
      image: 'https://via.placeholder.com/600x400?text=Hackathon+Project+2',
    },
    {
      name: 'Hackathon Project 3',
      description: 'Developed a fast prototype exploring new technologies and creative problem-solving during a hackathon event.',
      techStack: ['Next.js', 'TypeScript', 'Tailwind'],
      image: 'https://via.placeholder.com/600x400?text=Hackathon+Project+3',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl py-2">
      {/* Section Title */}
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Hackathon Experience
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-3xl">
          This section highlights some hackathon projects and rapid prototypes I built while collaborating with other developers. 
          Hackathons push creativity, teamwork, and fast problem-solving under tight deadlines.
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
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonExperience;
