import { useState, useEffect, useCallback } from 'react'
import { TimerMode } from './types'
import { STORAGE_KEYS } from './constants'

export type NotificationPermissionState =
  | 'granted'
  | 'denied'
  | 'default'
  | 'unsupported'

/**
 * Hook for managing browser notifications
 */
export const useNotification = () => {
  const [permissionState, setPermissionState] =
    useState<NotificationPermissionState>('default')
  const [showBanner, setShowBanner] = useState(false)

  // Check if Notification API is supported
  const isSupported = typeof window !== 'undefined' && 'Notification' in window

  // Check permission state on mount
  useEffect(() => {
    if (!isSupported) {
      setPermissionState('unsupported')
      return
    }

    setPermissionState(Notification.permission as NotificationPermissionState)

    // Check if we've already asked for permission
    const hasAsked = localStorage.getItem(
      STORAGE_KEYS.NOTIFICATION_PERMISSION_ASKED
    )
    if (!hasAsked && Notification.permission === 'default') {
      setShowBanner(true)
    }
  }, [isSupported])

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn('Notifications not supported')
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setPermissionState(permission as NotificationPermissionState)
      localStorage.setItem(STORAGE_KEYS.NOTIFICATION_PERMISSION_ASKED, 'true')
      setShowBanner(false)
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    }
  }, [isSupported])

  // Dismiss banner
  const dismissBanner = useCallback(() => {
    setShowBanner(false)
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_PERMISSION_ASKED, 'true')
  }, [])

  // Send a notification
  const sendNotification = useCallback(
    (title: string, body: string, icon?: string) => {
      if (!isSupported) {
        console.warn('Notifications not supported')
        return
      }

      if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted')
        return
      }

      try {
        const notification = new Notification(title, {
          body,
          icon: icon || '🍅',
          badge: '🍅',
          tag: 'pomodoro-timer',
          requireInteraction: false,
          silent: false,
        })

        // Auto-close after 5 seconds
        setTimeout(() => {
          notification.close()
        }, 5000)
      } catch (error) {
        console.error('Error sending notification:', error)
      }
    },
    [isSupported]
  )

  // Send mode-specific notifications
  const notifyFocusEnd = useCallback(() => {
    sendNotification(
      '🍅 Session Focus terminée !',
      'Temps de faire une pause de 5 minutes',
      '🍅'
    )
  }, [sendNotification])

  const notifyShortBreakEnd = useCallback(() => {
    sendNotification(
      '☕ Pause terminée !',
      'Prêt pour une nouvelle session focus ?',
      '⚡'
    )
  }, [sendNotification])

  const notifyLongBreakEnd = useCallback(() => {
    sendNotification(
      '🌴 Pause longue terminée !',
      'Bien reposé ? Recommençons un nouveau cycle !',
      '⚡'
    )
  }, [sendNotification])

  const notifyHalfway = useCallback(
    (mode: TimerMode, timeLeft: string) => {
      const modeLabels = {
        focus: 'Session Focus',
        shortBreak: 'Pause courte',
        longBreak: 'Pause longue',
      }

      sendNotification(
        `⏱️ Mi-${modeLabels[mode].toLowerCase()}`,
        `Plus que ${timeLeft} minutes !`,
        '⏱️'
      )
    },
    [sendNotification]
  )

  return {
    permissionState,
    showBanner,
    isSupported,
    requestPermission,
    dismissBanner,
    sendNotification,
    notifyFocusEnd,
    notifyShortBreakEnd,
    notifyLongBreakEnd,
    notifyHalfway,
  }
}
