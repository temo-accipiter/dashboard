import React from 'react'
import { CategoryFilter, SortOrder, CATEGORY_CONFIG } from './types'

interface NewsFiltersProps {
  currentFilter: CategoryFilter
  onFilterChange: (filter: CategoryFilter) => void
  sortOrder: SortOrder
  onSortChange: (order: SortOrder) => void
  availableCategories: string[]
  articleCount: number
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  currentFilter,
  onFilterChange,
  sortOrder,
  onSortChange,
  availableCategories,
  articleCount,
}) => {
  return (
    <div className="news-filters">
      <div className="news-filters__section">
        <label className="news-filters__label">
          Catégories ({articleCount} articles)
        </label>
        <div className="news-filters__categories">
          <button
            onClick={() => onFilterChange('all')}
            className={`news-filters__category-btn ${
              currentFilter === 'all'
                ? 'news-filters__category-btn--active'
                : ''
            }`}
            aria-pressed={currentFilter === 'all'}
          >
            {CATEGORY_CONFIG.all.icon} {CATEGORY_CONFIG.all.label}
          </button>

          {availableCategories.map((category) => {
            const config =
              CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG]
            if (!config) return null

            return (
              <button
                key={category}
                onClick={() => onFilterChange(category)}
                className={`news-filters__category-btn ${
                  currentFilter === category
                    ? 'news-filters__category-btn--active'
                    : ''
                }`}
                style={
                  currentFilter === category
                    ? { borderColor: config.color, color: config.color }
                    : undefined
                }
                aria-pressed={currentFilter === category}
              >
                {config.icon} {config.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="news-filters__section">
        <label className="news-filters__label">Tri</label>
        <div className="news-filters__sort">
          <button
            onClick={() => onSortChange('newest')}
            className={`news-filters__sort-btn ${
              sortOrder === 'newest' ? 'news-filters__sort-btn--active' : ''
            }`}
            aria-pressed={sortOrder === 'newest'}
          >
            ⬇️ Plus récent
          </button>
          <button
            onClick={() => onSortChange('oldest')}
            className={`news-filters__sort-btn ${
              sortOrder === 'oldest' ? 'news-filters__sort-btn--active' : ''
            }`}
            aria-pressed={sortOrder === 'oldest'}
          >
            ⬆️ Plus ancien
          </button>
          <button
            onClick={() => onSortChange('source')}
            className={`news-filters__sort-btn ${
              sortOrder === 'source' ? 'news-filters__sort-btn--active' : ''
            }`}
            aria-pressed={sortOrder === 'source'}
          >
            📰 Par source
          </button>
        </div>
      </div>
    </div>
  )
}
