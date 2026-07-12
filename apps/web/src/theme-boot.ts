type ThemeMode = 'light' | 'dark'

;(() => {
  try {
    const stored = localStorage.getItem('kleilson-theme')
    const theme: ThemeMode =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark'
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  } catch {
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.style.colorScheme = 'dark'
  }
})()
