import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearToast } from '../../states/ui/slice'
import Icon from '../icons/Icon'

function Toast () {
  const toast = useSelector((state) => state.ui.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(clearToast())
    }, 3500)

    return () => window.clearTimeout(timeoutId)
  }, [toast, dispatch])

  if (!toast) {
    return null
  }

  return (
    <div className={`toast toast--${toast.type}`} role='status'>
      <Icon name={toast.type === 'success' ? 'check' : 'spark'} size={20} />
      <span>{toast.message}</span>
      <button type='button' onClick={() => dispatch(clearToast())} aria-label='Tutup notifikasi'>
        <Icon name='close' size={18} />
      </button>
    </div>
  )
}

export default Toast
