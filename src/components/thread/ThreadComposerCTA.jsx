import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'
import Icon from '../icons/Icon'

function ThreadComposerCTA ({ authUser }) {
  return (
    <div className='composer-cta'>
      <Avatar
        name={authUser?.name || 'Tamu'}
        src={authUser?.avatar}
        size='medium'
      />
      <Link to={authUser ? '/threads/new' : '/login'}>
        Apa yang ingin kamu diskusikan hari ini?
      </Link>
      <Link className='composer-cta__button' to={authUser ? '/threads/new' : '/login'} aria-label='Tulis thread baru'>
        <Icon name='plus' size={21} />
      </Link>
    </div>
  )
}

ThreadComposerCTA.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  })
}

export default ThreadComposerCTA
