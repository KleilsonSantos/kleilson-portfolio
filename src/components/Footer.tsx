import { Link } from 'react-router-dom'
import { PROFILE } from '../data/profileData'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <strong>{PROFILE.name}</strong>
          <p className="footer-copy">
            {PROFILE.title} · {PROFILE.location}
          </p>
        </div>

        <nav className="footer-links" aria-label="Links do rodapé">
          <Link to="/">Home</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/projetos">Projetos</Link>
          <Link to="/contatos">Contatos</Link>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>

      <p className="footer-copy">
        © {currentYear} {PROFILE.name}. Conteúdo baseado em experiência profissional verificável.
      </p>
    </footer>
  )
}

export default Footer
