'use client'

import { useTranslations } from 'next-intl'
import './Footer.scss'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="site-footer">
      <p>{t('copyright')}</p>
    </footer>
  )
}
