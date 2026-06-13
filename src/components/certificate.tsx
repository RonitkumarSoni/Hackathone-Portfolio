import { Award, ExternalLink } from 'lucide-react';

const Certificate = () => {
  const certificatesData = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2025',
      link: '/certificates/AWS2_certificate.pdf',
      description: 'Cloud computing certification covering AWS services, deployment, and scalable architecture.'
    },
    {
      title: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2025',
      link: '/certificates/Microsoft_certificate.pdf',
      description: 'Foundational cloud concepts, Azure services, security, privacy, and pricing models.'
    },
    {
      title: 'Generative AI Studio',
      issuer: 'Google Cloud',
      date: '2025',
      link: '/certificates/genrative ai studio.pdf',
      description: 'Hands-on generative AI tools, prompt engineering, and AI model integration.'
    },
    {
      title: 'GitHub Copilot Mastery',
      issuer: 'GitHub',
      date: '2025',
      link: '/certificates/github Copilot certificate.pdf',
      description: 'AI-powered coding assistance, pair programming with Copilot, and productivity optimization.'
    },
    {
      title: 'Frontend Development Specialization',
      issuer: 'Algonive',
      date: '2025',
      link: '/certificates/Fronted_certificate.pdf',
      description: 'Advanced frontend development covering React, responsive design, and modern UI/UX practices.'
    },
    {
      title: 'WebForge Hackathon Achievement',
      issuer: 'WebForge',
      date: '2025',
      link: '/certificates/WebFrog_certificate.pdf',
      description: 'Recognition for building an AI-powered portfolio during the WebForge Hackathon.'
    },
    {
      title: 'React (Basic)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/react_basic certificate.pdf',
      description: 'Certified in React fundamentals, component architecture, hooks, and state management.'
    },
    {
      title: 'Node.js (Basic)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/nodejs_basic certificate.pdf',
      description: 'Server-side JavaScript, Express.js, REST APIs, and asynchronous programming.'
    },
    {
      title: 'Node.js (Intermediate)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/nodejs_intermediate certificate.pdf',
      description: 'Advanced Node.js patterns, middleware, authentication, and database integration.'
    },
    {
      title: 'JavaScript (Basic)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/javascript_basic certificate.pdf',
      description: 'Core JavaScript concepts, ES6+, closures, promises, and DOM manipulation.'
    },
    {
      title: 'Python (Basic)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/python_basic certificate.pdf',
      description: 'Python fundamentals, data types, control flow, functions, and OOP basics.'
    },
    {
      title: 'CSS Specialist',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/css certificate.pdf',
      description: 'Advanced CSS layouts, Flexbox, Grid, animations, and responsive design techniques.'
    },
    {
      title: 'Problem Solving (Basic)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/problem_solving_basic certificate.pdf',
      description: 'Algorithmic thinking, basic data structures, and problem-solving fundamentals.'
    },
    {
      title: 'Problem Solving (Intermediate)',
      issuer: 'HackerRank',
      date: '2024',
      link: '/certificates/problem_solving_intermediate certificate.pdf',
      description: 'Advanced algorithms, optimization techniques, and complex data structure operations.'
    },
    {
      title: 'CyberSecurity Fundamentals',
      issuer: 'Certified Authority',
      date: '2024',
      link: '/certificates/CyberSecurity_certificate.pdf',
      description: 'Network security, encryption, threat analysis, and security best practices.'
    },
    {
      title: 'Data Analysis',
      issuer: 'Certified Authority',
      date: '2024',
      link: '/certificates/Data Analyasis.pdf',
      description: 'Data visualization, statistical analysis, and data-driven decision making.'
    },
    {
      title: 'OpenPools Certification',
      issuer: 'OpenPools',
      date: '2024',
      link: '/certificates/openPools_certificate.pdf',
      description: 'Open-source contribution, collaborative development, and community engagement.'
    },
    {
      title: 'Amity Noida Portfolio',
      issuer: 'Amity University',
      date: '2024',
      link: '/certificates/Amity noida portfolio.pdf',
      description: 'Academic portfolio showcasing technical projects and achievements.'
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl py-2">
      {/* Section Title */}
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-4xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Certifications
        </h2>
        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
          {certificatesData.length} Total
        </span>
      </div>

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificatesData.map((cert, index) => (
          <div 
            key={index} 
            className="group relative flex flex-col gap-4 p-6 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl text-yellow-600 dark:text-yellow-500">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {cert.date}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                {cert.issuer}
              </p>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {cert.description}
            </p>

            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto pt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
            >
              <span>View Certificate</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
