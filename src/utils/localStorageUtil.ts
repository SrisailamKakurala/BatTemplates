// @/utils/localStorageUtil.ts
import { User } from "@/constants/schema";

/**
 * Retrieves user data from auth-storage in localStorage
 * 
 * @returns User object if available, null otherwise
 * @throws Will not throw but returns null if localStorage is not available or data is invalid
 * 
 * @example
 * // Returns user object or null
 * const currentUser = getUser();
 * if (currentUser) {
 *   console.log(currentUser.id);
 * }
 */
export const getUser = (): User | null => {
  try {
    // Check if localStorage is available (for SSR/environments without localStorage)
    if (typeof localStorage === 'undefined') {
      return null;
    }
    
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) {
      return null;
    }
    
    const parsedData = JSON.parse(authStorage);
    return parsedData?.state?.user || null;
  } catch (error) {
    // Handle potential errors like JSON.parse errors or localStorage access issues
    console.error('Error retrieving user from localStorage:', error);
    return null;
  }
};