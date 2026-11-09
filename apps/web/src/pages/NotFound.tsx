import { Link } from 'react-router-dom'
import { HeroMesh } from '../components/HeroMesh'

function NotFound() {
  return (
    <div className="page">
      <header className="hero">
        <HeroMesh />
        <span className="badge">Erro 404</span>
        <h1>Página não encontrada</h1>
        <p>A rota solicitada não existe neste portfólio.</p>
        <div className="cta-row">
          <Link to="/" className="button-link" viewTransition>
            Ir para Home
          </Link>
          <Link to="/contatos" className="button-link secondary" viewTransition>
            Contato
          </Link>
        </div>
      </header>
    </div>
  )
}

export default NotFound
