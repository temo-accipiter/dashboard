'use client'

// ==============================
// 🔝 En-tête principal du site
// ==============================

import { useTranslation } from 'react-i18next'
import ThemeToggle from '../theme/ThemeToggle'
import LangSelector from '../langSelector/LangSelector'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Header.scss'

export default function Header() {
  const { t } = useTranslation('header') // ← on utilise le namespace "header"
  const pathname = usePathname()

  return (
    <header className="site-header">
      <h1>{t('title')}</h1>

      <nav className="nav">
        <Link href="/" className={pathname === '/' ? 'active' : ''}>
          {t('home')}
        </Link>
        <Link
          href="/about"
          className={pathname === '/about' ? 'active' : ''}
        >
          {t('about')}
        </Link>
        <Link
          href="/contact"
          className={pathname === '/contact' ? 'active' : ''}
        >
          {t('contact')}
        </Link>
      </nav>

      <div className="tools">
        <ThemeToggle />
        <LangSelector />
      </div>
    </header>
  )
}
