import { authAPI } from '@/api/v1/authApi'
import { ForgotPasswordBodyType, ResetPasswordBodyType } from '@/types/authTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const forgotPasswordThunk = createAsyncThunk(
  'password/forgot',
  async (body: ForgotPasswordBodyType, { rejectWithValue }) => {
    try {
      const data = await authAPI.forgotPassword(body)
      return data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || 'Forgot password error')
    }
  }
)

export const resetPasswordThunk = createAsyncThunk(
  'password/reset',
  async (body: ResetPasswordBodyType, { rejectWithValue }) => {
    try {
      const data = await authAPI.resetPassword(body)
      return data.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || 'Reset password error')
    }
  }
)
