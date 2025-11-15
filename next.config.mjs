import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts')

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

export default withNextIntl(nextConfig)
