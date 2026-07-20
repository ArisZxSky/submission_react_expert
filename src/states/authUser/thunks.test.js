import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import reducer, {
  asyncLogin,
  asyncPreloadAuth,
  asyncRegister
} from './slice'

vi.mock('../../utils/api', () => ({
  default: {
    getAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
    login: vi.fn(),
    putAccessToken: vi.fn(),
    removeAccessToken: vi.fn(),
    register: vi.fn()
  }
}))

/*
Skenario pengujian thunk autentikasi:
1. Preload harus selesai tanpa memanggil profil ketika token tidak tersedia.
2. Login berhasil harus menyimpan token dan profil pengguna ke store.
3. Login gagal harus menghapus token dan menyimpan pesan kegagalan.
4. Registrasi berhasil harus dilanjutkan dengan login otomatis.
*/

describe('authUser thunks', () => {
  const createStore = () => configureStore({
    reducer: {
      authUser: reducer
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should finish preload without requesting a profile when access token is absent', async () => {
    api.getAccessToken.mockReturnValue(null)
    const store = createStore()

    const result = await store.dispatch(asyncPreloadAuth())

    expect(result.type).toBe('authUser/preload/fulfilled')
    expect(api.getOwnProfile).not.toHaveBeenCalled()
    expect(store.getState().authUser.isPreloadComplete).toBe(true)
    expect(store.getState().authUser.user).toBeNull()
  })

  it('should save the access token and authenticated profile after login succeeds', async () => {
    const credentials = {
      email: 'aulia@example.com',
      password: 'rahasia123'
    }
    const user = {
      id: 'user-1',
      name: 'Aulia',
      email: credentials.email
    }
    api.login.mockResolvedValue('token-123')
    api.getOwnProfile.mockResolvedValue(user)
    const store = createStore()

    const result = await store.dispatch(asyncLogin(credentials))

    expect(result.type).toBe('authUser/login/fulfilled')
    expect(api.login).toHaveBeenCalledWith(credentials)
    expect(api.putAccessToken).toHaveBeenCalledWith('token-123')
    expect(store.getState().authUser.user).toEqual(user)
  })

  it('should remove the token and expose the error when login fails', async () => {
    api.login.mockRejectedValue(new Error('Email atau password salah.'))
    const store = createStore()

    const result = await store.dispatch(asyncLogin({
      email: 'salah@example.com',
      password: 'salah123'
    }))

    expect(result.type).toBe('authUser/login/rejected')
    expect(result.payload).toBe('Email atau password salah.')
    expect(api.removeAccessToken).toHaveBeenCalledOnce()
    expect(store.getState().authUser.error).toBe('Email atau password salah.')
  })

  it('should register and automatically login the new account', async () => {
    const account = {
      name: 'Aulia',
      email: 'aulia@example.com',
      password: 'rahasia123'
    }
    const user = {
      id: 'user-1',
      name: account.name,
      email: account.email
    }
    api.register.mockResolvedValue(user)
    api.login.mockResolvedValue('token-baru')
    api.getOwnProfile.mockResolvedValue(user)
    const store = createStore()

    const result = await store.dispatch(asyncRegister(account))

    expect(result.type).toBe('authUser/register/fulfilled')
    expect(api.register).toHaveBeenCalledWith(account)
    expect(api.login).toHaveBeenCalledWith({
      email: account.email,
      password: account.password
    })
    expect(api.putAccessToken).toHaveBeenCalledWith('token-baru')
    expect(store.getState().authUser.user).toEqual(user)
  })
})
