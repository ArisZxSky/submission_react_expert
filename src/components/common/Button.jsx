import PropTypes from 'prop-types'
import Icon from '../icons/Icon'

function Button ({
  children,
  type = 'button',
  variant = 'primary',
  icon,
  disabled = false,
  fullWidth = false,
  onClick,
  className = ''
}) {
  return (
    <button
      type={type}
      className={`button button--${variant} ${fullWidth ? 'button--full' : ''} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default Button
