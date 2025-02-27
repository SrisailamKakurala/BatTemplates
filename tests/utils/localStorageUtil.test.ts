// Local storage util test 
import {describe, test, expect} from 'vitest';
import {getUser} from '@/utils/localStorageUtil';

describe('Local Storage Utils', () => {
    // get's user data form local-storage
    test('should return user data', () => {
        const user = getUser();
        expect(user).toBe(null);
    });
})

