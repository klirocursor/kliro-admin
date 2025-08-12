import { HTMLProps, useMemo } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import VerifyIcon from '@/assets/icons/verify.svg'
import RejectIcon from '@/assets/icons/reject.svg'
import { cn } from '@/utils/helper'
import type { ButtonProps } from 'antd/lib/button'

interface FinishButtonProps extends ButtonProps {
  children?: React.ReactNode
  className?: HTMLProps<HTMLElement>['className']
  status: 'success' | 'reject'
  title?: string
}

const bgGradient = {
  success: 'bg-btn-primary-gradient',
  reject: 'bg-btn-secondary-gradient'
}

const bgGradientForHover = {
  success: 'linear-gradient(114deg, #53f3b7 13.03%, #27a078 86.69%)',
  reject: 'linear-gradient(90deg, #ff2929 0%, #941115 100%)'
}

const FinishButton = ({ children, className, icon, status, title, ...props }: FinishButtonProps) => {
  const defaultIcon = status === 'success' ? VerifyIcon : RejectIcon
  const iconToRender = useMemo(() => icon || <img src={defaultIcon} alt={status} />, [icon, defaultIcon, status])

  return (
    <CustomButton
      $status={status}
      className={cn(
        className,
        'shadow-button cursor-pointer rounded-[10px] px-5 py-4 text-[15px] font-[550] leading-normal text-white drop-shadow-lg',
        bgGradient[status]
      )}
      {...props}
      icon={iconToRender}
    >
      {children || title}
    </CustomButton>
  )
}

export default FinishButton

const CustomButton = styled(Button)<{ $status: 'success' | 'reject' }>`
  border: none !important;
  height: fit-content !important;
  max-height: 55px !important;
  min-width: 40px;

  &:hover,
  &:active {
    background: ${({ $status }) => bgGradientForHover[$status]} !important;
    color: #fff !important;
  }

  &:disabled {
    background: #e0e0e0 !important;
    color: #fff !important;
  }
`
