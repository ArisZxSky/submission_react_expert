import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ThreadCard from '../components/thread/ThreadCard'
import CommentForm from '../components/comment/CommentForm'
import CommentList from '../components/comment/CommentList'
import EmptyState from '../components/common/EmptyState'
import Icon from '../components/icons/Icon'
import {
  asyncCreateComment,
  asyncFetchThreadDetail,
  clearThreadDetail
} from '../states/threadDetail/slice'
import {
  asyncToggleCommentVote,
  asyncToggleThreadVote
} from '../states/shared/voteThunks'
import { showToast } from '../states/ui/slice'

function DetailPage () {
  const { threadId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { item: thread, status, commentStatus, error } = useSelector((state) => state.threadDetail)
  const authUser = useSelector((state) => state.authUser.user)

  useEffect(() => {
    dispatch(asyncFetchThreadDetail(threadId))

    return () => {
      dispatch(clearThreadDetail())
    }
  }, [dispatch, threadId])

  const requireAuthentication = () => {
    if (authUser) {
      return true
    }

    dispatch(showToast({ type: 'info', message: 'Masuk untuk ikut berinteraksi.' }))
    navigate('/login', { state: { from: location.pathname } })
    return false
  }

  const handleThreadVote = async (intent) => {
    if (!requireAuthentication()) {
      return
    }

    try {
      await dispatch(asyncToggleThreadVote({ threadId, intent })).unwrap()
    } catch (voteError) {
      dispatch(showToast({ type: 'error', message: voteError }))
    }
  }

  const handleCommentVote = async (commentId, intent) => {
    if (!requireAuthentication()) {
      return
    }

    try {
      await dispatch(asyncToggleCommentVote({ threadId, commentId, intent })).unwrap()
    } catch (voteError) {
      dispatch(showToast({ type: 'error', message: voteError }))
    }
  }

  const handleCommentSubmit = async (content) => {
    try {
      await dispatch(asyncCreateComment({ threadId, content })).unwrap()
      dispatch(showToast({ type: 'success', message: 'Tanggapanmu berhasil dikirim.' }))
      return true
    } catch (commentError) {
      dispatch(showToast({ type: 'error', message: commentError }))
      return false
    }
  }

  if (status === 'loading' || status === 'idle') {
    return (
      <div className='detail-page container detail-loading'>
        <div className='detail-loading__hero' />
        <div className='detail-loading__line' />
        <div className='detail-loading__line detail-loading__line--short' />
      </div>
    )
  }

  if (status === 'failed' || !thread) {
    return (
      <div className='detail-page container'>
        <EmptyState
          title='Diskusi tidak dapat dibuka'
          description={error || 'Thread yang kamu cari mungkin sudah tidak tersedia.'}
          action={<Link className='button button--primary' to='/'>Kembali ke beranda</Link>}
        />
      </div>
    )
  }

  return (
    <div className='detail-page container'>
      <Link className='back-link' to='/'>
        <Icon name='arrowLeft' size={18} /> Kembali ke semua diskusi
      </Link>

      <ThreadCard
        thread={thread}
        authUserId={authUser?.id}
        onVote={handleThreadVote}
        detail
      />

      <section className='discussion-section'>
        <div className='discussion-section__heading'>
          <div>
            <span>Ruang tanggapan</span>
            <h2>{thread.comments.length} Komentar</h2>
          </div>
          <p>Jaga diskusi tetap ramah, relevan, dan bermanfaat.</p>
        </div>

        {authUser
          ? (
            <CommentForm
              authUser={authUser}
              isSubmitting={commentStatus === 'loading'}
              onSubmit={handleCommentSubmit}
            />
            )
          : (
            <div className='login-prompt'>
              <div><Icon name='message' size={25} /></div>
              <p><strong>Punya pendapat?</strong><br />Masuk untuk ikut dalam percakapan ini.</p>
              <Link className='button button--primary' to='/login' state={{ from: location.pathname }}>Masuk</Link>
            </div>
            )}

        <CommentList
          comments={thread.comments}
          authUserId={authUser?.id}
          onVote={handleCommentVote}
        />
      </section>
    </div>
  )
}

export default DetailPage
