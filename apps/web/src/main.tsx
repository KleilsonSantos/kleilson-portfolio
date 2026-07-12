import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './theme-boot'
import './index.css'
import App from './App'
import { initFrontendSentry, Sentry } from './observability/sentry'

initFrontendSentry()

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found')
}

const Root = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

createRoot(rootElement).render(
  import.meta.env.VITE_SENTRY_DSN ? <Sentry.ErrorBoundary fallback={<p>Algo deu errado.</p>}>{Root}</Sentry.ErrorBoundary> : Root,
)
