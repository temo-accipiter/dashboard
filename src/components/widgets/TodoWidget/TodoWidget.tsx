import React, { useState } from 'react'
import { Task, Priority } from './types'
import { TodoForm } from './TodoForm'
import { TodoItem } from './TodoItem'
import { TodoFilters, FilterType } from './TodoFilters'
import { useTodoStorage } from './useTodoStorage'
import './TodoWidget.scss'

export const TodoWidget: React.FC = () => {
  const [tasks, setTasks] = useTodoStorage()
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [selectedTagFilters, setSelectedTagFilters] = useState<string[]>([])

  const handleAddTask = (text: string, tags: string[], priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      done: false,
      createdAt: new Date(),
      tags,
      priority,
    }
    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleRemoveTag = (taskId: string, tagName: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, tags: task.tags.filter(t => t !== tagName) }
        : task
    ))
  }

  const handleEditTask = (taskId: string, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, text: newText }
        : task
    ))
  }

  // Filtrer les tâches selon le filtre actif et les tags sélectionnés
  const getFilteredTasks = () => {
    let filtered = [...tasks]

    // Filtrage par statut (all/active/completed)
    if (currentFilter === 'active') {
      filtered = filtered.filter(task => !task.done)
    } else if (currentFilter === 'completed') {
      filtered = filtered.filter(task => task.done)
    }

    // Filtrage par tags
    if (selectedTagFilters.length > 0) {
      filtered = filtered.filter(task =>
        selectedTagFilters.some(tagFilter => task.tags.includes(tagFilter))
      )
    }

    // Trier par priorité
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  const filteredTasks = getFilteredTasks()
  const activeCount = tasks.filter(t => !t.done).length
  const completedCount = tasks.filter(t => t.done).length

  return (
    <div className="todo-widget">
      <div className="todo-widget__header">
        <h2 className="todo-widget__title">Mes Tâches</h2>
        <span className="todo-widget__count">
          {activeCount} / {tasks.length}
        </span>
      </div>

      <TodoForm onAdd={handleAddTask} />

      <TodoFilters
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        activeCount={activeCount}
        completedCount={completedCount}
        selectedTags={selectedTagFilters}
        onTagFilterChange={setSelectedTagFilters}
      />

      <div className="todo-widget__list">
        {tasks.length === 0 ? (
          <p className="todo-widget__empty">Aucune tâche pour le moment</p>
        ) : filteredTasks.length === 0 ? (
          <p className="todo-widget__empty">Aucune tâche ne correspond aux filtres</p>
        ) : (
          filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onRemoveTag={handleRemoveTag}
              onEdit={handleEditTask}
            />
          ))
        )}
      </div>
    </div>
  )
}
