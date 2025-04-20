import Sidebar from '@/components/sidebar/Sidebar'
import Navbar from '@/components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
