export interface Task {
  id: string
  text: string
  done: boolean
  createdAt: Date
  tags: string[]
}

export const AVAILABLE_TAGS = [
  { name: 'work', color: '#3b82f6' },      // bleu
  { name: 'personal', color: '#10b981' },  // vert
  { name: 'urgent', color: '#ef4444' },    // rouge
  { name: 'learning', color: '#8b5cf6' },  // violet
]
