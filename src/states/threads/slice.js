import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api'

const asyncFetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllThreads()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
  {
    condition: (_, { getState }) => getState().threads.status !== 'loading'
  }
)

const asyncCreateThread = createAsyncThunk(
  'threads/createThread',
  async (threadData, { getState, rejectWithValue }) => {
    try {
      const thread = await api.createThread(threadData)
      const authUser = getState().authUser.user

      return {
        ...threadData,
        createdAt: new Date().toISOString(),
        ownerId: thread.ownerId || thread.owner || authUser?.id,
        owner: authUser,
        ...thread
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

function applyVote (thread, userId, voteType) {
  thread.upVotesBy = (thread.upVotesBy || []).filter((id) => id !== userId)
  thread.downVotesBy = (thread.downVotesBy || []).filter((id) => id !== userId)

  if (voteType === 'up') {
    thread.upVotesBy.push(userId)
  }

  if (voteType === 'down') {
    thread.downVotesBy.push(userId)
  }
}

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    items: [],
    status: 'idle',
    createStatus: 'idle',
    error: null
  },
  reducers: {
    applyOptimisticThreadVote: (state, action) => {
      const { threadId, userId, voteType } = action.payload
      const thread = state.items.find((item) => item.id === threadId)

      if (thread) {
        applyVote(thread, userId, voteType)
      }
    },
    restoreThreadVote: (state, action) => {
      const { threadId, upVotesBy, downVotesBy } = action.payload
      const thread = state.items.find((item) => item.id === threadId)

      if (thread) {
        thread.upVotesBy = upVotesBy
        thread.downVotesBy = downVotesBy
      }
    },
    incrementThreadComments: (state, action) => {
      const thread = state.items.find((item) => item.id === action.payload)

      if (thread) {
        thread.totalComments = (thread.totalComments || 0) + 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchThreads.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(asyncFetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(asyncFetchThreads.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Gagal memuat thread.'
      })
      .addCase(asyncCreateThread.pending, (state) => {
        state.createStatus = 'loading'
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.createStatus = 'succeeded'
        state.items.unshift({
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
          ...action.payload
        })
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.error = action.payload || 'Gagal membuat thread.'
      })
  }
})

export const {
  applyOptimisticThreadVote,
  restoreThreadVote,
  incrementThreadComments
} = threadsSlice.actions
export { asyncFetchThreads, asyncCreateThread }
export default threadsSlice.reducer
