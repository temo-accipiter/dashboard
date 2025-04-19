import { useTranslation } from 'react-i18next'
import PageContainer from '@/components/pageContainer/PageContainer'
import SectionTitle from '@/components/sectionTitle/SectionTitle'
import CardGroup from '@/components/cardGroup/CardGroup'
import Card from '@/components/card/Card'
import './Home.scss'

export default function Home() {
  const { t } = useTranslation()

  return (
    <PageContainer>
      <h1>{t('welcome')}</h1>

      <SectionTitle>📅 Organisation</SectionTitle>
      <CardGroup>
        <Card title="Rendez-vous">Aucun rendez-vous aujourd&apos;hui.</Card>
        <Card title="Tâches à faire">
          <ul>
            <li>Configurer l&apos;authentification</li>
            <li>Connecter Notion ou Todoist</li>
          </ul>
        </Card>
        <Card title="Notes">
          Pense à faire la sauvegarde du projet ce soir.
        </Card>
      </CardGroup>

      <SectionTitle>⚙️ Réglages</SectionTitle>
      <CardGroup>
        <Card title="Langue" to="/settings/langue">
          Modifier la langue de l&apos;interface
        </Card>
        <Card title="Thème" to="/settings/theme">
          Basculer entre clair et sombre
        </Card>
      </CardGroup>
    </PageContainer>
  )
}
