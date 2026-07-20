import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import authUserReducer from '../authUser/slice'
import threadsReducer from '../threads/slice'
import reducer, {
  asyncCreateComment,
  asyncFetchThreadDetail
} from './slice'

vi.mock('../../utils/api', () => ({
  default: {
    getThreadDetail: vi.fn(),
    createComment: vi.fn()
  }
}))

/*
Skenario pengujian thunk threadDetail:
1. Fetch detail berhasil harus menyimpan detail thread pada store.
2. Fetch detail gagal harus menyimpan pesan error dari API.
3. Create comment berhasil harus menambah komentar dan total komentar thread.
4. Create comment gagal tidak boleh mengubah daftar komentar.
*/

describe('threadDetail thunks', () => {
  const authUser = {
    id: 'user-1',
    name: 'Aulia',
    email: 'aulia@example.com',
    avatar: 'https://example.com/avatar.png'
  }

  const thread = {
    id: 'thread-1',
    title: 'Thread testing',
    body: 'Isi thread',
    createdAt: '2026-07-19T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  }

  const createStore = () => configureStore({
    reducer: {
      threadDetail: reducer,
      threads: threadsReducer,
      authUser: authUserReducer
    },
    preloadedState: {
      threadDetail: {
        item: {
          ...thread,
          owner: authUser,
          comments: []
        },
        status: 'succeeded',
        commentStatus: 'idle',
        error: null
      },
      threads: {
        items: [thread],
        status: 'succeeded',
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

  it('should store thread detail when fetching succeeds', async () => {
    api.getThreadDetail.mockResolvedValue({
      ...thread,
      owner: authUser,
      comments: []
    })
    const store = createStore()

    const result = await store.dispatch(asyncFetchThreadDetail('thread-1'))

    expect(result.type).toBe('threadDetail/fetchThreadDetail/fulfilled')
    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1')
    expect(store.getState().threadDetail.item.id).toBe('thread-1')
  })

  it('should expose the API error when fetching thread detail fails', async () => {
    api.getThreadDetail.mockRejectedValue(new Error('Detail tidak ditemukan.'))
    const store = createStore()

    const result = await store.dispatch(asyncFetchThreadDetail('thread-404'))

    expect(result.type).toBe('threadDetail/fetchThreadDetail/rejected')
    expect(store.getState().threadDetail.error).toBe('Detail tidak ditemukan.')
  })

  it('should add a comment and increment the list comment total', async () => {
    api.createComment.mockResolvedValue({
      id: 'comment-new',
      content: 'Komentar dari pengujian',
      createdAt: '2026-07-19T02:00:00.000Z',
      owner: authUser,
      upVotesBy: [],
      downVotesBy: []
    })
    const store = createStore()

    const result = await store.dispatch(asyncCreateComment({
      threadId: 'thread-1',
      content: 'Komentar dari pengujian'
    }))

    expect(result.type).toBe('threadDetail/createComment/fulfilled')
    expect(store.getState().threadDetail.item.comments).toHaveLength(1)
    expect(store.getState().threadDetail.item.comments[0].owner).toEqual(authUser)
    expect(store.getState().threads.items[0].totalComments).toBe(1)
  })

  it('should keep comments unchanged when comment creation fails', async () => {
    api.createComment.mockRejectedValue(new Error('Komentar gagal dikirim.'))
    const store = createStore()

    const result = await store.dispatch(asyncCreateComment({
      threadId: 'thread-1',
      content: 'Komentar gagal'
    }))

    expect(result.type).toBe('threadDetail/createComment/rejected')
    expect(store.getState().threadDetail.item.comments).toEqual([])
    expect(store.getState().threadDetail.commentStatus).toBe('failed')
  })
})
