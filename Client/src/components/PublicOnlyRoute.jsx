// Blocks logged-in users from accessing /login and /register
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * PublicOnlyRoute — the inverse of ProtectedRoute.
 *
 * If the user already has an active session, redirect them to their
 * role-appropriate dashboard instead of showing the login/register form.
 *
 * WHY replace:true?
 *   Without it, the redirect pushes a new entry onto the browser history
 *   stack.  The user presses ← Back → hits /login → gets redirected again
 *   → infinite back-button loop.  replace:true OVERWRITES the current
 *   history entry, so Back goes to wherever they were before /login.
 */
export default function PublicOnlyRoute({ children }) {
  const { isLoggedIn, user } = useAuth()

  // Not logged in — show the public page (login or register form)
  if (!isLoggedIn) return children

  // Already logged in — redirect to role-specific dashboard
  if (user?.role === 'admin') return <Navigate to="/dashboard/admin"    replace />
  if (user?.role === 'owner') return <Navigate to="/dashboard/owner"    replace />
  return                             <Navigate to="/"                   replace />
}
