'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Settings, List, Globe } from 'lucide-react'
import './Sidebar.scss'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <nav>
        <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <Home size={20} />
          <span>Accueil</span>
        </Link>
        <Link
          href="/taches"
          className={`nav-item ${isActive('/taches') ? 'active' : ''}`}
        >
          <List size={20} />
          <span>Tâches</span>
        </Link>
        <Link
          href="/calendar"
          className={`nav-item ${isActive('/calendar') ? 'active' : ''}`}
        >
          <Calendar size={20} />
          <span>Calendrier</span>
        </Link>
        <Link
          href="/liens"
          className={`nav-item ${isActive('/liens') ? 'active' : ''}`}
        >
          <Globe size={20} />
          <span>Liens</span>
        </Link>
        <Link
          href="/settings"
          className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Réglages</span>
        </Link>
      </nav>
    </aside>
  )
}
