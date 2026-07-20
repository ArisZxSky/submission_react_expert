import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import authUserReducer from '../authUser/slice'
import reducer, {
  asyncCreateThread,
  asyncFetchThreads
} from './slice'

vi.mock('../../utils/api', () => ({
  default: {
    getAllThreads: vi.fn(),
    createThread: vi.fn()
  }
}))

/*
Skenario pengujian thunk threads:
1. Fetch threads berhasil harus mengisi daftar thread pada store.
2. Fetch threads gagal harus menyimpan pesan error dari API.
3. Create thread berhasil harus menambahkan thread baru beserta data pemilik.
4. Create thread gagal harus mengubah createStatus menjadi failed.
*/

describe('threads thunks', () => {
  const authUser = {
    id: 'user-1',
    name: 'Aulia',
    email: 'aulia@example.com',
    avatar: 'https://example.com/avatar.png'
  }

  const createStore = () => configureStore({
    reducer: {
      threads: reducer,
      authUser: authUserReducer
    },
    preloadedState: {
      threads: {
        items: [],
        status: 'idle',
        createStatus: 'idle',
        error: null
      },
      authUser: {
        user: authUser,
        status: 'succeeded',
        isPreloadComplete: true,
        error: null
      }
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should store all threads when fetching succeeds', async () => {
    const threads = [{
      id: 'thread-1',
      title: 'Testing React',
      body: 'Isi thread',
      category: 'testing',
      createdAt: '2026-07-19T00:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    }]
    api.getAllThreads.mockResolvedValue(threads)
    const store = createStore()

    const result = await store.dispatch(asyncFetchThreads())

    expect(result.type).toBe('threads/fetchThreads/fulfilled')
    expect(store.getState().threads.items).toEqual(threads)
    expect(store.getState().threads.status).toBe('succeeded')
  })

  it('should expose the API error when fetching threads fails', async () => {
    api.getAllThreads.mockRejectedValue(new Error('Server tidak tersedia.'))
    const store = createStore()

    const result = await store.dispatch(asyncFetchThreads())

    expect(result.type).toBe('threads/fetchThreads/rejected')
    expect(store.getState().threads.error).toBe('Server tidak tersedia.')
  })

  it('should add a newly created thread with its authenticated owner', async () => {
    const formData = {
      title: 'Thread automation testing',
      body: 'Membahas unit dan integration testing.',
      category: 'testing'
    }
    api.createThread.mockResolvedValue({
      id: 'thread-new',
      ownerId: 'user-1',
      createdAt: '2026-07-19T01:00:00.000Z'
    })
    const store = createStore()

    const result = await store.dispatch(asyncCreateThread(formData))
    const createdThread = store.getState().threads.items[0]

    expect(result.type).toBe('threads/createThread/fulfilled')
    expect(createdThread.id).toBe('thread-new')
    expect(createdThread.title).toBe(formData.title)
    expect(createdThread.owner).toEqual(authUser)
    expect(createdThread.upVotesBy).toEqual([])
    expect(createdThread.totalComments).toBe(0)
  })

  it('should mark thread creation as failed when the API rejects', async () => {
    api.createThread.mockRejectedValue(new Error('Thread gagal dibuat.'))
    const store = createStore()

    const result = await store.dispatch(asyncCreateThread({
      title: 'Gagal',
      body: 'Gagal',
      category: 'testing'
    }))

    expect(result.type).toBe('threads/createThread/rejected')
    expect(store.getState().threads.createStatus).toBe('failed')
    expect(store.getState().threads.error).toBe('Thread gagal dibuat.')
  })
})
