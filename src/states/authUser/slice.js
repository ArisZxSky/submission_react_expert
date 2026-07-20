import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api'

const asyncPreloadAuth = createAsyncThunk(
  'authUser/preload',
  async (_, { rejectWithValue }) => {
    const token = api.getAccessToken()

    if (!token) {
      return null
    }

    try {
      return await api.getOwnProfile()
    } catch (error) {
      api.removeAccessToken()
      return rejectWithValue(error.message)
    }
  },
  {
    condition: (_, { getState }) => getState().authUser.status !== 'loading'
  }
)

const asyncLogin = createAsyncThunk(
  'authUser/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await api.login(credentials)
      api.putAccessToken(token)
      return await api.getOwnProfile()
    } catch (error) {
      api.removeAccessToken()
      return rejectWithValue(error.message)
    }
  }
)

const asyncRegister = createAsyncThunk(
  'authUser/register',
  async (account, { rejectWithValue }) => {
    try {
      await api.register(account)
      const token = await api.login({
        email: account.email,
        password: account.password
      })
      api.putAccessToken(token)
      return await api.getOwnProfile()
    } catch (error) {
      api.removeAccessToken()
      return rejectWithValue(error.message)
    }
  }
)

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    user: null,
    status: 'idle',
    isPreloadComplete: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      api.removeAccessToken()
      state.user = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncPreloadAuth.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncPreloadAuth.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isPreloadComplete = true
      })
      .addCase(asyncPreloadAuth.rejected, (state, action) => {
        state.status = 'failed'
        state.user = null
        state.error = action.payload
        state.isPreloadComplete = true
      })
      .addCase(asyncLogin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(asyncRegister.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { logout } = authUserSlice.actions
export { asyncPreloadAuth, asyncLogin, asyncRegister }
export default authUserSlice.reducer
