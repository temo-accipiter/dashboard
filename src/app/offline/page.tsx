import React from 'react'
import './offline.scss'

export const metadata = {
  title: 'Hors ligne - Dashboard',
  description: 'Page affichée lorsque vous êtes hors ligne',
}

export default function OfflinePage() {
  return (
    <div className="offline-container">
      <div className="offline-content">
        <div className="offline-icon">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        </div>

        <h1 className="offline-title">Vous êtes hors ligne</h1>

        <p className="offline-description">
          Il semble que vous n&apos;ayez pas de connexion internet. Certaines
          fonctionnalités peuvent être limitées.
        </p>

        <div className="offline-actions">
          <button
            onClick={() => window.location.reload()}
            className="offline-button offline-button--primary"
          >
            Réessayer
          </button>

          <button
            onClick={() => window.history.back()}
            className="offline-button offline-button--secondary"
          >
            Retour
          </button>
        </div>

        <div className="offline-info">
          <p>
            💡 Cette application peut fonctionner hors ligne pour certaines
            fonctionnalités grâce au cache du service worker.
          </p>
        </div>
      </div>
    </div>
  )
}
