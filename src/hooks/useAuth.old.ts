/**
 * useAuth Hook
 * Custom hook for authentication operations including login, logout,
 * token management, and integration with auth context and storage
 */

import { useState } from 'react';

import { authApi } from '../services/api';
import { useAuthStore } from '../contexts';
import { storageService, STORAGE_KEYS } from '../services/storage.service';

/**
 * Return type for useAuth hook
 */
interface UseAuthReturn {
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

/**
 * Custom hook for authentication operations
 * @returns Object containing auth state and actions
 */
export const useAuth = (): UseAuthReturn => {
    const { setAuth, logout: contextLogout } = useAuthStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Login with username and password
     * @param username User's username
     * @param password User's password
     * @throws Will throw error if login fails
     */
    const login = async (username: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.login({ username, password });

            // Save token to localStorage
            storageService.setString(STORAGE_KEYS.USER_TOKEN, response.token);

            // Update auth context (never store passwords)
            setAuth({
                userName: username,
                password: '', // Never store actual passwords
                userToken: response.token,
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout user and clean up auth state
     * Clears context and removes stored tokens
     */
    const logout = (): void => {
        contextLogout();
        storageService.remove(STORAGE_KEYS.USER_TOKEN);
    };

    return {
        loading,
        error,
        login,
        logout,
    };
};
