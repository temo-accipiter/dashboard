import ThemeToggle from '@/components/theme/ThemeToggle'
import LangSelector from '@/components/langSelector/LangSelector'
import './Navbar.scss'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-right">
        <LangSelector />
        <ThemeToggle />
      </div>
    </header>
  )
}
