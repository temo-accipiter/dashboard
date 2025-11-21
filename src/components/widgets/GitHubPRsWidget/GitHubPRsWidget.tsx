/**
 * GitHub Pull Requests Widget
 *
 * Displays a list of GitHub pull requests using the GitHub adapter.
 * Uses mock data by default, with OAuth support behind a feature flag.
 */

'use client'

import { useState } from 'react'
import { RefreshCw, Settings, GitPullRequest, AlertCircle } from 'lucide-react'
import { useGitHubPRs } from './useGitHubPRs'
import { PullRequestItem } from './PullRequestItem'
import { SettingsPanel } from './SettingsPanel'
import type { GitHubPRsWidgetSettings } from './types'
import styles from './GitHubPRsWidget.module.scss'

const DEFAULT_SETTINGS: GitHubPRsWidgetSettings = {
  filterState: 'open',
  refreshInterval: 5, // 5 minutes
  showOnlyReviewRequests: false,
  maxPRs: 10,
}

export function GitHubPRsWidget() {
  const [settings, setSettings] =
    useState<GitHubPRsWidgetSettings>(DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)
  const { pullRequests, isLoading, error, lastUpdated, refresh } =
    useGitHubPRs(settings)

  const handleRefresh = () => {
    refresh()
  }

  return (
    <div className={styles['widget']}>
      <div className={styles['header']}>
        <div className={styles['titleSection']}>
          <GitPullRequest size={20} />
          <h2>GitHub Pull Requests</h2>
        </div>
        <div className={styles['actions']}>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={styles['iconButton']}
            aria-label="Refresh"
            title="Refresh"
          >
            <RefreshCw
              size={16}
              className={isLoading ? styles['spinning'] : ''}
            />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={styles['iconButton']}
            aria-label="Settings"
            title="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className={styles['content']}>
        {error && (
          <div className={styles['error']}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {isLoading && pullRequests.length === 0 ? (
          <div className={styles['loading']}>
            <RefreshCw size={24} className={styles['spinning']} />
            <p>Loading pull requests...</p>
          </div>
        ) : pullRequests.length === 0 ? (
          <div className={styles['empty']}>
            <GitPullRequest size={48} />
            <p>No pull requests found</p>
            <small>Try adjusting your filters</small>
          </div>
        ) : (
          <div className={styles['prList']}>
            {pullRequests.map((pr) => (
              <PullRequestItem key={pr.id} pullRequest={pr} />
            ))}
          </div>
        )}

        {lastUpdated && (
          <div className={styles['footer']}>
            <small>Last updated: {lastUpdated.toLocaleTimeString()}</small>
          </div>
        )}
      </div>
    </div>
  )
}
