import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import Footer from './Footer'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contatos', label: 'Contatos' },
] as const

function Layout() {
  const { pathname } = useLocation()
  const isWidePage = pathname === '/contatos' || pathname === '/projetos'

  return (
    <div className="layout">
      <nav className="navbar" aria-label="Navegação principal">
        <Link to="/" className="logo">
          Kleilson<span>.</span>
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
