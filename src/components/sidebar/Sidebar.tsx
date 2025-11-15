'use client'

import NavLink from '@/components/common/NavLink'
import { Home, Calendar, Settings, List, Globe, Newspaper } from 'lucide-react'
import './Sidebar.scss'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" className="nav-item">
          <>
            <Home size={20} />
            <span>Accueil</span>
          </>
        </NavLink>
        <NavLink to="/taches" className="nav-item">
          <>
            <List size={20} />
            <span>Tâches</span>
          </>
        </NavLink>
        <NavLink to="/actualites" className="nav-item">
          <>
            <Newspaper size={20} />
            <span>Actualités</span>
          </>
        </NavLink>
        <NavLink to="/calendar" className="nav-item">
          <>
            <Calendar size={20} />
            <span>Calendrier</span>
          </>
        </NavLink>
        <NavLink to="/liens" className="nav-item">
          <>
            <Globe size={20} />
            <span>Liens</span>
          </>
        </NavLink>
        <NavLink to="/settings" className="nav-item">
          <>
            <Settings size={20} />
            <span>Réglages</span>
          </>
        </NavLink>
      </nav>
    </aside>
  )
}
