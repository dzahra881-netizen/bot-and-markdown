import { useState, useEffect } from 'react'

const THEME_STORAGE_KEY = 'devnotes-theme'

/**
 * Custom hook to manage light and dark mode with localStorage persistence.
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void, setTheme: (theme: string) => void }}
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') {
        return stored
      }
      // Fallback to system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return 'dark' // Default to sleek modern dark mode
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // ignore storage write errors
    }
  }, [theme])

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme)
    }
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  }
}
