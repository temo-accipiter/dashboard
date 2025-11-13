import PageContainer from '@/components/pageContainer/PageContainer'
import { TodoWidget } from '@/components/widgets/TodoWidget/TodoWidget'
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard'
import './Taches.scss'

export default function Taches() {
  return (
    <PageContainer>
      <h1>📋 Mes Tâches</h1>
      <TodoWidget />
      <KanbanBoard />
    </PageContainer>
  )
}
