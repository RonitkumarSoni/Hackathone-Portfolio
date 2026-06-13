/** @type {import('next').NextConfig} */
const nextConfig = {
  // LOCAL DEVELOPMENT ONLY - Not configured for production deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.aceternity.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
  // Disable static export for development
  output: 'standalone',
};

module.exports = nextConfig;
