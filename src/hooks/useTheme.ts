'use client'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getTheme } from '@/redux/selectors/theme'
import { setTheme, toggleTheme } from '@/redux/reducers/theme'

export const useTheme = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(getTheme)

  const setThemeMode = (isDark: boolean) => {
    dispatch(setTheme(isDark))
  }

  const toggleThemeMode = () => {
    dispatch(toggleTheme())
  }

  return {
    theme: isDarkMode,
    setTheme: setThemeMode,
    toggleTheme: toggleThemeMode
  }
}
