/**
 * useAuth Hook
 * Custom hook for authentication operations
 */

import { useState } from 'react';
import { authApi } from '../services/api';
import { useAuthStore } from '../contexts';
import { storageService, STORAGE_KEYS } from '../services/storage.service';

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const { setAuth, logout: contextLogout } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.login({ username, password });

      // Save token to localStorage
      storageService.setString(STORAGE_KEYS.USER_TOKEN, response.token);

      // Update auth context
      setAuth({
        userName: username,
        password: '',
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

  const logout = () => {
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
