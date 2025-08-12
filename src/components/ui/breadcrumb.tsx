'use client'

import { cn } from '@/utils/helper'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useTheme } from '@/hooks/useTheme'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type CustomBreadcrumbProps = {
  className?: string
  pages: {
    title: string
    href: string
    translationKey?: string
  }[]
}

export const CustomBreadcrumb = ({ className, pages, ...props }: CustomBreadcrumbProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { theme } = useTheme()

  return (
    <Breadcrumb
      {...props}
      className={cn('flex items-center px-4 lg:px-0', className)}
      separator={pages.length > 1 ? '/' : ''}
      items={[
        {
          title: (
            <Link to="/" className="!inline-flex items-center gap-2">
              <HomeOutlined className={`${theme ? '!text-gray-300' : '!text-gray-600'}`} />
              <span className={`${theme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                {t('homePage.home')}
              </span>
            </Link>
          )
        },
        ...pages.map((page) => ({
          title: (
            <Link to={page.href}>
              <span
                className={`${
                  location.pathname === page.href
                    ? theme
                      ? 'font-medium text-white'
                      : 'font-medium text-gray-900'
                    : theme
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {page.translationKey ? t(page.translationKey) : page.title}
              </span>
            </Link>
          )
        }))
      ]}
    />
  )
}
