'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRSSFeed } from './useRSSFeed'
import { NewsArticle } from './NewsArticle'
import { NewsFilters } from './NewsFilters'
import { ReadingModeModal } from './ReadingModeModal'
import { FeedManager } from './FeedManager'
import {
  NewsArticle as NewsArticleType,
  CategoryFilter,
  SortOrder,
} from './types'
import './NewsWidget.scss'

export const NewsWidget: React.FC = () => {
  const {
    feeds,
    articles,
    loading,
    error,
    fetchAllFeeds,
    addFeed,
    removeFeed,
    toggleFeed,
  } = useRSSFeed()

  const [currentFilter, setCurrentFilter] = useState<CategoryFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [readingArticle, setReadingArticle] = useState<NewsArticleType | null>(
    null
  )
  const [showFeedManager, setShowFeedManager] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch feeds on mount
  useEffect(() => {
    fetchAllFeeds()
  }, [fetchAllFeeds])

  // Get unique categories from articles
  const availableCategories = useMemo(() => {
    const categories = new Set(articles.map((article) => article.category))
    return Array.from(categories).sort()
  }, [articles])

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles

    // Filter by category
    if (currentFilter !== 'all') {
      filtered = filtered.filter(
        (article) => article.category === currentFilter
      )
    }

    // Sort articles
    const sorted = [...filtered]
    switch (sortOrder) {
      case 'newest':
        sorted.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
        break
      case 'oldest':
        sorted.sort((a, b) => a.pubDate.getTime() - b.pubDate.getTime())
        break
      case 'source':
        sorted.sort((a, b) => a.source.localeCompare(b.source))
        break
    }

    return sorted
  }, [articles, currentFilter, sortOrder])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchAllFeeds()
    setIsRefreshing(false)
  }

  const handleReadMore = (article: NewsArticleType) => {
    setReadingArticle(article)
  }

  const closeReadingMode = () => {
    setReadingArticle(null)
  }

  return (
    <section className="news-widget" aria-label="Widget de flux d'actualités">
      <div className="news-widget__header">
        <h2 className="news-widget__title">📰 Flux d&apos;actualités</h2>
        <div className="news-widget__actions">
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className={`news-widget__refresh ${isRefreshing ? 'news-widget__refresh--spinning' : ''}`}
            aria-label="Actualiser les flux"
            title="Actualiser"
          >
            🔄
          </button>
          <button
            onClick={() => setShowFeedManager(true)}
            className="news-widget__settings"
            aria-label="Gérer les sources RSS"
            title="Gérer les sources"
          >
            ⚙️
          </button>
        </div>
      </div>

      {error && (
        <div className="news-widget__error" role="alert">
          ⚠️ {error}
        </div>
      )}

      <NewsFilters
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        availableCategories={availableCategories}
        articleCount={filteredAndSortedArticles.length}
      />

      {loading && articles.length === 0 ? (
        <div className="news-widget__loading" aria-live="polite">
          <div className="news-widget__spinner"></div>
          <p>Chargement des actualités...</p>
        </div>
      ) : filteredAndSortedArticles.length === 0 ? (
        <div className="news-widget__empty">
          <p>📭 Aucun article disponible</p>
          <p className="news-widget__empty-hint">
            Vérifiez vos sources RSS ou ajoutez-en de nouvelles
          </p>
        </div>
      ) : (
        <div className="news-widget__articles">
          {filteredAndSortedArticles.map((article) => (
            <NewsArticle
              key={article.id}
              article={article}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      )}

      {showFeedManager && (
        <div
          className="news-widget__modal-overlay"
          onClick={() => setShowFeedManager(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <FeedManager
              feeds={feeds}
              onAddFeed={addFeed}
              onRemoveFeed={removeFeed}
              onToggleFeed={toggleFeed}
              onClose={() => setShowFeedManager(false)}
            />
          </div>
        </div>
      )}

      <ReadingModeModal article={readingArticle} onClose={closeReadingMode} />
    </section>
  )
}
