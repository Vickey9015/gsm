import logoGsm from '../assets/logo-gsm.png'
import './Logo.css'

export default function Logo({ className = '' }) {
  return (
    <span className={`brand-logo__frame ${className}`.trim()}>
      <img
        src={logoGsm}
        alt="GSM — Growth Strategy Management"
        className="brand-logo"
        decoding="async"
      />
    </span>
  )
}
