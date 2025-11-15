/**
 * GitHub Integration Adapter
 *
 * Provides a unified interface for GitHub API interactions.
 * Uses mock data by default, with support for real API via OAuth (behind feature flag).
 */

import type {
  GitHubAdapter,
  GitHubAdapterConfig,
  GitHubPullRequest,
  PullRequestState,
} from './types';
import { getMockPullRequests, getMockRepositoryPullRequests } from './mockData';
import { isFeatureEnabled } from '@/utils/featureFlags';

/**
 * GitHub API Adapter Implementation
 *
 * By default, uses mock data for development.
 * When OAuth is enabled via feature flag, can use real GitHub API.
 */
export class GitHubAdapterImpl implements GitHubAdapter {
  private config: GitHubAdapterConfig;

  constructor(config: GitHubAdapterConfig = {}) {
    this.config = {
      useMockData: config.useMockData ?? true, // Mock by default
      ...config,
    };
  }

  /**
   * Get pull requests for the authenticated user
   */
  async getPullRequests(options?: {
    state?: PullRequestState;
    perPage?: number;
    page?: number;
  }): Promise<GitHubPullRequest[]> {
    // Use mock data if configured or OAuth is disabled
    if (this.config.useMockData || !this.isOAuthEnabled()) {
      return Promise.resolve(getMockPullRequests(options));
    }

    // Real API implementation (when OAuth is enabled)
    return this.fetchFromGitHubAPI('/search/issues', {
      q: 'is:pr author:@me',
      state: options?.state,
      per_page: options?.perPage,
      page: options?.page,
    });
  }

  /**
   * Get pull requests for a specific repository
   */
  async getRepositoryPullRequests(
    owner: string,
    repo: string,
    options?: {
      state?: PullRequestState;
      perPage?: number;
      page?: number;
    }
  ): Promise<GitHubPullRequest[]> {
    // Use mock data if configured or OAuth is disabled
    if (this.config.useMockData || !this.isOAuthEnabled()) {
      return Promise.resolve(getMockRepositoryPullRequests(owner, repo, options));
    }

    // Real API implementation (when OAuth is enabled)
    return this.fetchFromGitHubAPI(`/repos/${owner}/${repo}/pulls`, {
      state: options?.state,
      per_page: options?.perPage,
      page: options?.page,
    });
  }

  /**
   * Check if the adapter is configured and ready
   */
  isConfigured(): boolean {
    // With mock data, always configured
    if (this.config.useMockData) {
      return true;
    }

    // With real API, need OAuth token
    return this.isOAuthEnabled() && !!this.config.oauthToken;
  }

  /**
   * Check if OAuth is enabled via feature flag
   */
  private isOAuthEnabled(): boolean {
    return isFeatureEnabled('enableGitHubOAuth');
  }

  /**
   * Fetch data from GitHub API (placeholder for real implementation)
   */
  private async fetchFromGitHubAPI(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<GitHubPullRequest[]> {
    const baseUrl = 'https://api.github.com';
    const url = new URL(endpoint, baseUrl);

    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Add authorization if token is available
    if (this.config.oauthToken) {
      headers.Authorization = `Bearer ${this.config.oauthToken}`;
    } else if (this.config.token) {
      headers.Authorization = `token ${this.config.token}`;
    }

    try {
      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Transform API response to our format
      // Note: This is a simplified transformation
      // Real implementation would need to handle pagination, rate limits, etc.
      return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      console.error('GitHub API fetch failed:', error);
      throw error;
    }
  }
}

/**
 * Create a new GitHub adapter instance
 */
export function createGitHubAdapter(config?: GitHubAdapterConfig): GitHubAdapter {
  return new GitHubAdapterImpl(config);
}

/**
 * Singleton instance for default usage
 */
let defaultAdapter: GitHubAdapter | null = null;

/**
 * Get the default GitHub adapter instance
 */
export function getGitHubAdapter(): GitHubAdapter {
  if (!defaultAdapter) {
    defaultAdapter = createGitHubAdapter();
  }
  return defaultAdapter;
}

/**
 * Reset the default adapter (useful for testing)
 */
export function resetGitHubAdapter(): void {
  defaultAdapter = null;
}
