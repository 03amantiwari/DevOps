// Auth API calls — login, register, logout
import api from './api'

export const authService = {
  register:    (data) => api.post('/auth/signup', data),
  login:       (data) => api.post('/auth/signin', data),

  // Notifies backend to clear server-side security context for this JWT
  // Token is stateless — backend cannot blacklist it without a DB store,
  // but this call clears the thread context and gives a clean audit trail.
  callLogout:  ()     => api.post('/auth/logout'),
}
