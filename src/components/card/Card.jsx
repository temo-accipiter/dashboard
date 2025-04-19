import './Card.scss'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export default function Card({ title, children, to }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) navigate(to)
  }

  const handleKeyDown = (e) => {
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

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
}
