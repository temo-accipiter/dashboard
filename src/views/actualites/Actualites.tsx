'use client'

import PageContainer from '@/components/pageContainer/PageContainer'
import { NewsWidget } from '@/components/widgets/NewsWidget/NewsWidget'
import './Actualites.scss'

export default function Actualites() {
  return (
    <PageContainer>
      <h1>📰 Actualités</h1>
      <div className="actualites-page">
        <div className="actualites-page__widget">
          <NewsWidget />
        </div>
      </div>
    </PageContainer>
  )
}
