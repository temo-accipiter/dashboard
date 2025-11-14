import { PomodoroSession } from './types'

/**
 * Format seconds to MM:SS string
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Format minutes to human-readable string (e.g., "5h 30min" or "25min")
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a date is within the last 7 days
 */
export const isThisWeek = (date: Date): boolean => {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return date >= weekAgo
}

/**
 * Calculate total focus time from sessions
 */
export const calculateTotalFocusTime = (
  sessions: PomodoroSession[]
): number => {
  return sessions
    .filter((s) => s.mode === 'focus' && !s.interrupted)
    .reduce((total, session) => total + session.duration, 0)
}

/**
 * Calculate focus time for today
 */
export const calculateTodayFocusTime = (
  sessions: PomodoroSession[]
): number => {
  return sessions
    .filter(
      (s) =>
        s.mode === 'focus' && !s.interrupted && isToday(new Date(s.completedAt))
    )
    .reduce((total, session) => total + session.duration, 0)
}

/**
 * Calculate focus time for this week
 */
export const calculateWeekFocusTime = (sessions: PomodoroSession[]): number => {
  return sessions
    .filter(
      (s) =>
        s.mode === 'focus' &&
        !s.interrupted &&
        isThisWeek(new Date(s.completedAt))
    )
    .reduce((total, session) => total + session.duration, 0)
}

/**
 * Count sessions for today
 */
export const countSessionsToday = (sessions: PomodoroSession[]): number => {
  return sessions.filter(
    (s) => s.mode === 'focus' && isToday(new Date(s.completedAt))
  ).length
}

/**
 * Count sessions for this week
 */
export const countSessionsThisWeek = (sessions: PomodoroSession[]): number => {
  return sessions.filter(
    (s) => s.mode === 'focus' && isThisWeek(new Date(s.completedAt))
  ).length
}

/**
 * Calculate current streak (consecutive focus sessions not interrupted)
 */
export const calculateCurrentStreak = (sessions: PomodoroSession[]): number => {
  let streak = 0
  const focusSessions = sessions
    .filter((s) => s.mode === 'focus')
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )

  for (const session of focusSessions) {
    if (session.interrupted) {
      break
    }
    streak++
  }

  return streak
}

/**
 * Calculate longest streak ever
 */
export const calculateLongestStreak = (sessions: PomodoroSession[]): number => {
  let maxStreak = 0
  let currentStreak = 0

  const focusSessions = sessions
    .filter((s) => s.mode === 'focus')
    .sort(
      (a, b) =>
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
    )

  for (const session of focusSessions) {
    if (session.interrupted) {
      maxStreak = Math.max(maxStreak, currentStreak)
      currentStreak = 0
    } else {
      currentStreak++
    }
  }

  return Math.max(maxStreak, currentStreak)
}

/**
 * Format relative time (e.g., "il y a 15min", "il y a 1h")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "à l'instant"
  if (diffMins < 60) return `il y a ${diffMins}min`
  if (diffHours < 24) return `il y a ${diffHours}h`
  if (diffDays === 1) return 'hier'
  if (diffDays < 7) return `il y a ${diffDays}j`

  // Return formatted date for older
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Group sessions by day for history display
 */
export const groupSessionsByDay = (
  sessions: PomodoroSession[]
): Map<string, PomodoroSession[]> => {
  const grouped = new Map<string, PomodoroSession[]>()

  sessions.forEach((session) => {
    const date = new Date(session.completedAt)
    let key: string

    if (isToday(date)) {
      key = "Aujourd'hui"
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      ) {
        key = 'Hier'
      } else {
        key = date.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      }
    }

    if (!grouped.has(key)) {
      grouped.set(key, [])
    }
    grouped.get(key)!.push(session)
  })

  return grouped
}
