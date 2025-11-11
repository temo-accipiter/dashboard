'use client'

import Sidebar from '@/components/sidebar/Sidebar'
import Navbar from '@/components/navbar/Navbar'
import './Layout.scss'
import { ReactNode } from 'react'

interface LayoutComponentProps {
  children: ReactNode
}

export default function LayoutComponent({ children }: LayoutComponentProps) {
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
