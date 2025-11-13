/**
 * Niveau de priorité d'une tâche
 */
export type Priority = 'high' | 'medium' | 'low' | 'none'

/**
 * Interface représentant une tâche
 */
export interface Task {
  /** Identifiant unique (UUID) */
  id: string
  /** Texte descriptif de la tâche */
  text: string
  /** État de complétion */
  done: boolean
  /** Date de création */
  createdAt: Date
  /** Tags associés à la tâche */
  tags: string[]
  /** Niveau de priorité */
  priority: Priority
}

/**
 * Tags disponibles avec leurs couleurs associées
 */
export const AVAILABLE_TAGS = [
  { name: 'work', color: '#3b82f6' },      // bleu
  { name: 'personal', color: '#10b981' },  // vert
  { name: 'urgent', color: '#ef4444' },    // rouge
  { name: 'learning', color: '#8b5cf6' },  // violet
]

/**
 * Configuration des niveaux de priorité avec labels, couleurs et icônes
 */
export const PRIORITY_CONFIG = {
  high: { label: 'Haute', color: '#ef4444', icon: '🔴' },
  medium: { label: 'Moyenne', color: '#f59e0b', icon: '🟡' },
  low: { label: 'Basse', color: '#10b981', icon: '🟢' },
  none: { label: 'Aucune', color: '#6b7280', icon: '' },
}
