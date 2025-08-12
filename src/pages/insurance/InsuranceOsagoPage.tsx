import { useTranslation } from 'react-i18next'

const InsuranceOsagoPage = () => {
  const { t } = useTranslation()
  return <div>{t('global.osago')}</div>
}
export default InsuranceOsagoPage
