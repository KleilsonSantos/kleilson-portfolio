import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import Footer from './Footer'
import { PROFILE } from '../data/profileData'
import { useTheme } from '../hooks/useTheme'
import { useAnalytics } from '../hooks/useAnalytics'

/** Vitrine em grade usa o container largo (alinhado à navegação); páginas de leitura longa ficam estreitas (ADR-0004 V6). */
const WIDE_PAGES: readonly string[] = ['/', '/projetos', '/contatos']

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contatos', label: 'Contatos' },
] as const

function Layout() {
  const { pathname } = useLocation()
  const isWidePage = WIDE_PAGES.includes(pathname)
  const { isDark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  useAnalytics()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuToggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    document.body.classList.toggle('nav-lock', menuOpen)
    return () => document.body.classList.remove('nav-lock')
  }, [menuOpen])

  return (
    <div className="layout">
      <a className="skip-link" href="#conteudo-principal">
        Ir para o conteúdo
      </a>
      <nav
        className={`navbar${menuOpen ? ' navbar--open' : ''}`}
        aria-label="Navegação principal"
      >
        <div className="navbar__bar">
          <Link to="/" className="logo" viewTransition>
            {PROFILE.shortName}
          </Link>

          <button
            ref={menuToggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle__bars" aria-hidden="true" />
          </button>
        </div>

        <div className="nav-panel" id={menuId}>
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
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {isDark ? '☀︎' : '☾'}
            </span>
            <span className="theme-toggle__label">
              {isDark ? 'Claro' : 'Escuro'}
            </span>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main
        id="conteudo-principal"
        className={`app${isWidePage ? ' app--wide' : ''}`}
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
