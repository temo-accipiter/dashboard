import React from 'react'

interface StatCardProps {
  emoji: string
  value: string | number
  label: string
  trend?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  emoji,
  value,
  label,
  trend,
}) => {
  return (
    <div className="pomodoro-stat-card">
      <div className="stat-emoji">{emoji}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {trend && <div className="stat-trend">{trend}</div>}
    </div>
  )
}
