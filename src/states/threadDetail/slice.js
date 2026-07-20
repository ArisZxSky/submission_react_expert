import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api'
import { incrementThreadComments } from '../threads/slice'

const asyncFetchThreadDetail = createAsyncThunk(
  'threadDetail/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      return await api.getThreadDetail(threadId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const asyncCreateComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ threadId, content }, { getState, dispatch, rejectWithValue }) => {
    try {
      const comment = await api.createComment({ threadId, content })
      const authUser = getState().authUser.user
      dispatch(incrementThreadComments(threadId))

      const owner = comment.owner && typeof comment.owner === 'object'
        ? comment.owner
        : authUser

      return {
        content,
        createdAt: new Date().toISOString(),
        upVotesBy: [],
        downVotesBy: [],
        ...comment,
        owner
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

function applyVote (target, userId, voteType) {
  target.upVotesBy = (target.upVotesBy || []).filter((id) => id !== userId)
  target.downVotesBy = (target.downVotesBy || []).filter((id) => id !== userId)

  if (voteType === 'up') {
    target.upVotesBy.push(userId)
  }

  if (voteType === 'down') {
    target.downVotesBy.push(userId)
  }
}

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    item: null,
    status: 'idle',
    commentStatus: 'idle',
    error: null
  },
  reducers: {
    clearThreadDetail: (state) => {
      state.item = null
      state.status = 'idle'
      state.error = null
    },
    applyOptimisticDetailVote: (state, action) => {
      if (!state.item || state.item.id !== action.payload.threadId) {
        return
      }

      applyVote(state.item, action.payload.userId, action.payload.voteType)
    },
    restoreDetailVote: (state, action) => {
      if (!state.item || state.item.id !== action.payload.threadId) {
        return
      }

      state.item.upVotesBy = action.payload.upVotesBy
      state.item.downVotesBy = action.payload.downVotesBy
    },
    applyOptimisticCommentVote: (state, action) => {
      if (!state.item) {
        return
      }

      const comment = state.item.comments.find(
        (item) => item.id === action.payload.commentId
      )

      if (comment) {
        applyVote(comment, action.payload.userId, action.payload.voteType)
      }
    },
    restoreCommentVote: (state, action) => {
      if (!state.item) {
        return
      }

      const comment = state.item.comments.find(
        (item) => item.id === action.payload.commentId
      )

      if (comment) {
        comment.upVotesBy = action.payload.upVotesBy
        comment.downVotesBy = action.payload.downVotesBy
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchThreadDetail.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(asyncFetchThreadDetail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.item = {
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
          ...action.payload
        }
      })
      .addCase(asyncFetchThreadDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Gagal memuat detail thread.'
      })
      .addCase(asyncCreateComment.pending, (state) => {
        state.commentStatus = 'loading'
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        state.commentStatus = 'succeeded'

        if (state.item) {
          state.item.comments.unshift(action.payload)
        }
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.commentStatus = 'failed'
        state.error = action.payload || 'Gagal mengirim komentar.'
      })
  }
})

export const {
  clearThreadDetail,
  applyOptimisticDetailVote,
  restoreDetailVote,
  applyOptimisticCommentVote,
  restoreCommentVote
} = threadDetailSlice.actions
export { asyncFetchThreadDetail, asyncCreateComment }
export default threadDetailSlice.reducer
