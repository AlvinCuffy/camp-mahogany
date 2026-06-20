import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',                label: 'Home' },
  { to: '/register',        label: 'Register' },
  { to: '/admin/qr',        label: 'QR Code' },
  { to: '/admin/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav style={{
      background: '#071810', padding: '12px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }}>
      <Link to="/" style={{
        fontFamily: 'Georgia, serif', fontSize: 18,
        fontWeight: 900, color: '#fff', letterSpacing: 2,
      }}>
        CAMP <span style={{ color: '#F5C400' }}>MAHOGANY</span>
      </Link>
      <div style={{ display: 'flex', gap: 6 }}>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{
            padding: '7px 14px', borderRadius: 6,
            fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
            color: pathname === to ? '#071810' : 'rgba(255,255,255,0.7)',
            background: pathname === to ? '#F5C400' : 'transparent',
            transition: 'all 0.2s',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
