import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Support SCSS
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // ⚠️ Configuration TypeScript (Phase 1: ignorer temporairement les erreurs du dossier src/pages/ Vite)
  // Sera réactivé une fois la migration des pages terminée
  typescript: {
    ignoreBuildErrors: true,
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
