import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/common/PageHeader'
import EmptyState from '../components/common/EmptyState'
import Avatar from '../components/common/Avatar'
import LeaderboardItem from '../components/leaderboard/LeaderboardItem'
import Icon from '../components/icons/Icon'
import { asyncFetchLeaderboards } from '../states/leaderboards/slice'

function LeaderboardPage () {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.leaderboards)
  const podium = items.slice(0, 3)
  const rest = items.slice(3)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(asyncFetchLeaderboards())
    }
  }, [dispatch, status])

  return (
    <div className='leaderboard-page container'>
      <section className='leaderboard-hero'>
        <div className='leaderboard-hero__copy'>
          <span><Icon name='trophy' size={17} /> Kontributor terbaik</span>
          <h1>Apresiasi untuk suara yang <em>menghidupkan diskusi.</em></h1>
          <p>Peringkat dihitung dari kontribusi dan apresiasi komunitas.</p>
        </div>
        <div className='leaderboard-hero__medal'><Icon name='trophy' size={62} /></div>
      </section>

      {status === 'loading' && items.length === 0 && (
        <div className='leaderboard-skeletons'>
          {[1, 2, 3, 4, 5].map((item) => <div className='leaderboard-skeleton' key={item} />)}
        </div>
      )}

      {status === 'failed' && (
        <EmptyState
          title='Leaderboard belum dapat dimuat'
          description={error || 'Silakan coba kembali beberapa saat lagi.'}
        />
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <section className='podium' aria-label='Tiga kontributor teratas'>
            {podium.map((item, index) => {
              const rank = index + 1
              return (
                <article className={`podium-card podium-card--${rank}`} key={item.user.id}>
                  <span className='podium-card__rank'>#{rank}</span>
                  <Avatar name={item.user.name} src={item.user.avatar} size='hero' rank={rank} />
                  <h2>{item.user.name}</h2>
                  <p><strong>{item.score}</strong> poin kontribusi</p>
                </article>
              )
            })}
          </section>

          <section className='leaderboard-list-card'>
            <PageHeader
              eyebrow='Papan peringkat'
              title='Kontributor lainnya'
              description='Terus berbagi hal bermanfaat untuk naik peringkat.'
            />
            {rest.length > 0
              ? <ol className='leaderboard-list'>{rest.map((item, index) => <LeaderboardItem key={item.user.id} item={item} rank={index + 4} />)}</ol>
              : <p className='leaderboard-list-card__empty'>Belum ada kontributor lain.</p>}
          </section>
        </>
      )}
    </div>
  )
}

export default LeaderboardPage
