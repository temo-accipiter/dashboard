import React, { useState } from 'react'
import { TimerStatus } from './types'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

interface ControlsProps {
  status: TimerStatus
  progress: number
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}

export const Controls: React.FC<ControlsProps> = ({
  status,
  progress,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleReset = () => {
    // Show confirmation if more than 50% progress
    if (progress > 50 && status !== 'idle') {
      setShowResetConfirm(true)
    } else {
      onReset()
    }
  }

  const confirmReset = () => {
    onReset()
    setShowResetConfirm(false)
  }

  const cancelReset = () => {
    setShowResetConfirm(false)
  }

  return (
    <>
      <div className="pomodoro-controls">
        {/* Main button: Start/Pause */}
        <button
          className={`control-btn control-btn-primary ${status === 'running' ? 'pause' : 'start'}`}
          onClick={status === 'running' ? onPause : onStart}
          aria-label={status === 'running' ? 'Pause' : 'Start'}
          title={status === 'running' ? 'Pause (Espace)' : 'Démarrer (Espace)'}
        >
          {status === 'running' ? (
            <>
              <Pause size={20} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={20} />
              <span>{status === 'paused' ? 'Reprendre' : 'Démarrer'}</span>
            </>
          )}
        </button>

        {/* Skip button */}
        <button
          className="control-btn control-btn-secondary"
          onClick={onSkip}
          aria-label="Skip"
          title="Passer au suivant (S)"
        >
          <SkipForward size={18} />
          <span>Suivant</span>
        </button>

        {/* Reset button */}
        <button
          className="control-btn control-btn-tertiary"
          onClick={handleReset}
          aria-label="Reset"
          title="Réinitialiser (R)"
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="pomodoro-modal-overlay" onClick={cancelReset}>
          <div className="pomodoro-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmer la réinitialisation</h3>
            <p>
              Vous avez déjà complété plus de 50% de cette session. Voulez-vous
              vraiment réinitialiser ?
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelReset}>
                Annuler
              </button>
              <button className="btn-confirm" onClick={confirmReset}>
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
