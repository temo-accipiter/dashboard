import './CardGroup.scss'
import { ReactNode } from 'react'

interface CardGroupProps {
  children: ReactNode
}

export default function CardGroup({ children }: CardGroupProps) {
  return <div className="card-group">{children}</div>
}
