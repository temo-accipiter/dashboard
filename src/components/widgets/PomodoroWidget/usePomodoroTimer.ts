import { useState, useEffect, useCallback, useRef } from 'react'
import { TimerMode, TimerStatus, TimerConfig, PomodoroSession } from './types'
import { formatTime } from './utils'

interface UsePomodoroTimerProps {
  timerConfig: TimerConfig
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  onSessionComplete: (session: PomodoroSession) => void
  onModeChange?: (mode: TimerMode) => void
  onTimerEnd?: (mode: TimerMode) => void
  onHalfway?: (mode: TimerMode, timeLeft: number) => void
}

/**
 * Main hook for Pomodoro timer logic
 */
export const usePomodoroTimer = ({
  timerConfig,
  autoStartBreaks,
  autoStartPomodoros,
  onSessionComplete,
  onModeChange,
  onTimerEnd,
  onHalfway,
}: UsePomodoroTimerProps) => {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [timeLeft, setTimeLeft] = useState(timerConfig.focus * 60) // in seconds
  const [sessionCount, setSessionCount] = useState(0) // for long break cycle
  const [halfwayNotified, setHalfwayNotified] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<Date | null>(null)

  // Calculate total time for current mode
  const totalTime = (() => {
    switch (mode) {
      case 'focus':
        return timerConfig.focus * 60
      case 'shortBreak':
        return timerConfig.shortBreak * 60
      case 'longBreak':
        return timerConfig.longBreak * 60
    }
  })()

  // Calculate progress percentage
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  // Check if last minute
  const isLastMinute = timeLeft <= 60 && timeLeft > 0

  // Formatted time string
  const formattedTime = formatTime(timeLeft)

  // Get next mode in cycle
  const getNextMode = useCallback((): TimerMode => {
    if (mode === 'focus') {
      const nextSessionCount = sessionCount + 1
      if (nextSessionCount >= timerConfig.longBreakInterval) {
        return 'longBreak'
      }
      return 'shortBreak'
    }
    return 'focus'
  }, [mode, sessionCount, timerConfig.longBreakInterval])

  // Clear interval
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Start timer
  const start = useCallback(() => {
    if (status === 'running') return

    setStatus('running')
    startTimeRef.current = new Date()
    setHalfwayNotified(false)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [status])

  // Pause timer
  const pause = useCallback(() => {
    if (status !== 'running') return

    setStatus('paused')
    clearTimer()
  }, [status, clearTimer])

  // Reset timer
  const reset = useCallback(() => {
    clearTimer()
    setStatus('idle')
    setTimeLeft(totalTime)
    setHalfwayNotified(false)
    startTimeRef.current = null
  }, [clearTimer, totalTime])

  // Skip to next mode
  const skip = useCallback(() => {
    clearTimer()

    // Save current session as interrupted if it was running/paused
    if ((status === 'running' || status === 'paused') && startTimeRef.current) {
      const duration = Math.round((totalTime - timeLeft) / 60) // actual time spent in minutes

      if (duration > 0) {
        const session: PomodoroSession = {
          id: crypto.randomUUID(),
          mode,
          duration,
          completedAt: new Date(),
          interrupted: true,
        }
        onSessionComplete(session)
      }
    }

    // Move to next mode
    const nextMode = getNextMode()

    // Update session count
    if (mode === 'focus') {
      const nextCount = sessionCount + 1
      if (nextCount >= timerConfig.longBreakInterval) {
        setSessionCount(0)
      } else {
        setSessionCount(nextCount)
      }
    }

    setMode(nextMode)
    onModeChange?.(nextMode)

    const nextTime = (() => {
      switch (nextMode) {
        case 'focus':
          return timerConfig.focus * 60
        case 'shortBreak':
          return timerConfig.shortBreak * 60
        case 'longBreak':
          return timerConfig.longBreak * 60
      }
    })()

    setTimeLeft(nextTime)
    setStatus('idle')
    setHalfwayNotified(false)
    startTimeRef.current = null
  }, [
    clearTimer,
    status,
    mode,
    timeLeft,
    totalTime,
    sessionCount,
    timerConfig,
    getNextMode,
    onSessionComplete,
    onModeChange,
  ])

  // Manually set mode (when idle only)
  const changeMode = useCallback(
    (newMode: TimerMode) => {
      if (status !== 'idle') return

      setMode(newMode)
      onModeChange?.(newMode)

      const newTime = (() => {
        switch (newMode) {
          case 'focus':
            return timerConfig.focus * 60
          case 'shortBreak':
            return timerConfig.shortBreak * 60
          case 'longBreak':
            return timerConfig.longBreak * 60
        }
      })()

      setTimeLeft(newTime)
      setHalfwayNotified(false)
    },
    [status, timerConfig, onModeChange]
  )

  // Handle timer completion
  useEffect(() => {
    if (timeLeft === 0 && status === 'running') {
      clearTimer()

      // Save completed session
      const session: PomodoroSession = {
        id: crypto.randomUUID(),
        mode,
        duration: Math.round(totalTime / 60), // duration in minutes
        completedAt: new Date(),
        interrupted: false,
      }
      onSessionComplete(session)

      // Trigger timer end callback
      onTimerEnd?.(mode)

      // Move to next mode
      const nextMode = getNextMode()

      // Update session count
      if (mode === 'focus') {
        const nextCount = sessionCount + 1
        if (nextCount >= timerConfig.longBreakInterval) {
          setSessionCount(0) // Reset after long break
        } else {
          setSessionCount(nextCount)
        }
      }

      setMode(nextMode)
      onModeChange?.(nextMode)

      const nextTime = (() => {
        switch (nextMode) {
          case 'focus':
            return timerConfig.focus * 60
          case 'shortBreak':
            return timerConfig.shortBreak * 60
          case 'longBreak':
            return timerConfig.longBreak * 60
        }
      })()

      setTimeLeft(nextTime)
      setHalfwayNotified(false)
      startTimeRef.current = null

      // Auto-start next mode if configured
      const shouldAutoStart =
        (nextMode === 'focus' && autoStartPomodoros) ||
        (nextMode !== 'focus' && autoStartBreaks)

      if (shouldAutoStart) {
        setStatus('running')
        startTimeRef.current = new Date()
        intervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setStatus('idle')
      }
    }
  }, [
    timeLeft,
    status,
    mode,
    totalTime,
    sessionCount,
    timerConfig,
    autoStartBreaks,
    autoStartPomodoros,
    getNextMode,
    onSessionComplete,
    onTimerEnd,
    onModeChange,
    clearTimer,
  ])

  // Handle halfway notification
  useEffect(() => {
    if (status === 'running' && !halfwayNotified) {
      const halfway = Math.floor(totalTime / 2)
      if (timeLeft <= halfway && timeLeft > halfway - 2) {
        setHalfwayNotified(true)
        onHalfway?.(mode, Math.ceil(timeLeft / 60))
      }
    }
  }, [timeLeft, status, totalTime, halfwayNotified, mode, onHalfway])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  // Update timeLeft when config changes (only if idle)
  useEffect(() => {
    if (status === 'idle') {
      const newTime = (() => {
        switch (mode) {
          case 'focus':
            return timerConfig.focus * 60
          case 'shortBreak':
            return timerConfig.shortBreak * 60
          case 'longBreak':
            return timerConfig.longBreak * 60
        }
      })()
      setTimeLeft(newTime)
    }
  }, [timerConfig, mode, status])

  return {
    // State
    timeLeft,
    totalTime,
    mode,
    status,
    sessionCount,
    progress,
    formattedTime,
    isLastMinute,

    // Actions
    start,
    pause,
    reset,
    skip,
    changeMode,
  }
}
