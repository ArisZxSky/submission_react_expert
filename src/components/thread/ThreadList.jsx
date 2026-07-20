import PropTypes from 'prop-types'
import ThreadCard from './ThreadCard'
import EmptyState from '../common/EmptyState'

function ThreadList ({ threads, users, authUserId, onVote, emptyAction }) {
  if (threads.length === 0) {
    return (
      <EmptyState
        title='Belum ada diskusi di kategori ini'
        description='Jadilah orang pertama yang membuka percakapan dan mengundang perspektif baru.'
        action={emptyAction}
      />
    )
  }

  return (
    <div className='thread-list'>
      {threads.map((thread) => (
        <ThreadCard
          key={thread.id}
          thread={thread}
          owner={users.find((user) => user.id === thread.ownerId)}
          authUserId={authUserId}
          onVote={(intent) => onVote(thread.id, intent)}
        />
      ))}
    </div>
  )
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  emptyAction: PropTypes.node
}

export default ThreadList
