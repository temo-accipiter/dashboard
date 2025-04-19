import './SectionTitle.scss'
import PropTypes from 'prop-types'

export default function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
}
