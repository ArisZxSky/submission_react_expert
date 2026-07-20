import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import TextField from '../components/auth/TextField'
import Button from '../components/common/Button'
import { asyncRegister } from '../states/authUser/slice'
import { showToast } from '../states/ui/slice'

function RegisterPage () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const authUser = useSelector((state) => state.authUser.user)
  const status = useSelector((state) => state.authUser.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (authUser) {
    return <Navigate to='/' replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmation) {
      dispatch(showToast({ type: 'error', message: 'Konfirmasi password belum sama.' }))
      return
    }

    try {
      await dispatch(asyncRegister({ name, email, password })).unwrap()
      dispatch(showToast({ type: 'success', message: 'Akun berhasil dibuat. Selamat bergabung!' }))
      navigate('/', { replace: true })
    } catch (error) {
      dispatch(showToast({ type: 'error', message: error }))
    }
  }

  return (
    <AuthLayout
      title='Buat ruang untuk idemu'
      description='Daftar gratis dan mulai berbagi perspektif.'
      alternateText='Sudah punya akun?'
      alternateLink='/login'
      alternateLabel='Masuk di sini'
    >
      <form className='auth-form' onSubmit={handleSubmit}>
        <TextField
          id='register-name'
          label='Nama lengkap'
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder='Nama yang akan tampil'
          autoComplete='name'
          minLength={3}
          required
        />
        <TextField
          id='register-email'
          label='Alamat email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder='nama@email.com'
          autoComplete='email'
          required
        />
        <TextField
          id='register-password'
          label='Password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Minimal 6 karakter'
          autoComplete='new-password'
          minLength={6}
          helpText='Gunakan kombinasi yang mudah kamu ingat dan sulit ditebak.'
          required
        />
        <TextField
          id='register-confirmation'
          label='Ulangi password'
          type='password'
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          placeholder='Ketik ulang password'
          autoComplete='new-password'
          minLength={6}
          required
        />
        <Button type='submit' fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Membuat akun…' : 'Bergabung sekarang'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
