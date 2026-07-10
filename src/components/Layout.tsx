import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import Footer from './Footer'
import { PROFILE } from '../data/profileData'
import { useTheme } from '../hooks/useTheme'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contatos', label: 'Contatos' },
] as const

function Layout() {
  const { pathname } = useLocation()
  const isWidePage = pathname === '/contatos' || pathname === '/projetos'
  const { isDark, toggle } = useTheme()

  return (
    <div className="layout">
      <nav className="navbar" aria-label="Navegação principal">
        <Link to="/" className="logo" viewTransition>
          {PROFILE.shortName}
        </Link>
        <div className="nav-end">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  end={item.to === '/'}
                  viewTransition
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
            aria-pressed={isDark}
          >
            {isDark ? 'Tema claro' : 'Tema escuro'}
          </button>
        </div>
      </nav>

      <main className={`app${isWidePage ? ' app--wide' : ''}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
