import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../states/authUser/slice'
import { showToast } from '../../states/ui/slice'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Icon from '../icons/Icon'

function Header () {
  const authUser = useSelector((state) => state.authUser.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(showToast({ type: 'success', message: 'Sampai jumpa! Kamu berhasil keluar.' }))
    navigate('/')
  }

  return (
    <header className='site-header'>
      <div className='site-header__inner container'>
        <Link className='brand' to='/' aria-label='RuangKata beranda'>
          <span className='brand__mark'><Icon name='message' size={22} /></span>
          <span className='brand__text'>Ruang<span>Kata</span></span>
        </Link>

        <nav className='desktop-nav' aria-label='Navigasi utama'>
          <NavLink to='/' end>
            <Icon name='home' size={18} />
            Jelajah
          </NavLink>
          <NavLink to='/leaderboards'>
            <Icon name='trophy' size={18} />
            Peringkat
          </NavLink>
        </nav>

        <div className='site-header__actions'>
          {authUser
            ? (
              <>
                <Link className='header-profile' to='/threads/new'>
                  <Avatar name={authUser.name} src={authUser.avatar} size='small' />
                  <span>{authUser.name}</span>
                </Link>
                <Button variant='ghost' icon='logout' onClick={handleLogout}>Keluar</Button>
              </>
              )
            : (
              <>
                <Link className='header-login' to='/login'>Masuk</Link>
                <Link className='button button--primary header-register' to='/register'>
                  Mulai bergabung
                </Link>
              </>
              )}
        </div>
      </div>
    </header>
  )
}

export default Header
