import { useMemo } from 'react'
import { getUserState } from '@/redux/selectors/user'
import { useAppSelector } from '@/redux/store'
import { Roles } from '@/types/authTypes'

const useAuthRoute = () => {
  const { user, userRoles } = useAppSelector(getUserState)

  const isAuthenticated = true

  const hasRequiredRoles = (rolesToCheck: Roles | Roles[], requireAll: boolean = false) => {
    if (Array.isArray(rolesToCheck)) {
      return requireAll
        ? rolesToCheck.every((role) => userRoles.includes(role))
        : rolesToCheck.some((role) => userRoles.includes(role))
    }
    return userRoles.includes(rolesToCheck)
  }

  const memoizedHasRequiredRoles = useMemo(() => hasRequiredRoles, [userRoles])

  return {
    isAuthenticated,
    user,
    userRoles,
    hasRequiredRoles: memoizedHasRequiredRoles
  }
}

export default useAuthRoute
