import { useTranslation } from 'react-i18next'

const UsersPage = () => {
  const { t } = useTranslation()
  return <div>{t('global.users')}</div>
}
export default UsersPage
