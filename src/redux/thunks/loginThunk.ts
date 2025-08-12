import { createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '@/api/v1/authApi'
import { LoginBodyType } from '@/types/authTypes'

export const loginThunk = createAsyncThunk('login', async (body: LoginBodyType, { rejectWithValue }) => {
  try {
    const data = await authAPI.login(body as any)
    return data.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message || 'Login error')
  }
})
