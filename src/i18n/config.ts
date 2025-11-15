// ==============================
// 🌍 Configuration i18n pour Next.js avec next-intl
// ==============================

import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

// Langues supportées
export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

// Langue par défaut
export const defaultLocale: Locale = 'fr'

// ==============================
// Configuration des messages pour next-intl
// ==============================

export default getRequestConfig(async () => {
  // Récupérer la langue depuis les cookies (ou utiliser la langue par défaut)
  const cookieStore = await cookies()
  const locale =
    (cookieStore.get('NEXT_LOCALE')?.value as Locale) || defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
