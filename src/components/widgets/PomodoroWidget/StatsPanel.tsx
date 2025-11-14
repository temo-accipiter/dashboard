import React, { useState } from 'react'
import { PomodoroStats } from './types'
import { StatCard } from './StatCard'
import { SessionHistory } from './SessionHistory'
import { formatDuration } from './utils'
import { X } from 'lucide-react'

interface StatsPanelProps {
  stats: PomodoroStats
  onClose: () => void
}

type StatsTab = 'today' | 'week' | 'history'

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, onClose }) => {
  const [activeTab, setActiveTab] = useState<StatsTab>('today')

  return (
    <div className="stats-panel-overlay" onClick={onClose}>
      <div className="stats-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="stats-header">
          <h2>Statistiques</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="stats-tabs">
          <button
            className={`tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Aujourd'hui
          </button>
          <button
            className={`tab ${activeTab === 'week' ? 'active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            Cette semaine
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Historique
          </button>
        </div>

        {/* Tab content */}
        <div className="stats-content">
          {activeTab === 'today' && (
            <div className="stats-grid">
              <StatCard
                emoji="🍅"
                value={stats.sessionsToday}
                label="Sessions"
              />
              <StatCard
                emoji="⏱️"
                value={formatDuration(stats.todayFocusTime)}
                label="Temps focus"
              />
              <StatCard
                emoji="🔥"
                value={stats.currentStreak}
                label="Streak actuel"
              />
              <StatCard
                emoji="📈"
                value={stats.longestStreak}
                label="Meilleur streak"
              />
            </div>
          )}

          {activeTab === 'week' && (
            <div className="stats-week">
              <div className="stats-grid">
                <StatCard
                  emoji="🍅"
                  value={stats.sessionsThisWeek}
                  label="Sessions"
                />
                <StatCard
                  emoji="⏱️"
                  value={formatDuration(stats.weekFocusTime)}
                  label="Temps focus total"
                />
                <StatCard
                  emoji="📊"
                  value={Math.round(stats.weekFocusTime / 7)}
                  label="Moyenne/jour (min)"
                />
                <StatCard
                  emoji="🎯"
                  value={formatDuration(stats.totalFocusTime)}
                  label="Total (all time)"
                />
              </div>

              {/* Simple week overview without external charts */}
              <div className="week-overview">
                <h3>Sessions cette semaine</h3>
                <p className="week-summary">
                  {stats.sessionsThisWeek > 0 ? (
                    <>
                      Vous avez complété <strong>{stats.sessionsThisWeek} sessions</strong> cette semaine
                      pour un total de <strong>{formatDuration(stats.weekFocusTime)}</strong> de temps focus.
                    </>
                  ) : (
                    "Aucune session cette semaine. Lancez-vous !"
                  )}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <SessionHistory sessions={stats.sessions} />
          )}
        </div>
      </div>
    </div>
  )
}
