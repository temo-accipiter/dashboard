import React from 'react'
import { TimerMode, TimerStatus } from './types'
import { MODE_COLORS } from './constants'

interface TimerProps {
  time: string
  mode: TimerMode
  status: TimerStatus
  progress: number
  isLastMinute: boolean
}

export const Timer: React.FC<TimerProps> = ({
  time,
  mode,
  status,
  progress,
  isLastMinute,
}) => {
  const size = 280
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Calculate stroke offset for progress (reverse direction - emptying)
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const color = MODE_COLORS[mode]

  return (
    <div
      className={`pomodoro-timer ${status === 'running' ? 'running' : ''} ${isLastMinute ? 'last-minute' : ''}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Timer: ${time}`}
    >
      <svg width={size} height={size} className="timer-svg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--timer-bg-color, #e5e7eb)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="timer-progress"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: status === 'running' ? 'stroke-dashoffset 1s linear' : 'none',
          }}
        />

        {/* Glow effect when running */}
        {status === 'running' && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="timer-glow"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              filter: `drop-shadow(0 0 8px ${color})`,
              opacity: 0.3,
            }}
          />
        )}
      </svg>

      {/* Time display */}
      <div className="timer-display">
        <span className="timer-time">{time}</span>
      </div>
    </div>
  )
}
