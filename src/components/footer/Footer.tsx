import { useTranslation } from 'react-i18next'
import './Footer.scss'

export default function Footer() {
  const { t } = useTranslation('footer') // <- namespace "footer.json"

  return (
    <footer className="site-footer">
      <p>{t('copyright')}</p>
    </footer>
  )
}
