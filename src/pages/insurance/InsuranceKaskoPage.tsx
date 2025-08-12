import { useTranslation } from 'react-i18next'

const InsuranceKaskoPage = () => {
  const { t } = useTranslation()
  return <div>{t('global.kasko')}</div>
}
export default InsuranceKaskoPage
