import React, { useState } from 'react'
import { PomodoroSettings, SoundType } from './types'
import { DEFAULT_SETTINGS } from './constants'
import { X, Play, Download, Upload, AlertTriangle } from 'lucide-react'
import { NotificationPermissionState } from './useNotification'

interface SettingsPanelProps {
  settings: PomodoroSettings
  permissionState: NotificationPermissionState
  onUpdateSettings: (settings: Partial<PomodoroSettings>) => void
  onPreviewSound: (soundType: SoundType) => void
  onExportData: () => string
  onImportData: (json: string) => boolean
  onResetAll: () => void
  onClose: () => void
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  permissionState,
  onUpdateSettings,
  onPreviewSound,
  onExportData,
  onImportData,
  onResetAll,
  onClose,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)

  const handleTimerConfigChange = (
    key: keyof PomodoroSettings['timerConfig'],
    value: number
  ) => {
    // Validate: 1-60 minutes
    const validated = Math.max(1, Math.min(60, value))
    onUpdateSettings({
      timerConfig: {
        ...settings.timerConfig,
        [key]: validated,
      },
    })
  }

  const handleSoundChange = (
    key: keyof PomodoroSettings['sounds'],
    value: boolean | SoundType | number
  ) => {
    onUpdateSettings({
      sounds: {
        ...settings.sounds,
        [key]: value,
      },
    })
  }

  const handleNotificationChange = (
    key: keyof PomodoroSettings['notifications'],
    value: boolean
  ) => {
    onUpdateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  const handleRestoreDefaults = () => {
    onUpdateSettings(DEFAULT_SETTINGS)
  }

  const handleExport = () => {
    const data = onExportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pomodoro-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const success = onImportData(content)
        if (success) {
          setImportError(null)
          // Show success message (could add toast here)
        } else {
          setImportError('Fichier JSON invalide')
        }
      } catch (_error) {
        setImportError('Erreur lors de la lecture du fichier')
      }
    }
    reader.readAsText(file)
  }

  const handleResetAll = () => {
    onResetAll()
    setShowResetConfirm(false)
  }

  const permissionStateText = {
    granted: 'Accordée ✓',
    denied: 'Refusée ✗',
    default: 'Non demandée',
    unsupported: 'Non supportée',
  }

  return (
    <div className="settings-panel-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="settings-header">
          <h2>Paramètres</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* Timer durations */}
          <section className="settings-section">
            <h3>Durées du timer</h3>
            <div className="setting-row">
              <label htmlFor="focus-duration">Session Focus (minutes)</label>
              <input
                id="focus-duration"
                type="number"
                min="1"
                max="60"
                value={settings.timerConfig.focus}
                onChange={(e) =>
                  handleTimerConfigChange(
                    'focus',
                    parseInt(e.target.value) || 1
                  )
                }
              />
            </div>
            <div className="setting-row">
              <label htmlFor="short-break-duration">
                Pause courte (minutes)
              </label>
              <input
                id="short-break-duration"
                type="number"
                min="1"
                max="60"
                value={settings.timerConfig.shortBreak}
                onChange={(e) =>
                  handleTimerConfigChange(
                    'shortBreak',
                    parseInt(e.target.value) || 1
                  )
                }
              />
            </div>
            <div className="setting-row">
              <label htmlFor="long-break-duration">
                Pause longue (minutes)
              </label>
              <input
                id="long-break-duration"
                type="number"
                min="1"
                max="60"
                value={settings.timerConfig.longBreak}
                onChange={(e) =>
                  handleTimerConfigChange(
                    'longBreak',
                    parseInt(e.target.value) || 1
                  )
                }
              />
            </div>
            <div className="setting-row">
              <label htmlFor="long-break-interval">
                Sessions avant pause longue
              </label>
              <input
                id="long-break-interval"
                type="number"
                min="2"
                max="10"
                value={settings.timerConfig.longBreakInterval}
                onChange={(e) =>
                  handleTimerConfigChange(
                    'longBreakInterval',
                    parseInt(e.target.value) || 4
                  )
                }
              />
            </div>
            <button className="btn-secondary" onClick={handleRestoreDefaults}>
              Restaurer défauts
            </button>
          </section>

          {/* Sounds */}
          <section className="settings-section">
            <h3>Sons</h3>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.sounds.enabled}
                  onChange={(e) =>
                    handleSoundChange('enabled', e.target.checked)
                  }
                />
                Activer les sons
              </label>
            </div>
            <div className="setting-row">
              <label htmlFor="focus-end-sound">Son fin focus</label>
              <div className="sound-controls">
                <select
                  id="focus-end-sound"
                  value={settings.sounds.focusEnd}
                  onChange={(e) =>
                    handleSoundChange('focusEnd', e.target.value as SoundType)
                  }
                  disabled={!settings.sounds.enabled}
                >
                  <option value="bell">Bell</option>
                  <option value="chime">Chime</option>
                  <option value="digital">Digital</option>
                  <option value="silent">Silent</option>
                </select>
                <button
                  className="btn-icon"
                  onClick={() => onPreviewSound(settings.sounds.focusEnd)}
                  disabled={
                    !settings.sounds.enabled ||
                    settings.sounds.focusEnd === 'silent'
                  }
                  aria-label="Test sound"
                >
                  <Play size={16} />
                </button>
              </div>
            </div>
            <div className="setting-row">
              <label htmlFor="break-end-sound">Son fin pause</label>
              <div className="sound-controls">
                <select
                  id="break-end-sound"
                  value={settings.sounds.breakEnd}
                  onChange={(e) =>
                    handleSoundChange('breakEnd', e.target.value as SoundType)
                  }
                  disabled={!settings.sounds.enabled}
                >
                  <option value="bell">Bell</option>
                  <option value="chime">Chime</option>
                  <option value="digital">Digital</option>
                  <option value="silent">Silent</option>
                </select>
                <button
                  className="btn-icon"
                  onClick={() => onPreviewSound(settings.sounds.breakEnd)}
                  disabled={
                    !settings.sounds.enabled ||
                    settings.sounds.breakEnd === 'silent'
                  }
                  aria-label="Test sound"
                >
                  <Play size={16} />
                </button>
              </div>
            </div>
            <div className="setting-row">
              <label htmlFor="volume">Volume</label>
              <div className="volume-control">
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="100"
                  value={settings.sounds.volume}
                  onChange={(e) =>
                    handleSoundChange('volume', parseInt(e.target.value))
                  }
                  disabled={!settings.sounds.enabled}
                />
                <span className="volume-label">{settings.sounds.volume}%</span>
              </div>
            </div>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.sounds.tickingSound}
                  onChange={(e) =>
                    handleSoundChange('tickingSound', e.target.checked)
                  }
                  disabled={!settings.sounds.enabled}
                />
                Son de tic-tac pendant timer
              </label>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-section">
            <h3>Notifications</h3>
            <div className="permission-status">
              <span>Statut: {permissionStateText[permissionState]}</span>
            </div>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.enabled}
                  onChange={(e) =>
                    handleNotificationChange('enabled', e.target.checked)
                  }
                  disabled={permissionState !== 'granted'}
                />
                Activer les notifications
              </label>
            </div>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.showAtEnd}
                  onChange={(e) =>
                    handleNotificationChange('showAtEnd', e.target.checked)
                  }
                  disabled={!settings.notifications.enabled}
                />
                Notifier à la fin du timer
              </label>
            </div>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.showAtHalfway}
                  onChange={(e) =>
                    handleNotificationChange('showAtHalfway', e.target.checked)
                  }
                  disabled={!settings.notifications.enabled}
                />
                Notifier à mi-parcours
              </label>
            </div>
            {permissionState === 'denied' && (
              <p className="help-text">
                Les notifications sont bloquées. Vérifiez les paramètres de
                votre navigateur.
              </p>
            )}
          </section>

          {/* Behavior */}
          <section className="settings-section">
            <h3>Comportement</h3>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.autoStartBreaks}
                  onChange={(e) =>
                    onUpdateSettings({ autoStartBreaks: e.target.checked })
                  }
                />
                Démarrer automatiquement les pauses
              </label>
            </div>
            <div className="setting-row checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.autoStartPomodoros}
                  onChange={(e) =>
                    onUpdateSettings({ autoStartPomodoros: e.target.checked })
                  }
                />
                Démarrer automatiquement les sessions focus
              </label>
            </div>
          </section>

          {/* Data */}
          <section className="settings-section">
            <h3>Données</h3>
            <div className="data-actions">
              <button className="btn-secondary" onClick={handleExport}>
                <Download size={16} />
                Exporter les statistiques
              </button>
              <label className="btn-secondary file-upload">
                <Upload size={16} />
                Importer des statistiques
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
              </label>
              {importError && <p className="error-text">{importError}</p>}
              <button
                className="btn-danger"
                onClick={() => setShowResetConfirm(true)}
              >
                <AlertTriangle size={16} />
                Réinitialiser tout
              </button>
            </div>
          </section>
        </div>

        {/* Reset confirmation modal */}
        {showResetConfirm && (
          <div className="confirm-modal">
            <h3>Confirmer la réinitialisation</h3>
            <p>
              Cette action supprimera toutes vos statistiques et paramètres.
              Cette action est irréversible.
            </p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowResetConfirm(false)}
              >
                Annuler
              </button>
              <button className="btn-confirm" onClick={handleResetAll}>
                Réinitialiser
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
