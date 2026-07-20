import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import LoadingBar from './components/common/LoadingBar'
import Toast from './components/common/Toast'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import NewThreadPage from './pages/NewThreadPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LeaderboardPage from './pages/LeaderboardPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { asyncPreloadAuth } from './states/authUser/slice'
import { asyncFetchUsers } from './states/users/slice'
import { asyncFetchThreads } from './states/threads/slice'

function App () {
  const dispatch = useDispatch()
  const isPreloadComplete = useSelector((state) => state.authUser.isPreloadComplete)

  useEffect(() => {
    dispatch(asyncPreloadAuth())
    dispatch(asyncFetchUsers())
    dispatch(asyncFetchThreads())
  }, [dispatch])

  if (!isPreloadComplete) {
    return (
      <>
        <LoadingBar />
        <div className='app-preload' role='status' aria-live='polite'>
          <div className='app-preload__mark'>R</div>
          <span>Menyiapkan ruang diskusi…</span>
        </div>
      </>
    )
  }

  return (
    <>
      <LoadingBar />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path='threads/:threadId' element={<DetailPage />} />
          <Route
            path='threads/new'
            element={(
              <ProtectedRoute>
                <NewThreadPage />
              </ProtectedRoute>
            )}
          />
          <Route path='leaderboards' element={<LeaderboardPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Routes>
      <Toast />
    </>
  )
}

export default App
