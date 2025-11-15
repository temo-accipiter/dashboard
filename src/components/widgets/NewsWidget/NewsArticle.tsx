import React from 'react'
import { NewsArticle as NewsArticleType } from './types'

interface NewsArticleProps {
  article: NewsArticleType
  onReadMore: (article: NewsArticleType) => void
}

export const NewsArticle: React.FC<NewsArticleProps> = ({
  article,
  onReadMore,
}) => {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `Il y a ${diffMins} min`
    } else if (diffHours < 24) {
      return `Il y a ${diffHours}h`
    } else if (diffDays < 7) {
      return `Il y a ${diffDays}j`
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      })
    }
  }

  const stripHtml = (html: string): string => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const truncateText = (text: string, maxLength: number): string => {
    const stripped = stripHtml(text)
    if (stripped.length <= maxLength) return stripped
    return stripped.substring(0, maxLength).trim() + '...'
  }

  return (
    <article className="news-article">
      {article.image && (
        <div className="news-article__image-container">
          <img
            src={article.image}
            alt={article.title}
            className="news-article__image"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="news-article__content">
        <div className="news-article__header">
          <span className="news-article__source">{article.source}</span>
          <span className="news-article__date">
            {formatDate(article.pubDate)}
          </span>
        </div>

        <h3 className="news-article__title">
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-article__link"
          >
            {article.title}
          </a>
        </h3>

        {article.description && (
          <p className="news-article__description">
            {truncateText(article.description, 150)}
          </p>
        )}

        {article.author && (
          <p className="news-article__author">Par {article.author}</p>
        )}

        <div className="news-article__actions">
          <button
            onClick={() => onReadMore(article)}
            className="news-article__read-more"
            aria-label={`Lire l'article "${article.title}" en mode lecture`}
          >
            📖 Mode lecture
          </button>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-article__external-link"
            aria-label={`Ouvrir l'article "${article.title}" dans un nouvel onglet`}
          >
            🔗 Ouvrir
          </a>
        </div>
      </div>
    </article>
  )
}
