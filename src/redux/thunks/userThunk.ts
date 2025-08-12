import { userAPI } from '@/api/v1/userApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  UpdateContactBodyType,
  ConfirmUpdateContactBodyType,
  ChangePasswordBodyType,
  ChangeRegionBodyType,
  AddContactBodyType
} from '@/types/userTypes'

export const getUserProfileThunk = createAsyncThunk('getUserProfile', async () => {
  const data = await userAPI.getUserProfile()
  return data.data
})

export const updateContactThunk = createAsyncThunk('updateContact', async (body: UpdateContactBodyType) => {
  const data = await userAPI.updateContact(body)
  return data.data
})

export const confirmUpdateContactThunk = createAsyncThunk(
  'confirmUpdateContact',
  async (body: ConfirmUpdateContactBodyType) => {
    const data = await userAPI.confirmUpdateContact(body)
    return data.data
  }
)

export const changePasswordThunk = createAsyncThunk('changePassword', async (body: ChangePasswordBodyType) => {
  const data = await userAPI.changePassword(body)
  return data.data
})

export const changeRegionThunk = createAsyncThunk('changeRegion', async (body: ChangeRegionBodyType) => {
  const data = await userAPI.changeRegion(body)
  return data.data
})

export const addContactThunk = createAsyncThunk('addContact', async (body: AddContactBodyType) => {
  const data = await userAPI.addContact(body)
  return data.data
})

export const logoutThunk = createAsyncThunk('logout', async () => {
  const data = await userAPI.logout()
  return data.data
})
