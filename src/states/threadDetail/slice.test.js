import { describe, expect, it } from 'vitest'
import reducer, {
  applyOptimisticCommentVote,
  applyOptimisticDetailVote,
  asyncFetchThreadDetail,
  clearThreadDetail,
  restoreCommentVote
} from './slice'

/*
Skenario pengujian reducer threadDetail:
1. Harus membersihkan detail thread dan mengembalikan status menjadi idle.
2. Harus menerapkan optimistic vote pada detail thread yang sedang aktif.
3. Harus menerapkan optimistic vote pada komentar yang dipilih.
4. Harus mengembalikan vote komentar ke snapshot sebelumnya.
5. Harus menambahkan nilai default vote dan komentar saat fetch detail berhasil.
*/

describe('threadDetail reducer', () => {
  const detailState = {
    item: {
      id: 'thread-1',
      title: 'Detail thread',
      body: 'Isi lengkap',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar',
          upVotesBy: [],
          downVotesBy: ['user-1']
        }
      ]
    },
    status: 'succeeded',
    commentStatus: 'idle',
    error: 'error lama'
  }

  it('should clear the current thread detail', () => {
    const nextState = reducer(detailState, clearThreadDetail())

    expect(nextState.item).toBeNull()
    expect(nextState.status).toBe('idle')
    expect(nextState.error).toBeNull()
  })

  it('should optimistically up-vote the active thread detail', () => {
    const nextState = reducer(detailState, applyOptimisticDetailVote({
      threadId: 'thread-1',
      userId: 'user-1',
      voteType: 'up'
    }))

    expect(nextState.item.upVotesBy).toEqual(['user-1'])
    expect(nextState.item.downVotesBy).toEqual([])
  })

  it('should optimistically up-vote the selected comment', () => {
    const nextState = reducer(detailState, applyOptimisticCommentVote({
      commentId: 'comment-1',
      userId: 'user-1',
      voteType: 'up'
    }))

    expect(nextState.item.comments[0].upVotesBy).toEqual(['user-1'])
    expect(nextState.item.comments[0].downVotesBy).toEqual([])
  })

  it('should restore comment votes from a snapshot', () => {
    const votedState = {
      ...detailState,
      item: {
        ...detailState.item,
        comments: [{
          ...detailState.item.comments[0],
          upVotesBy: ['user-1'],
          downVotesBy: []
        }]
      }
    }

    const nextState = reducer(votedState, restoreCommentVote({
      commentId: 'comment-1',
      upVotesBy: [],
      downVotesBy: ['user-1']
    }))

    expect(nextState.item.comments[0].upVotesBy).toEqual([])
    expect(nextState.item.comments[0].downVotesBy).toEqual(['user-1'])
  })

  it('should add safe defaults when fetching thread detail succeeds', () => {
    const payload = {
      id: 'thread-2',
      title: 'Tanpa vote',
      body: 'Body'
    }
    const nextState = reducer(undefined, asyncFetchThreadDetail.fulfilled(payload))

    expect(nextState.item).toEqual({
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
      ...payload
    })
    expect(nextState.status).toBe('succeeded')
  })
})
