import PropTypes from 'prop-types'
import CommentCard from './CommentCard'
import EmptyState from '../common/EmptyState'

function CommentList ({ comments, authUserId, onVote }) {
  if (comments.length === 0) {
    return (
      <EmptyState
        title='Belum ada tanggapan'
        description='Mulai percakapan dengan memberikan sudut pandang pertamamu.'
      />
    )
  }

  return (
    <div className='comment-list'>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          authUserId={authUserId}
          onVote={(intent) => onVote(comment.id, intent)}
        />
      ))}
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired
}

export default CommentList
