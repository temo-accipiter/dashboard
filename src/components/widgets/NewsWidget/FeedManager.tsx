import React, { useState } from 'react'
import { RSSFeed, CATEGORY_CONFIG } from './types'

interface FeedManagerProps {
  feeds: RSSFeed[]
  onAddFeed: (feed: RSSFeed) => void
  onRemoveFeed: (feedId: string) => void
  onToggleFeed: (feedId: string) => void
  onClose: () => void
}

export const FeedManager: React.FC<FeedManagerProps> = ({
  feeds,
  onAddFeed,
  onRemoveFeed,
  onToggleFeed,
  onClose,
}) => {
  const [newFeedName, setNewFeedName] = useState('')
  const [newFeedUrl, setNewFeedUrl] = useState('')
  const [newFeedCategory, setNewFeedCategory] = useState('technology')
  const [showAddForm, setShowAddForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newFeedName.trim() || !newFeedUrl.trim()) return

    const newFeed: RSSFeed = {
      id: `custom-${Date.now()}`,
      name: newFeedName.trim(),
      url: newFeedUrl.trim(),
      category: newFeedCategory,
      enabled: true,
    }

    onAddFeed(newFeed)
    setNewFeedName('')
    setNewFeedUrl('')
    setNewFeedCategory('technology')
    setShowAddForm(false)
  }

  return (
    <div className="feed-manager">
      <div className="feed-manager__header">
        <h3 className="feed-manager__title">🔧 Gérer les sources RSS</h3>
        <button
          onClick={onClose}
          className="feed-manager__close"
          aria-label="Fermer le gestionnaire de sources"
        >
          ✕
        </button>
      </div>

      <div className="feed-manager__content">
        <div className="feed-manager__list">
          {feeds.map((feed) => (
            <div key={feed.id} className="feed-item">
              <div className="feed-item__info">
                <div className="feed-item__header">
                  <input
                    type="checkbox"
                    checked={feed.enabled}
                    onChange={() => onToggleFeed(feed.id)}
                    className="feed-item__checkbox"
                    id={`feed-${feed.id}`}
                    aria-label={`Activer/Désactiver ${feed.name}`}
                  />
                  <label
                    htmlFor={`feed-${feed.id}`}
                    className="feed-item__name"
                  >
                    {feed.name}
                  </label>
                </div>
                <div className="feed-item__meta">
                  <span className="feed-item__category">
                    {
                      CATEGORY_CONFIG[
                        feed.category as keyof typeof CATEGORY_CONFIG
                      ]?.icon
                    }{' '}
                    {CATEGORY_CONFIG[
                      feed.category as keyof typeof CATEGORY_CONFIG
                    ]?.label || feed.category}
                  </span>
                  <span className="feed-item__url" title={feed.url}>
                    {new URL(feed.url).hostname}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveFeed(feed.id)}
                className="feed-item__delete"
                aria-label={`Supprimer la source ${feed.name}`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="feed-manager__add-btn"
          >
            ➕ Ajouter une source RSS
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="feed-form">
            <div className="feed-form__field">
              <label htmlFor="feed-name" className="feed-form__label">
                Nom de la source
              </label>
              <input
                type="text"
                id="feed-name"
                value={newFeedName}
                onChange={(e) => setNewFeedName(e.target.value)}
                placeholder="Ex: Le Monde Tech"
                className="feed-form__input"
                required
              />
            </div>

            <div className="feed-form__field">
              <label htmlFor="feed-url" className="feed-form__label">
                URL du flux RSS
              </label>
              <input
                type="url"
                id="feed-url"
                value={newFeedUrl}
                onChange={(e) => setNewFeedUrl(e.target.value)}
                placeholder="https://example.com/feed.xml"
                className="feed-form__input"
                required
              />
            </div>

            <div className="feed-form__field">
              <label htmlFor="feed-category" className="feed-form__label">
                Catégorie
              </label>
              <select
                id="feed-category"
                value={newFeedCategory}
                onChange={(e) => setNewFeedCategory(e.target.value)}
                className="feed-form__select"
              >
                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                  if (key === 'all') return null
                  return (
                    <option key={key} value={key}>
                      {config.icon} {config.label}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="feed-form__actions">
              <button type="submit" className="feed-form__submit">
                ✅ Ajouter
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setNewFeedName('')
                  setNewFeedUrl('')
                  setNewFeedCategory('technology')
                }}
                className="feed-form__cancel"
              >
                ❌ Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
