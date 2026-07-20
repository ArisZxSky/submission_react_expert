import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../states/authUser/slice'
import usersReducer from '../states/users/slice'
import threadsReducer from '../states/threads/slice'
import threadDetailReducer from '../states/threadDetail/slice'
import leaderboardsReducer from '../states/leaderboards/slice'
import categoryFilterReducer from '../states/categoryFilter/slice'
import uiReducer from '../states/ui/slice'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    categoryFilter: categoryFilterReducer,
    ui: uiReducer
  }
})

export default store
