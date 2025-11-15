import type { Metadata } from 'next'
import '@/styles/main.scss'

export const metadata: Metadata = {
  title: 'dashboard',
  description: 'Dashboard personnalisé',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
