/**
 * GitHub PRs Widget Types
 */

import type {
  GitHubPullRequest,
  PullRequestState,
} from '@/features/integrations/github'

export interface GitHubPRsWidgetSettings {
  /** Filter by PR state */
  filterState: PullRequestState | 'all'
  /** Refresh interval in minutes (0 = disabled) */
  refreshInterval: number
  /** Show only PRs where user is requested reviewer */
  showOnlyReviewRequests: boolean
  /** Maximum number of PRs to display */
  maxPRs: number
}

export interface GitHubPRsWidgetState {
  pullRequests: GitHubPullRequest[]
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
}
