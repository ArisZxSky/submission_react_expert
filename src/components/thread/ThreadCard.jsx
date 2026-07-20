import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'
import VoteControl from './VoteControl'
import Icon from '../icons/Icon'
import { createExcerpt, stripHtml } from '../../utils/text'
import { formatFullDate, formatRelativeTime } from '../../utils/date'

function ThreadCard ({ thread, owner, authUserId, onVote, detail = false }) {
  const ownerData = owner || thread.owner || {
    name: 'Pengguna RuangKata',
    avatar: ''
  }

  return (
    <article className={`thread-card ${detail ? 'thread-card--detail' : ''}`}>
      <div className='thread-card__topline'>
        <span className='category-badge'>#{thread.category || 'umum'}</span>
        <time title={formatFullDate(thread.createdAt)} dateTime={thread.createdAt}>
          <Icon name='clock' size={15} />
          {formatRelativeTime(thread.createdAt)}
        </time>
      </div>

      {detail
        ? <h1>{thread.title}</h1>
        : <h2><Link to={`/threads/${thread.id}`}>{thread.title}</Link></h2>}

      {detail
        ? <div className='thread-card__body thread-card__body--full'>{stripHtml(thread.body)}</div>
        : <p className='thread-card__excerpt'>{createExcerpt(thread.body)}</p>}

      <div className='thread-card__footer'>
        <div className='thread-author'>
          <Avatar name={ownerData.name} src={ownerData.avatar} size='small' />
          <div>
            <span>Ditulis oleh</span>
            <strong>{ownerData.name}</strong>
          </div>
        </div>

        <div className='thread-card__metrics'>
          <VoteControl
            upVotesBy={thread.upVotesBy || []}
            downVotesBy={thread.downVotesBy || []}
            authUserId={authUserId}
            onVote={onVote}
            compact={!detail}
          />
          <Link className='comment-count' to={`/threads/${thread.id}`} aria-label={`${thread.totalComments || thread.comments?.length || 0} komentar`}>
            <Icon name='comment' size={18} />
            <span>{thread.totalComments || thread.comments?.length || 0}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    totalComments: PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.object),
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  }).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  }),
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  detail: PropTypes.bool
}

export default ThreadCard
