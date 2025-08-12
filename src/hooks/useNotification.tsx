import React, { createContext, useContext, ReactNode } from 'react'
import { notification } from 'antd'
import { useTranslation } from 'react-i18next'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

interface NotificationContextType {
  openNotification: (type: NotificationType, message: string, description: string) => void
  createDrugSuccess: () => void
  createDrugError: (error: any) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation()
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message,
      description,
      duration: 5,
    })
  }

  const createDrugSuccess = () => {
    openNotification('success', 'Успешно', 'Препарат успешно создан')
  }

  const createDrugError = (error: any) => {
    openNotification('error', t('global.error'), error)
  }

  return (
    <NotificationContext.Provider value={{ openNotification, createDrugSuccess, createDrugError }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export const useCustomNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useCustomNotification must be used within a NotificationProvider')
  }
  return context
}
