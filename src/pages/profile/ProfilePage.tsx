import { useTranslation } from 'react-i18next'

const ProfilePage = () => {
  const { t } = useTranslation()
  return <div>{t('profile.screenTitle')}</div>
}
export default ProfilePage
