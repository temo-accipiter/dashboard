/**
 * GitHub Mock Data Tests
 */

import { describe, it, expect } from 'vitest';
import {
  mockPullRequests,
  getMockPullRequests,
  getMockRepositoryPullRequests,
} from '../mockData';

describe('GitHub Mock Data', () => {
  describe('mockPullRequests', () => {
    it('should contain valid pull request data', () => {
      expect(mockPullRequests).toBeDefined();
      expect(Array.isArray(mockPullRequests)).toBe(true);
      expect(mockPullRequests.length).toBeGreaterThan(0);
    });

    it('should have required fields for each PR', () => {
      mockPullRequests.forEach(pr => {
        expect(pr.id).toBeDefined();
        expect(pr.number).toBeDefined();
        expect(pr.title).toBeDefined();
        expect(pr.state).toBeDefined();
        expect(pr.html_url).toBeDefined();
        expect(pr.created_at).toBeDefined();
        expect(pr.updated_at).toBeDefined();
        expect(pr.user).toBeDefined();
        expect(pr.repository).toBeDefined();
      });
    });

    it('should have valid states', () => {
      const validStates = ['open', 'closed', 'merged'];
      mockPullRequests.forEach(pr => {
        expect(validStates).toContain(pr.state);
      });
    });

    it('should have valid URLs', () => {
      mockPullRequests.forEach(pr => {
        expect(pr.html_url).toMatch(/^https:\/\/github\.com\//);
        expect(pr.user.html_url).toMatch(/^https:\/\/github\.com\//);
        expect(pr.repository.html_url).toMatch(/^https:\/\/github\.com\//);
      });
    });

    it('should have valid ISO date strings', () => {
      mockPullRequests.forEach(pr => {
        expect(new Date(pr.created_at).toString()).not.toBe('Invalid Date');
        expect(new Date(pr.updated_at).toString()).not.toBe('Invalid Date');
      });
    });
  });

  describe('getMockPullRequests', () => {
    it('should return all PRs when no options provided', () => {
      const prs = getMockPullRequests();

      expect(prs.length).toBe(mockPullRequests.length);
    });

    it('should filter by state: open', () => {
      const prs = getMockPullRequests({ state: 'open' });

      expect(prs.length).toBeGreaterThan(0);
      expect(prs.every(pr => pr.state === 'open')).toBe(true);
    });

    it('should filter by state: closed', () => {
      const prs = getMockPullRequests({ state: 'closed' });

      expect(prs.every(pr => pr.state === 'closed')).toBe(true);
    });

    it('should filter by state: merged', () => {
      const prs = getMockPullRequests({ state: 'merged' });

      expect(prs.every(pr => pr.state === 'merged')).toBe(true);
    });

    it('should sort by updated_at (most recent first)', () => {
      const prs = getMockPullRequests();

      if (prs.length > 1) {
        for (let i = 0; i < prs.length - 1; i++) {
          const current = new Date(prs[i].updated_at).getTime();
          const next = new Date(prs[i + 1].updated_at).getTime();
          expect(current).toBeGreaterThanOrEqual(next);
        }
      }
    });

    it('should paginate results', () => {
      const page1 = getMockPullRequests({ perPage: 2, page: 1 });
      const page2 = getMockPullRequests({ perPage: 2, page: 2 });

      expect(page1.length).toBeLessThanOrEqual(2);
      expect(page2.length).toBeLessThanOrEqual(2);

      if (page1.length > 0 && page2.length > 0) {
        expect(page1[0].id).not.toBe(page2[0].id);
      }
    });

    it('should limit results with perPage', () => {
      const prs = getMockPullRequests({ perPage: 3 });

      expect(prs.length).toBeLessThanOrEqual(3);
    });

    it('should return empty array for page beyond available data', () => {
      const prs = getMockPullRequests({ perPage: 100, page: 999 });

      expect(prs).toEqual([]);
    });

    it('should not mutate original data', () => {
      const originalLength = mockPullRequests.length;
      const originalFirst = mockPullRequests[0];

      getMockPullRequests({ state: 'open' });

      expect(mockPullRequests.length).toBe(originalLength);
      expect(mockPullRequests[0]).toBe(originalFirst);
    });
  });

  describe('getMockRepositoryPullRequests', () => {
    it('should filter PRs by repository', () => {
      const prs = getMockRepositoryPullRequests('octocat', 'hello-world');

      expect(prs.every(pr => pr.repository.full_name === 'octocat/hello-world')).toBe(true);
    });

    it('should be case-insensitive for repository names', () => {
      const prs1 = getMockRepositoryPullRequests('OCTOCAT', 'HELLO-WORLD');
      const prs2 = getMockRepositoryPullRequests('octocat', 'hello-world');

      expect(prs1.length).toBe(prs2.length);
    });

    it('should return empty array for non-existent repository', () => {
      const prs = getMockRepositoryPullRequests('nonexistent', 'repo');

      expect(prs).toEqual([]);
    });

    it('should filter by state', () => {
      const prs = getMockRepositoryPullRequests('acme', 'dashboard', { state: 'open' });

      if (prs.length > 0) {
        expect(prs.every(pr => pr.state === 'open')).toBe(true);
        expect(prs.every(pr => pr.repository.full_name === 'acme/dashboard')).toBe(true);
      }
    });

    it('should sort by updated_at (most recent first)', () => {
      const prs = getMockRepositoryPullRequests('facebook', 'react');

      if (prs.length > 1) {
        for (let i = 0; i < prs.length - 1; i++) {
          const current = new Date(prs[i].updated_at).getTime();
          const next = new Date(prs[i + 1].updated_at).getTime();
          expect(current).toBeGreaterThanOrEqual(next);
        }
      }
    });

    it('should paginate results', () => {
      const page1 = getMockRepositoryPullRequests('facebook', 'react', { perPage: 1, page: 1 });
      const page2 = getMockRepositoryPullRequests('facebook', 'react', { perPage: 1, page: 2 });

      if (page1.length > 0 && page2.length > 0) {
        expect(page1[0].id).not.toBe(page2[0].id);
      }
    });

    it('should limit results with perPage', () => {
      const prs = getMockRepositoryPullRequests('facebook', 'react', { perPage: 1 });

      expect(prs.length).toBeLessThanOrEqual(1);
    });

    it('should have different PRs for different repositories', () => {
      const repo1PRs = getMockRepositoryPullRequests('octocat', 'hello-world');
      const repo2PRs = getMockRepositoryPullRequests('facebook', 'react');

      if (repo1PRs.length > 0 && repo2PRs.length > 0) {
        expect(repo1PRs[0].repository.full_name).not.toBe(repo2PRs[0].repository.full_name);
      }
    });
  });
});
