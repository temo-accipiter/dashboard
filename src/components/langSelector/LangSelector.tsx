// ==============================
// 🌍 Sélecteur de langue (fr / en)
// ==============================

'use client'

import { useLocale } from 'next-intl'
import { useChangeLocale, getCurrentLocale } from '@/i18n/client-utils'
import type { Locale } from '@/i18n/config'
import './LangSelector.scss'

export default function LangSelector() {
  const locale = useLocale()
  const changeLocale = useChangeLocale()

  // 🔁 Fonction pour changer de langue
  const changeLanguage = (lang: Locale) => {
    changeLocale(lang)
  }

  return (
    <div
      className="lang-selector"
      role="group"
      aria-label="Sélecteur de langue"
    >
      {/* 🇫🇷 Bouton pour le français */}
      <button
        className={locale === 'fr' ? 'active' : ''}
        onClick={() => changeLanguage('fr')}
        aria-label="Passer le site en français"
      >
        🇫🇷
      </button>

      {/* 🇬🇧 Bouton pour l'anglais */}
      <button
        className={locale === 'en' ? 'active' : ''}
        onClick={() => changeLanguage('en')}
        aria-label="Switch site to English"
      >
        🇬🇧
      </button>
    </div>
  )
}
