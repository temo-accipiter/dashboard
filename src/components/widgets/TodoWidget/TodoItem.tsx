import React from 'react'
import { Task, AVAILABLE_TAGS } from './types'

interface TodoItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onRemoveTag: (taskId: string, tagName: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onRemoveTag }) => {
  const getTagColor = (tagName: string) => {
    const tag = AVAILABLE_TAGS.find(t => t.name === tagName)
    return tag?.color || '#999'
  }

  return (
    <div className="todo-item">
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="todo-item__checkbox"
        />
        <div className="todo-item__content">
          <span className={`todo-item__text ${task.done ? 'todo-item__text--done' : ''}`}>
            {task.text}
          </span>
          {task.tags.length > 0 && (
            <div className="todo-item__tags">
              {task.tags.map(tagName => (
                <span
                  key={tagName}
                  className="todo-item__tag"
                  style={{ backgroundColor: getTagColor(tagName) }}
                >
                  {tagName}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      onRemoveTag(task.id, tagName)
                    }}
                    className="todo-item__tag-remove"
                    aria-label={`Supprimer le tag ${tagName}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
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
