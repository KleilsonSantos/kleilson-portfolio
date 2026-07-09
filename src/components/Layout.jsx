import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { PROFILE } from '../data/profileData'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contatos', label: 'Contatos' },
]

function Layout() {
  const { pathname } = useLocation()
  const isWidePage = pathname === '/contatos' || pathname === '/projetos'

  return (
    <div className="layout">
      <nav className="navbar" aria-label="Navegação principal">
        <Link to="/" className="logo">
          {PROFILE.shortName}
        </Link>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className={`app${isWidePage ? ' app--wide' : ''}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
