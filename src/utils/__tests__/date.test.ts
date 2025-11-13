import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate, getRelativeTime, isFutureDate } from '../date';

describe('date utils', () => {
  describe('formatDate', () => {
    it('should format a Date object correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toContain('janvier');
      expect(result).toContain('2024');
    });

    it('should format a timestamp correctly', () => {
      const timestamp = new Date('2024-03-20').getTime();
      const result = formatDate(timestamp);
      expect(result).toContain('mars');
      expect(result).toContain('2024');
    });

    it('should format an ISO string correctly', () => {
      const isoString = '2024-06-10T12:00:00Z';
      const result = formatDate(isoString);
      expect(result).toContain('juin');
      expect(result).toContain('2024');
    });

    it('should use custom format options', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, {
        year: '2-digit',
        month: 'short',
        day: '2-digit',
      });
      expect(result).toBeTruthy();
      expect(result).toContain('24');
    });

    it('should throw error for invalid date', () => {
      expect(() => formatDate('invalid-date')).toThrow('Invalid date provided');
    });
  });

  describe('getRelativeTime', () => {
    beforeEach(() => {
      // Mock Date.now() pour avoir des tests déterministes
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return "À l\'instant" for current time', () => {
      const now = new Date();
      expect(getRelativeTime(now)).toBe('À l\'instant');
    });

    it('should return minutes ago for recent times', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(getRelativeTime(fiveMinutesAgo)).toBe('Il y a 5 minutes');
    });

    it('should return hours ago for same day', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(getRelativeTime(threeHoursAgo)).toBe('Il y a 3 heures');
    });

    it('should return "Hier" for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(getRelativeTime(yesterday)).toBe('Hier');
    });

    it('should return days ago for recent past', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(threeDaysAgo)).toBe('Il y a 3 jours');
    });

    it('should return weeks ago for longer periods', () => {
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(twoWeeksAgo)).toBe('Il y a 2 semaines');
    });

    it('should return months ago for even longer periods', () => {
      const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(twoMonthsAgo)).toBe('Il y a 2 mois');
    });

    it('should return years ago for very old dates', () => {
      const twoYearsAgo = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000);
      expect(getRelativeTime(twoYearsAgo)).toBe('Il y a 2 ans');
    });

    it('should throw error for invalid date', () => {
      expect(() => getRelativeTime('not-a-date')).toThrow('Invalid date provided');
    });
  });

  describe('isFutureDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return true for future dates', () => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      expect(isFutureDate(tomorrow)).toBe(true);
    });

    it('should return false for past dates', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isFutureDate(yesterday)).toBe(false);
    });

    it('should return false for current time', () => {
      const now = new Date();
      expect(isFutureDate(now)).toBe(false);
    });

    it('should work with timestamps', () => {
      const futureTimestamp = Date.now() + 1000 * 60 * 60;
      expect(isFutureDate(futureTimestamp)).toBe(true);
    });

    it('should work with ISO strings', () => {
      const futureIso = new Date(Date.now() + 1000 * 60 * 60).toISOString();
      expect(isFutureDate(futureIso)).toBe(true);
    });

    it('should throw error for invalid date', () => {
      expect(() => isFutureDate('invalid')).toThrow('Invalid date provided');
    });
  });
});
