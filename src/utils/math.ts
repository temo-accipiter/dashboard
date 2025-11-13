/**
 * Calcule un pourcentage
 * @param value - Valeur partielle
 * @param total - Valeur totale
 * @param decimals - Nombre de décimales (défaut: 0)
 * @returns Pourcentage calculé
 */
export function calculatePercentage(
  value: number,
  total: number,
  decimals: number = 0
): number {
  if (total === 0) {
    return 0;
  }

  if (value < 0 || total < 0) {
    throw new Error('Values must be positive');
  }

  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(decimals));
}

/**
 * Clamp une valeur entre min et max
 * @param value - Valeur à limiter
 * @param min - Valeur minimum
 * @param max - Valeur maximum
 * @returns Valeur limitée
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Arrondit un nombre à N décimales
 * @param value - Valeur à arrondir
 * @param decimals - Nombre de décimales
 * @returns Valeur arrondie
 */
export function roundTo(value: number, decimals: number = 2): number {
  if (decimals < 0) {
    throw new Error('Decimals must be positive');
  }

  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Génère un nombre aléatoire entre min et max (inclus)
 * @param min - Valeur minimum
 * @param max - Valeur maximum
 * @returns Nombre aléatoire
 */
export function randomBetween(min: number, max: number): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calcule la moyenne d'un tableau de nombres
 * @param numbers - Tableau de nombres
 * @returns Moyenne calculée
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error('Cannot calculate average of empty array');
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}
