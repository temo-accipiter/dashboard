import './IconCard.scss'
import PropTypes from 'prop-types'

export default function IconCard({ icon, label, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="icon-card">
      <div className="icon-wrapper">
        <img src={icon} alt={label} className="icon-img" />
      </div>
      <div className="label">{label}</div>
    </a>
  )
}

IconCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}
