// ==============================
// 🔝 En-tête principal du site
// ==============================

import { useTranslation } from 'react-i18next'
import ThemeToggle from '../theme/ThemeToggle'
import LangSelector from '../langSelector/LangSelector'
import { NavLink } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  const { t } = useTranslation('header') // ← on utilise le namespace "header"

  return (
    <header className="site-header">
      <h1>{t('title')}</h1>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('home')}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('about')}
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {t('contact')}
        </NavLink>
      </nav>

      <div className="tools">
        <ThemeToggle />
        <LangSelector />
      </div>
    </header>
  )
}
