import { useState, useEffect } from 'react'
import { Task } from './types'

const STORAGE_KEY = 'personal-dashboard-todos'

/**
 * Hook custom pour gérer la persistence des tâches dans localStorage
 * @returns [tasks, setTasks] - État des tâches et setter
 */
export function useTodoStorage(): [Task[], React.Dispatch<React.SetStateAction<Task[]>>] {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Charger les tâches depuis localStorage au montage
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Reconvertir les dates qui sont en string après JSON.parse
        return parsed.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tâches depuis localStorage:', error)
    }
    return []
  })

  // Sauvegarder automatiquement à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des tâches dans localStorage:', error)
    }
  }, [tasks])

  return [tasks, setTasks]
}
