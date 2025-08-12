import isEmpty from 'lodash/isEmpty'
import { RoleType } from '@/types/authTypes'
import { hasIntersection } from '@/utils/helper'

export const roleBasedValue = (
  data: any,
  isAuthenticated: boolean,
  userRoles: RoleType[],
  allowedRoles: RoleType[]
) => {
  if (!isAuthenticated) {
    return null
  }

  if (!isEmpty(allowedRoles) && !hasIntersection(allowedRoles, userRoles)) {
    return null
  }

  return data
}
