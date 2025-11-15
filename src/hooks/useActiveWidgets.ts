'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'dashboard-active-widgets'

export interface ActiveWidget {
  id: string
  addedAt: Date
  order: number
}

export function useActiveWidgets() {
  const [activeWidgets, setActiveWidgets] = useState<ActiveWidget[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Array<
          Omit<ActiveWidget, 'addedAt'> & { addedAt: string }
        >
        // Convert date strings back to Date objects
        const widgets = parsed.map((w) => ({
          ...w,
          addedAt: new Date(w.addedAt),
        }))
        setActiveWidgets(widgets)
      }
    } catch (error) {
      console.error('Failed to load active widgets:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage whenever activeWidgets changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activeWidgets))
      } catch (error) {
        console.error('Failed to save active widgets:', error)
      }
    }
  }, [activeWidgets, isLoaded])

  const addWidget = (widgetId: string) => {
    setActiveWidgets((prev) => {
      // Check if already added
      if (prev.some((w) => w.id === widgetId)) {
        return prev
      }

      return [
        ...prev,
        {
          id: widgetId,
          addedAt: new Date(),
          order: prev.length,
        },
      ]
    })
  }

  const removeWidget = (widgetId: string) => {
    setActiveWidgets((prev) => {
      const filtered = prev.filter((w) => w.id !== widgetId)
      // Reorder remaining widgets
      return filtered.map((w, index) => ({ ...w, order: index }))
    })
  }

  const reorderWidgets = (newOrder: string[]) => {
    setActiveWidgets((prev) => {
      const widgetMap = new Map(prev.map((w) => [w.id, w]))
      return newOrder
        .map((id, index) => {
          const widget = widgetMap.get(id)
          return widget ? { ...widget, order: index } : null
        })
        .filter((w): w is ActiveWidget => w !== null)
    })
  }

  const clearAll = () => {
    setActiveWidgets([])
  }

  const getActiveWidgetIds = () => {
    return activeWidgets.map((w) => w.id)
  }

  return {
    activeWidgets,
    isLoaded,
    addWidget,
    removeWidget,
    reorderWidgets,
    clearAll,
    getActiveWidgetIds,
  }
}
