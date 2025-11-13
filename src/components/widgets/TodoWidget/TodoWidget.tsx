import React from 'react'
import { Task, Priority } from './types'
import { TodoForm } from './TodoForm'
import { TodoItem } from './TodoItem'
import { useTodoStorage } from './useTodoStorage'
import './TodoWidget.scss'

export const TodoWidget: React.FC = () => {
  const [tasks, setTasks] = useTodoStorage()

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

  // Trier les tâches par priorité : high → medium → low → none
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="todo-widget">
      <div className="todo-widget__header">
        <h2 className="todo-widget__title">Mes Tâches</h2>
        <span className="todo-widget__count">
          {tasks.filter(t => !t.done).length} / {tasks.length}
        </span>
      </div>

      <TodoForm onAdd={handleAddTask} />

      <div className="todo-widget__list">
        {tasks.length === 0 ? (
          <p className="todo-widget__empty">Aucune tâche pour le moment</p>
        ) : (
          sortedTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onRemoveTag={handleRemoveTag}
            />
          ))
        )}
      </div>
    </div>
  )
}
