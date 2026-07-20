import { createSlice } from '@reduxjs/toolkit'

const categoryFilterSlice = createSlice({
  name: 'categoryFilter',
  initialState: 'Semua',
  reducers: {
    setCategoryFilter: (state, action) => action.payload,
    resetCategoryFilter: () => 'Semua'
  }
})

export const { setCategoryFilter, resetCategoryFilter } = categoryFilterSlice.actions
export default categoryFilterSlice.reducer
