import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

type LangHandlerProps = {
  children: React.ReactNode
}

const LangHandler = ({ children }: LangHandlerProps) => {
  const { i18n } = useTranslation()
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const langcode = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
  const lastPathRef = useRef<string>(location.pathname + location.search + location.hash)

  const defaultLang = 'uz'

  useEffect(() => {
    const currentPath = location.pathname + location.search + location.hash
    if (currentPath === lastPathRef.current) {
      // prevent loops from re-running on same path
    } else {
      lastPathRef.current = currentPath
    }

    const supported = ['uz', 'ru', 'oz']
    const targetLang = lang || langcode || defaultLang

    // If no lang in URL, redirect by prefixing lang
    if (!lang) {
      i18n.changeLanguage(targetLang)
      navigate(`/${targetLang}${location.pathname}${location.search}${location.hash}`, { replace: true })
      return
    }

    // If unsupported lang present, fallback
    if (!supported.includes(lang)) {
      const fallback = langcode || defaultLang
      i18n.changeLanguage(fallback)
      navigate(`/${fallback}${location.pathname.replace(/^\/[^(\/)]*/, '')}${location.search}${location.hash}`, {
        replace: true
      })
      return
    }

    // Sync i18n and storage only when necessary
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang)
    }
  }, [lang, langcode, navigate, i18n, defaultLang, location])

  return <>{children}</>
}

export default LangHandler
