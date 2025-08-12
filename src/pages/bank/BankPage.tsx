import { useTranslation } from 'react-i18next'

const BankPage = () => {
  const { t } = useTranslation()
  return <div>{t('global.bank')}</div>
}
export default BankPage
