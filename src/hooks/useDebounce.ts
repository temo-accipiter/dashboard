import { useState, useEffect } from 'react'

/**
 * Hook pour debouncer une valeur
 * Utile pour éviter trop d'appels API lors de la saisie utilisateur
 *
 * @param value - Valeur à debouncer
 * @param delay - Délai en millisecondes (défaut: 500ms)
 * @returns Valeur debouncée
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Faire l'appel API avec debouncedSearchTerm
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Créer un timer qui met à jour la valeur après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Nettoyer le timer si value change avant la fin du délai
    // Cela évite de mettre à jour la valeur trop souvent
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
