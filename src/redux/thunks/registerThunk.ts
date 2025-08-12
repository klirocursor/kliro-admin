import { authAPI } from '@/api/v1/authApi'
import { RegisterBodyType, SendOtpBodyType, VerifyOtpBodyType } from '@/types/authTypes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerThunk = createAsyncThunk('register', async (body: RegisterBodyType, { rejectWithValue }) => {
  try {
    const data = await authAPI.register(body as any)
    return data.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message || 'Registration error')
  }
})

export const sendOtpThunk = createAsyncThunk('sendOtp', async (body: SendOtpBodyType, { rejectWithValue }) => {
  try {
    const data = await authAPI.sendOtp(body)
    return data.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message || 'Send OTP error')
  }
})

export const verifyOtpThunk = createAsyncThunk('verifyOtp', async (body: VerifyOtpBodyType, { rejectWithValue }) => {
  try {
    const data = await authAPI.verifyOtp(body)
    return data.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message || 'Verify OTP error')
  }
})
