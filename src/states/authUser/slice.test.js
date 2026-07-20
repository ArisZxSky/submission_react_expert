import { describe, expect, it } from 'vitest'
import reducer, {
  asyncLogin,
  asyncPreloadAuth,
  logout
} from './slice'

/*
Skenario pengujian reducer authUser:
1. Harus menandai status loading saat proses preload dimulai.
2. Harus menyimpan pengguna saat login berhasil.
3. Harus menyimpan pesan error saat login gagal.
4. Harus menghapus pengguna saat logout dilakukan.
*/

describe('authUser reducer', () => {
  it('should set loading status when preload starts', () => {
    const nextState = reducer(undefined, asyncPreloadAuth.pending())

    expect(nextState.status).toBe('loading')
  })

  it('should store the authenticated user after a successful login', () => {
    const user = {
      id: 'user-1',
      name: 'Aulia',
      email: 'aulia@example.com',
      avatar: 'https://example.com/avatar.png'
    }
    const nextState = reducer(undefined, asyncLogin.fulfilled(user))

    expect(nextState.status).toBe('succeeded')
    expect(nextState.user).toEqual(user)
  })

  it('should store an error message after a failed login', () => {
    const nextState = reducer(undefined, asyncLogin.rejected(null, '', null, 'Email atau password salah.'))

    expect(nextState.status).toBe('failed')
    expect(nextState.error).toBe('Email atau password salah.')
  })

  it('should clear the authenticated user on logout', () => {
    const previousState = {
      user: { id: 'user-1', name: 'Aulia' },
      status: 'succeeded',
      isPreloadComplete: true,
      error: 'error lama'
    }
    const nextState = reducer(previousState, logout())

    expect(nextState.user).toBeNull()
    expect(nextState.error).toBeNull()
  })
})
