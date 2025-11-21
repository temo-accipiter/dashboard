/**
 * GitHub Integration Types
 *
 * Type definitions for GitHub API entities and adapter interfaces
 */

export type PullRequestState = 'open' | 'closed' | 'merged'
export type PullRequestStatus = 'pending' | 'success' | 'failure'

export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubRepository {
  name: string
  full_name: string
  html_url: string
  owner: GitHubUser
}

export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  state: PullRequestState
  html_url: string
  created_at: string
  updated_at: string
  user: GitHubUser
  repository: GitHubRepository
  draft: boolean
  mergeable_state?: string
  /** Aggregate status from checks */
  status?: PullRequestStatus
  /** Number of comments */
  comments?: number
  /** Number of review comments */
  review_comments?: number
  /** Requested reviewers */
  requested_reviewers?: GitHubUser[]
}

export interface GitHubAdapterConfig {
  /** Personal access token (when OAuth is disabled) */
  token?: string
  /** OAuth access token (when OAuth is enabled) */
  oauthToken?: string
  /** Use mock data instead of real API */
  useMockData?: boolean
}

export interface GitHubAdapter {
  /** Get pull requests for the authenticated user */
  getPullRequests(options?: {
    state?: PullRequestState
    perPage?: number
    page?: number
  }): Promise<GitHubPullRequest[]>

  /** Get pull requests for a specific repository */
  getRepositoryPullRequests(
    owner: string,
    repo: string,
    options?: {
      state?: PullRequestState
      perPage?: number
      page?: number
    }
  ): Promise<GitHubPullRequest[]>

  /** Check if the adapter is configured and ready */
  isConfigured(): boolean
}
