import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import './not-found.scss'

export default async function NotFoundPage() {
  const t = await getTranslations('notFound')

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('message')}</p>
      <Link href="/">{t('backHome')}</Link>
    </div>
  )
}
