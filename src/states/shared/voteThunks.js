import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'
import {
  applyOptimisticThreadVote,
  restoreThreadVote
} from '../threads/slice'
import {
  applyOptimisticDetailVote,
  restoreDetailVote,
  applyOptimisticCommentVote,
  restoreCommentVote
} from '../threadDetail/slice'

function resolveVoteType (upVotesBy, downVotesBy, userId, intent) {
  if (intent === 'up' && upVotesBy.includes(userId)) {
    return 'neutral'
  }

  if (intent === 'down' && downVotesBy.includes(userId)) {
    return 'neutral'
  }

  return intent
}

const asyncToggleThreadVote = createAsyncThunk(
  'votes/toggleThreadVote',
  async ({ threadId, intent }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const authUser = state.authUser.user
    const listThread = state.threads.items.find((thread) => thread.id === threadId)
    const detailThread = state.threadDetail.item?.id === threadId
      ? state.threadDetail.item
      : null
    const source = listThread || detailThread

    if (!authUser || !source) {
      return rejectWithValue('Silakan login untuk memberikan vote.')
    }

    const snapshot = {
      list: listThread
        ? {
            upVotesBy: [...(listThread.upVotesBy || [])],
            downVotesBy: [...(listThread.downVotesBy || [])]
          }
        : null,
      detail: detailThread
        ? {
            upVotesBy: [...(detailThread.upVotesBy || [])],
            downVotesBy: [...(detailThread.downVotesBy || [])]
          }
        : null
    }
    const voteType = resolveVoteType(
      source.upVotesBy || [],
      source.downVotesBy || [],
      authUser.id,
      intent
    )
    const optimisticPayload = {
      threadId,
      userId: authUser.id,
      voteType
    }

    dispatch(applyOptimisticThreadVote(optimisticPayload))
    dispatch(applyOptimisticDetailVote(optimisticPayload))

    try {
      await api.voteThread({ threadId, voteType })
      return { threadId, voteType }
    } catch (error) {
      if (snapshot.list) {
        dispatch(restoreThreadVote({ threadId, ...snapshot.list }))
      }

      if (snapshot.detail) {
        dispatch(restoreDetailVote({ threadId, ...snapshot.detail }))
      }

      return rejectWithValue(error.message)
    }
  }
)

const asyncToggleCommentVote = createAsyncThunk(
  'votes/toggleCommentVote',
  async ({ threadId, commentId, intent }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const authUser = state.authUser.user
    const comment = state.threadDetail.item?.comments.find(
      (item) => item.id === commentId
    )

    if (!authUser || !comment) {
      return rejectWithValue('Silakan login untuk memberikan vote.')
    }

    const snapshot = {
      upVotesBy: [...(comment.upVotesBy || [])],
      downVotesBy: [...(comment.downVotesBy || [])]
    }
    const voteType = resolveVoteType(
      comment.upVotesBy || [],
      comment.downVotesBy || [],
      authUser.id,
      intent
    )

    dispatch(applyOptimisticCommentVote({
      commentId,
      userId: authUser.id,
      voteType
    }))

    try {
      await api.voteComment({ threadId, commentId, voteType })
      return { commentId, voteType }
    } catch (error) {
      dispatch(restoreCommentVote({ commentId, ...snapshot }))
      return rejectWithValue(error.message)
    }
  }
)

export { asyncToggleThreadVote, asyncToggleCommentVote }
