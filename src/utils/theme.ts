export const THEME_STORAGE_KEY = 'theme'

export const getStoredTheme = (): boolean => {
  if (typeof window === 'undefined') return false

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme !== null) {
    return savedTheme === 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const setStoredTheme = (isDark: boolean): void => {
  if (typeof window === 'undefined') return

  localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light')
}

export const getSystemThemePreference = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
