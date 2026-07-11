/**
 * Analytics privacy-first — Umami (#65 / ADR-0010).
 * Sem `VITE_UMAMI_SCRIPT_URL` + `VITE_UMAMI_WEBSITE_ID` = no-op (nada pago obrigatório).
 */
type UmamiTracker = {
  track: (payload?: Record<string, unknown>) => void
}

declare global {
  interface Window {
    umami?: UmamiTracker
  }
}

const SCRIPT_ID = 'umami-analytics'

function configured(): { scriptUrl: string; websiteId: string } | null {
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim()
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim()
  if (!scriptUrl || !websiteId) return null
  return { scriptUrl, websiteId }
}

/** Carrega o script só quando env está setado (tipicamente produção). */
export function initUmami(): void {
  const cfg = configured()
  if (!cfg || typeof document === 'undefined') return
  if (document.getElementById(SCRIPT_ID)) return

  const el = document.createElement('script')
  el.id = SCRIPT_ID
  el.defer = true
  el.src = cfg.scriptUrl
  el.dataset.websiteId = cfg.websiteId
  const domains = import.meta.env.VITE_UMAMI_DOMAINS?.trim()
  if (domains) el.dataset.domains = domains
  document.head.appendChild(el)
}

/** Pageview SPA (React Router) — sem PII. */
export function trackPageview(url: string): void {
  if (!configured()) return
  const path = url.split('?')[0] || '/'
  window.umami?.track({ url: path, title: document.title })
}

export function analyticsEnabled(): boolean {
  return configured() !== null
}
