import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api'

const asyncFetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getLeaderboards()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
  {
    condition: (_, { getState }) => getState().leaderboards.status !== 'loading'
  }
)

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchLeaderboards.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(asyncFetchLeaderboards.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(asyncFetchLeaderboards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Gagal memuat leaderboard.'
      })
  }
})

export { asyncFetchLeaderboards }
export default leaderboardsSlice.reducer
