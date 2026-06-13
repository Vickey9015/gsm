import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { navLinks } from '../data/content'
import './Header.css'

function SiteNav({ open, onClose, className = '' }) {
  return (
    <nav
      className={`header__nav ${open ? 'header__nav--open' : ''} ${className}`.trim()}
      aria-hidden={
        className.includes('header__nav--portal') && !open ? true : undefined
      }
      id="site-nav"
    >
      <ul className="header__links">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive ? 'header__link header__link--active' : 'header__link'
              }
              onClick={onClose}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <Link to="/contact" className="btn btn--primary header__cta" onClick={onClose}>
        Start a conversation
      </Link>
    </nav>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open && mobileNav ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, mobileNav])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)')
    const sync = () => {
      setMobileNav(mq.matches)
      if (!mq.matches) setOpen(false)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const mobileOverlay =
    mobileNav &&
    createPortal(
      <div className={`header__mobile-layer${open ? ' header__mobile-layer--open' : ''}`}>
        <button
          type="button"
          className="header__backdrop"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={closeMenu}
        />
        <SiteNav open={open} onClose={closeMenu} className="header__nav--portal" />
      </div>,
      document.body,
    )

  return (
    <>
      <header className={`header${open ? ' header--open' : ''}`}>
        <div className="header__shell container">
          <div className="header__bar">
            <Link to="/" className="header__brand" onClick={closeMenu}>
              <Logo />
            </Link>

            <button
              type="button"
              className={`header__toggle${open ? ' header__toggle--open' : ''}`}
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {!mobileNav && <SiteNav open={false} onClose={closeMenu} />}
        </div>
      </header>
      {mobileOverlay}
    </>
  )
}
