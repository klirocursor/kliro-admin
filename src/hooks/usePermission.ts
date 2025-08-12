import { getUserRoles } from '@/redux/selectors/user'
import { useAppSelector } from '@/redux/store'
import { RoleType } from '@/types/authTypes'

export const usePermission = (allowedRoles: RoleType[]) => {
  const userRoles = useAppSelector(getUserRoles)

  return allowedRoles.some((role) => userRoles.includes(role))
}
