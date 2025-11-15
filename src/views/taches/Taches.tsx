'use client'

import PageContainer from '@/components/pageContainer/PageContainer'
import { TodoWidget } from '@/components/widgets/TodoWidget/TodoWidget'
import { PomodoroWidget } from '@/components/widgets/PomodoroWidget/PomodoroWidget'
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard'
import './Taches.scss'

export default function Taches() {
  return (
    <PageContainer>
      <h1>📋 Mes Tâches</h1>
      <div className="widgets-container">
        <div className="widget-section">
          <TodoWidget />
        </div>
        <div className="widget-section">
          <PomodoroWidget />
        </div>
      </div>
      <KanbanBoard />
    </PageContainer>
  )
}
