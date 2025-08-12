import { TokenService } from '@/utils/storage'
import { createSlice } from '@reduxjs/toolkit'
import { GetUserProfileType } from '@/types/userTypes'
import { loginThunk } from '@/redux/thunks/loginThunk'
import { registerThunk } from '@/redux/thunks/registerThunk'
import { forgotPasswordThunk, resetPasswordThunk } from '@/redux/thunks/passwordThunk'
import { logoutThunk } from '@/redux/thunks/userThunk'

export type AuthState = {
  auth: {
    token: string
    refreshToken: string
    status: 'loading' | 'idle' | 'failed' | 'success'
  }
  isLoading: boolean
  error: string | null
  user: GetUserProfileType | null
}

const defaultState: AuthState = {
  auth: {
    token: '',
    refreshToken: '',
    status: 'idle',
  },
  isLoading: false,
  error: null,
  user: null,
}

const slice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.auth.status = 'loading'
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.auth.status = 'success'
        state.auth.token = action.payload.result.accessToken
        TokenService.setToken(
          action.payload.result.accessToken,
          action.payload.result.refreshToken,
          action.payload.result.accessTokenExpiry,
          action.payload.result.refreshTokenExpiry,
        )
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.auth.status = 'failed'
        state.error = (action.payload as string) || 'Login failed'
      })

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.auth.status = 'loading'
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.isLoading = false
        state.auth.status = 'success'
        // No token handling for registration - just success status
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false
        state.auth.status = 'failed'
        state.error = (action.payload as string) || 'Registration failed'
      })

    // Forgot Password
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || 'Forgot password failed'
      })

    // Reset Password
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || 'Reset password failed'
      })

    // Logout
    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.auth.token = ''
        state.auth.refreshToken = ''
        state.auth.status = 'idle'
        state.user = null
        TokenService.clearTokens()
      })
      .addCase(logoutThunk.rejected, (state) => {
        // Even if logout API call fails, we should still clear the local state
        state.auth.token = ''
        state.auth.refreshToken = ''
        state.auth.status = 'idle'
        state.user = null
        TokenService.clearTokens()
      })
  },
})

const { reducer, actions } = slice
export const { clearError } = actions
export default reducer
