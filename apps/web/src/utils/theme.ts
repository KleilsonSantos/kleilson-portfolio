const STORAGE_KEY = 'kleilson-theme'

export type ThemeMode = 'light' | 'dark'

export function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function readStoredTheme(): ThemeMode | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark') return value
  } catch {
    /* private mode */
  }
  return null
}

export function resolveTheme(stored: ThemeMode | null = readStoredTheme()): ThemeMode {
  return stored ?? getSystemTheme()
}

export function applyTheme(theme: ThemeMode): void {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function persistTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode */
  }
}

export function toggleTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark'
}
