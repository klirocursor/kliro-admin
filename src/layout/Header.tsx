import { Avatar, Badge, Input } from 'antd'
import { useAppSelector } from '@/redux/store'
import { getIsAuthenticated } from '@/redux/selectors/user'
import { LogOut, Moon, Search, Sun, UserRoundPen } from 'lucide-react'
import { LangSelect } from '@/components/shared/LangSelect'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const navigate = useNavigate()
  const isAuthed = useAppSelector(getIsAuthenticated)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    if (!dropdownOpen) return

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [dropdownOpen])

  useEffect(() => {
    if (!isAuthed) {
      setDropdownOpen(false)
    }
  }, [isAuthed])

  const handleProfile = () => {
    setDropdownOpen(false)
    navigate('/profile')
  }

  const handleLogout = () => {
    setDropdownOpen(false)
  }

  return (
    <header className="flex w-full items-center justify-between gap-8 border-b border-[#F0F0F0] bg-white px-12 py-4 font-opensans">
      <div className="min-w-[240px] max-w-[620px] flex-1">
        <Input
          placeholder={'Search'}
          suffix={<Search size={20} className="text-[#777]" />}
          className="min-h-10 w-full max-w-96 border-[1px] border-[#DEE2E6] pl-4 pr-4"
        />
      </div>
      <div className="flex items-center gap-4 justify-self-end">
        <LangSelect />
        <div
          className={`cursor-pointer rounded-lg p-2.5 text-sm transition-all duration-200 hover:scale-105 ${theme ? 'bg-gray-700' : 'bg-gray-200'}`}
          onClick={toggleTheme}
        >
          {theme ? (
            <Moon className="h-4 w-4 translate-x-0 text-white" />
          ) : (
            <Sun className="h-4 w-4 translate-x-0 text-black" />
          )}
        </div>
        <div className="relative flex items-center" ref={avatarRef}>
          <Badge dot color="green" offset={[-2, 32]}>
            <Avatar
              size={35}
              shape="square"
              onClick={() => setDropdownOpen((v) => !v)}
              icon={<UserOutlined />}
              className="cursor-pointer !bg-[#f5f5f5] !text-[#000]"
            />
          </Badge>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className={`animate-fade-in absolute right-0 top-10 z-50 mt-2 w-40 rounded-xl border shadow-lg ${
                theme ? 'border-gray-600 bg-gray-700' : 'border-gray-100 bg-white'
              }`}
            >
              <button
                className={`flex w-full items-center gap-2 px-4 py-3 font-medium transition ${
                  theme ? 'text-white hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-50'
                }`}
                onClick={handleProfile}
              >
                <UserRoundPen size={16} /> {t('profile')}
              </button>
              <button
                className={`w-full px-4 py-3 text-left font-medium transition disabled:opacity-60 ${
                  theme ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-gray-50'
                }`}
                onClick={handleLogout}
                // disabled={logout.isPending}
              >
                {/* {logout.isPending ? ( */}
                {/* <span className="flex items-center gap-2">
                  <Loader2 size={16} /> Logging out...
                </span> */}
                {/* ) : ( */}
                <span className="flex items-center gap-2">
                  <LogOut size={16} /> {t('logout')}
                </span>
                {/* )} */}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
