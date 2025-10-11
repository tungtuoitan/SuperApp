/**
 * useAuthHelpers Hook
 * Helper functions for authentication operations including login, logout,
 * and token exchange. Uses AuthStore for state management.
 */

import { authApi } from '@/services/api';
import { useAuthStoreContext } from '@/store/auth/AuthStore';
import { storageService, STORAGE_KEYS } from '@/services/storage.service';
import type { LoginRequest, ExchangeTokenResponse } from '@/types/index';

interface UseAuthHelpersReturn {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    exchangeToken: (code: string) => Promise<ExchangeTokenResponse>;
}

/**
 * Custom helper hook for authentication operations
 * NO PARAMETERS - Helper hooks should not accept any parameters
 * NO useEffect - Components handle data fetching timing
 * NO side effects - Components handle business logic timing
 * ONLY function definitions - Return callable functions
 * USE store setters - Update centralized state
 * 
 * @returns Object containing auth helper functions
 */
export function useAuthHelpers(): UseAuthHelpersReturn {
    // Get state setters from AuthStore (no state returned)
    const { 
        setAuth, 
        setIsAuthenticated,
        setLoginLoading, 
        setLoginError,
        setTokenExchangeLoading,
        setTokenExchangeError,
        setError 
    } = useAuthStoreContext();

    /**
     * Login with username and password
     * @param username User's username
     * @param password User's password
     * @throws Will throw error if login fails
     */
    const login = async (username: string, password: string): Promise<void> => {
        setLoginLoading(true);
        setLoginError(null);
        setError(null);

        try {
            const loginRequest: LoginRequest = { username, password };
            const response = await authApi.login(loginRequest);

            // Save token to localStorage
            storageService.setString(STORAGE_KEYS.USER_TOKEN, response.token);

            // Update auth store (never store passwords)
            setAuth({
                userName: username,
                password: '', // Never store actual passwords
                userToken: response.token,
            });

            setIsAuthenticated(true);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setLoginError(errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setLoginLoading(false);
        }
    };

    /**
     * Logout user and clean up auth state
     * Clears store state and removes stored tokens
     */
    const logout = (): void => {
        // Clear auth store state
        setAuth({
            userName: '',
            password: '',
            userToken: '',
        });
        setIsAuthenticated(false);
        
        // Clear any errors
        setError(null);
        setLoginError(null);
        setTokenExchangeError(null);
        
        // Remove token from storage
        storageService.remove(STORAGE_KEYS.USER_TOKEN);
    };

    /**
     * Exchange authorization code for token
     * @param code Authorization code from OAuth provider
     * @returns Promise resolving to token exchange response
     * @throws Will throw error if token exchange fails
     */
    const exchangeToken = async (code: string): Promise<ExchangeTokenResponse> => {
        setTokenExchangeLoading(true);
        setTokenExchangeError(null);
        setError(null);

        try {
            const response = await authApi.exchangeCodeForToken(code);

            // Save token to localStorage
            if (response.access_token) {
                storageService.setString(STORAGE_KEYS.USER_TOKEN, response.access_token);
                
                // Update auth store
                setAuth(prev => ({
                    ...prev,
                    userToken: response.access_token,
                }));
                
                setIsAuthenticated(true);
            }

            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Token exchange failed';
            setTokenExchangeError(errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setTokenExchangeLoading(false);
        }
    };

    // NO useEffect - Components handle data fetching timing

    return {
        login,
        logout,
        exchangeToken,
    };
}