import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    pendingCount: 0,
    toast: null
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message
      }
    },
    clearToast: (state) => {
      state.toast = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.pendingCount += 1
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state) => {
          state.pendingCount = Math.max(0, state.pendingCount - 1)
        }
      )
  }
})

export const { showToast, clearToast } = uiSlice.actions
export default uiSlice.reducer
