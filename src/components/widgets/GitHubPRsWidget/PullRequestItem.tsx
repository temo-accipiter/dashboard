/**
 * Pull Request Item Component
 *
 * Displays a single GitHub pull request with status, metadata, and actions
 */

import type { GitHubPullRequest } from '@/features/integrations/github'
import {
  ExternalLink,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  GitMerge,
} from 'lucide-react'
import styles from './GitHubPRsWidget.module.scss'

interface PullRequestItemProps {
  pullRequest: GitHubPullRequest
}

export function PullRequestItem({ pullRequest }: PullRequestItemProps) {
  const {
    title,
    number,
    state,
    status,
    repository,
    user: _user,
    html_url,
    updated_at,
    draft,
    comments,
    review_comments,
    requested_reviewers,
  } = pullRequest

  // Format relative time
  const timeAgo = getRelativeTime(new Date(updated_at))

  // Get status icon and color
  const statusInfo = getStatusInfo(state, status, draft)

  return (
    <div className={styles['prItem']}>
      <div className={styles['prHeader']}>
        <div className={styles['prIcon']}>
          <GitPullRequest size={16} />
        </div>
        <div className={styles['prTitle']}>
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['prLink']}
          >
            {title}
          </a>
          {draft && <span className={styles['draftBadge']}>Draft</span>}
        </div>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['externalLink']}
          aria-label="Open in GitHub"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      <div className={styles['prMeta']}>
        <span className={styles['prNumber']}>#{number}</span>
        <span className={styles['separator']}>•</span>
        <span className={styles['prRepo']}>{repository.full_name}</span>
        <span className={styles['separator']}>•</span>
        <span className={styles['prTime']}>{timeAgo}</span>
      </div>

      <div className={styles['prFooter']}>
        <div className={styles['prStatus']} data-status={statusInfo.status}>
          <statusInfo.icon size={14} />
          <span>{statusInfo.label}</span>
        </div>

        <div className={styles['prStats']}>
          {comments !== undefined && comments > 0 && (
            <span className={styles['stat']} title="Comments">
              💬 {comments}
            </span>
          )}
          {review_comments !== undefined && review_comments > 0 && (
            <span className={styles['stat']} title="Review comments">
              📝 {review_comments}
            </span>
          )}
          {requested_reviewers && requested_reviewers.length > 0 && (
            <span className={styles['stat']} title="Requested reviewers">
              👥 {requested_reviewers.length}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function getStatusInfo(
  state: string,
  status?: string,
  draft?: boolean
): { icon: typeof CheckCircle2; label: string; status: string } {
  if (state === 'merged') {
    return { icon: GitMerge, label: 'Merged', status: 'merged' }
  }

  if (state === 'closed') {
    return { icon: XCircle, label: 'Closed', status: 'closed' }
  }

  if (draft) {
    return { icon: Clock, label: 'Draft', status: 'draft' }
  }

  if (status === 'success') {
    return { icon: CheckCircle2, label: 'Checks passed', status: 'success' }
  }

  if (status === 'failure') {
    return { icon: XCircle, label: 'Checks failed', status: 'failure' }
  }

  return { icon: Clock, label: 'Pending', status: 'pending' }
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString()
}
