import { TimerConfig, SoundSettings, NotificationSettings, PomodoroSettings } from './types'

// Default timer durations (in minutes)
export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
}

// Default sound settings
export const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  enabled: true,
  focusEnd: 'bell',
  breakEnd: 'chime',
  volume: 70,
  tickingSound: false,
}

// Default notification settings
export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: false,
  showAtEnd: true,
  showAtHalfway: false,
}

// Default complete settings
export const DEFAULT_SETTINGS: PomodoroSettings = {
  timerConfig: DEFAULT_TIMER_CONFIG,
  sounds: DEFAULT_SOUND_SETTINGS,
  notifications: DEFAULT_NOTIFICATION_SETTINGS,
  autoStartBreaks: false,
  autoStartPomodoros: false,
}

// Sound URLs (using free CDN sounds)
export const SOUND_URLS = {
  bell: 'https://assets.mixkit.co/active_storage/sfx/2869/2869.wav',
  chime: 'https://assets.mixkit.co/active_storage/sfx/1555/1555.wav',
  digital: 'https://assets.mixkit.co/active_storage/sfx/2354/2354.wav',
}

// LocalStorage keys
export const STORAGE_KEYS = {
  SESSIONS: 'personal-dashboard-pomodoro-sessions',
  STATS: 'personal-dashboard-pomodoro-stats',
  SETTINGS: 'personal-dashboard-pomodoro-settings',
  NOTIFICATION_PERMISSION_ASKED: 'personal-dashboard-pomodoro-notification-asked',
}

// Maximum number of sessions to keep in history
export const MAX_SESSIONS_HISTORY = 100

// Timer mode labels
export const MODE_LABELS = {
  focus: 'Session Focus',
  shortBreak: 'Pause Courte',
  longBreak: 'Pause Longue',
}

// Timer mode colors
export const MODE_COLORS = {
  focus: '#ef4444', // red
  shortBreak: '#10b981', // green
  longBreak: '#3b82f6', // blue
}

// Timer mode emoji
export const MODE_EMOJI = {
  focus: '🍅',
  shortBreak: '☕',
  longBreak: '🌴',
}
