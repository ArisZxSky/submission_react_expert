import { Outlet } from 'react-router-dom'
import Header from './Header'
import MobileNav from './MobileNav'

function AppShell () {
  return (
    <div className='app-shell'>
      <Header />
      <main className='app-main'>
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}

export default AppShell
