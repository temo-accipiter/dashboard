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
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleRemoveTag = (taskId: string, tagName: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, tags: task.tags.filter((t) => t !== tagName) }
          : task
      )
    )
  }

  const handleEditTask = (taskId: string, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    )
  }

  /**
   * Filtre les tâches selon le filtre actif et les tags sélectionnés
   * Applique également un tri par priorité (high → medium → low → none)
   * @returns Tableau de tâches filtrées et triées
   */
  const getFilteredTasks = () => {
    let filtered = [...tasks]

    // Filtrage par statut (all/active/completed)
    if (currentFilter === 'active') {
      filtered = filtered.filter((task) => !task.done)
    } else if (currentFilter === 'completed') {
      filtered = filtered.filter((task) => task.done)
    }

    // Filtrage par tags (affiche si la tâche a AU MOINS un tag sélectionné)
    if (selectedTagFilters.length > 0) {
      filtered = filtered.filter((task) =>
        selectedTagFilters.some((tagFilter) => task.tags.includes(tagFilter))
      )
    }

    // Trier par priorité (high → medium → low → none)
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  const filteredTasks = getFilteredTasks()
  const activeCount = tasks.filter((t) => !t.done).length
  const completedCount = tasks.filter((t) => t.done).length

  return (
    <section className="todo-widget" aria-label="Widget de gestion de tâches">
      <header className="todo-widget__header">
        <h2 className="todo-widget__title">Liste de tâches</h2>
        <span
          className="todo-widget__count"
          aria-label={`${activeCount} tâches actives sur ${tasks.length} au total`}
        >
          {activeCount} / {tasks.length}
        </span>
      </header>

      <TodoForm onAdd={handleAddTask} />

      <TodoFilters
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        activeCount={activeCount}
        completedCount={completedCount}
        selectedTags={selectedTagFilters}
        onTagFilterChange={setSelectedTagFilters}
      />

      {tasks.length === 0 ? (
        <p className="todo-widget__empty" role="status">
          Aucune tâche pour le moment
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="todo-widget__empty" role="status">
          Aucune tâche ne correspond aux filtres
        </p>
      ) : (
        <div
          className="todo-widget__list"
          role="list"
          aria-label="Liste des tâches"
        >
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onRemoveTag={handleRemoveTag}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}
    </section>
  )
}
