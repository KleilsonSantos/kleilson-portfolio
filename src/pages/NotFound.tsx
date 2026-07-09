import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page">
      <header className="hero">
        <span className="badge">Erro 404</span>
        <h1>Página não encontrada</h1>
        <p>A rota solicitada não existe neste portfólio.</p>
        <div className="cta-row">
          <Link to="/" className="button-link">
            Ir para Home
          </Link>
          <Link to="/contatos" className="button-link secondary">
            Contato
          </Link>
        </div>
      </header>
    </div>
  )
}

export default NotFound
