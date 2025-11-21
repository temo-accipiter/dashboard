/**
 * GitHub PRs Widget Hook
 *
 * Manages fetching and caching of GitHub pull requests
 */

import { useState, useEffect, useCallback } from 'react'
import { getGitHubAdapter } from '@/features/integrations/github'
import type { PullRequestState } from '@/features/integrations/github'
import type { GitHubPRsWidgetState, GitHubPRsWidgetSettings } from './types'

export function useGitHubPRs(settings: GitHubPRsWidgetSettings) {
  const [state, setState] = useState<GitHubPRsWidgetState>({
    pullRequests: [],
    isLoading: true,
    error: null,
    lastUpdated: null,
  })

  const fetchPullRequests = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const adapter = getGitHubAdapter()

      if (!adapter.isConfigured()) {
        throw new Error('GitHub adapter is not configured')
      }

      // Fetch PRs based on filter state
      const options:
        | { state?: PullRequestState; perPage?: number; page?: number }
        | { perPage?: number; page?: number } =
        settings.filterState === 'all'
          ? { perPage: settings.maxPRs }
          : { state: settings.filterState, perPage: settings.maxPRs }

      let prs = await adapter.getPullRequests(options)

      // Filter by review requests if enabled
      if (settings.showOnlyReviewRequests) {
        prs = prs.filter(
          (pr) => pr.requested_reviewers && pr.requested_reviewers.length > 0
        )
      }

      setState({
        pullRequests: prs,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (error) {
      setState({
        pullRequests: [],
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch pull requests',
        lastUpdated: null,
      })
    }
  }, [settings])

  // Initial fetch
  useEffect(() => {
    fetchPullRequests()
  }, [fetchPullRequests])

  // Auto-refresh
  useEffect(() => {
    if (settings.refreshInterval <= 0) {
      return
    }

    const intervalId = setInterval(
      fetchPullRequests,
      settings.refreshInterval * 60 * 1000 // Convert minutes to milliseconds
    )

    return () => clearInterval(intervalId)
  }, [settings.refreshInterval, fetchPullRequests])

  return {
    ...state,
    refresh: fetchPullRequests,
  }
}
