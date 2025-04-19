import './PageContainer.scss'
import PropTypes from 'prop-types'

export default function PageContainer({ children }) {
  return <div className="page-container">{children}</div>
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
}
