import { Link } from 'react-router-dom'
import './Sidebar.scss'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">🏠 Accueil</Link>
          </li>
          <li>
            <Link to="/demo">🧪 Démo</Link>
          </li>
          <li>
            <Link to="/about">ℹ️ À propos</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
