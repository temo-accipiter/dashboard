import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
