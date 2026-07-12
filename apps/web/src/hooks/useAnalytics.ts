import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initUmami, trackPageview } from '../observability/analytics'

/** Liga Umami (se env) e registra pageviews em navegações SPA. */
export function useAnalytics(): void {
  const { pathname, search } = useLocation()

  useEffect(() => {
    initUmami()
  }, [])

  useEffect(() => {
    trackPageview(`${pathname}${search}`)
  }, [pathname, search])
}
