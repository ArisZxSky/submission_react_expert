import { Link } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState'

function NotFoundPage () {
  return (
    <div className='not-found-page container'>
      <span className='not-found-page__code'>404</span>
      <EmptyState
        title='Halaman ini tersesat dalam diskusi'
        description='Alamat yang kamu buka tidak ditemukan atau sudah dipindahkan.'
        action={<Link className='button button--primary' to='/'>Kembali menjelajah</Link>}
      />
    </div>
  )
}

export default NotFoundPage
