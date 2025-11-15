// ==============================
// 🌍 Utilitaires client pour i18n (next-intl)
// ==============================

'use client'

import { useRouter } from 'next/navigation'
import type { Locale } from './config'

/**
 * Hook pour changer la langue
 * Stocke la langue dans un cookie et rafraîchit la page
 */
export function useChangeLocale() {
  const router = useRouter()

  return (locale: Locale) => {
    // Stocker la langue dans un cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000` // 1 an

    // Rafraîchir la page pour appliquer la nouvelle langue
    router.refresh()
  }
}

/**
 * Récupérer la langue actuelle depuis les cookies
 */
export function getCurrentLocale(): Locale {
  const cookies = document.cookie.split('; ')
  const localeCookie = cookies.find((c) => c.startsWith('NEXT_LOCALE='))
  return (localeCookie?.split('=')[1] as Locale) || 'fr'
}
