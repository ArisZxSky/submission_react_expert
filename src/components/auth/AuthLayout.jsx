import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from '../icons/Icon'

function AuthLayout ({ title, description, children, alternateText, alternateLink, alternateLabel }) {
  return (
    <section className='auth-page'>
      <div className='auth-page__visual'>
        <Link className='brand brand--light' to='/'>
          <span className='brand__mark'><Icon name='message' size={22} /></span>
          <span className='brand__text'>Ruang<span>Kata</span></span>
        </Link>
        <div className='auth-page__visual-copy'>
          <span className='auth-page__badge'><Icon name='spark' size={16} /> Ruang ide tumbuh</span>
          <h1>Temukan perspektif baru dari setiap percakapan.</h1>
          <p>Bagikan pengalaman, tanyakan hal yang membuatmu penasaran, dan bangun koneksi yang bermakna.</p>
          <div className='auth-points'>
            <span><Icon name='check' size={18} /> Diskusi yang terorganisasi</span>
            <span><Icon name='check' size={18} /> Apresiasi melalui vote</span>
            <span><Icon name='check' size={18} /> Komunitas yang terus tumbuh</span>
          </div>
        </div>
        <div className='auth-page__orb auth-page__orb--one' />
        <div className='auth-page__orb auth-page__orb--two' />
      </div>

      <div className='auth-page__form-panel'>
        <div className='auth-card'>
          <div className='auth-card__heading'>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {children}
          <p className='auth-card__alternate'>
            {alternateText} <Link to={alternateLink}>{alternateLabel}</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  alternateText: PropTypes.string.isRequired,
  alternateLink: PropTypes.string.isRequired,
  alternateLabel: PropTypes.string.isRequired
}

export default AuthLayout
