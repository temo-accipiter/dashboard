import { useState, useEffect, useCallback } from 'react'
import { PomodoroSession, PomodoroStats, PomodoroSettings } from './types'
import {
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  MAX_SESSIONS_HISTORY,
} from './constants'
import {
  calculateTotalFocusTime,
  calculateTodayFocusTime,
  calculateWeekFocusTime,
  countSessionsToday,
  countSessionsThisWeek,
  calculateCurrentStreak,
  calculateLongestStreak,
} from './utils'

/**
 * Hook for managing Pomodoro data persistence in localStorage
 */
export const usePomodoroStorage = () => {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS)
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const [stats, setStats] = useState<PomodoroStats>({
    sessions: [],
    totalFocusTime: 0,
    todayFocusTime: 0,
    weekFocusTime: 0,
    sessionsToday: 0,
    sessionsThisWeek: 0,
    currentStreak: 0,
    longestStreak: 0,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }, [])

  // Load sessions from localStorage on mount
  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS)
      if (storedSessions) {
        const parsed = JSON.parse(storedSessions)
        // Convert completedAt strings back to Date objects
        const sessionsWithDates = parsed.map((s: PomodoroSession) => ({
          ...s,
          completedAt: new Date(s.completedAt),
        }))
        setSessions(sessionsWithDates)
      }
    } catch (error) {
      console.error('Error loading sessions:', error)
    }
  }, [])

  // Recalculate stats whenever sessions change
  useEffect(() => {
    const newStats: PomodoroStats = {
      sessions,
      totalFocusTime: calculateTotalFocusTime(sessions),
      todayFocusTime: calculateTodayFocusTime(sessions),
      weekFocusTime: calculateWeekFocusTime(sessions),
      sessionsToday: countSessionsToday(sessions),
      sessionsThisWeek: countSessionsThisWeek(sessions),
      currentStreak: calculateCurrentStreak(sessions),
      longestStreak: calculateLongestStreak(sessions),
    }
    setStats(newStats)
  }, [sessions])

  // Save a new session
  const saveSession = useCallback((session: PomodoroSession) => {
    setSessions((prevSessions) => {
      // Add new session and keep only last MAX_SESSIONS_HISTORY
      const newSessions = [session, ...prevSessions].slice(
        0,
        MAX_SESSIONS_HISTORY
      )

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(newSessions))
      } catch (error) {
        console.error('Error saving session:', error)
      }

      return newSessions
    })
  }, [])

  // Update settings
  const updateSettings = useCallback(
    (newSettings: Partial<PomodoroSettings>) => {
      setSettings((prevSettings) => {
        const updated = { ...prevSettings, ...newSettings }

        // Save to localStorage
        try {
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
        } catch (error) {
          console.error('Error saving settings:', error)
        }

        return updated
      })
    },
    []
  )

  // Export data as JSON string
  const exportData = useCallback((): string => {
    const data = {
      settings,
      sessions,
      exportedAt: new Date().toISOString(),
    }
    return JSON.stringify(data, null, 2)
  }, [settings, sessions])

  // Import data from JSON string
  const importData = useCallback((jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString)

      if (data.settings) {
        setSettings({ ...DEFAULT_SETTINGS, ...data.settings })
        localStorage.setItem(
          STORAGE_KEYS.SETTINGS,
          JSON.stringify(data.settings)
        )
      }

      if (data.sessions && Array.isArray(data.sessions)) {
        const sessionsWithDates = data.sessions.map((s: PomodoroSession) => ({
          ...s,
          completedAt: new Date(s.completedAt),
        }))
        setSessions(sessionsWithDates)
        localStorage.setItem(
          STORAGE_KEYS.SESSIONS,
          JSON.stringify(sessionsWithDates)
        )
      }

      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }, [])

  // Reset all data
  const resetAll = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    setSessions([])

    try {
      localStorage.removeItem(STORAGE_KEYS.SETTINGS)
      localStorage.removeItem(STORAGE_KEYS.SESSIONS)
      localStorage.removeItem(STORAGE_KEYS.STATS)
    } catch (error) {
      console.error('Error resetting data:', error)
    }
  }, [])

  return {
    settings,
    stats,
    sessions,
    saveSession,
    updateSettings,
    exportData,
    importData,
    resetAll,
  }
}
