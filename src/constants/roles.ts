import { Roles } from '@/types/authTypes'

export enum ScreenKey {
  statistics = 'statistics',
  bank = 'bank',
  insurance = 'insurance',
  osago = 'osago',
  kasko = 'kasko',
  travelInsurance = 'travelInsurance',
  profile = 'profile',
  users = 'users'
}

export const accessToScreenByRole: Record<keyof typeof ScreenKey, (keyof typeof Roles)[] | []> = {
  [ScreenKey.statistics]: [],
  [ScreenKey.bank]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER],
  [ScreenKey.insurance]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER],
  [ScreenKey.osago]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER],
  [ScreenKey.kasko]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER],
  [ScreenKey.travelInsurance]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER],
  [ScreenKey.profile]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER],
  [ScreenKey.users]: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER]
}
