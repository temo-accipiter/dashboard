import './SectionTitle.scss'
import { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="section-title">{children}</h2>
}
