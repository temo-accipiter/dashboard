import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { cookies } from 'next/headers'
import AppLayout from '@/components/layout/AppLayout'
import '@/styles/main.scss'
import { defaultLocale } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Dashboard Personnel',
  description: 'Dashboard personnalisé - accès rapide et offline-friendly',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dashboard',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0070f3',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Récupérer la locale depuis les cookies
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || defaultLocale

  // Charger les messages pour la locale actuelle
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AppLayout>{children}</AppLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
