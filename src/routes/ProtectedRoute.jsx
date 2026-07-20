import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute ({ children }) {
  const authUser = useSelector((state) => state.authUser.user)
  const location = useLocation()

  if (!authUser) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProtectedRoute
