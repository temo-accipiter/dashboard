/**
 * GitHub Adapter Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GitHubAdapterImpl, createGitHubAdapter, getGitHubAdapter, resetGitHubAdapter } from '../adapter';
import { mockPullRequests } from '../mockData';
import * as featureFlags from '@/utils/featureFlags';

// Mock feature flags
vi.mock('@/utils/featureFlags', () => ({
  isFeatureEnabled: vi.fn(),
  getFeatureFlags: vi.fn(),
}));

describe('GitHubAdapter', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    resetGitHubAdapter();

    // Default: OAuth disabled
    vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(false);
  });

  describe('GitHubAdapterImpl', () => {
    describe('constructor', () => {
      it('should create adapter with default config (mock data enabled)', () => {
        const adapter = new GitHubAdapterImpl();
        expect(adapter.isConfigured()).toBe(true);
      });

      it('should create adapter with custom config', () => {
        const adapter = new GitHubAdapterImpl({
          useMockData: false,
          token: 'test-token',
        });
        expect(adapter).toBeInstanceOf(GitHubAdapterImpl);
      });
    });

    describe('getPullRequests', () => {
      it('should return mock pull requests by default', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getPullRequests();

        expect(prs).toBeDefined();
        expect(Array.isArray(prs)).toBe(true);
        expect(prs.length).toBeGreaterThan(0);
      });

      it('should filter by state: open', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getPullRequests({ state: 'open' });

        expect(prs.every(pr => pr.state === 'open')).toBe(true);
      });

      it('should filter by state: closed', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getPullRequests({ state: 'closed' });

        expect(prs.every(pr => pr.state === 'closed')).toBe(true);
      });

      it('should filter by state: merged', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getPullRequests({ state: 'merged' });

        expect(prs.every(pr => pr.state === 'merged')).toBe(true);
      });

      it('should limit results with perPage option', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getPullRequests({ perPage: 2 });

        expect(prs.length).toBeLessThanOrEqual(2);
      });

      it('should support pagination', async () => {
        const adapter = new GitHubAdapterImpl();
        const page1 = await adapter.getPullRequests({ perPage: 2, page: 1 });
        const page2 = await adapter.getPullRequests({ perPage: 2, page: 2 });

        expect(page1).toBeDefined();
        expect(page2).toBeDefined();

        // Pages should have different items (if there are enough PRs)
        if (page1.length > 0 && page2.length > 0) {
          expect(page1[0].id).not.toBe(page2[0].id);
        }
      });

      it('should sort by updated_at (most recent first)', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getPullRequests();

        if (prs.length > 1) {
          const dates = prs.map(pr => new Date(pr.updated_at).getTime());
          const sortedDates = [...dates].sort((a, b) => b - a);
          expect(dates).toEqual(sortedDates);
        }
      });
    });

    describe('getRepositoryPullRequests', () => {
      it('should return pull requests for a specific repository', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getRepositoryPullRequests('octocat', 'hello-world');

        expect(prs).toBeDefined();
        expect(Array.isArray(prs)).toBe(true);

        if (prs.length > 0) {
          expect(prs.every(pr => pr.repository.full_name === 'octocat/hello-world')).toBe(true);
        }
      });

      it('should filter repository PRs by state', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getRepositoryPullRequests('acme', 'dashboard', { state: 'open' });

        if (prs.length > 0) {
          expect(prs.every(pr => pr.state === 'open')).toBe(true);
          expect(prs.every(pr => pr.repository.full_name === 'acme/dashboard')).toBe(true);
        }
      });

      it('should handle case-insensitive repository names', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs1 = await adapter.getRepositoryPullRequests('OCTOCAT', 'HELLO-WORLD');
        const prs2 = await adapter.getRepositoryPullRequests('octocat', 'hello-world');

        expect(prs1.length).toBe(prs2.length);
      });

      it('should return empty array for non-existent repository', async () => {
        const adapter = new GitHubAdapterImpl();
        const prs = await adapter.getRepositoryPullRequests('nonexistent', 'repo');

        expect(prs).toEqual([]);
      });

      it('should support pagination for repository PRs', async () => {
        const adapter = new GitHubAdapterImpl();
        const page1 = await adapter.getRepositoryPullRequests('facebook', 'react', { perPage: 1, page: 1 });
        const page2 = await adapter.getRepositoryPullRequests('facebook', 'react', { perPage: 1, page: 2 });

        if (page1.length > 0 && page2.length > 0) {
          expect(page1[0].id).not.toBe(page2[0].id);
        }
      });
    });

    describe('isConfigured', () => {
      it('should return true when using mock data', () => {
        const adapter = new GitHubAdapterImpl({ useMockData: true });
        expect(adapter.isConfigured()).toBe(true);
      });

      it('should return false when OAuth is disabled and no token provided', () => {
        vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(false);
        const adapter = new GitHubAdapterImpl({ useMockData: false });
        expect(adapter.isConfigured()).toBe(false);
      });

      it('should return true when OAuth is enabled and token is provided', () => {
        vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(true);
        const adapter = new GitHubAdapterImpl({
          useMockData: false,
          oauthToken: 'test-token',
        });
        expect(adapter.isConfigured()).toBe(true);
      });
    });
  });

  describe('createGitHubAdapter', () => {
    it('should create a new adapter instance', () => {
      const adapter = createGitHubAdapter();
      expect(adapter).toBeInstanceOf(GitHubAdapterImpl);
    });

    it('should pass config to adapter', () => {
      const config = { useMockData: true, token: 'test' };
      const adapter = createGitHubAdapter(config);
      expect(adapter).toBeInstanceOf(GitHubAdapterImpl);
    });
  });

  describe('getGitHubAdapter', () => {
    it('should return a singleton instance', () => {
      const adapter1 = getGitHubAdapter();
      const adapter2 = getGitHubAdapter();

      expect(adapter1).toBe(adapter2);
    });

    it('should create instance on first call', () => {
      resetGitHubAdapter();
      const adapter = getGitHubAdapter();

      expect(adapter).toBeInstanceOf(GitHubAdapterImpl);
    });
  });

  describe('resetGitHubAdapter', () => {
    it('should reset the singleton instance', () => {
      const adapter1 = getGitHubAdapter();
      resetGitHubAdapter();
      const adapter2 = getGitHubAdapter();

      expect(adapter1).not.toBe(adapter2);
    });
  });

  describe('OAuth integration', () => {
    it('should use mock data when OAuth is disabled', async () => {
      vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(false);
      const adapter = new GitHubAdapterImpl({ useMockData: false });

      const prs = await adapter.getPullRequests();

      // Should still return mock data when OAuth is disabled
      expect(prs).toBeDefined();
      expect(Array.isArray(prs)).toBe(true);
    });

    it('should check OAuth feature flag', () => {
      vi.mocked(featureFlags.isFeatureEnabled).mockReturnValue(false);
      const adapter = new GitHubAdapterImpl({ useMockData: false });

      adapter.isConfigured();

      expect(featureFlags.isFeatureEnabled).toHaveBeenCalledWith('enableGitHubOAuth');
    });
  });
});
