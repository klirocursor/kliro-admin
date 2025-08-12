import { useParams, useNavigate as useReactRouterNavigate } from 'react-router-dom'

const useNavigate = () => {
  const { lang } = useParams()
  const navigate = useReactRouterNavigate()
  const navigateTo = (path: string, options?: { replace?: boolean }) =>
    navigate(`/${lang}/${path}`.replace(/\/+/g, '/'), options)

  return navigateTo
}

export default useNavigate

export const generateNavigate = (path: string) => {
  const lang = localStorage.getItem('lang') || 'uz'
  return `/${lang}${path}`
}
