import React from 'react'
import { AVAILABLE_TAGS } from './types'

interface TagSelectorProps {
  selectedTags: string[]
  onTagToggle: (tagName: string) => void
}

export const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onTagToggle }) => {
  return (
    <div className="tag-selector">
      <label className="tag-selector__label">Tags:</label>
      <div className="tag-selector__options">
        {AVAILABLE_TAGS.map(tag => {
          const isSelected = selectedTags.includes(tag.name)
          return (
            <button
              key={tag.name}
              type="button"
              onClick={() => onTagToggle(tag.name)}
              className={`tag-selector__badge ${isSelected ? 'tag-selector__badge--selected' : ''}`}
              style={{
                backgroundColor: isSelected ? tag.color : 'transparent',
                borderColor: tag.color,
                color: isSelected ? '#fff' : tag.color,
              }}
            >
              {tag.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
