import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import authUserReducer from '../authUser/slice'
import threadDetailReducer from '../threadDetail/slice'
import threadsReducer from '../threads/slice'
import {
  asyncToggleCommentVote,
  asyncToggleThreadVote
} from './voteThunks'

vi.mock('../../utils/api', () => ({
  default: {
    voteThread: vi.fn(),
    voteComment: vi.fn()
  }
}))

/*
Skenario pengujian thunk votes:
1. Up-vote thread harus diterapkan secara optimistis sebelum API selesai.
2. Menekan vote aktif kembali harus mengirim neutral-vote.
3. Kegagalan vote thread harus mengembalikan state ke snapshot awal.
4. Vote komentar harus memperbarui komentar yang dipilih dan memanggil API.
*/

describe('vote thunks', () => {
  const authUser = {
    id: 'user-1',
    name: 'Aulia'
  }

  const baseThread = {
    id: 'thread-1',
    title: 'Vote testing',
    body: 'Isi thread',
    createdAt: '2026-07-19T00:00:00.000Z',
    ownerId: 'user-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 1
  }

  const createStore = ({ upVotesBy = [], downVotesBy = [] } = {}) => {
    const thread = {
      ...baseThread,
      upVotesBy,
      downVotesBy
    }

    return configureStore({
      reducer: {
        threads: threadsReducer,
        threadDetail: threadDetailReducer,
        authUser: authUserReducer
      },
      preloadedState: {
        threads: {
          items: [thread],
          status: 'succeeded',
          createStatus: 'idle',
          error: null
        },
        threadDetail: {
          item: {
            ...thread,
            comments: [{
              id: 'comment-1',
              content: 'Komentar',
              upVotesBy: [],
              downVotesBy: []
            }]
          },
          status: 'succeeded',
          commentStatus: 'idle',
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
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should optimistically up-vote both list and detail thread', async () => {
    api.voteThread.mockResolvedValue({})
    const store = createStore()

    const pendingDispatch = store.dispatch(asyncToggleThreadVote({
      threadId: 'thread-1',
      intent: 'up'
    }))

    expect(store.getState().threads.items[0].upVotesBy).toEqual(['user-1'])
    expect(store.getState().threadDetail.item.upVotesBy).toEqual(['user-1'])

    const result = await pendingDispatch
    expect(result.type).toBe('votes/toggleThreadVote/fulfilled')
    expect(api.voteThread).toHaveBeenCalledWith({
      threadId: 'thread-1',
      voteType: 'up'
    })
  })

  it('should send a neutral vote when the same active vote is clicked', async () => {
    api.voteThread.mockResolvedValue({})
    const store = createStore({ upVotesBy: ['user-1'] })

    const result = await store.dispatch(asyncToggleThreadVote({
      threadId: 'thread-1',
      intent: 'up'
    }))

    expect(result.payload.voteType).toBe('neutral')
    expect(store.getState().threads.items[0].upVotesBy).toEqual([])
    expect(api.voteThread).toHaveBeenCalledWith({
      threadId: 'thread-1',
      voteType: 'neutral'
    })
  })

  it('should restore the previous thread votes when the API fails', async () => {
    api.voteThread.mockRejectedValue(new Error('Vote gagal disimpan.'))
    const store = createStore({ downVotesBy: ['user-1'] })

    const result = await store.dispatch(asyncToggleThreadVote({
      threadId: 'thread-1',
      intent: 'up'
    }))

    expect(result.type).toBe('votes/toggleThreadVote/rejected')
    expect(store.getState().threads.items[0].upVotesBy).toEqual([])
    expect(store.getState().threads.items[0].downVotesBy).toEqual(['user-1'])
    expect(store.getState().threadDetail.item.downVotesBy).toEqual(['user-1'])
  })

  it('should optimistically vote the selected comment and call the API', async () => {
    api.voteComment.mockResolvedValue({})
    const store = createStore()

    const result = await store.dispatch(asyncToggleCommentVote({
      threadId: 'thread-1',
      commentId: 'comment-1',
      intent: 'down'
    }))

    expect(result.type).toBe('votes/toggleCommentVote/fulfilled')
    expect(store.getState().threadDetail.item.comments[0].downVotesBy).toEqual(['user-1'])
    expect(api.voteComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      commentId: 'comment-1',
      voteType: 'down'
    })
  })
})
