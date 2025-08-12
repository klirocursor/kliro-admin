import { BaseClient } from '@/api/baseClient'
import { ApiResponseWithContent } from '@/types'
import {
  RegisterResponseType,
  RegisterBodyType,
  SendOtpBodyType,
  VerifyOtpBodyType,
  AuthResponseType,
  LoginBodyType,
  ForgotPasswordBodyType,
  ResetPasswordBodyType,
  GoogleCallbackResponse,
  CompleteGoogleAuthRequest
} from '@/types/authTypes'
import { AxiosResponse } from 'axios'
import { transformPhoneForAPI } from '@/utils/phoneUtils'

const urls = {
  sendOtp: 'auth/register',
  verifyOtp: 'auth/confirm-otp',
  register: 'auth/set-region-password-final',
  login: 'auth/login',
  forgotPassword: 'auth/forgot-password',
  resetPassword: 'auth/reset-password',
  authGoogle: 'auth/google',
  authGoogleCallback: 'auth/google/callback',
  authGoogleComplete: 'auth/google/complete'
}

export class AuthAPI {
  constructor(private api: BaseClient) {}

  sendOtp = async (body: SendOtpBodyType) => {
    const transformedBody = {
      ...body,
      phone: body.phone ? transformPhoneForAPI(body.phone) : undefined
    }

    const result: AxiosResponse<ApiResponseWithContent<RegisterResponseType>> = await this.api.post(
      urls.sendOtp,
      transformedBody
    )

    return result
  }

  verifyOtp = async (body: VerifyOtpBodyType) => {
    const transformedBody = {
      ...body,
      phone: body.phone ? transformPhoneForAPI(body.phone) : undefined
    }

    const result: AxiosResponse<ApiResponseWithContent<RegisterResponseType>> = await this.api.post(
      urls.verifyOtp,
      transformedBody
    )

    return result
  }

  register = async (body: RegisterBodyType) => {
    const transformedBody = {
      ...body,
      phone: body.phone ? transformPhoneForAPI(body.phone) : undefined
    }

    const result: AxiosResponse<ApiResponseWithContent<AuthResponseType>> = await this.api.post(
      urls.register,
      transformedBody
    )

    return result
  }

  login = async (body: LoginBodyType) => {
    const transformedBody = {
      ...body,
      phone: body.phone ? transformPhoneForAPI(body.phone) : undefined
    }
    const result: AxiosResponse<ApiResponseWithContent<AuthResponseType>> = await this.api.post(
      urls.login,
      transformedBody
    )

    return result
  }

  forgotPassword = async (body: ForgotPasswordBodyType) => {
    const transformedBody = {
      ...body,
      phone: body.phone ? transformPhoneForAPI(body.phone) : undefined
    }
    const result: AxiosResponse<ApiResponseWithContent<RegisterResponseType>> = await this.api.post(
      urls.forgotPassword,
      transformedBody
    )

    return result
  }

  resetPassword = async (body: ResetPasswordBodyType) => {
    const transformedBody = {
      ...body,
      phone: body.phone ? transformPhoneForAPI(body.phone) : undefined
    }
    const result: AxiosResponse<ApiResponseWithContent<RegisterResponseType>> = await this.api.post(
      urls.resetPassword,
      transformedBody
    )

    return result
  }

  initiateGoogleAuth = () => {
    const redirectUri = `${window.location.origin}/auth/google-callback`
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`
  }

  handleGoogleCallback = async (code: string): Promise<GoogleCallbackResponse> => {
    const result = await this.api.get<{ result: GoogleCallbackResponse }, undefined, undefined>(
      `/auth/google/callback?code=${code}`
    )
    return result.data.result
  }

  completeGoogleAuth = async (data: CompleteGoogleAuthRequest): Promise<AuthResponseType> => {
    const result = await this.api.post<{ result: AuthResponseType }, CompleteGoogleAuthRequest>(
      `/auth/google/complete`,
      data
    )
    return result.data.result
  }
}

export const authAPI = new AuthAPI(BaseClient.getInstance())
