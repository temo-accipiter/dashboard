import React, { useState } from 'react'
import { TagSelector } from './TagSelector'

interface TodoFormProps {
  onAdd: (text: string, tags: string[]) => void
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()

    if (trimmedValue) {
      onAdd(trimmedValue, selectedTags)
      setInputValue('')
      setSelectedTags([])
    }
  }

  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="todo-form__input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
          className="todo-form__input"
        />
        <button type="submit" className="todo-form__button">
          Ajouter
        </button>
      </div>
      <TagSelector selectedTags={selectedTags} onTagToggle={handleTagToggle} />
    </form>
  )
}
