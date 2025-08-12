export type SendOtpBodyType = {
  email?: string
  phone?: string
}

export type VerifyOtpBodyType = {
  email?: string
  phone?: string
  otp: string
}

export type RegisterBodyType = {
  email?: string
  phone?: string
  region_id: number
  password: string
}

export interface RegisterResponseType {
  status: string
}

export type LoginBodyType = {
  email?: string
  phone?: string
  password: string
}

export interface ForgotPasswordBodyType {
  email?: string
  phone?: string
}

export interface ResetPasswordBodyType {
  email?: string
  phone?: string
  otp: string
  password: string
}

export interface AuthResponseType {
  accessToken: string
  refreshToken: string
  accessTokenExpiry: number
  refreshTokenExpiry: number
}

export type GoogleCallbackResponse = AuthResponseType | { need_region: true; session_id: string }

export interface CompleteGoogleAuthRequest {
  session_id: string
  region_id: number
}

export enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type RoleType = keyof typeof Roles
