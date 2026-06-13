import { Award, ExternalLink } from 'lucide-react';

const Certificate = () => {
  const certificatesData = [
    {
      title: 'Full Stack Web Development',
      issuer: 'Algonive',
      date: '2025',
      link: '#',
      description: 'Comprehensive certification covering MERN stack development, system design, and production-ready applications.'
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'FreeCodeCamp',
      date: '2024',
      link: '#',
      description: 'Certification focused on fundamental programming concepts, algorithms, and data structures.'
    },
    {
      title: 'Professional Frontend Development',
      issuer: 'Meta (Coursera)',
      date: '2024',
      link: '#',
      description: 'Advanced course on React, UI/UX principles, and responsive design.'
    }
  ];

  return (
    <section className="mx-auto w-full max-w-5xl py-2">
      {/* Section Title */}
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-4xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Certifications
        </h2>
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

            <div className="mt-auto pt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
              <span>View Certificate</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
