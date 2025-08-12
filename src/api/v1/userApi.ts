import { BaseClient } from '@/api/baseClient'
import { ApiResponseWithContent } from '@/types'
import {
  GetUserProfileType,
  UpdateContactBodyType,
  ConfirmUpdateContactBodyType,
  ChangePasswordBodyType,
  ChangeRegionBodyType,
  AddContactBodyType,
  ApiStatusResponseType,
  LogoutResponseType
} from '@/types/userTypes'
import { AxiosResponse } from 'axios'

const urls = {
  getUserProfile: 'user/profile',
  updateContact: 'user/update-contact',
  confirmUpdateContact: 'user/confirm-update-contact',
  changePassword: 'user/change-password',
  changeRegion: 'user/change-region',
  addContact: 'user/add-contact'
}

export class UserAPI {
  constructor(private api: BaseClient) {}

  getUserProfile = async () => {
    const result: AxiosResponse<ApiResponseWithContent<GetUserProfileType>> = await this.api.get(urls.getUserProfile)
    return result
  }

  updateContact = async (body: UpdateContactBodyType) => {
    const result: AxiosResponse<ApiResponseWithContent<ApiStatusResponseType>> = await this.api.post(
      urls.updateContact,
      body
    )
    return result
  }

  confirmUpdateContact = async (body: ConfirmUpdateContactBodyType) => {
    const result: AxiosResponse<ApiResponseWithContent<ApiStatusResponseType>> = await this.api.post(
      urls.confirmUpdateContact,
      body
    )
    return result
  }

  changePassword = async (body: ChangePasswordBodyType) => {
    const result: AxiosResponse<ApiResponseWithContent<ApiStatusResponseType>> = await this.api.post(
      urls.changePassword,
      body
    )
    return result
  }

  changeRegion = async (body: ChangeRegionBodyType) => {
    const result: AxiosResponse<ApiResponseWithContent<ApiStatusResponseType>> = await this.api.post(
      urls.changeRegion,
      body
    )
    return result
  }

  addContact = async (body: AddContactBodyType) => {
    const result: AxiosResponse<ApiResponseWithContent<ApiStatusResponseType>> = await this.api.post(
      urls.addContact,
      body
    )
    return result
  }

  logout = async () => {
    const result: AxiosResponse<{
      result: LogoutResponseType
      success: boolean
      error: string | null
    }> = await this.api.post('user/logout')
    return result
  }
}

export const userAPI = new UserAPI(BaseClient.getInstance())
