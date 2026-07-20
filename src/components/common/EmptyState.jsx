import PropTypes from 'prop-types'
import Icon from '../icons/Icon'

function EmptyState ({ title, description, action }) {
  return (
    <div className='empty-state'>
      <div className='empty-state__icon'>
        <Icon name='message' size={32} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.node
}

export default EmptyState
