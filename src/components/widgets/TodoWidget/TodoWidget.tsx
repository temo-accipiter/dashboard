import React, { useState } from 'react'
import { Task } from './types'
import { TodoForm } from './TodoForm'
import { TodoItem } from './TodoItem'
import './TodoWidget.scss'

export const TodoWidget: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      done: false,
      createdAt: new Date(),
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
          tasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}
