import PageContainer from '@/components/pageContainer/PageContainer'
import TodoList from '@/components/todoList/TodoList'
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard'
import './Taches.scss'

export default function Taches() {
  return (
    <PageContainer>
      <h1>📋 Mes Tâches</h1>
      <TodoList />
      <KanbanBoard />
    </PageContainer>
  )
}
