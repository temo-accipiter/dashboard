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
    <div
      className="priority-selector"
      role="group"
      aria-label="Sélection de la priorité"
    >
      <label className="priority-selector__label" id="priority-selector-label">
        Priorité:
      </label>
      <div
        className="priority-selector__options"
        role="group"
        aria-labelledby="priority-selector-label"
      >
        {priorities.map((priority) => {
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
              aria-pressed={isSelected}
              aria-label={`Priorité ${config.label}${isSelected ? ' (sélectionnée)' : ''}`}
            >
              {config.icon && (
                <span className="priority-selector__icon" aria-hidden="true">
                  {config.icon}
                </span>
              )}
              <span>{config.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
