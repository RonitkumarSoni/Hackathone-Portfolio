# 🚀 Portfolio AI - WebForge Hackathon

An advanced AI-powered portfolio website built with Next.js 15, featuring intelligent chat, 3D graphics, animated UI, and Gemini AI integration.

## ✨ Features

- **🤖 AI Chat Assistant** - Powered by Google Gemini AI with chat history
- **🎨 Interactive 3D Graphics** - Three.js integration for stunning animations
- **✨ Smooth Animations** - Framer Motion and Motion library for fluid UI
- **🌙 Dark Mode Support** - Next Themes for seamless theme switching
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **⚡ Performance Optimized** - Built on Next.js 15 with automatic optimization
- **🎯 Modern Stack** - React 19, TypeScript, Tailwind CSS 4

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.1.9
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4, Motion, Framer Motion
- **Language**: TypeScript
- **3D**: Three.js, React Three Fiber
- **Components**: Radix UI

### AI & Backend
- **AI**: Google Generative AI (Gemini)
- **Analytics**: Vercel Analytics
- **Validation**: Zod

### DevTools
- **Linting**: ESLint with Prettier
- **Build**: Next.js Build System

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm/pnpm/yarn

### Setup

```bash
# Install dependencies
npm install
# or
pnpm install

# Create environment variables
cp .env.example .env.local
```

### Environment Variables

Add to `.env.local`:

```env
# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

The app will be available at `http://localhost:3000`

## 📂 Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── chat/        # Chat page
│   ├── projects/    # Projects page
│   ├── skills/      # Skills page
│   └── certificates/# Certificates page
├── components/       # React components
│   ├── chat/        # Chat components
│   ├── magicui/     # Magic UI components
│   └── ui/          # Base UI components
├── data/            # Static data
├── hooks/           # Custom React hooks
└── lib/             # Utilities
```

## 🌐 Pages

- **Home** - Landing page with profile and intro
- **Chat** - AI-powered chat interface with Gemini
- **Projects** - Showcase of projects
- **Skills** - Skills and technologies
- **Certificates** - Certifications and achievements

## 🚀 Deployment on Vercel

The project is configured for automatic deployment on Vercel.

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables in Vercel:
   - `NEXT_PUBLIC_GEMINI_API_KEY` - Your Gemini API key
5. Click "Deploy"

Your portfolio will be live instantly!

## 📧 Contact

**Ronit Soni** - Full Stack Developer

- 📧 Email: ronitkumarsoni.cg@gmail.com
- 💼 LinkedIn: [Ronit Soni](https://www.linkedin.com/in/ronit-soni-63bb3a37a/)
- 🐙 GitHub: [@RonitkumarSoni](https://github.com/RonitkumarSoni)

---

**Made with ❤️ by Ronit Soni**