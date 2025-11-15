// ==============================
// 🎨 Layout principal pour Next.js App Router
// ==============================

'use client'

import Sidebar from '@/components/sidebar/Sidebar'
import Navbar from '@/components/navbar/Navbar'
import './Layout.scss'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  )
}
