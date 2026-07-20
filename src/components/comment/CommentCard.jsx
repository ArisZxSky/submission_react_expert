import PropTypes from 'prop-types'
import Avatar from '../common/Avatar'
import VoteControl from '../thread/VoteControl'
import { formatFullDate, formatRelativeTime } from '../../utils/date'
import { stripHtml } from '../../utils/text'

function CommentCard ({ comment, authUserId, onVote }) {
  const owner = comment.owner || {
    name: 'Pengguna RuangKata',
    avatar: ''
  }

  return (
    <article className='comment-card'>
      <Avatar name={owner.name} src={owner.avatar} size='medium' />
      <div className='comment-card__content'>
        <div className='comment-card__heading'>
          <div>
            <strong>{owner.name}</strong>
            <time title={formatFullDate(comment.createdAt)} dateTime={comment.createdAt}>
              {formatRelativeTime(comment.createdAt)}
            </time>
          </div>
          <VoteControl
            upVotesBy={comment.upVotesBy || []}
            downVotesBy={comment.downVotesBy || []}
            authUserId={authUserId}
            onVote={onVote}
            compact
          />
        </div>
        <p>{stripHtml(comment.content)}</p>
      </div>
    </article>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  }).isRequired,
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired
}

export default CommentCard
