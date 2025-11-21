import './IconCard.scss'

interface IconCardProps {
  icon: string | { src: string; height: number; width: number }
  label: string
  href: string
  onClick?: (e: React.MouseEvent) => void
}

export default function IconCard({
  icon,
  label,
  href,
  onClick,
}: IconCardProps) {
  const iconSrc = typeof icon === 'string' ? icon : icon.src

  const handleClick = (e: React.MouseEvent) => {
    // If onClick is provided, it will handle navigation
    // Prevent default link behavior
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="icon-card"
      onClick={handleClick}
    >
      <div className="icon-wrapper">
        <img src={iconSrc} alt={label} className="icon-img" />
      </div>
      <div className="label">{label}</div>
    </a>
  )
}
