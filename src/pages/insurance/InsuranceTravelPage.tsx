import { useTranslation } from 'react-i18next'

const InsuranceTravelPage = () => {
  const { t } = useTranslation()
  return <div>{t('global.travelInsurance')}</div>
}
export default InsuranceTravelPage
