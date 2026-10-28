import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'gsm_admin_session'
const DEFAULT_EMAIL = 'admin@consultgsm.com'
const DEFAULT_PASSWORD = 'gsmadmin2026'

const AuthContext = createContext(null)

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.token || !data?.expiresAt) return null
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession())

  const login = useCallback((email, password) => {
    const expectedEmail = normalizeEmail(import.meta.env.VITE_ADMIN_EMAIL || DEFAULT_EMAIL)
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD
    const incomingEmail = normalizeEmail(email)

    if (!incomingEmail || !password) {
      throw new Error('Email and password are required')
    }
    if (incomingEmail !== expectedEmail || password !== expectedPassword) {
      throw new Error('Incorrect email or password')
    }

    const next = {
      token: crypto.randomUUID(),
      email: incomingEmail,
      expiresAt: Date.now() + 1000 * 60 * 60 * 12,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setSession(next)
    return next
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      email: session?.email || '',
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
