import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('initial')
  })

  it('should initialize with stored value when localStorage has data', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('stored')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('should work with objects', () => {
    const initialObj = { name: 'John', age: 30 }
    const { result } = renderHook(() => useLocalStorage('user', initialObj))

    expect(result.current[0]).toEqual(initialObj)

    const updatedObj = { name: 'Jane', age: 25 }
    act(() => {
      result.current[1](updatedObj)
    })

    expect(result.current[0]).toEqual(updatedObj)
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual(updatedObj)
  })

  it('should work with arrays', () => {
    const initialArray = [1, 2, 3]
    const { result } = renderHook(() =>
      useLocalStorage('numbers', initialArray)
    )

    expect(result.current[0]).toEqual(initialArray)

    act(() => {
      result.current[1]([4, 5, 6])
    })

    expect(result.current[0]).toEqual([4, 5, 6])
  })

  it('should support functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0))

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(1)

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(2)
  })

  it('should remove value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(localStorage.getItem('test-key')).toBeTruthy()

    act(() => {
      result.current[2]() // removeValue
    })

    expect(result.current[0]).toBe('initial')
    expect(localStorage.getItem('test-key')).toBeNull()
  })

  it('should handle invalid JSON gracefully', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    localStorage.setItem('invalid-key', 'not-valid-json{')

    const { result } = renderHook(() =>
      useLocalStorage('invalid-key', 'fallback')
    )

    expect(result.current[0]).toBe('fallback')
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('should sync across storage events', () => {
    const { result } = renderHook(() => useLocalStorage('sync-key', 'initial'))

    expect(result.current[0]).toBe('initial')

    // Simuler un changement depuis un autre onglet
    act(() => {
      const event = new StorageEvent('storage', {
        key: 'sync-key',
        newValue: JSON.stringify('from-another-tab'),
      })
      window.dispatchEvent(event)
    })

    expect(result.current[0]).toBe('from-another-tab')
  })

  it('should handle storage event with invalid JSON', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    const { result } = renderHook(() => useLocalStorage('sync-key', 'initial'))

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'sync-key',
        newValue: 'invalid-json{',
      })
      window.dispatchEvent(event)
    })

    // Value should remain unchanged
    expect(result.current[0]).toBe('initial')
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('should work with boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('flag', false))

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1](true)
    })

    expect(result.current[0]).toBe(true)
    expect(JSON.parse(localStorage.getItem('flag')!)).toBe(true)
  })

  it('should work with null values', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | null>('nullable', null)
    )

    expect(result.current[0]).toBeNull()

    act(() => {
      result.current[1]('not-null')
    })

    expect(result.current[0]).toBe('not-null')
  })
})
