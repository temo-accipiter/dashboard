'use client'

import React, { useState } from 'react'
import PageContainer from '@/components/pageContainer/PageContainer'
import { WidgetRegistry } from '@/components/WidgetRegistry'
import { useActiveWidgets } from '@/hooks/useActiveWidgets'
import { getWidgetById } from '@/widgets'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import './Widgets.scss'

export default function Widgets() {
  const {
    activeWidgets,
    isLoaded,
    addWidget,
    removeWidget,
    getActiveWidgetIds,
  } = useActiveWidgets()
  const [showMarketplace, setShowMarketplace] = useState(false)

  const handleAddWidget = (widgetId: string) => {
    addWidget(widgetId)
    // Optional: close marketplace after adding
    // setShowMarketplace(false)
  }

  const handleRemoveWidget = (widgetId: string) => {
    if (confirm('Voulez-vous vraiment retirer ce widget ?')) {
      removeWidget(widgetId)
    }
  }

  if (!isLoaded) {
    return (
      <PageContainer>
        <div className="widgets-page__loading">Chargement...</div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="widgets-page">
        <div className="widgets-page__header">
          <div className="widgets-page__title-section">
            <h1>🧩 Mes Widgets</h1>
            <p className="widgets-page__subtitle">
              Personnalisez votre dashboard avec vos widgets préférés
            </p>
          </div>
          <button
            className="widgets-page__add-btn"
            onClick={() => setShowMarketplace(true)}
          >
            <Plus size={20} />
            Ajouter un widget
          </button>
        </div>

        {activeWidgets.length === 0 ? (
          <div className="widgets-page__empty">
            <div className="widgets-page__empty-icon">📦</div>
            <h2>Aucun widget actif</h2>
            <p>
              Commencez par ajouter des widgets depuis le marketplace pour
              personnaliser votre dashboard
            </p>
            <button
              className="widgets-page__empty-btn"
              onClick={() => setShowMarketplace(true)}
            >
              <Plus size={20} />
              Parcourir le marketplace
            </button>
          </div>
        ) : (
          <div className="widgets-page__active">
            <div className="widgets-page__section-header">
              <h2>Widgets actifs ({activeWidgets.length})</h2>
            </div>

            <div className="widgets-page__grid">
              {activeWidgets
                .sort((a, b) => a.order - b.order)
                .map((activeWidget) => {
                  const widgetManifest = getWidgetById(activeWidget.id)
                  if (!widgetManifest) return null

                  const WidgetComponent = widgetManifest.component

                  return (
                    <div key={activeWidget.id} className="widget-container">
                      <div className="widget-container__header">
                        <div className="widget-container__drag">
                          <GripVertical size={16} />
                        </div>
                        <div className="widget-container__info">
                          <span className="widget-container__icon">
                            {widgetManifest.icon}
                          </span>
                          <span className="widget-container__name">
                            {widgetManifest.name}
                          </span>
                        </div>
                        <button
                          className="widget-container__remove"
                          onClick={() => handleRemoveWidget(activeWidget.id)}
                          aria-label="Retirer le widget"
                          title="Retirer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="widget-container__content">
                        <WidgetComponent />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* Marketplace Modal */}
        {showMarketplace && (
          <WidgetRegistry
            showAsModal={true}
            onClose={() => setShowMarketplace(false)}
            onAddWidget={handleAddWidget}
            activeWidgets={getActiveWidgetIds()}
          />
        )}
      </div>
    </PageContainer>
  )
}
