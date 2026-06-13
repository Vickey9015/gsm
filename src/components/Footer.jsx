import { Link } from 'react-router-dom'
import Logo from './Logo'
import { navLinks } from '../data/content'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link">
            <Logo />
          </Link>
          <p className="footer__tagline">
            Strategic growth consultancy — from fragmented growth to structured market leadership.
          </p>
        </div>

        <div>
          <h4 className="footer__heading">Navigate</h4>
          <ul className="footer__links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Our process</h4>
          <p className="footer__process">Diagnose → Strategize → Execute → Scale</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} GSM. All rights reserved.</p>
        <p className="footer__principle">
          Strategy aligns with execution. Positioning aligns with perception.
        </p>
      </div>
    </footer>
  )
}
