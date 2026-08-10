// Centralized Axios instance — base URL, auth header, global error handling
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8082/api/v1',
  headers: { 'Content-Type': 'application/json',
     'ngrok-skip-browser-warning': 'true' 
   }
})

// Request interceptor — attaches JWT token to every outbound request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/**
 * Response interceptor — handles 401 Unauthorized globally.
 *
 * WHY a custom event instead of window.location.href:
 *   - window.location.href does a full page reload, bypassing React Router.
 *   - React hooks (useNavigate) cannot be used outside components.
 *   - Solution: fire a custom browser event that AuthContext listens for.
 *     AuthContext calls logout() (clears state + localStorage) then navigates.
 */
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Fire custom event — AuthContext listener handles state cleanup + redirect
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default api
