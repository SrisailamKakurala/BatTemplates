import { describe, test, expect } from 'vitest';
import formatDate, { formatDailyActivity } from '@/utils/formatDate';

describe('formatDate Utils', () => {
  describe('formatDate function', () => {
    test('should return formatted date [MM/DD/YYYY]', () => {
      const formattedDate = formatDate(1740651355); // February 27, 2025 in seconds
      expect(formattedDate).toBe('02/27/2025');
    });

    test('should handle invalid inputs', () => {
      expect(formatDate(NaN)).toBe('Invalid Date');
      expect(formatDate(null as unknown as number)).toBe('Invalid Date'); // Test for null
      expect(formatDate(undefined as unknown as number)).toBe('Invalid Date'); // Test for undefined
      expect(formatDate('invalid' as unknown as number)).toBe('Invalid Date'); // Test for non-numeric input
    });

    test('should handle edge cases', () => {
      expect(formatDate(0)).toBe('01/01/1970'); // Unix epoch
      expect(formatDate(Math.floor(Date.now() / 1000))).toMatch(/^\d{2}\/\d{2}\/\d{4}$/); // Current date
    });
  });

  describe('formatDailyActivity function', () => {
    test('should return formatted date [YYYY-MM-DD]', () => {
      const formattedDate = formatDailyActivity(1740651355000); // February 27, 2025 in milliseconds
      expect(formattedDate).toBe('2025-02-27');
    });

    test('should handle invalid inputs', () => {
      expect(formatDailyActivity(NaN)).toBe('Invalid Date');
      expect(formatDailyActivity(null as unknown as number)).toBe('Invalid Date'); // Test for null
      expect(formatDailyActivity(undefined as unknown as number)).toBe('Invalid Date'); // Test for undefined
      expect(formatDailyActivity('invalid' as unknown as number)).toBe('Invalid Date'); // Test for non-numeric input
    });

    test('should handle edge cases', () => {
      expect(formatDailyActivity(0)).toBe('1970-01-01'); // Unix epoch
      expect(formatDailyActivity(Date.now())).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Current date
    });
  });
});