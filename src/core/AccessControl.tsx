import React from 'react'
import { Roles } from '@/types/authTypes'
import { usePermission } from '@/hooks/usePermission'

type AccessControlProps = {
  allowedRoles: (keyof typeof Roles)[]
  children: React.ReactNode
}

const AccessControl: React.FC<AccessControlProps> = ({ allowedRoles, children }) => {
  const hasAccess = usePermission(allowedRoles)
  if (hasAccess) {
    return children
  }
  return null
}

export default AccessControl
