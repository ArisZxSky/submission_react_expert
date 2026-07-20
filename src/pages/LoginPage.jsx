import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import TextField from '../components/auth/TextField'
import Button from '../components/common/Button'
import { asyncLogin } from '../states/authUser/slice'
import { showToast } from '../states/ui/slice'

function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authUser = useSelector((state) => state.authUser.user)
  const status = useSelector((state) => state.authUser.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  if (authUser) {
    return <Navigate to='/' replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(asyncLogin({ email, password })).unwrap()
      dispatch(showToast({ type: 'success', message: 'Selamat datang kembali di RuangKata.' }))
      navigate(location.state?.from || '/', { replace: true })
    } catch (error) {
      dispatch(showToast({ type: 'error', message: error }))
    }
  }

  return (
    <AuthLayout
      title='Selamat datang kembali'
      description='Masuk untuk melanjutkan percakapanmu.'
      alternateText='Belum punya akun?'
      alternateLink='/register'
      alternateLabel='Daftar sekarang'
    >
      <form className='auth-form' onSubmit={handleSubmit}>
        <TextField
          id='login-email'
          label='Alamat email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder='nama@email.com'
          autoComplete='email'
          required
        />
        <TextField
          id='login-password'
          label='Password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Masukkan password'
          autoComplete='current-password'
          minLength={6}
          required
        />
        <Button type='submit' fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Memproses…' : 'Masuk ke RuangKata'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
