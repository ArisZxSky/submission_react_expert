import PropTypes from 'prop-types'
import Icon from '../icons/Icon'

function VoteControl ({ upVotesBy = [], downVotesBy = [], authUserId, onVote, compact = false }) {
  const isUpVoted = authUserId ? upVotesBy.includes(authUserId) : false
  const isDownVoted = authUserId ? downVotesBy.includes(authUserId) : false

  return (
    <div className={`vote-control ${compact ? 'vote-control--compact' : ''}`} aria-label='Kontrol vote'>
      <button
        type='button'
        className={isUpVoted ? 'is-active is-up' : ''}
        onClick={() => onVote('up')}
        aria-pressed={isUpVoted}
        aria-label='Up-vote'
      >
        <Icon name='up' size={18} />
        <span>{upVotesBy.length}</span>
      </button>
      <button
        type='button'
        className={isDownVoted ? 'is-active is-down' : ''}
        onClick={() => onVote('down')}
        aria-pressed={isDownVoted}
        aria-label='Down-vote'
      >
        <Icon name='down' size={18} />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  )
}

VoteControl.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  compact: PropTypes.bool
}

export default VoteControl
