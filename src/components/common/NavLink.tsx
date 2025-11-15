// ==============================
// 🔗 NavLink personnalisé pour Next.js
// Reproduit le comportement de react-router NavLink
// ==============================

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavLinkProps {
  to: string
  className?: string
  children: ReactNode
}

export default function NavLink({
  to,
  className = '',
  children,
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === to

  return (
    <Link href={to} className={`${className}${isActive ? ' active' : ''}`}>
      {children}
    </Link>
  )
}
