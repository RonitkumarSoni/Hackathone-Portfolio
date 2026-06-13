# 🏠 Local Development Only

This portfolio is configured to run **locally only** and is NOT intended for production deployment.

## ⚠️ Important Security Notes

- All API keys in `.env.local` are **LOCAL ONLY**
- `.env.local` is explicitly ignored from git (see `.gitignore`)
- Never commit `.env.local` or any API keys to version control
- Get your own API keys for local development

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. **Set Up Environment Variables**
   
   Copy `.env.example` to `.env.local` and add your own API keys:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add:
   - `GEMINI_API_KEY` - Get from [Google AI Studio](https://aistudio.google.com/apikey)
   - `GITHUB_TOKEN` - Get from [GitHub Settings](https://github.com/settings/tokens)
   - `GITHUB_USERNAME` - Your GitHub username

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for development (local testing)
- `npm start` - Run built project locally
- `npm run lint` - Check code quality

## 🔧 Configuration

This project is configured as:
- **Standalone output**: Optimized for local development
- **ESLint ignored on build**: Allows development to continue despite lint warnings
- **Local images only**: Uses external CDNs for assets

## ⛔ NOT Configured For

- ❌ Production deployment to Vercel or other platforms
- ❌ External API exposure beyond localhost
- ❌ Environment-based deployments
- ❌ CI/CD pipelines

## 📖 Local-Only Features

✅ Full AI chat with Gemini AI  
✅ 3D graphics with Three.js  
✅ Smooth animations  
✅ Dark mode support  
✅ Interactive components  

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**API key errors?**
- Ensure `.env.local` exists in the `portfolio/` directory
- Verify API keys are correctly set
- Check `http://localhost:3000/api/chat` is accessible

**Build fails?**
- Clear `.next/` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check Node.js version: `node --version` (should be 18+)

---

**Last Updated**: June 2026  
**Maintenance**: Local development only
