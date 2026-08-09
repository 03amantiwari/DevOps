// Global auth state — user, token, login, logout, 401 listener
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Stores logged-in user object (id, name, role, roles[])
  const [user,  setUser]  = useState(null)
  // Stores JWT string — initialised from localStorage so refresh survives
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  // useNavigate is available here because AuthProvider sits inside <BrowserRouter>
  const navigate = useNavigate()

  // Re-hydrate user from localStorage on page refresh
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored && token) {
      try { setUser(JSON.parse(stored)) } catch { clearSession() }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Internal helper — wipes localStorage and React state ──────────────────
  const clearSession = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  /**
   * logout() — called by Navbar and any other logout trigger.
   * Flow: POST /auth/logout → clearSession() → navigate('/').
   * The API call is fire-and-forget: we still clear locally even if it fails
   * (e.g., token already expired).
   */
  const logout = useCallback(async () => {
    try {
      // Tell the backend to clear its security context for this token
      await authService.callLogout()
    } catch {
      // Backend call failed (expired token, network issue) — still clear locally
    } finally {
      clearSession()
      // replace:true prevents back-button from returning to the protected page
      navigate('/', { replace: true })
    }
  }, [clearSession, navigate])

  /**
   * Listen for the 'auth:unauthorized' event fired by api.js interceptor.
   * This handles 401 responses from ANY API call — avoids window.location.href.
   */
  useEffect(() => {
    const handle401 = () => {
      clearSession()
      navigate('/login', { replace: true })
    }
    window.addEventListener('auth:unauthorized', handle401)
    // Cleanup listener when AuthProvider unmounts
    return () => window.removeEventListener('auth:unauthorized', handle401)
  }, [clearSession, navigate])

  /**
   * login() — called after successful POST /auth/signin.
   * loginResp shape: { id, fullName, roles: ["ROLE_CUSTOMER"], jwt }
   */
  const login = (loginResp) => {
    // Derive a single role string from the roles array
    let role = 'customer'
    if (loginResp.roles?.includes('ROLE_ADMIN')) role = 'admin'
    if (loginResp.roles?.includes('ROLE_OWNER')) role = 'owner'

    const userData = {
      id:       loginResp.id,
      name:     loginResp.fullName,
      fullName: loginResp.fullName,
      roles:    loginResp.roles ?? [],
      // Convenience string used by ProtectedRoute, Navbar, BookTable
      role,
    }
    localStorage.setItem('token', loginResp.jwt)
    localStorage.setItem('user',  JSON.stringify(userData))
    setToken(loginResp.jwt)
    setUser(userData)
  }

  // Convenience flags — components read these instead of parsing roles[]
  const isAdmin    = user?.role === 'admin'
  const isOwner    = user?.role === 'owner'
  const isCustomer = user?.role === 'customer'
  const isLoggedIn = !!token && !!user

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isOwner, isCustomer, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

// Shorthand hook — components call useAuth() instead of useContext(AuthContext)
export const useAuth = () => useContext(AuthContext)
