import { Award, ExternalLink } from 'lucide-react';

const Certificate = () => {
  const certificatesData = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2026',
      link: '/certificates/AWS2_certificate.pdf',
      description: 'Validation of cloud expertise in developing and maintaining applications on AWS.'
    },
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2026',
      link: '/certificates/Microsoft_certificate.pdf',
      description: 'Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.'
    },
    {
      title: 'Generative AI Studio',
      issuer: 'Google Cloud',
      date: '2026',
      link: '/certificates/genrative ai studio.pdf',
      description: 'Comprehensive course on utilizing Google Cloud\'s Generative AI tools and models.'
    },
    {
      title: 'GitHub Copilot Mastery',
      issuer: 'GitHub',
      date: '2026',
      link: '/certificates/github Copilot certificate.pdf',
      description: 'Advanced usage of AI pair programming to accelerate development workflows.'
    },
    {
      title: 'Node.js (Intermediate)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/nodejs_intermediate certificate.pdf',
      description: 'Validated skills in Node.js including event loop, networking, and asynchronous programming.'
    },
    {
      title: 'Problem Solving (Intermediate)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/problem_solving_intermediate certificate.pdf',
      description: 'Proficiency in complex algorithms, data structures, and optimization techniques.'
    },
    {
      title: 'Frontend Development Specialization',
      issuer: 'Algonive',
      date: '2026',
      link: '/certificates/Fronted_certificate.pdf',
      description: 'Deep dive into modern frontend frameworks, responsive design, and UI performance.'
    },
    {
      title: 'CyberSecurity Essentials',
      issuer: 'Cisco Networking Academy',
      date: '2026',
      link: '/certificates/CyberSecurity_certificate.pdf',
      description: 'Core concepts of network security, cryptography, and data protection.'
    },
    {
      title: 'Data Analysis with Python',
      issuer: 'IBM / Coursera',
      date: '2026',
      link: '/certificates/Data Analyasis.pdf',
      description: 'Analyzing datasets using Python libraries like Pandas, Numpy, and Matplotlib.'
    },
    {
      title: 'WebForge Hackathon Achievement',
      issuer: 'WebForge Hackathone',
      date: '2026',
      link: '/certificates/WebFrog_certificate.pdf',
      description: 'Awarded for building innovative web solutions during the intensive hackathon event.'
    },
    {
      title: 'React (Basic)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/react_basic certificate.pdf',
      description: 'Fundamental understanding of React components, props, state, and lifecycle.'
    },
    {
      title: 'Node.js (Basic)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/nodejs_basic certificate.pdf',
      description: 'Core Node.js concepts including modules, NPM, and basic file system operations.'
    },
    {
      title: 'JavaScript (Basic)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/javascript_basic certificate.pdf',
      description: 'Mastery of ES6 syntax, functions, arrays, and basic DOM manipulation.'
    },
    {
      title: 'Python (Basic)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/python_basic certificate.pdf',
      description: 'Validation of Python syntax, data types, and fundamental programming logic.'
    },
    {
      title: 'CSS Specialist',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/css certificate.pdf',
      description: 'Advanced CSS layouts, Flexbox, Grid, and responsive styling techniques.'
    },
    {
      title: 'Problem Solving (Basic)',
      issuer: 'HackerRank',
      date: '2026',
      link: '/certificates/problem_solving_basic certificate.pdf',
      description: 'Foundational algorithmic thinking and data structure implementation.'
    },
    {
      title: 'OpenPools Project Contributor',
      issuer: 'OpenPools Community',
      date: '2026',
      link: '/certificates/openPools_certificate.pdf',
      description: 'Recognition for contributions to the OpenPools open-source ecosystem.'
    },
    {
      title: 'Amity Noida Presentation',
      issuer: 'Amity University',
      date: '2026',
      link: '/certificates/Amity noida portfolio.pdf',
      description: 'Portfolio showcase and presentation achievement at Amity Noida event.'
    }
  ];

  return (
    <section className="mx-auto w-full max-w-5xl py-2 px-1">
      {/* Section Title */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Certifications <span className="text-sm font-normal text-muted-foreground ml-2">({certificatesData.length})</span>
        </h2>
      </div>

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {certificatesData.map((cert, index) => (
          <div
            key={index}
            className="group relative flex flex-col gap-3 p-5 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-yellow-500/20"
          >
            <div className="flex justify-between items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2.5 rounded-xl text-yellow-600 dark:text-yellow-500">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {cert.date}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors line-clamp-1">
                {cert.title}
              </h3>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                {cert.issuer}
              </p>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed line-clamp-2">
              {cert.description}
            </p>

            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 text-xs font-bold text-yellow-600 dark:text-yellow-500 hover:underline cursor-pointer w-fit"
            >
              <span>View Credential</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
