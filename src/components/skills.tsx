import { Code, Cpu, PenTool, Users } from 'lucide-react';
import Image from 'next/image';

const Skills = () => {
  const skillsData = [
    {
      category: 'Frontend Development',
      icon: <Code className="h-5 w-5 md:h-6 md:w-6" />,
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Tailwind',
      ],
    },
    {
      category: 'Backend & Systems',
      icon: <Cpu className="h-5 w-5 md:h-6 md:w-6" />,
      skills: [
        'Node.js',
        'Express.js',
      ],
    },
    {
      category: 'Database',
      icon: <Cpu className="h-5 w-5 md:h-6 md:w-6" />, // reusing Cpu since there's no Database icon imported
      skills: [
        'MongoDB',
        'Firebase',
      ],
    },
    {
      category: 'Tools',
      icon: <PenTool className="h-5 w-5 md:h-6 md:w-6" />,
      skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman'],
    },
    {
      category: 'Other',
      icon: <Users className="h-5 w-5 md:h-6 md:w-6" />,
      skills: [
        'REST APIs',
        'Responsive Design',
        'UI/UX fundamentals',
      ],
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl py-2">
      {/* Section Title */}
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-4xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Skills &amp; Expertise
        </h2>
      </div>

      {/* Skills Categories */}
      <div className="flex flex-col gap-6">
        {skillsData.map((section, index) => (
          <div key={index} className="flex flex-col gap-4">
            {/* Category Title with Icon */}
            <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
              {section.icon}
              <h3 className="text-xl md:text-2xl font-medium">
                {section.category}
              </h3>
            </div>

            {/* Skills as Pill Badges */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {section.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-[#111] dark:bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
