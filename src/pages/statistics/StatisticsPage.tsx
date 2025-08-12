import { useTranslation } from 'react-i18next'

const StatisticsPage = () => {
  const { t } = useTranslation()
  return <div>{t('statistics.screenTitle')}</div>
}
export default StatisticsPage
