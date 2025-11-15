import './KanbanBoard.scss'

const data: Record<string, string[]> = {
  todo: ['Créer un compte API Todoist', 'Lire la doc Notion API'],
  doing: ['Installer Husky & lint-staged'],
  done: ['Configurer ESLint + Prettier'],
}

export default function KanbanBoard() {
  return (
    <section className="kanban-board" aria-label="Tableau Kanban">
      <h2 className="kanban-board__title">Tableau Kanban</h2>
      <div className="kanban-board__columns">
        {Object.entries(data).map(([status, tasks]) => (
          <div className="kanban-column" key={status}>
            <h3>{status.toUpperCase()}</h3>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
