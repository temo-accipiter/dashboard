/**
 * 🧪 DemoPage.jsx
 *
 * Cette page est utilisée uniquement à des fins de test dans le template.
 * Elle permet de vérifier que les composants globaux fonctionnent :
 *
 * - 🌞 / 🌙 Thème clair / sombre
 * - 🌍 Multilingue (i18n)
 * - ♿ Accessibilité (aria-label, navigation clavier, etc.)
 *
 * 👉 À supprimer dans les projets finaux (production)
 * Ne pas inclure cette page dans la version publique du site.
 */

import { useTranslation } from 'react-i18next'
import ThemeToggle from '@/components/theme/ThemeToggle'
import LangSelector from '@/components/langSelector/LangSelector'
import './DemoPage.scss'

export default function DemoPage() {
  const { t } = useTranslation('common')

  return (
    <section className="demo-page">
      <h1>🧪 {t('demoPageTitle')}</h1>

      <p>{t('demoPageDescription')}</p>

      {/* 🎨 Section Thème + Langue */}
      <div className="demo-row">
        <ThemeToggle />
        <LangSelector />
      </div>

      {/* 💬 Exemple de texte traduit */}
      <div className="demo-section">
        <h2>{t('exampleTextTitle')}</h2>
        <p>{t('welcome')}</p>
      </div>

      {/* ♿ Section Accessibilité */}
      <div className="demo-section">
        <h2>♿ Accessibilité</h2>
        <p aria-label="Texte lisible par lecteur d'écran">
          Ceci est un paragraphe avec un <code>aria-label</code>.
        </p>
        <button aria-label="Ouvrir le menu">
          Bouton invisible aux yeux, mais accessible aux lecteurs
        </button>
      </div>
    </section>
  )
}
