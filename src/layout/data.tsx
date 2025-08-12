import { JSX } from 'react'
import { accessToScreenByRole, ScreenKey } from '@/constants/roles'
import { paths } from '@/routes/paths'
import { Roles } from '@/types/authTypes'
import { Banknote, Car, ChartBar, Plane, Shield, Users } from 'lucide-react'

type MenuItem = {
  label: string | JSX.Element
  key: ScreenKey
  icon?: JSX.Element
  path: string
  allowedRoles: (keyof typeof Roles)[]
  children?: MenuItem[]
}

export const useMenuItemsData = () => {
  const items: MenuItem[] = [
    {
      key: ScreenKey.statistics,
      label: 'statistics.screenTitle',
      icon: <ChartBar />,
      path: paths.STATISTICS,
      allowedRoles: accessToScreenByRole.statistics
    },
    {
      key: ScreenKey.bank,
      label: 'global.bank',
      icon: <Banknote />,
      path: paths.BANK,
      allowedRoles: accessToScreenByRole.bank
    },
    {
      key: ScreenKey.insurance,
      label: 'global.insurance',
      icon: <Shield />,
      path: paths.INSURANCE,
      allowedRoles: accessToScreenByRole.insurance,
      children: [
        {
          key: ScreenKey.osago,
          label: 'global.osago',
          icon: <Car />,
          path: paths.INSURANCE_OSAGO,
          allowedRoles: accessToScreenByRole.osago
        },
        {
          key: ScreenKey.kasko,
          label: 'global.kasko',
          icon: <Car />,
          path: paths.INSURANCE_KASKO,
          allowedRoles: accessToScreenByRole.kasko
        },
        {
          key: ScreenKey.travelInsurance,
          label: 'global.travelInsurance',
          icon: <Plane />,
          path: paths.INSURANCE_TRAVEL,
          allowedRoles: accessToScreenByRole.travelInsurance
        }
      ]
    },
    {
      key: ScreenKey.users,
      label: 'global.users',
      icon: <Users />,
      path: paths.USERS,
      allowedRoles: accessToScreenByRole.users
    }
  ]

  return items
}

export const defaultOpenKeys: Record<string, string[]> = {
  [ScreenKey.insurance]: [ScreenKey.osago, ScreenKey.kasko, ScreenKey.travelInsurance]
}
