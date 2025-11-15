/**
 * GitHub Integration Module
 *
 * Exports:
 * - Types: GitHubPullRequest, GitHubUser, GitHubRepository, etc.
 * - Adapter: createGitHubAdapter, getGitHubAdapter
 * - Mock Data: getMockPullRequests (for testing)
 */

// Types
export type {
  GitHubUser,
  GitHubRepository,
  GitHubPullRequest,
  GitHubAdapter,
  GitHubAdapterConfig,
  PullRequestState,
  PullRequestStatus,
} from './types';

// Adapter
export {
  createGitHubAdapter,
  getGitHubAdapter,
  resetGitHubAdapter,
  GitHubAdapterImpl,
} from './adapter';

// Mock data (for testing and development)
export { getMockPullRequests, getMockRepositoryPullRequests } from './mockData';
