import { useState, useEffect, useCallback } from 'react'
import { NewsArticle, RSSFeed, DEFAULT_RSS_FEEDS } from './types'

const STORAGE_KEY = 'news-widget-feeds'
const ARTICLES_STORAGE_KEY = 'news-widget-articles'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

interface CachedArticles {
  articles: NewsArticle[]
  timestamp: number
}

interface RSS2JSONItem {
  title?: string
  description?: string
  content?: string
  link?: string
  guid?: string
  pubDate?: string
  author?: string
  thumbnail?: string
  enclosure?: {
    link?: string
  }
}

export function useRSSFeed() {
  const [feeds, setFeeds] = useState<RSSFeed[]>([])
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load feeds from localStorage on mount
  useEffect(() => {
    const storedFeeds = localStorage.getItem(STORAGE_KEY)
    if (storedFeeds) {
      setFeeds(JSON.parse(storedFeeds))
    } else {
      setFeeds(DEFAULT_RSS_FEEDS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RSS_FEEDS))
    }

    // Load cached articles
    const cachedData = localStorage.getItem(ARTICLES_STORAGE_KEY)
    if (cachedData) {
      const parsed: CachedArticles = JSON.parse(cachedData)
      const now = Date.now()
      if (now - parsed.timestamp < CACHE_DURATION) {
        // Convert date strings back to Date objects
        const articlesWithDates = parsed.articles.map((article) => ({
          ...article,
          pubDate: new Date(article.pubDate),
        }))
        setArticles(articlesWithDates)
      }
    }
  }, [])

  // Save feeds to localStorage whenever they change
  useEffect(() => {
    if (feeds.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feeds))
    }
  }, [feeds])

  const parseRSSFeed = useCallback(
    async (feed: RSSFeed): Promise<NewsArticle[]> => {
      try {
        // Use a CORS proxy for RSS feeds (rss2json is a free service)
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`

        const response = await fetch(proxyUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch feed: ${feed.name}`)
        }

        const data = await response.json()

        if (data.status !== 'ok') {
          throw new Error(`RSS feed error: ${data.message || 'Unknown error'}`)
        }

        return data.items.map((item: RSS2JSONItem, index: number) => ({
          id: `${feed.id}-${index}-${Date.now()}`,
          title: item.title || 'Sans titre',
          description: item.description || item.content || '',
          link: item.link || item.guid || '',
          pubDate: new Date(item.pubDate || Date.now()),
          source: feed.name,
          category: feed.category,
          image:
            item.thumbnail ||
            item.enclosure?.link ||
            extractImageFromContent(item.description || item.content || ''),
          author: item.author || data.feed?.author || '',
          content: item.content || item.description || '',
        }))
      } catch (err) {
        console.error(`Error parsing feed ${feed.name}:`, err)
        return []
      }
    },
    []
  )

  const extractImageFromContent = (content: string): string | undefined => {
    if (!content) return undefined

    const imgRegex = /<img[^>]+src="([^">]+)"/i
    const match = content.match(imgRegex)
    return match ? match[1] : undefined
  }

  const fetchAllFeeds = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const enabledFeeds = feeds.filter((feed) => feed.enabled)

      if (enabledFeeds.length === 0) {
        setArticles([])
        setLoading(false)
        return
      }

      const promises = enabledFeeds.map((feed) => parseRSSFeed(feed))
      const results = await Promise.all(promises)

      const allArticles = results.flat()

      // Sort by date (newest first)
      allArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())

      setArticles(allArticles)

      // Cache the articles
      const cacheData: CachedArticles = {
        articles: allArticles,
        timestamp: Date.now(),
      }
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(cacheData))
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erreur lors du chargement des flux'
      )
    } finally {
      setLoading(false)
    }
  }, [feeds, parseRSSFeed])

  const addFeed = useCallback((feed: RSSFeed) => {
    setFeeds((prev) => [...prev, feed])
  }, [])

  const removeFeed = useCallback((feedId: string) => {
    setFeeds((prev) => prev.filter((feed) => feed.id !== feedId))
    setArticles((prev) =>
      prev.filter((article) => !article.id.startsWith(feedId))
    )
  }, [])

  const toggleFeed = useCallback((feedId: string) => {
    setFeeds((prev) =>
      prev.map((feed) =>
        feed.id === feedId ? { ...feed, enabled: !feed.enabled } : feed
      )
    )
  }, [])

  const updateFeed = useCallback(
    (feedId: string, updates: Partial<RSSFeed>) => {
      setFeeds((prev) =>
        prev.map((feed) =>
          feed.id === feedId ? { ...feed, ...updates } : feed
        )
      )
    },
    []
  )

  return {
    feeds,
    articles,
    loading,
    error,
    fetchAllFeeds,
    addFeed,
    removeFeed,
    toggleFeed,
    updateFeed,
  }
}
