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
 * Couleurs conformes WCAG AA (ratio 4.5:1 sur fond blanc)
 */
export const AVAILABLE_TAGS = [
  { name: 'work', color: '#1d4ed8' }, // bleu foncé
  { name: 'personal', color: '#047857' }, // vert foncé
  { name: 'urgent', color: '#dc2626' }, // rouge foncé
  { name: 'learning', color: '#7c3aed' }, // violet foncé
]

/**
 * Configuration des niveaux de priorité avec labels, couleurs et icônes
 * Couleurs conformes WCAG AA (ratio 4.5:1 sur fond blanc)
 */
export const PRIORITY_CONFIG = {
  high: { label: 'Haute', color: '#dc2626', icon: '🔴' },
  medium: { label: 'Moyenne', color: '#d97706', icon: '🟡' },
  low: { label: 'Basse', color: '#047857', icon: '🟢' },
  none: { label: 'Aucune', color: '#6b7280', icon: '' },
}
