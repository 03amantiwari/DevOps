// Route guard — redirects unauthenticated or wrong-role users
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Props:
 *   children — the page component to render
 *   role     — optional: 'admin' | 'owner' | 'customer'
 *              If provided, user must have that exact role.
 *              If omitted, any logged-in user passes through.
 *
 * Wrong-role redirect sends users to THEIR OWN dashboard (not always '/').
 * Example: a customer who somehow visits /dashboard/owner → goes to /
 *          an owner who visits /dashboard/admin → goes to /dashboard/owner
 */
export default function ProtectedRoute({ children, role }) {
  const { user, token } = useAuth()

  // Not logged in — send to login
  if (!token || !user) return <Navigate to="/login" replace />

  // Wrong role — send to the user's own dashboard, not a generic '/'
  if (role && user.role !== role) {
    const ownDashboard = user.role === 'admin' ? '/dashboard/admin'
                       : user.role === 'owner' ? '/dashboard/owner'
                       : '/'
    return <Navigate to={ownDashboard} replace />
  }

  return children
}
