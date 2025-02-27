// Format date util test 
import {describe, test, expect} from 'vitest';
import formatDate, {formatDailyActivity} from '@/utils/formatDate';

describe('formatDate Utils', () => {
    test('should return formatted date [MM/DD/YYYY]', () => {
        const formattedDate = formatDate(1740651355444/1000); // expects seconds
        expect(formattedDate).toBe('02/27/2025');
    })

    test('should return formatted date [YYYY-MM-DD]', () => {
        const formattedDate = formatDailyActivity(1740651355444); // expects milli-seconds
        expect(formattedDate).toBe('2025-02-27');
    })
})
