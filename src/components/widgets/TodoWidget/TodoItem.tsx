import React from 'react'
import { Task } from './types'

interface TodoItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="todo-item__checkbox"
        />
        <span className={`todo-item__text ${task.done ? 'todo-item__text--done' : ''}`}>
          {task.text}
        </span>
      </label>
      <button
        onClick={() => onDelete(task.id)}
        className="todo-item__delete"
        aria-label="Supprimer la tâche"
      >
        ✕
      </button>
    </div>
  )
}
