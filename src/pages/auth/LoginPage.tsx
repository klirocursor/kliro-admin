import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()
  return <div>{t('auth.login')}</div>
}
export default LoginPage
