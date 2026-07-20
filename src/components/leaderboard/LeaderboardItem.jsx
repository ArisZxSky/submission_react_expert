import PropTypes from 'prop-types'
import Avatar from '../common/Avatar'

function LeaderboardItem ({ item, rank }) {
  return (
    <li className='leaderboard-item'>
      <span className='leaderboard-item__number'>{String(rank).padStart(2, '0')}</span>
      <Avatar name={item.user.name} src={item.user.avatar} size='medium' />
      <div className='leaderboard-item__user'>
        <strong>{item.user.name}</strong>
        <span>Kontributor aktif</span>
      </div>
      <div className='leaderboard-item__score'>
        <strong>{item.score}</strong>
        <span>poin</span>
      </div>
    </li>
  )
}

LeaderboardItem.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }).isRequired,
    score: PropTypes.number.isRequired
  }).isRequired,
  rank: PropTypes.number.isRequired
}

export default LeaderboardItem
