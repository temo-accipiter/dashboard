import './IconCard.scss'

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
