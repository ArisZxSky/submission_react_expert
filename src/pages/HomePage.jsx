import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import Avatar from '../components/common/Avatar'
import CategoryFilter from '../components/thread/CategoryFilter'
import ThreadComposerCTA from '../components/thread/ThreadComposerCTA'
import ThreadList from '../components/thread/ThreadList'
import Icon from '../components/icons/Icon'
import { setCategoryFilter } from '../states/categoryFilter/slice'
import { asyncToggleThreadVote } from '../states/shared/voteThunks'
import { showToast } from '../states/ui/slice'

function HomePage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const threads = useSelector((state) => state.threads.items)
  const threadsStatus = useSelector((state) => state.threads.status)
  const users = useSelector((state) => state.users.items)
  const authUser = useSelector((state) => state.authUser.user)
  const selectedCategory = useSelector((state) => state.categoryFilter)

  const categories = useMemo(() => {
    const counts = threads.reduce((result, thread) => {
      const name = thread.category || 'umum'
      result[name] = (result[name] || 0) + 1
      return result
    }, {})

    return [
      { name: 'Semua', count: threads.length },
      ...Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((first, second) => second.count - first.count)
    ]
  }, [threads])

  const visibleThreads = useMemo(() => {
    if (selectedCategory === 'Semua') {
      return threads
    }

    return threads.filter((thread) => (thread.category || 'umum') === selectedCategory)
  }, [threads, selectedCategory])

  const topCategories = categories.filter((category) => category.name !== 'Semua').slice(0, 5)

  const handleVote = async (threadId, intent) => {
    if (!authUser) {
      dispatch(showToast({ type: 'info', message: 'Masuk dulu untuk memberikan vote.' }))
      navigate('/login', { state: { from: '/' } })
      return
    }

    try {
      await dispatch(asyncToggleThreadVote({ threadId, intent })).unwrap()
    } catch (error) {
      dispatch(showToast({ type: 'error', message: error }))
    }
  }

  return (
    <div className='home-page container'>
      <section className='home-hero'>
        <div className='home-hero__copy'>
          <span className='home-hero__eyebrow'><Icon name='spark' size={17} /> Forum untuk tumbuh bersama</span>
          <h1>Satu pertanyaan dapat membuka <em>seribu perspektif.</em></h1>
          <p>Temukan ide, bagikan pengalaman, dan bangun percakapan yang memberi dampak.</p>
          <div className='home-hero__actions'>
            <Link className='button button--primary' to={authUser ? '/threads/new' : '/login'}>
              <Icon name='plus' size={18} /> Mulai diskusi
            </Link>
            <a className='button button--secondary' href='#diskusi-terbaru'>Lihat diskusi</a>
          </div>
        </div>
        <div className='home-hero__visual' aria-hidden='true'>
          <div className='floating-card floating-card--one'>
            <span>💡</span>
            <div><strong>Ide baru</strong><small>dibagikan setiap hari</small></div>
          </div>
          <div className='floating-card floating-card--two'>
            <span>🤝</span>
            <div><strong>Komunitas</strong><small>saling mendukung</small></div>
          </div>
          <div className='hero-bubble'><Icon name='message' size={54} /></div>
        </div>
      </section>

      <ThreadComposerCTA authUser={authUser} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(category) => dispatch(setCategoryFilter(category))}
      />

      <div className='home-layout' id='diskusi-terbaru'>
        <section className='home-feed'>
          <PageHeader
            eyebrow='Percakapan terkini'
            title={selectedCategory === 'Semua' ? 'Diskusi untukmu' : `Topik #${selectedCategory}`}
            description={`${visibleThreads.length} diskusi tersedia untuk dijelajahi.`}
          />

          {threadsStatus === 'loading' && threads.length === 0
            ? (
              <div className='thread-skeletons' aria-label='Memuat thread'>
                {[1, 2, 3].map((item) => <div className='thread-skeleton' key={item} />)}
              </div>
              )
            : (
              <ThreadList
                threads={visibleThreads}
                users={users}
                authUserId={authUser?.id}
                onVote={handleVote}
                emptyAction={(
                  <Button onClick={() => dispatch(setCategoryFilter('Semua'))} variant='secondary'>
                    Lihat semua diskusi
                  </Button>
                )}
              />
              )}
        </section>

        <aside className='home-sidebar'>
          {authUser
            ? (
              <div className='sidebar-card sidebar-profile'>
                <span className='sidebar-card__label'>Profilmu</span>
                <Avatar name={authUser.name} src={authUser.avatar} size='large' />
                <h3>{authUser.name}</h3>
                <p>Siap menambahkan perspektif baru hari ini?</p>
                <Link className='button button--primary button--full' to='/threads/new'>
                  <Icon name='plus' size={18} /> Tulis diskusi
                </Link>
              </div>
              )
            : (
              <div className='sidebar-card sidebar-welcome'>
                <span className='sidebar-card__label'>Mulai berkontribusi</span>
                <div className='sidebar-welcome__icon'><Icon name='spark' size={28} /></div>
                <h3>Suaramu berarti.</h3>
                <p>Bergabung untuk membuat thread, berkomentar, dan memberikan vote.</p>
                <Link className='button button--primary button--full' to='/register'>Buat akun gratis</Link>
                <Link className='sidebar-card__link' to='/login'>Sudah punya akun? Masuk</Link>
              </div>
              )}

          <div className='sidebar-card popular-topics'>
            <div className='sidebar-card__heading'>
              <span className='sidebar-card__label'>Kategori populer</span>
              <Icon name='tag' size={20} />
            </div>
            {topCategories.length > 0
              ? (
                <div className='popular-topics__list'>
                  {topCategories.map((category, index) => (
                    <button
                      type='button'
                      key={category.name}
                      onClick={() => dispatch(setCategoryFilter(category.name))}
                    >
                      <span><small>{String(index + 1).padStart(2, '0')}</small> #{category.name}</span>
                      <strong>{category.count}</strong>
                    </button>
                  ))}
                </div>
                )
              : <p>Belum ada kategori populer.</p>}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default HomePage
