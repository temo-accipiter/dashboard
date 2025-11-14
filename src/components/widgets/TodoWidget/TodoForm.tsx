import React, { useState } from 'react'
import { Priority } from './types'
import { TagSelector } from './TagSelector'
import { PrioritySelector } from './PrioritySelector'

interface TodoFormProps {
  onAdd: (text: string, tags: string[], priority: Priority) => void
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPriority, setSelectedPriority] = useState<Priority>('none')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()

    if (trimmedValue) {
      onAdd(trimmedValue, selectedTags, selectedPriority)
      setInputValue('')
      setSelectedTags([])
      setSelectedPriority('none')
    }
  }

  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="todo-form"
      aria-label="Formulaire d'ajout de tâche"
    >
      <div className="todo-form__input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
          className="todo-form__input"
          aria-label="Texte de la nouvelle tâche"
          id="new-task-input"
          autoComplete="off"
        />
        <button
          type="submit"
          className="todo-form__button"
          aria-label="Ajouter la tâche"
          disabled={!inputValue.trim()}
        >
          Ajouter
        </button>
      </div>
      <TagSelector selectedTags={selectedTags} onTagToggle={handleTagToggle} />
      <PrioritySelector
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />
    </form>
  )
}
