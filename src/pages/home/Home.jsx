import { useTranslation } from 'react-i18next'
import './Home.scss'

export default function Home() {
  const { t } = useTranslation()
  return <h1>{t('welcome')}</h1>
}
