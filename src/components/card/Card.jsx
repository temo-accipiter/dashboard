import './Card.scss'
import { useNavigate } from 'react-router-dom'

export default function Card({ title, children, to }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    }
  }

  return (
    <div className="card clickable" onClick={handleClick} role="button" tabIndex={0}>
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  )
}
