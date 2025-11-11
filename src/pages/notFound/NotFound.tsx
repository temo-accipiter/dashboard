'use client'

// ==============================
// 🧭 Page 404 - Non trouvée
// ==============================

import './NotFound.scss'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oups ! La page que vous cherchez est introuvable.</p>
      <Link href="/">{`Retour à l'accueil`}</Link>
    </div>
  )
}
