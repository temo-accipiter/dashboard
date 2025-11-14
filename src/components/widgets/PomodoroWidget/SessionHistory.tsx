import React from 'react'
import { PomodoroSession } from './types'
import { MODE_EMOJI, MODE_LABELS } from './constants'
import { groupSessionsByDay, formatRelativeTime } from './utils'
import { CheckCircle2, XCircle } from 'lucide-react'

interface SessionHistoryProps {
  sessions: PomodoroSession[]
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions }) => {
  // Get last 20 sessions sorted by date (newest first)
  const recentSessions = sessions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )
    .slice(0, 20)

  const groupedSessions = groupSessionsByDay(recentSessions)

  if (recentSessions.length === 0) {
    return (
      <div className="session-history-empty">
        <p>Aucune session enregistrée</p>
        <span>Lancez votre première session pour commencer ! 🌱</span>
      </div>
    )
  }

  return (
    <div className="session-history">
      {Array.from(groupedSessions.entries()).map(([day, daySessions]) => (
        <div key={day} className="history-day-group">
          <h4 className="history-day-header">{day}</h4>
          <div className="history-sessions">
            {daySessions.map((session) => (
              <div
                key={session.id}
                className={`history-session ${session.interrupted ? 'interrupted' : 'completed'}`}
              >
                <span className="session-emoji">
                  {MODE_EMOJI[session.mode]}
                </span>
                <div className="session-info">
                  <span className="session-type">
                    {MODE_LABELS[session.mode]}
                  </span>
                  <span className="session-duration">
                    {session.duration}min
                  </span>
                </div>
                <div className="session-status">
                  {session.interrupted ? (
                    <>
                      <XCircle size={16} className="status-icon interrupted" />
                      <span>Interrompu</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        size={16}
                        className="status-icon completed"
                      />
                      <span>Terminé</span>
                    </>
                  )}
                </div>
                <span className="session-time">
                  {formatRelativeTime(session.completedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
