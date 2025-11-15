export interface NewsArticle {
  id: string
  title: string
  description: string
  link: string
  pubDate: Date
  source: string
  category: string
  image?: string
  author?: string
  content?: string
}

export interface RSSFeed {
  id: string
  name: string
  url: string
  category: string
  enabled: boolean
}

export type CategoryFilter = 'all' | string

export type SortOrder = 'newest' | 'oldest' | 'source'

export const DEFAULT_RSS_FEEDS: RSSFeed[] = [
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'technology',
    enabled: true,
  },
  {
    id: 'dev-to',
    name: 'DEV Community',
    url: 'https://dev.to/feed',
    category: 'development',
    enabled: true,
  },
  {
    id: 'hacker-news',
    name: 'Hacker News',
    url: 'https://hnrss.org/frontpage',
    category: 'technology',
    enabled: true,
  },
  {
    id: 'css-tricks',
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    category: 'development',
    enabled: true,
  },
]

export const CATEGORY_CONFIG = {
  all: { label: 'Tous', color: '#6b7280', icon: '📰' },
  technology: { label: 'Technologie', color: '#3b82f6', icon: '💻' },
  development: { label: 'Développement', color: '#8b5cf6', icon: '⚙️' },
  design: { label: 'Design', color: '#ec4899', icon: '🎨' },
  business: { label: 'Business', color: '#10b981', icon: '💼' },
  science: { label: 'Science', color: '#f59e0b', icon: '🔬' },
}
