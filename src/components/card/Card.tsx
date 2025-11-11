import './Card.scss'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  to?: string
}

export default function Card({ title, children, to }: CardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) navigate(to)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (to && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      navigate(to)
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
