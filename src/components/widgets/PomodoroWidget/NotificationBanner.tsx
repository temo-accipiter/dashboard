import React from 'react'
import { Bell, X } from 'lucide-react'

interface NotificationBannerProps {
  onEnable: () => void
  onDismiss: () => void
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  onEnable,
  onDismiss,
}) => {
  return (
    <div className="notification-banner">
      <div className="banner-content">
        <Bell size={20} className="banner-icon" />
        <div className="banner-text">
          <strong>Activer les notifications ?</strong>
          <span>Recevez des alertes à la fin de chaque session.</span>
        </div>
      </div>
      <div className="banner-actions">
        <button className="btn-enable" onClick={onEnable}>
          Activer
        </button>
        <button className="btn-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
