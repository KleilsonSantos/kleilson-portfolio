import { useEffect, useState, useEffectEvent } from 'react'
import {
  applyTheme,
  persistTheme,
  readStoredTheme,
  resolveTheme,
  toggleTheme,
  type ThemeMode,
} from '../utils/theme'

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => resolveTheme())

  const syncFromSystem = useEffectEvent(() => {
    if (readStoredTheme()) return
    const next = resolveTheme(null)
    setTheme(next)
    applyTheme(next)
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => syncFromSystem()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  function setAndPersist(next: ThemeMode) {
    setTheme(next)
    applyTheme(next)
    persistTheme(next)
  }

  return {
    theme,
    isDark: theme === 'dark',
    setTheme: setAndPersist,
    toggle: () => setAndPersist(toggleTheme(theme)),
  }
}
