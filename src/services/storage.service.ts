/**
 * Local Storage Service
 * Type-safe wrapper for localStorage operations
 */

export const storageService = {
  /**
   * Get item from localStorage
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  },

  /**
   * Get string item directly (for tokens, etc.)
   */
  getString(key: string): string | null {
    return localStorage.getItem(key);
  },

  /**
   * Set string item directly
   */
  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  },
};

// Storage keys constants
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  OAUTH_STATE: 'oauth_state',
  ACCESS_TOKEN: 'access_token',
} as const;
