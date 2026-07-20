import { describe, expect, it } from 'vitest'
import reducer, {
  applyOptimisticThreadVote,
  asyncFetchThreads,
  incrementThreadComments,
  restoreThreadVote
} from './slice'

/*
Skenario pengujian reducer threads:
1. Harus mengembalikan initial state ketika action tidak dikenal diberikan.
2. Harus menerapkan optimistic up-vote dan menghapus down-vote pengguna yang sama.
3. Harus mengembalikan data vote ke snapshot ketika restore dijalankan.
4. Harus menambah jumlah komentar pada thread yang sesuai.
5. Harus menyimpan daftar thread ketika proses fetch berhasil.
*/

describe('threads reducer', () => {
  const initialThread = {
    id: 'thread-1',
    title: 'Thread pertama',
    body: 'Isi thread',
    createdAt: '2026-07-19T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: ['user-2'],
    totalComments: 1
  }

  it('should return the initial state when given an unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' })

    expect(state).toEqual({
      items: [],
      status: 'idle',
      createStatus: 'idle',
      error: null
    })
  })

  it('should apply an optimistic up-vote and remove the previous down-vote', () => {
    const previousState = {
      items: [initialThread],
      status: 'succeeded',
      createStatus: 'idle',
      error: null
    }

    const nextState = reducer(previousState, applyOptimisticThreadVote({
      threadId: 'thread-1',
      userId: 'user-2',
      voteType: 'up'
    }))

    expect(nextState.items[0].upVotesBy).toEqual(['user-2'])
    expect(nextState.items[0].downVotesBy).toEqual([])
  })

  it('should restore votes from a snapshot', () => {
    const previousState = {
      items: [{ ...initialThread, upVotesBy: ['user-2'], downVotesBy: [] }],
      status: 'succeeded',
      createStatus: 'idle',
      error: null
    }

    const nextState = reducer(previousState, restoreThreadVote({
      threadId: 'thread-1',
      upVotesBy: [],
      downVotesBy: ['user-2']
    }))

    expect(nextState.items[0].upVotesBy).toEqual([])
    expect(nextState.items[0].downVotesBy).toEqual(['user-2'])
  })

  it('should increment the comment total for the selected thread', () => {
    const previousState = {
      items: [initialThread],
      status: 'succeeded',
      createStatus: 'idle',
      error: null
    }

    const nextState = reducer(previousState, incrementThreadComments('thread-1'))

    expect(nextState.items[0].totalComments).toBe(2)
  })

  it('should store threads when fetching succeeds', () => {
    const payload = [initialThread]
    const nextState = reducer(undefined, asyncFetchThreads.fulfilled(payload))

    expect(nextState.status).toBe('succeeded')
    expect(nextState.items).toEqual(payload)
  })
})
