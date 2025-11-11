// ==============================
// 🎨 Bouton de bascule entre thème clair et sombre
// ==============================

import { useEffect, useState } from 'react'
import './ThemeToggle.scss'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  // 📦 État local pour stocker le thème actuel
  const [theme, setTheme] = useState<Theme>('light')

  // 🧠 Au premier chargement, on applique le thème sauvegardé (ou 'light' par défaut)
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') ?? 'light') as Theme
    document.documentElement.setAttribute('data-theme', savedTheme) // HTML : <html data-theme="...">
    setTheme(savedTheme)
  }, [])

  // 🔁 Fonction pour basculer entre clair et sombre
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme) // Mémorisation
    setTheme(newTheme)
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        theme === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair'
      }
      title={
        theme === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair'
      }
    >
      {/* 🌞 ou 🌙 selon le thème */}
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  )
}
