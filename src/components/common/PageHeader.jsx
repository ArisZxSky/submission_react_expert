import PropTypes from 'prop-types'

function PageHeader ({ eyebrow, title, description, action }) {
  return (
    <div className='page-header'>
      <div>
        {eyebrow && <span className='page-header__eyebrow'>{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className='page-header__action'>{action}</div>}
    </div>
  )
}

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node
}

export default PageHeader
