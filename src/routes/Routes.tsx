import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { paths } from '@/routes/paths'
import { LoadingComponent } from '@/components/ui'
import LangHandler from '@/components/shared/LangHandler'

const withSuspense = (cb: () => Promise<{ default: React.ComponentType<any> }>) => {
  const L = lazy(cb)

  return (props: any) => (
    <Suspense fallback={<LoadingComponent loading={true} fullscreen />}>
      <L {...props} />
    </Suspense>
  )
}

const MainLayout = withSuspense(() => import('@/layout/MainLayout'))
const LoginPage = withSuspense(() => import('@/pages/auth/LoginPage'))
const NotFound = withSuspense(() => import('@/pages/NotFound'))
const HomePage = withSuspense(() => import('@/pages/home/HomePage'))
const UsersPage = withSuspense(() => import('@/pages/users/UsersPage'))
const BankPage = withSuspense(() => import('@/pages/bank/BankPage'))
const ProfilePage = withSuspense(() => import('@/pages/profile/ProfilePage'))
const Statistics = withSuspense(() => import('@/pages/statistics/StatisticsPage'))
const InsuranceOsagoPage = withSuspense(() => import('@/pages/insurance/InsuranceOsagoPage'))
const InsuranceKaskoPage = withSuspense(() => import('@/pages/insurance/InsuranceKaskoPage'))
const InsuranceTravelPage = withSuspense(() => import('@/pages/insurance/InsuranceTravelPage'))

const routes = createBrowserRouter([
  {
    path: '/:lang?',
    element: (
      <LangHandler>
        <Outlet />
      </LangHandler>
    ),
    children: [
      {
        path: paths.HOME,
        element: <HomePage />
      },
      {
        path: paths.LOGIN,
        element: <LoginPage />
      },
      {
        path: paths.MAIN,
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <Navigate to={paths.STATISTICS} />
          },
          {
            path: paths.STATISTICS,
            element: <Statistics />
          },
          {
            path: paths.USERS,
            element: <UsersPage />
          },
          {
            path: paths.INSURANCE,
            element: <Outlet />,
            children: [
              {
                path: paths.INSURANCE_OSAGO_PATH,
                element: <InsuranceOsagoPage />
              },
              {
                path: paths.INSURANCE_KASKO_PATH,
                element: <InsuranceKaskoPage />
              },
              {
                path: paths.INSURANCE_TRAVEL_PATH,
                element: <InsuranceTravelPage />
              }
            ]
          },
          {
            path: paths.BANK,
            element: <BankPage />
          },
          {
            path: paths.PROFILE,
            element: <ProfilePage />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export const Root = () => {
  return <RouterProvider router={routes} />
}
