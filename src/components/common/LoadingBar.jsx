import { useSelector } from 'react-redux'

function LoadingBar () {
  const pendingCount = useSelector((state) => state.ui.pendingCount)

  return (
    <div
      className={`loading-bar ${pendingCount > 0 ? 'loading-bar--active' : ''}`}
      role='progressbar'
      aria-label='Memuat data'
      aria-hidden={pendingCount === 0}
    >
      <span />
    </div>
  )
}

export default LoadingBar
