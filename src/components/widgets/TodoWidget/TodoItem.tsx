import React, { useState, useRef, useEffect } from 'react'
import { Task, AVAILABLE_TAGS, PRIORITY_CONFIG } from './types'

interface TodoItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onRemoveTag: (taskId: string, tagName: string) => void
  onEdit: (taskId: string, newText: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onRemoveTag, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const inputRef = useRef<HTMLInputElement>(null)

  const getTagColor = (tagName: string) => {
    const tag = AVAILABLE_TAGS.find(t => t.name === tagName)
    return tag?.color || '#999'
  }

  const priorityConfig = PRIORITY_CONFIG[task.priority]

  // Focus l'input quand on entre en mode édition
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
    setEditText(task.text)
  }

  const handleSave = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleBlur = () => {
    handleSave()
  }

  return (
    <div className="todo-item" style={{ borderLeftColor: priorityConfig.color }}>
      {task.priority !== 'none' && (
        <div className="todo-item__priority" title={`Priorité: ${priorityConfig.label}`}>
          <span className="todo-item__priority-icon">{priorityConfig.icon}</span>
        </div>
      )}
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="todo-item__checkbox"
        />
        <div className="todo-item__content">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="todo-item__edit-input"
              aria-label="Éditer la tâche"
            />
          ) : (
            <span
              className={`todo-item__text ${task.done ? 'todo-item__text--done' : ''}`}
              onDoubleClick={handleDoubleClick}
              title="Double-clic pour éditer"
            >
              {task.text}
            </span>
          )}
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
