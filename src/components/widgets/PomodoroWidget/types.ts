// Timer modes
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

// Timer status
export type TimerStatus = 'idle' | 'running' | 'paused'

// Sound types
export type SoundType = 'bell' | 'chime' | 'digital' | 'silent'

// Timer configuration
export interface TimerConfig {
  focus: number // minutes (default: 25)
  shortBreak: number // minutes (default: 5)
  longBreak: number // minutes (default: 15)
  longBreakInterval: number // sessions before long break (default: 4)
}

// Pomodoro session record
export interface PomodoroSession {
  id: string
  mode: TimerMode
  duration: number // minutes
  completedAt: Date
  interrupted: boolean // true if skipped
}

// Pomodoro statistics
export interface PomodoroStats {
  sessions: PomodoroSession[]
  totalFocusTime: number // minutes (all time)
  todayFocusTime: number // minutes
  weekFocusTime: number // minutes
  sessionsToday: number
  sessionsThisWeek: number
  currentStreak: number // consecutive focus sessions not interrupted
  longestStreak: number
}

// Sound settings
export interface SoundSettings {
  enabled: boolean
  focusEnd: SoundType
  breakEnd: SoundType
  volume: number // 0-100
  tickingSound: boolean // ticking sound during timer
}

// Notification settings
export interface NotificationSettings {
  enabled: boolean
  showAtEnd: boolean
  showAtHalfway: boolean // notification at halfway point
}

// Complete pomodoro settings
export interface PomodoroSettings {
  timerConfig: TimerConfig
  sounds: SoundSettings
  notifications: NotificationSettings
  autoStartBreaks: boolean // auto start break after focus
  autoStartPomodoros: boolean // auto start focus after break
}
