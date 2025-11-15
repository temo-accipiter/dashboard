/**
 * GitHub Integration Mock Data
 *
 * Sample data for development and testing without API calls
 */

import type { GitHubPullRequest, GitHubUser, GitHubRepository } from './types';

const mockUsers: GitHubUser[] = [
  {
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/octocat',
  },
  {
    login: 'monalisa',
    avatar_url: 'https://avatars.githubusercontent.com/u/58231?v=4',
    html_url: 'https://github.com/monalisa',
  },
  {
    login: 'hubot',
    avatar_url: 'https://avatars.githubusercontent.com/u/480?v=4',
    html_url: 'https://github.com/hubot',
  },
];

const mockRepositories: GitHubRepository[] = [
  {
    name: 'hello-world',
    full_name: 'octocat/hello-world',
    html_url: 'https://github.com/octocat/hello-world',
    owner: mockUsers[0],
  },
  {
    name: 'react',
    full_name: 'facebook/react',
    html_url: 'https://github.com/facebook/react',
    owner: {
      login: 'facebook',
      avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
      html_url: 'https://github.com/facebook',
    },
  },
  {
    name: 'dashboard',
    full_name: 'acme/dashboard',
    html_url: 'https://github.com/acme/dashboard',
    owner: {
      login: 'acme',
      avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
      html_url: 'https://github.com/acme',
    },
  },
];

export const mockPullRequests: GitHubPullRequest[] = [
  {
    id: 1,
    number: 42,
    title: 'Add GitHub integration with adapter pattern',
    state: 'open',
    html_url: 'https://github.com/octocat/hello-world/pull/42',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    user: mockUsers[0],
    repository: mockRepositories[0],
    draft: false,
    status: 'success',
    comments: 3,
    review_comments: 5,
    requested_reviewers: [mockUsers[1]],
  },
  {
    id: 2,
    number: 128,
    title: 'Fix: Resolve memory leak in useEffect hook',
    state: 'open',
    html_url: 'https://github.com/facebook/react/pull/128',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    user: mockUsers[1],
    repository: mockRepositories[1],
    draft: false,
    status: 'pending',
    comments: 12,
    review_comments: 8,
    requested_reviewers: [mockUsers[0], mockUsers[2]],
  },
  {
    id: 3,
    number: 7,
    title: '[WIP] Refactor dashboard layout components',
    state: 'open',
    html_url: 'https://github.com/acme/dashboard/pull/7',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    user: mockUsers[0],
    repository: mockRepositories[2],
    draft: true,
    status: 'pending',
    comments: 0,
    review_comments: 2,
    requested_reviewers: [],
  },
  {
    id: 4,
    number: 256,
    title: 'Add TypeScript support for Hooks API',
    state: 'merged',
    html_url: 'https://github.com/facebook/react/pull/256',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    user: mockUsers[2],
    repository: mockRepositories[1],
    draft: false,
    status: 'success',
    comments: 25,
    review_comments: 18,
    requested_reviewers: [],
  },
  {
    id: 5,
    number: 15,
    title: 'Update dependencies and fix security vulnerabilities',
    state: 'open',
    html_url: 'https://github.com/acme/dashboard/pull/15',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    user: mockUsers[1],
    repository: mockRepositories[2],
    draft: false,
    status: 'failure',
    comments: 1,
    review_comments: 0,
    requested_reviewers: [mockUsers[0]],
  },
  {
    id: 6,
    number: 99,
    title: 'Improve documentation for getting started guide',
    state: 'closed',
    html_url: 'https://github.com/octocat/hello-world/pull/99',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    user: mockUsers[0],
    repository: mockRepositories[0],
    draft: false,
    status: 'success',
    comments: 8,
    review_comments: 3,
    requested_reviewers: [],
  },
];

/**
 * Get mock pull requests with optional filtering
 */
export function getMockPullRequests(options?: {
  state?: 'open' | 'closed' | 'merged';
  perPage?: number;
  page?: number;
}): GitHubPullRequest[] {
  let filtered = [...mockPullRequests];

  // Filter by state
  if (options?.state) {
    filtered = filtered.filter(pr => pr.state === options.state);
  }

  // Sort by updated_at (most recent first)
  filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  // Pagination
  const page = options?.page || 1;
  const perPage = options?.perPage || 30;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return filtered.slice(start, end);
}

/**
 * Get mock pull requests for a specific repository
 */
export function getMockRepositoryPullRequests(
  owner: string,
  repo: string,
  options?: {
    state?: 'open' | 'closed' | 'merged';
    perPage?: number;
    page?: number;
  }
): GitHubPullRequest[] {
  const fullName = `${owner}/${repo}`.toLowerCase();
  let filtered = mockPullRequests.filter(
    pr => pr.repository.full_name.toLowerCase() === fullName
  );

  // Filter by state
  if (options?.state) {
    filtered = filtered.filter(pr => pr.state === options.state);
  }

  // Sort by updated_at (most recent first)
  filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  // Pagination
  const page = options?.page || 1;
  const perPage = options?.perPage || 30;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return filtered.slice(start, end);
}
