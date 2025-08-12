'use client'

import styled from 'styled-components'
import { CustomSelect } from '@/components/ui/Select'
import { useTheme } from '@/hooks/useTheme'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import uzFlag from '@/assets/images/uz.svg'
import ruFlag from '@/assets/images/ru.webp'
import { useTranslation } from 'react-i18next'

const langOptions = [
  { label: 'Uz', value: 'uz', icon: uzFlag },
  { label: 'Ru', value: 'ru', icon: ruFlag }
]

const renderLangOptions = (theme: boolean) =>
  langOptions.map((option) => ({
    label: (
      <div className="flex w-full items-center gap-2">
        <img src={option.icon} alt={option.label} width={20} height={20} className="rounded-sm" />
        <span className={`text-sm ${theme ? 'text-white' : 'text-black'}`}>{option.label}</span>
      </div>
    ),
    value: option.value
  }))

export const LangSelect = () => {
  const { theme } = useTheme()

  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useParams<{ lang: string }>()

  const handleLangChange = (value: string) => {
    const newPathname = location.pathname.replace(`/${lang}`, `/${value}`)
    navigate(newPathname, { replace: true })
    i18n.changeLanguage(value)
    localStorage.setItem('lang', value)
    window.location.reload()
  }

  return (
    <div className="relative flex items-center">
      <StyledLangSelect
        value={lang || i18n.language}
        style={{ width: '90px' }}
        options={renderLangOptions(theme)}
        onSelect={handleLangChange}
        $isDark={theme}
      />
    </div>
  )
}

const StyledLangSelect = styled(CustomSelect)<{ $isDark: boolean }>`
  width: 50px;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 14px !important;
  height: 35px !important;

  .ant-select-item-option-selected {
    background-color: ${(props) => (props.$isDark ? '#4b5563' : '#fafafa')} !important;
  }

  .ant-select-item {
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 14px !important;
    text-align: center !important;
    color: ${(props) => (props.$isDark ? '#ffffff' : '#222')};
  }

  .ant-select-selector {
    border-radius: 7px !important;
    background-color: ${(props) => (props.$isDark ? '#374151' : '#f5f5f5')} !important;
    outline: none !important;
    display: flex !important;
    border: 1px solid ${(props) => (props.$isDark ? '#4b5563' : '#fff')} !important;
    align-items: center !important;
  }

  /* Selected item text color (button) */
  .ant-select-selection-item {
    color: #fff !important;
    flex-grow: 1;
    text-align: center;
    overflow: visible !important;
    padding-right: 0 !important;
    padding-left: 4px !important;
  }

  .ant-select-selector {
    width: 80px !important;
  }

  .ant-select {
    outline: none !important;
  }

  /* Arrow icon */
  .ant-select-arrow {
    display: inline-block !important;
    color: #fff !important;
  }

  .ant-select-selector {
    padding: 10px !important;
    margin: 0 auto !important;
    height: auto !important;
    box-shadow: none !important;
  }

  .ant-select-selection-item {
    line-height: 24px !important;
  }

  .ant-select-arrow {
    display: none !important;
  }

  .ant-select-dropdown {
    box-shadow: none !important;
    background-color: ${(props) => (props.$isDark ? '#374151' : '#ffffff')} !important;
    border: 1px solid ${(props) => (props.$isDark ? '#4b5563' : '#d1d5db')} !important;
  }

  /* Dropdown menu styles */
  .ant-select-dropdown .ant-select-item {
    background-color: ${(props) => (props.$isDark ? '#374151' : '#ffffff')} !important;
    color: ${(props) => (props.$isDark ? '#ffffff' : '#222')} !important;
  }

  .ant-select-dropdown .ant-select-item:hover {
    background-color: ${(props) => (props.$isDark ? '#4b5563' : '#f3f4f6')} !important;
  }

  .ant-select-dropdown .ant-select-item-option-selected {
    background-color: ${(props) => (props.$isDark ? '#4b5563' : '#fafafa')} !important;
    color: ${(props) => (props.$isDark ? '#ffffff' : '#222')} !important;
  }

  .ant-select-dropdown .ant-select-item-option-active {
    background-color: ${(props) => (props.$isDark ? '#4b5563' : '#f3f4f6')} !important;
  }

  /* Global dropdown override */
  .ant-select-dropdown:not(.ant-select-dropdown-hidden) {
    background-color: ${(props) => (props.$isDark ? '#374151' : '#ffffff')} !important;
  }
`
