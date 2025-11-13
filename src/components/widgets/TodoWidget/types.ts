export type Priority = 'high' | 'medium' | 'low' | 'none'

export interface Task {
  id: string
  text: string
  done: boolean
  createdAt: Date
  tags: string[]
  priority: Priority
}

export const AVAILABLE_TAGS = [
  { name: 'work', color: '#3b82f6' },      // bleu
  { name: 'personal', color: '#10b981' },  // vert
  { name: 'urgent', color: '#ef4444' },    // rouge
  { name: 'learning', color: '#8b5cf6' },  // violet
]

export const PRIORITY_CONFIG = {
  high: { label: 'Haute', color: '#ef4444', icon: '🔴' },
  medium: { label: 'Moyenne', color: '#f59e0b', icon: '🟡' },
  low: { label: 'Basse', color: '#10b981', icon: '🟢' },
  none: { label: 'Aucune', color: '#6b7280', icon: '' },
}
