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
