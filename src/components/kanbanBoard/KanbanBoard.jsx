import './KanbanBoard.scss'

const data = {
  todo: ['Créer un compte API Todoist', 'Lire la doc Notion API'],
  doing: ['Installer Husky & lint-staged'],
  done: ['Configurer ESLint + Prettier'],
}

export default function KanbanBoard() {
  return (
    <div className="kanban-board">
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
  )
}
