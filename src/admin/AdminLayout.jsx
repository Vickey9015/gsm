import { NavLink, Navigate, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './admin.css'

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          GSM <span>Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? 'admin-sidebar__link admin-sidebar__link--active' : 'admin-sidebar__link'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              isActive ? 'admin-sidebar__link admin-sidebar__link--active' : 'admin-sidebar__link'
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/admin/blogs/new"
            className={({ isActive }) =>
              isActive ? 'admin-sidebar__link admin-sidebar__link--active' : 'admin-sidebar__link'
            }
          >
            New post
          </NavLink>
        </nav>
        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-btn">
            View website
          </Link>
          <button type="button" className="admin-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}
