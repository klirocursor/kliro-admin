import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, MenuProps, Spin } from 'antd'

import { ChevronLeft } from 'lucide-react'
import { paths } from '@/routes/paths'
import Header from '@/layout/Header'
import { defaultOpenKeys, useMenuItemsData } from './data'
import { CollapsedToggle, CustomMenu } from './styles'
import { roleBasedValue } from '@/auth/roleBasedValue'
import useAuthRoute from '@/hooks/useAuthRoute'
import { useQuery } from '@/hooks/useQuery'
import { getUserProfileThunk } from '@/redux/thunks/userThunk'
import { useAppDispatch } from '@/redux/store'
import { TokenService } from '@/utils/storage'
import { useTranslation } from 'react-i18next'
import { version } from '../../package.json'
import { LogoType } from '@/components/shared/LogoType'

const { Content, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { user, isAuthenticated, userRoles } = useAuthRoute()
  const dispatch = useAppDispatch()
  const codeRef = useRef<string | null>(null)
  const { t } = useTranslation()

  const token = TokenService.getToken()

  const menuItemsData = useMenuItemsData()

  const toggleCollapsed = () => setCollapsed((prev) => !prev)

  const defaultSelectedKey = useMemo(() => [location.pathname.split('/')[1] || 'statistics'], [location.pathname])

  const items: MenuItem[] = useMemo(
    () =>
      menuItemsData.map((item) => {
        if (item.children) {
          return roleBasedValue(
            {
              key: item.key,
              label: t(`${item.label}`),
              icon: <div onClick={() => navigate(item.path)}>{item.icon}</div>,
              children: item.children.map((subItem) =>
                roleBasedValue(
                  {
                    key: subItem.key,
                    label: (
                      <Link to={subItem.path} className="flex items-center gap-2.5" key={subItem.key}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                          <circle cx="2.5" cy="2.5" r="2.5" />
                        </svg>
                        <span className="uppercase">{t(`${subItem.label}`)}</span>
                      </Link>
                    )
                  },
                  isAuthenticated,
                  userRoles,
                  subItem.allowedRoles
                )
              )
            },
            isAuthenticated,
            userRoles,
            item.allowedRoles
          )
        }
        return roleBasedValue(
          {
            key: item.key,
            label: <Link to={item.path}>{t(`${item.label}`)}</Link>,
            icon: <div onClick={() => navigate(item.path)}>{item.icon}</div>
          },
          isAuthenticated,
          userRoles,
          item.allowedRoles
        )
      }),
    [navigate, isAuthenticated, userRoles, t]
  )

  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (token ? await dispatch(getUserProfileThunk()).unwrap() : false),
    enabled: !!token && !user
  })

  useEffect(() => {
    const newCode = new URLSearchParams(location.search).get('code')
    if (newCode && newCode !== codeRef.current) {
      codeRef.current = newCode
      // mutate(newCode)
    }
  }, [location.search])

  const isPending = false

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPending) {
      navigate(paths.LOGIN)
    }
  }, [isPending, isAuthenticated, isLoading])

  return (
    <Layout className="h-screen w-screen !overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed} width={272}>
        <CollapsedToggle onClick={toggleCollapsed} aria-label="Toggle sidebar">
          <ChevronLeft className={collapsed ? 'rotate-180 transform' : ''} size={20} />
        </CollapsedToggle>
        <Link to={paths.STATISTICS} className={`flex min-h-16 items-center justify-center bg-white py-2`}>
          {collapsed ? <img src="/favicon.ico" alt="Logo icon" width={40} height={40} /> : <LogoType />}
        </Link>
        <CustomMenu
          theme="light"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKey}
          defaultOpenKeys={defaultOpenKeys[defaultSelectedKey[0]]}
          selectedKeys={defaultSelectedKey}
          style={{ height: '100%', overflowY: 'auto', paddingBottom: '200px' }}
          items={items}
          $isCollapsed={collapsed}
        />
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <p>v{version}</p>
        </div>
      </Sider>
      <Layout>
        <Header />
        <Content
          style={{
            padding: 48,
            margin: 0,
            minHeight: 280,
            background: 'transparent',
            overflow: 'auto',
            position: 'relative'
          }}
          id="page"
        >
          <Outlet />
          <Spin fullscreen spinning={isLoading || isPending} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
