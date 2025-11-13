import React from 'react'
import { Priority, PRIORITY_CONFIG } from './types'

interface PrioritySelectorProps {
  selectedPriority: Priority
  onPriorityChange: (priority: Priority) => void
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange,
}) => {
  const priorities: Priority[] = ['high', 'medium', 'low', 'none']

  return (
    <div className="priority-selector">
      <label className="priority-selector__label">Priorité:</label>
      <div className="priority-selector__options">
        {priorities.map(priority => {
          const config = PRIORITY_CONFIG[priority]
          const isSelected = selectedPriority === priority
          return (
            <button
              key={priority}
              type="button"
              onClick={() => onPriorityChange(priority)}
              className={`priority-selector__button ${isSelected ? 'priority-selector__button--selected' : ''}`}
              style={{
                borderColor: config.color,
                backgroundColor: isSelected ? config.color : 'transparent',
                color: isSelected ? '#fff' : config.color,
              }}
            >
              {config.icon && <span className="priority-selector__icon">{config.icon}</span>}
              <span>{config.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
