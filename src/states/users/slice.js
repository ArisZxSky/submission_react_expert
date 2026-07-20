import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api'

const asyncFetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllUsers()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
  {
    condition: (_, { getState }) => getState().users.status !== 'loading'
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(asyncFetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(asyncFetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Gagal memuat pengguna.'
      })
  }
})

export { asyncFetchUsers }
export default usersSlice.reducer
