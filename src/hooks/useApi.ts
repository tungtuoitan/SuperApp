/**
 * useApi Hook
 * Generic hook for API calls with loading and error states
 */

import { useState } from 'react';

interface UseApiReturn<T, P extends any[]> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...params: P) => Promise<T | null>;
  reset: () => void;
}

export const useApi = <T, P extends any[]>(
  apiFunction: (...params: P) => Promise<T>
): UseApiReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'API call failed';
      setError(errorMessage);
      console.error('API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};
