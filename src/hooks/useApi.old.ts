import { useState } from 'react';

/**
 * Return type for the useApi hook
 * @template T - Type of data returned by the API function
 * @template P - Type array for the parameters of the API function
 */
interface UseApiReturn<T, P extends any[]> {
    /** Current data from the API call, null if no data or error */
    data: T | null;
    /** Loading state indicator */
    loading: boolean;
    /** Error message if the API call failed, null if no error */
    error: string | null;
    /** Function to execute the API call with the provided parameters */
    execute: (...params: P) => Promise<T | null>;
    /** Function to reset the hook state to initial values */
    reset: () => void;
}

/**
 * Generic hook for making API calls with built-in loading and error state management.
 * 
 * This hook provides a consistent pattern for API calls across the application,
 * handling common concerns like loading states, error handling, and data management.
 * 
 * @template T - The type of data returned by the API function
 * @template P - The parameter types for the API function (as a tuple)
 * @param apiFunction - The API function to wrap with state management
 * @returns Object containing data, loading, error states and control functions
 * 
 * @example
 * ```typescript
 * // For a function that takes a single ID parameter
 * const getUserApi = (id: number) => api.get<User>(`/users/${id}`);
 * const { data: user, loading, error, execute } = useApi(getUserApi);
 * 
 * // Execute the API call
 * await execute(123);
 * 
 * // For a function with multiple parameters
 * const searchUsersApi = (query: string, page: number) => api.get<User[]>('/users/search', { query, page });
 * const { data: users, loading, error, execute } = useApi(searchUsersApi);
 * await execute('john', 1);
 * ```
 */
export function useApi<T, P extends any[]>(
    apiFunction: (...params: P) => Promise<T>
): UseApiReturn<T, P> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Execute the API function with the provided parameters.
     * Manages loading and error states automatically.
     * 
     * @param params - Parameters to pass to the API function
     * @returns Promise that resolves to the API result or null if error occurred
     */
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

    /**
     * Reset the hook state to initial values.
     * Clears data, loading, and error states.
     */
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
}
