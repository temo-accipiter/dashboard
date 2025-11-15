import { ComponentType } from 'react'
import { TodoWidget } from '@/components/widgets/TodoWidget/TodoWidget'
import { PomodoroWidget } from '@/components/widgets/PomodoroWidget/PomodoroWidget'
import { NewsWidget } from '@/components/widgets/NewsWidget/NewsWidget'
import { GitHubPRsWidget } from '@/components/widgets/GitHubPRsWidget'

export interface WidgetManifest {
  id: string
  name: string
  description: string
  icon: string
  category: 'productivity' | 'information' | 'entertainment' | 'utility'
  component: ComponentType
  version: string
  author: string
  tags: string[]
  preview?: string
}

export const WIDGET_REGISTRY: WidgetManifest[] = [
  {
    id: 'todo-widget',
    name: 'Liste de tâches',
    description: 'Gérez vos tâches quotidiennes avec des priorités et des tags',
    icon: '✅',
    category: 'productivity',
    component: TodoWidget,
    version: '1.0.0',
    author: 'Dashboard Team',
    tags: ['todo', 'tâches', 'productivité', 'organisation'],
    preview:
      'Créez, organisez et suivez vos tâches avec un système de priorités et de tags personnalisés.',
  },
  {
    id: 'pomodoro-widget',
    name: 'Pomodoro Timer',
    description: 'Timer Pomodoro avec statistiques et notifications',
    icon: '🍅',
    category: 'productivity',
    component: PomodoroWidget,
    version: '1.0.0',
    author: 'Dashboard Team',
    tags: ['pomodoro', 'timer', 'productivité', 'focus'],
    preview:
      'Utilisez la technique Pomodoro pour améliorer votre concentration avec des sessions de 25 minutes.',
  },
  {
    id: 'news-widget',
    name: "Flux d'actualités",
    description: 'Lecteur RSS pour suivre vos actualités préférées',
    icon: '📰',
    category: 'information',
    component: NewsWidget,
    version: '1.0.0',
    author: 'Dashboard Team',
    tags: ['news', 'rss', 'actualités', 'information'],
    preview:
      "Suivez vos sources d'actualités préférées via RSS dans une interface épurée.",
  },
  {
    id: 'github-prs-widget',
    name: 'GitHub Pull Requests',
    description: 'Visualisez vos pull requests GitHub en temps réel',
    icon: '🔀',
    category: 'productivity',
    component: GitHubPRsWidget,
    version: '1.0.0',
    author: 'Dashboard Team',
    tags: ['github', 'pull requests', 'git', 'code review', 'développement', 'integration'],
    preview:
      "Suivez l'état de vos pull requests GitHub avec mise à jour automatique et filtres personnalisables.",
  },
]

/**
 * Get all available widgets from the registry
 */
export function getAvailableWidgets(): WidgetManifest[] {
  return WIDGET_REGISTRY
}

/**
 * Get a specific widget by ID
 */
export function getWidgetById(id: string): WidgetManifest | undefined {
  return WIDGET_REGISTRY.find((widget) => widget.id === id)
}

/**
 * Get widgets by category
 */
export function getWidgetsByCategory(
  category: WidgetManifest['category']
): WidgetManifest[] {
  return WIDGET_REGISTRY.filter((widget) => widget.category === category)
}

/**
 * Search widgets by name or tags
 */
export function searchWidgets(query: string): WidgetManifest[] {
  const lowerQuery = query.toLowerCase()
  return WIDGET_REGISTRY.filter(
    (widget) =>
      widget.name.toLowerCase().includes(lowerQuery) ||
      widget.description.toLowerCase().includes(lowerQuery) ||
      widget.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
