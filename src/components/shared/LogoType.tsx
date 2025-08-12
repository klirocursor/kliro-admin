import { useTheme } from '@/hooks/useTheme'
import logoMain from '@/assets/images/logoMain.webp'
import logoWhite from '@/assets/images/logoWhite.webp'

export const LogoType = () => {
  const { theme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <img src={theme ? logoWhite : logoMain} alt="logo" width={120} height={20} />
    </div>
  )
}
