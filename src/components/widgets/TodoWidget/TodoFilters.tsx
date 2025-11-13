import React from 'react'
import { AVAILABLE_TAGS } from './types'

export type FilterType = 'all' | 'active' | 'completed'

interface TodoFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  activeCount: number
  completedCount: number
  selectedTags: string[]
  onTagFilterChange: (tags: string[]) => void
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  selectedTags,
  onTagFilterChange,
}) => {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'Toutes' },
    { type: 'active', label: 'Actives' },
    { type: 'completed', label: 'Complétées' },
  ]

  const handleTagToggle = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagFilterChange(selectedTags.filter(t => t !== tagName))
    } else {
      onTagFilterChange([...selectedTags, tagName])
    }
  }

  return (
    <div className="todo-filters">
      <div className="todo-filters__main">
        <div className="todo-filters__buttons">
          {filters.map(filter => (
            <button
              key={filter.type}
              onClick={() => onFilterChange(filter.type)}
              className={`todo-filters__button ${
                currentFilter === filter.type ? 'todo-filters__button--active' : ''
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="todo-filters__count">
          <span className="todo-filters__count-badge">
            {activeCount} active{activeCount !== 1 ? 's' : ''}
          </span>
          {completedCount > 0 && (
            <span className="todo-filters__count-badge todo-filters__count-badge--completed">
              {completedCount} complétée{completedCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {AVAILABLE_TAGS.length > 0 && (
        <div className="todo-filters__tags">
          <span className="todo-filters__tags-label">Filtrer par tag:</span>
          <div className="todo-filters__tags-list">
            {AVAILABLE_TAGS.map(tag => {
              const isSelected = selectedTags.includes(tag.name)
              return (
                <button
                  key={tag.name}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`todo-filters__tag ${isSelected ? 'todo-filters__tag--selected' : ''}`}
                  style={{
                    borderColor: tag.color,
                    backgroundColor: isSelected ? tag.color : 'transparent',
                    color: isSelected ? '#fff' : tag.color,
                  }}
                >
                  {tag.name}
                </button>
              )
            })}
            {selectedTags.length > 0 && (
              <button
                onClick={() => onTagFilterChange([])}
                className="todo-filters__clear"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
