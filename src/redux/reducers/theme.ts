import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStoredTheme } from '@/utils/theme'

export type ThemeState = {
  isDarkMode: boolean
}

const initialState: ThemeState = {
  isDarkMode: getStoredTheme()
}

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    }
  }
})

export const { toggleTheme, setTheme } = slice.actions
export default slice.reducer
