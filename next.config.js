/** @type {import('next').NextConfig} */
const nextConfig = {
  // Support du mode strict de React
  reactStrictMode: true,

  // Configuration SASS
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // Optimisations de build
  compiler: {
    // Supprime console.* en production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuration des images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Turbopack config (vide pour Next.js 16)
  turbopack: {},

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
