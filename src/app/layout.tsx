import type { Metadata } from 'next'
import '@/styles/main.scss'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Dashboard Personnalisé',
    template: '%s | Dashboard',
  },
  description: 'Dashboard personnalisé avec Next.js 16',
  authors: [{ name: 'Miminoshvili Temo' }],
  keywords: ['dashboard', 'nextjs', 'react', 'typescript'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
