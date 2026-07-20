import PropTypes from 'prop-types'

function Avatar ({ name, src, size = 'medium', rank }) {
  const initials = (name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <div className={`avatar avatar--${size}`} title={name}>
      {src
        ? <img src={src} alt={`Avatar ${name}`} />
        : <span>{initials}</span>}
      {rank && <span className='avatar__rank'>{rank}</span>}
    </div>
  )
}

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'hero']),
  rank: PropTypes.number
}

export default Avatar
