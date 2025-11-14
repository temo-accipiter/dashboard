import { useEffect, useRef, useCallback } from 'react'
import { SoundType, SoundSettings } from './types'
import { SOUND_URLS } from './constants'

/**
 * Hook for managing Pomodoro sounds
 */
export const usePomodoroSound = (soundSettings: SoundSettings) => {
  const audioRefs = useRef<Map<SoundType, HTMLAudioElement>>(new Map())
  const loadingRefs = useRef<Map<SoundType, boolean>>(new Map())

  // Preload sounds on mount
  useEffect(() => {
    const soundTypes: SoundType[] = ['bell', 'chime', 'digital']

    soundTypes.forEach(type => {
      if (type === 'silent') return

      try {
        const audio = new Audio(SOUND_URLS[type])
        audio.preload = 'auto'
        audio.volume = soundSettings.volume / 100

        // Handle load success
        audio.addEventListener('canplaythrough', () => {
          loadingRefs.current.set(type, true)
        })

        // Handle load error
        audio.addEventListener('error', () => {
          console.error(`Failed to load sound: ${type}`)
          loadingRefs.current.set(type, false)
        })

        audioRefs.current.set(type, audio)
      } catch (error) {
        console.error(`Error preloading sound ${type}:`, error)
      }
    })

    // Cleanup
    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause()
        audio.src = ''
      })
      audioRefs.current.clear()
    }
  }, []) // Only run on mount

  // Update volume when settings change
  useEffect(() => {
    audioRefs.current.forEach(audio => {
      audio.volume = soundSettings.volume / 100
    })
  }, [soundSettings.volume])

  // Play a specific sound
  const playSound = useCallback((soundType: SoundType) => {
    if (!soundSettings.enabled || soundType === 'silent') {
      return
    }

    const audio = audioRefs.current.get(soundType)
    if (!audio) {
      console.warn(`Sound ${soundType} not loaded`)
      return
    }

    try {
      // Reset audio to start
      audio.currentTime = 0

      // Play with promise handling for better browser support
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error(`Error playing sound ${soundType}:`, error)
        })
      }
    } catch (error) {
      console.error(`Error playing sound ${soundType}:`, error)
    }
  }, [soundSettings.enabled])

  // Test/preview a sound
  const previewSound = useCallback((soundType: SoundType) => {
    if (soundType === 'silent') return

    const audio = audioRefs.current.get(soundType)
    if (!audio) {
      console.warn(`Sound ${soundType} not loaded`)
      return
    }

    try {
      audio.currentTime = 0
      audio.volume = soundSettings.volume / 100

      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error(`Error previewing sound ${soundType}:`, error)
        })
      }
    } catch (error) {
      console.error(`Error previewing sound ${soundType}:`, error)
    }
  }, [soundSettings.volume])

  return {
    playSound,
    previewSound,
  }
}
