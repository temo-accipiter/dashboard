import { useState } from 'react'
import './TodoList.scss'

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Configurer l’authentification', done: false },
    { id: 2, text: 'Connecter Todoist', done: false },
    { id: 3, text: 'Créer une sauvegarde automatique', done: true },
  ])

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  return (
    <div className="todo-list">
      <h2>📝 Liste de tâches</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
