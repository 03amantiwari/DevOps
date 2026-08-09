// Top navigation bar — search, city selector, auth links by role
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  // Read user object and role flags from global auth context
  const { user, logout, isAdmin, isOwner, isCustomer } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Calls async logout() in AuthContext which: POSTs /auth/logout, clears
  // localStorage, clears React state, then navigates to / with replace:true
  const handleLogout = async () => {
    setMenuOpen(false)
    await logout()  // navigation happens inside AuthContext.logout()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Brand logo — navigates to home */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">ES</span>
          </div>
          <span className="font-display font-bold text-xl text-gray-900 hidden sm:block">EasySeat</span>
        </Link>

        {/* Static page links — visible to all users */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/about"   className="text-sm text-gray-600 hover:text-brand-500 transition-colors">About</Link>
          <Link to="/help"    className="text-sm text-gray-600 hover:text-brand-500 transition-colors">Help</Link>
          <Link to="/contact" className="text-sm text-gray-600 hover:text-brand-500 transition-colors">Contact</Link>
        </div>

        {/* Spacer — pushes auth buttons to right on mobile */}
        <div className="flex-1" />

        {/* Auth section */}
        <div className="flex items-center gap-3 shrink-0 relative">
          {user ? (
            <>
              {/* Role-specific quick link */}
              {isCustomer && (
                <Link to="/dashboard/customer" className="hidden sm:block text-sm font-medium text-gray-700 hover:text-brand-500">
                  My Dashboard
                </Link>
              )}
              {isOwner && (
                <Link to="/dashboard/owner" className="hidden sm:block text-sm font-medium text-gray-700 hover:text-brand-500">
                  Owner Panel
                </Link>
              )}
              {isAdmin && (
                <Link to="/dashboard/admin" className="hidden sm:block text-sm font-medium text-brand-500 hover:text-brand-600 font-semibold">
                  Admin Panel
                </Link>
              )}

              {/* User avatar + dropdown */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 hover:bg-gray-200 transition-colors"
              >
                <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user.name?.[0]}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name?.split(' ')[0]}</span>
              </button>

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute right-0 top-10 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-48 z-50">
                  <p className="px-4 py-1.5 text-xs text-gray-400 uppercase tracking-wide">{user.role}</p>
                  <hr className="border-gray-100" />
                  {isCustomer && (
                    <>
                      <Link to="/dashboard/customer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>My Dashboard</Link>
                      <Link to="/my-bookings"        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                    </>
                  )}
                  {isOwner && (
                    <Link to="/dashboard/owner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Owner Panel</Link>
                  )}
                  {isAdmin && (
                    <Link to="/dashboard/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                  )}
                  <hr className="my-1 border-gray-100" />
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login"    className="text-sm font-medium text-gray-700 hover:text-brand-500 transition-colors">Sign In</Link>
              <Link to="/register" className="bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
