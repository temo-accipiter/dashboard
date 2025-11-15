'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {
  getAvailableWidgets,
  getWidgetsByCategory,
  searchWidgets,
  WidgetManifest,
} from '@/widgets'
import { X, Search, Plus, Check, Grid, List } from 'lucide-react'
import './WidgetRegistry.scss'

interface WidgetRegistryProps {
  onAddWidget?: (widgetId: string) => void
  activeWidgets?: string[]
  showAsModal?: boolean
  onClose?: () => void
}

type ViewMode = 'grid' | 'list'
type CategoryFilter = 'all' | WidgetManifest['category']

export const WidgetRegistry: React.FC<WidgetRegistryProps> = ({
  onAddWidget,
  activeWidgets = [],
  showAsModal = false,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedWidget, setSelectedWidget] = useState<WidgetManifest | null>(
    null
  )

  // Get filtered widgets
  const filteredWidgets = useMemo(() => {
    let widgets = getAvailableWidgets()

    // Filter by category
    if (categoryFilter !== 'all') {
      widgets = getWidgetsByCategory(categoryFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      widgets = searchWidgets(searchQuery)
      // Re-apply category filter if needed
      if (categoryFilter !== 'all') {
        widgets = widgets.filter((w) => w.category === categoryFilter)
      }
    }

    return widgets
  }, [searchQuery, categoryFilter])

  // Close modal on Escape key
  useEffect(() => {
    if (!showAsModal) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showAsModal, onClose])

  const handleAddWidget = (widgetId: string) => {
    onAddWidget?.(widgetId)
  }

  const isWidgetActive = (widgetId: string) => {
    return activeWidgets.includes(widgetId)
  }

  const categories: { value: CategoryFilter; label: string; icon: string }[] = [
    { value: 'all', label: 'Tous', icon: '🎯' },
    { value: 'productivity', label: 'Productivité', icon: '⚡' },
    { value: 'information', label: 'Information', icon: '📊' },
    { value: 'entertainment', label: 'Divertissement', icon: '🎮' },
    { value: 'utility', label: 'Utilitaires', icon: '🔧' },
  ]

  const content = (
    <div
      className={`widget-registry ${showAsModal ? 'widget-registry--modal' : ''}`}
    >
      {/* Header */}
      <div className="widget-registry__header">
        <div className="widget-registry__title-section">
          <h2 className="widget-registry__title">
            <span className="widget-registry__title-icon">🧩</span>
            Marketplace de Widgets
          </h2>
          <p className="widget-registry__subtitle">
            Découvrez et ajoutez des widgets à votre dashboard
          </p>
        </div>
        {showAsModal && onClose && (
          <button
            className="widget-registry__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Search and filters */}
      <div className="widget-registry__controls">
        <div className="widget-registry__search">
          <Search size={20} className="widget-registry__search-icon" />
          <input
            type="text"
            placeholder="Rechercher un widget..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="widget-registry__search-input"
          />
          {searchQuery && (
            <button
              className="widget-registry__search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Effacer la recherche"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="widget-registry__view-toggle">
          <button
            className={`widget-registry__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Vue grille"
            title="Vue grille"
          >
            <Grid size={20} />
          </button>
          <button
            className={`widget-registry__view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="Vue liste"
            title="Vue liste"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="widget-registry__categories">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`widget-registry__category ${
              categoryFilter === cat.value ? 'active' : ''
            }`}
            onClick={() => setCategoryFilter(cat.value)}
          >
            <span className="widget-registry__category-icon">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="widget-registry__results">
        {filteredWidgets.length} widget{filteredWidgets.length > 1 ? 's' : ''}{' '}
        {searchQuery && `pour "${searchQuery}"`}
      </div>

      {/* Widget list */}
      {filteredWidgets.length === 0 ? (
        <div className="widget-registry__empty">
          <p>😕 Aucun widget trouvé</p>
          <p className="widget-registry__empty-hint">
            Essayez une autre recherche ou catégorie
          </p>
        </div>
      ) : (
        <div
          className={`widget-registry__widgets widget-registry__widgets--${viewMode}`}
        >
          {filteredWidgets.map((widget) => {
            const isActive = isWidgetActive(widget.id)
            return (
              <div
                key={widget.id}
                className={`widget-card ${selectedWidget?.id === widget.id ? 'widget-card--selected' : ''}`}
                onClick={() => setSelectedWidget(widget)}
              >
                <div className="widget-card__header">
                  <span className="widget-card__icon">{widget.icon}</span>
                  <div className="widget-card__info">
                    <h3 className="widget-card__name">{widget.name}</h3>
                    <span className="widget-card__version">
                      v{widget.version}
                    </span>
                  </div>
                </div>

                <p className="widget-card__description">{widget.description}</p>

                {widget.preview && (
                  <p className="widget-card__preview">{widget.preview}</p>
                )}

                <div className="widget-card__meta">
                  <span className="widget-card__author">
                    👤 {widget.author}
                  </span>
                  <span className="widget-card__category">
                    {categories.find((c) => c.value === widget.category)?.icon}{' '}
                    {widget.category}
                  </span>
                </div>

                <div className="widget-card__tags">
                  {widget.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="widget-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className={`widget-card__action ${
                    isActive ? 'widget-card__action--active' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isActive) {
                      handleAddWidget(widget.id)
                    }
                  }}
                  disabled={isActive}
                >
                  {isActive ? (
                    <>
                      <Check size={16} />
                      Ajouté
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Ajouter
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  if (showAsModal) {
    return (
      <div className="widget-registry-overlay" onClick={onClose}>
        <div
          className="widget-registry-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    )
  }

  return content
}
