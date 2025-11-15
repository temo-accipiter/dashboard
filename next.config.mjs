import createNextIntlPlugin from 'next-intl/plugin'
import withPWAInit from '@ducanh2912/next-pwa'

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts')

const withPWA = withPWAInit({
  dest: 'public',
  // Feature toggle: disable PWA in development or via env variable
  disable: process.env.NODE_ENV === 'development' || process.env.DISABLE_PWA === 'true',
  register: true,
  skipWaiting: true,
  sw: 'sw.js',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: {
    document: '/offline',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Support SCSS
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // ✅ Configuration TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // ✅ ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ✅ Optimisations
  reactStrictMode: true,

  // ✅ Configuration pour les images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default withPWA(withNextIntl(nextConfig))
