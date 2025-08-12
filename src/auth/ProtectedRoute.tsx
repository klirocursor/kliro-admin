import React from 'react'
import { Navigate } from 'react-router-dom'
import { RoleType } from '@/types/authTypes'
import { LOGIN } from '@/routes/paths'
import useAuthRoute from '@/hooks/useAuthRoute'
import { hasIntersection } from '@/utils/helper'
import AccessDenied from '@/auth/AccessDenied'
import isEmpty from 'lodash/isEmpty'

interface ProtectedRouteProps {
  allowedRoles: RoleType[]
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRoles } = useAuthRoute()

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />
  }

  if (!isEmpty(allowedRoles) && !hasIntersection(allowedRoles, userRoles)) {
    return <AccessDenied />
  }

  return <>{children}</>
}

export default ProtectedRoute
