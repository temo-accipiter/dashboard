import React, { useEffect } from 'react'
import { NewsArticle } from './types'

interface ReadingModeModalProps {
  article: NewsArticle | null
  onClose: () => void
}

export const ReadingModeModal: React.FC<ReadingModeModalProps> = ({
  article,
  onClose,
}) => {
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [article])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (article) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [article, onClose])

  if (!article) return null

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const cleanContent = (html: string): string => {
    // Remove script tags and other potentially harmful content
    let cleaned = html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ''
    )
    cleaned = cleaned.replace(
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      ''
    )
    return cleaned
  }

  return (
    <div className="reading-mode-overlay" onClick={onClose}>
      <div className="reading-mode" onClick={(e) => e.stopPropagation()}>
        <div className="reading-mode__header">
          <button
            onClick={onClose}
            className="reading-mode__close"
            aria-label="Fermer le mode lecture"
          >
            ✕
          </button>
        </div>

        <article className="reading-mode__content">
          {article.image && (
            <div className="reading-mode__image-container">
              <img
                src={article.image}
                alt={article.title}
                className="reading-mode__image"
              />
            </div>
          )}

          <header className="reading-mode__article-header">
            <h1 className="reading-mode__title">{article.title}</h1>

            <div className="reading-mode__meta">
              <span className="reading-mode__source">📰 {article.source}</span>
              {article.author && (
                <span className="reading-mode__author">
                  ✍️ {article.author}
                </span>
              )}
              <span className="reading-mode__date">
                🕐 {formatFullDate(article.pubDate)}
              </span>
            </div>
          </header>

          <div className="reading-mode__body">
            {article.description && article.description !== article.content && (
              <div className="reading-mode__description">
                <strong>{article.description}</strong>
              </div>
            )}

            {article.content && (
              <div
                className="reading-mode__text"
                dangerouslySetInnerHTML={{
                  __html: cleanContent(article.content),
                }}
              />
            )}
          </div>

          <footer className="reading-mode__footer">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reading-mode__link"
            >
              🔗 Lire l&apos;article complet sur {article.source}
            </a>
          </footer>
        </article>
      </div>
    </div>
  )
}
