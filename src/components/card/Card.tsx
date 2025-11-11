'use client'

import './Card.scss'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  to?: string
}

export default function Card({ title, children, to }: CardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (to) router.push(to)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (to && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      router.push(to)
    }
  }

  return (
    <div
      className={`card${to ? ' clickable' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={to ? 'button' : undefined}
      tabIndex={to ? 0 : undefined}
    >
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  )
}
