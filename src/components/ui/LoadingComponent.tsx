import { cn } from '@/utils/helper'
import { Spin } from 'antd'

type LoadingComponentProps = {
  fullscreen?: boolean
  size?: 'small' | 'default' | 'large'
  loading?: boolean
  fullSize?: boolean
}

const LoadingComponent = ({
  fullscreen = false,
  size = 'large',
  loading = false,
  fullSize = false
}: LoadingComponentProps) => {
  if (!loading) return null
  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden bg-gray-100 bg-opacity-50',
        fullscreen && 'absolute left-0 top-0 z-50 h-screen w-full',
        fullSize && 'absolute z-auto size-full'
      )}
    >
      <Spin size={size} spinning={loading} />
    </div>
  )
}

export default LoadingComponent
