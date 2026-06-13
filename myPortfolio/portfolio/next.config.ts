/** @type {import('next').NextConfig} */
const nextConfig = {
  // LOCAL DEVELOPMENT ONLY - Not configured for production deployment
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'github.com', 'raw.githubusercontent.com'],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
  // Disable static export for development
  output: 'standalone',
};

module.exports = nextConfig;
