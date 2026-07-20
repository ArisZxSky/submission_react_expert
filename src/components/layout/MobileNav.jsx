import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Icon from '../icons/Icon'

function MobileNav () {
  const authUser = useSelector((state) => state.authUser.user)

  return (
    <nav className='mobile-nav' aria-label='Navigasi seluler'>
      <NavLink to='/' end>
        <Icon name='home' size={21} />
        <span>Jelajah</span>
      </NavLink>
      <NavLink to='/leaderboards'>
        <Icon name='trophy' size={21} />
        <span>Peringkat</span>
      </NavLink>
      <NavLink className='mobile-nav__compose' to={authUser ? '/threads/new' : '/login'}>
        <span><Icon name='plus' size={24} /></span>
        <small>Tulis</small>
      </NavLink>
      <NavLink to={authUser ? '/threads/new' : '/login'}>
        <Icon name='user' size={21} />
        <span>{authUser ? 'Profil' : 'Masuk'}</span>
      </NavLink>
    </nav>
  )
}

export default MobileNav
