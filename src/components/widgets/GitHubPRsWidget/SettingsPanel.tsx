/**
 * GitHub PRs Widget Settings Panel
 */

import type { GitHubPRsWidgetSettings } from './types'
import styles from './GitHubPRsWidget.module.scss'

interface SettingsPanelProps {
  settings: GitHubPRsWidgetSettings
  onSettingsChange: (settings: GitHubPRsWidgetSettings) => void
  onClose: () => void
}

export function SettingsPanel({
  settings,
  onSettingsChange,
  onClose,
}: SettingsPanelProps) {
  const handleChange = (key: keyof GitHubPRsWidgetSettings, value: unknown) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    })
  }

  return (
    <div className={styles['settingsPanel']}>
      <div className={styles['settingsHeader']}>
        <h3>Widget Settings</h3>
        <button
          onClick={onClose}
          className={styles['closeButton']}
          aria-label="Close settings"
        >
          ✕
        </button>
      </div>

      <div className={styles['settingsBody']}>
        <div className={styles['settingGroup']}>
          <label htmlFor="filterState">Filter by state</label>
          <select
            id="filterState"
            value={settings.filterState}
            onChange={(e) => handleChange('filterState', e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="merged">Merged</option>
          </select>
        </div>

        <div className={styles['settingGroup']}>
          <label htmlFor="maxPRs">Maximum PRs to display</label>
          <input
            type="number"
            id="maxPRs"
            min={1}
            max={100}
            value={settings.maxPRs}
            onChange={(e) =>
              handleChange('maxPRs', parseInt(e.target.value, 10))
            }
          />
        </div>

        <div className={styles['settingGroup']}>
          <label htmlFor="refreshInterval">
            Auto-refresh interval (minutes, 0 = disabled)
          </label>
          <input
            type="number"
            id="refreshInterval"
            min={0}
            max={60}
            value={settings.refreshInterval}
            onChange={(e) =>
              handleChange('refreshInterval', parseInt(e.target.value, 10))
            }
          />
        </div>

        <div className={styles['settingGroup']}>
          <label className={styles['checkboxLabel']}>
            <input
              type="checkbox"
              checked={settings.showOnlyReviewRequests}
              onChange={(e) =>
                handleChange('showOnlyReviewRequests', e.target.checked)
              }
            />
            <span>Show only PRs requesting my review</span>
          </label>
        </div>
      </div>
    </div>
  )
}
