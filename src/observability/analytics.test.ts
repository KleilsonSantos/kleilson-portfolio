import { afterEach, describe, expect, it, vi } from 'vitest'
import { analyticsEnabled, initUmami, trackPageview } from './analytics'

describe('analytics (Umami)', () => {
  afterEach(() => {
    document.getElementById('umami-analytics')?.remove()
    delete window.umami
    vi.unstubAllEnvs()
  })

  it('fica desligado sem env', () => {
    vi.stubEnv('VITE_UMAMI_SCRIPT_URL', '')
    vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '')
    expect(analyticsEnabled()).toBe(false)
    initUmami()
    expect(document.getElementById('umami-analytics')).toBeNull()
  })

  it('injeta script quando env está setado', () => {
    vi.stubEnv('VITE_UMAMI_SCRIPT_URL', 'https://cloud.umami.is/script.js')
    vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '11111111-1111-1111-1111-111111111111')
    expect(analyticsEnabled()).toBe(true)
    initUmami()
    const el = document.getElementById('umami-analytics') as HTMLScriptElement | null
    expect(el).toBeTruthy()
    expect(el?.src).toContain('cloud.umami.is/script.js')
    expect(el?.dataset.websiteId).toBe('11111111-1111-1111-1111-111111111111')
  })

  it('trackPageview chama umami.track sem PII extra', () => {
    vi.stubEnv('VITE_UMAMI_SCRIPT_URL', 'https://cloud.umami.is/script.js')
    vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '11111111-1111-1111-1111-111111111111')
    const track = vi.fn()
    window.umami = { track }
    trackPageview('/sobre?x=1')
    expect(track).toHaveBeenCalledWith({ url: '/sobre', title: document.title })
  })
})
