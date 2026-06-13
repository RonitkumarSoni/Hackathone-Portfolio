'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

const EMAIL = 'ronitkumarsoni.cg@gmail.com';

const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ronit-soni-63bb3a37a/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@NextGenCoderOfficial' },
  { name: 'Instagram', url: 'https://www.instagram.com/ronitsoni596/' },
  { name: 'Discord', url: 'https://discord.com/channels/@me' },
  { name: 'GitHub', url: 'https://github.com/RonitkumarSoni' },
  { name: 'X', url: 'https://x.com/RonitXSoni' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/ronitkumarsoni/' },
];

const openLink = (url: string) =>
  window.open(url, '_blank', 'noopener,noreferrer');

export function Contact() {
  return (
    <div className="mx-auto mt-2 w-full">
      {/* Contact Card */}
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-6 font-sans sm:px-10 md:px-16 md:py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
            Contacts
          </h2>
          <span className="text-muted-foreground mt-2 text-sm sm:mt-0">
            @RonitkumarSoni
          </span>
        </div>

        {/* Email */}
        <div
          className="group mb-5 cursor-pointer"
          onClick={() => openLink(`mailto:${EMAIL}`)}
        >
          <div className="flex items-center gap-1">
            <span className="text-base font-medium text-blue-500 hover:underline sm:text-lg">
              {EMAIL}
            </span>
            <ChevronRight className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
          {SOCIALS.map((s) => (
            <button
              key={s.name}
              onClick={() => openLink(s.url)}
              title={s.name}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Professional Message — below the card */}
      <div className="mt-6 px-1 space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          Feel free to reach out anytime. I’m always happy to connect 😄 and
          discuss projects, ideas, or potential collaborations 🤝.
        </p>

        <p>
          I enjoy building AI-powered tools 🤖, scalable full-stack web
          applications, and modern SaaS platforms that solve real-world problems.
        </p>

        <p>
          Currently open to <strong>internship and placement opportunities </strong>
          where I can grow as a developer, contribute to impactful products,
          and collaborate with great teams 🚀.
        </p>
      </div>
    </div>
  );
}

export default Contact;
