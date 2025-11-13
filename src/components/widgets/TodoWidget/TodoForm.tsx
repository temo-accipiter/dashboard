import React, { useState } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()

    if (trimmedValue) {
      onAdd(trimmedValue)
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
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
    </form>
  )
}
