import React from 'react'
import { RoleType } from '@/types/authTypes'
import useAuthRoute from '@/hooks/useAuthRoute'
import { hasIntersection } from '@/utils/helper'

interface RoleBasedComponentProps {
  allowedRoles?: RoleType[]
  children: React.ReactNode
}

const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRoles } = useAuthRoute()

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && !hasIntersection(allowedRoles, userRoles)) {
    return null
  }

  return <>{children}</>
}

export default RoleBasedComponent
