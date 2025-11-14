/**
 * Formate une date en format lisible
 * @param date - Date à formater (Date object, timestamp, ou string ISO)
 * @param options - Options de formatage Intl.DateTimeFormat
 * @returns Date formatée en string
 */
export function formatDate(
  date: Date | number | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return dateObj.toLocaleDateString('fr-FR', options || defaultOptions)
}

/**
 * Retourne une date relative (ex: "il y a 2 jours")
 * @param date - Date à comparer avec maintenant
 * @returns String décrivant le temps écoulé
 */
export function getRelativeTime(date: Date | number | string): string {
  const dateObj =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }

  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      if (diffInMinutes === 0) return "À l'instant"
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
    }
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  }

  if (diffInDays === 1) return 'Hier'
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `Il y a ${months} mois`
  }

  const years = Math.floor(diffInDays / 365)
  return `Il y a ${years} an${years > 1 ? 's' : ''}`
}

/**
 * Vérifie si une date est dans le futur
 */
export function isFutureDate(date: Date | number | string): boolean {
  const dateObj =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }

  return dateObj.getTime() > Date.now()
}
