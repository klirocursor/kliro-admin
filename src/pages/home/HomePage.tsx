import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()
  return <div>{t('home.screenTitle')}</div>
}
export default HomePage
