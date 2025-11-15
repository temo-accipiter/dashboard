'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Timer } from './Timer'
import { Controls } from './Controls'
import { StatCard } from './StatCard'
import { StatsPanel } from './StatsPanel'
import { SettingsPanel } from './SettingsPanel'
import { NotificationBanner } from './NotificationBanner'
import { usePomodoroTimer } from './usePomodoroTimer'
import { usePomodoroStorage } from './usePomodoroStorage'
import { usePomodoroSound } from './usePomodoroSound'
import { useNotification } from './useNotification'
import { MODE_LABELS, MODE_EMOJI } from './constants'
import { formatDuration } from './utils'
import { PomodoroSession, TimerMode } from './types'
import { Settings, BarChart3 } from 'lucide-react'
import './PomodoroWidget.scss'

export const PomodoroWidget: React.FC = () => {
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Storage hook
  const {
    settings,
    stats,
    saveSession,
    updateSettings,
    exportData,
    importData,
    resetAll,
  } = usePomodoroStorage()

  // Notification hook
  const {
    permissionState,
    showBanner,
    requestPermission,
    dismissBanner,
    notifyFocusEnd,
    notifyShortBreakEnd,
    notifyLongBreakEnd,
    notifyHalfway,
  } = useNotification()

  // Sound hook
  const { playSound, previewSound } = usePomodoroSound(settings.sounds)

  // Timer callbacks
  const handleSessionComplete = useCallback(
    (session: PomodoroSession) => {
      saveSession(session)
    },
    [saveSession]
  )

  const handleTimerEnd = useCallback(
    (mode: TimerMode) => {
      // Play sound
      if (mode === 'focus') {
        playSound(settings.sounds.focusEnd)
      } else {
        playSound(settings.sounds.breakEnd)
      }

      // Send notification
      if (settings.notifications.enabled && settings.notifications.showAtEnd) {
        if (mode === 'focus') {
          notifyFocusEnd()
        } else if (mode === 'shortBreak') {
          notifyShortBreakEnd()
        } else if (mode === 'longBreak') {
          notifyLongBreakEnd()
        }
      }
    },
    [
      settings,
      playSound,
      notifyFocusEnd,
      notifyShortBreakEnd,
      notifyLongBreakEnd,
    ]
  )

  const handleHalfway = useCallback(
    (mode: TimerMode, timeLeft: number) => {
      if (
        settings.notifications.enabled &&
        settings.notifications.showAtHalfway
      ) {
        notifyHalfway(mode, String(timeLeft))
      }
    },
    [settings, notifyHalfway]
  )

  // Timer hook
  const {
    mode,
    status,
    sessionCount,
    progress,
    formattedTime,
    isLastMinute,
    start,
    pause,
    reset,
    skip,
    changeMode,
  } = usePomodoroTimer({
    timerConfig: settings.timerConfig,
    autoStartBreaks: settings.autoStartBreaks,
    autoStartPomodoros: settings.autoStartPomodoros,
    onSessionComplete: handleSessionComplete,
    onTimerEnd: handleTimerEnd,
    onHalfway: handleHalfway,
  })

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Don't trigger if modal is open
      if (showStats || showSettings) {
        if (e.key === 'Escape') {
          setShowStats(false)
          setShowSettings(false)
        }
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          if (status === 'running') {
            pause()
          } else {
            start()
          }
          break
        case 'r':
        case 'R':
          e.preventDefault()
          reset()
          break
        case 's':
        case 'S':
          e.preventDefault()
          skip()
          break
        case '1':
          if (status === 'idle') changeMode('focus')
          break
        case '2':
          if (status === 'idle') changeMode('shortBreak')
          break
        case '3':
          if (status === 'idle') changeMode('longBreak')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [status, showStats, showSettings, start, pause, reset, skip, changeMode])

  // Calculate sessions until long break
  const sessionsUntilLongBreak =
    settings.timerConfig.longBreakInterval - sessionCount

  return (
    <div className="pomodoro-widget">
      {/* Header */}
      <div className="pomodoro-header">
        <h2>
          <span className="header-emoji">🍅</span>
          Pomodoro Timer
        </h2>
        <div className="header-actions">
          <button
            className="btn-icon"
            onClick={() => setShowStats(true)}
            aria-label="Statistiques"
            title="Statistiques"
          >
            <BarChart3 size={20} />
          </button>
          <button
            className="btn-icon"
            onClick={() => setShowSettings(true)}
            aria-label="Paramètres"
            title="Paramètres"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Notification banner */}
      {showBanner && (
        <NotificationBanner
          onEnable={requestPermission}
          onDismiss={dismissBanner}
        />
      )}

      {/* Main timer area */}
      <div className="pomodoro-main">
        <Timer
          time={formattedTime}
          mode={mode}
          status={status}
          progress={progress}
          isLastMinute={isLastMinute}
        />

        {/* Mode info */}
        <div className="mode-info">
          <div className="mode-label">
            <span className="mode-emoji">{MODE_EMOJI[mode]}</span>
            <span>{MODE_LABELS[mode]}</span>
          </div>
          {mode === 'focus' && (
            <div className="session-progress">
              Session {sessionCount + 1}/
              {settings.timerConfig.longBreakInterval}
              {sessionsUntilLongBreak > 0 && (
                <span className="sessions-remaining">
                  {' '}
                  • {sessionsUntilLongBreak} avant pause longue
                </span>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <Controls
          status={status}
          progress={progress}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />
      </div>

      {/* Today's stats */}
      <div className="pomodoro-stats">
        <h3>Statistiques du jour</h3>
        <div className="stats-grid">
          <StatCard emoji="🍅" value={stats.sessionsToday} label="Sessions" />
          <StatCard
            emoji="⏱️"
            value={formatDuration(stats.todayFocusTime)}
            label="Temps focus"
          />
          <StatCard emoji="🔥" value={stats.currentStreak} label="Streak" />
          <StatCard emoji="📈" value={stats.longestStreak} label="Record" />
        </div>
      </div>

      {/* Stats panel */}
      {showStats && (
        <StatsPanel stats={stats} onClose={() => setShowStats(false)} />
      )}

      {/* Settings panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          permissionState={permissionState}
          onUpdateSettings={updateSettings}
          onPreviewSound={previewSound}
          onExportData={exportData}
          onImportData={importData}
          onResetAll={resetAll}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
