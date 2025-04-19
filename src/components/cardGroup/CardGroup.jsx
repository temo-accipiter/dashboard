import './CardGroup.scss'
import PropTypes from 'prop-types'

export default function CardGroup({ children }) {
  return <div className="card-group">{children}</div>
}

CardGroup.propTypes = {
  children: PropTypes.node.isRequired,
}
