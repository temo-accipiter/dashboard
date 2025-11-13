import { describe, it, expect, vi } from 'vitest';
import {
  calculatePercentage,
  clamp,
  roundTo,
  randomBetween,
  average,
} from '../math';

describe('math utils', () => {
  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(50, 200)).toBe(25);
      expect(calculatePercentage(75, 150)).toBe(50);
    });

    it('should handle decimals parameter', () => {
      expect(calculatePercentage(1, 3, 2)).toBe(33.33);
      expect(calculatePercentage(2, 3, 2)).toBe(66.67);
      expect(calculatePercentage(1, 3, 0)).toBe(33);
    });

    it('should return 0 when total is 0', () => {
      expect(calculatePercentage(10, 0)).toBe(0);
    });

    it('should handle 0 value', () => {
      expect(calculatePercentage(0, 100)).toBe(0);
    });

    it('should throw error for negative values', () => {
      expect(() => calculatePercentage(-10, 100)).toThrow('Values must be positive');
      expect(() => calculatePercentage(10, -100)).toThrow('Values must be positive');
    });

    it('should handle values greater than total', () => {
      expect(calculatePercentage(150, 100)).toBe(150);
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should handle edge values', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });

    it('should throw error when min > max', () => {
      expect(() => clamp(5, 10, 0)).toThrow('Min cannot be greater than max');
    });

    it('should handle negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
      expect(clamp(-15, -10, -1)).toBe(-10);
      expect(clamp(0, -10, -1)).toBe(-1);
    });
  });

  describe('roundTo', () => {
    it('should round to specified decimals', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.14159, 3)).toBe(3.142);
      expect(roundTo(3.14159, 0)).toBe(3);
    });

    it('should handle default decimals parameter', () => {
      expect(roundTo(3.14159)).toBe(3.14);
    });

    it('should handle integers', () => {
      expect(roundTo(5, 2)).toBe(5);
    });

    it('should throw error for negative decimals', () => {
      expect(() => roundTo(3.14, -1)).toThrow('Decimals must be positive');
    });

    it('should round correctly for edge cases', () => {
      expect(roundTo(2.5, 0)).toBe(3);
      expect(roundTo(2.4, 0)).toBe(2);
      expect(roundTo(2.555, 2)).toBe(2.56);
    });
  });

  describe('randomBetween', () => {
    it('should generate number within range', () => {
      // Test multiple fois pour vérifier la cohérence
      for (let i = 0; i < 100; i++) {
        const result = randomBetween(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should return same value when min equals max', () => {
      expect(randomBetween(5, 5)).toBe(5);
    });

    it('should throw error when min > max', () => {
      expect(() => randomBetween(10, 5)).toThrow('Min cannot be greater than max');
    });

    it('should work with negative ranges', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomBetween(-10, -1);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-1);
      }
    });

    it('should be deterministic with mocked random', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      expect(randomBetween(0, 10)).toBe(5);
      vi.restoreAllMocks();
    });
  });

  describe('average', () => {
    it('should calculate average correctly', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([10, 20, 30])).toBe(20);
      expect(average([100])).toBe(100);
    });

    it('should handle decimals', () => {
      expect(average([1, 2, 3])).toBe(2);
      expect(average([1, 2])).toBe(1.5);
    });

    it('should handle negative numbers', () => {
      expect(average([-1, -2, -3])).toBe(-2);
      expect(average([-10, 10])).toBe(0);
    });

    it('should throw error for empty array', () => {
      expect(() => average([])).toThrow('Cannot calculate average of empty array');
    });

    it('should handle large numbers', () => {
      expect(average([1000000, 2000000, 3000000])).toBe(2000000);
    });
  });
});
