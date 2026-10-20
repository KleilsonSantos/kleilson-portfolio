import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import {
  applyTheme,
  getSystemTheme,
  persistTheme,
  readStoredTheme,
  resolveTheme,
  toggleTheme,
} from './theme'

describe('theme utils', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('toggleTheme alterna dark/light', () => {
    expect(toggleTheme('dark')).toBe('light')
    expect(toggleTheme('light')).toBe('dark')
  })

  it('persist/read roundtrip', () => {
    persistTheme('light')
    expect(readStoredTheme()).toBe('light')
  })

  it('resolveTheme usa storage antes do sistema', () => {
    persistTheme('light')
    expect(resolveTheme()).toBe('light')
  })

  it('applyTheme define data-theme e color-scheme', () => {
    applyTheme('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('applyTheme alinha theme-color ao token --color-bg e remove o media', () => {
    document.head.innerHTML = '<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000">'
    document.documentElement.style.setProperty('--color-bg', '#f4f7fb')

    applyTheme('light')

    const meta = document.querySelector('meta[name="theme-color"]')
    expect(meta?.getAttribute('content')).toBe('#f4f7fb')
    expect(meta?.hasAttribute('media')).toBe(false)
    document.documentElement.style.removeProperty('--color-bg')
  })

  it('getSystemTheme respeita matchMedia', () => {
    const matches = vi.fn().mockReturnValue(true)
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({
        matches: matches(),
        media: '(prefers-color-scheme: light)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    expect(getSystemTheme()).toBe('light')
    vi.unstubAllGlobals()
  })
})
