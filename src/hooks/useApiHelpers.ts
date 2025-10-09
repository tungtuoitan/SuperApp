/**
 * useApiHelpers Hook
 * Helper functions for API operations including executing API calls and managing responses.
 * Uses ApiStore for state management.
 */

import { useApiStore } from '../store/api/ApiStore';

interface UseApiHelpersReturn<T = any, P extends any[] = any[]> {
    execute: (apiFunction: (...params: P) => Promise<T>, ...params: P) => Promise<T | null>;
    executeWithId: (callId: string, apiFunction: (...params: P) => Promise<T>, ...params: P) => Promise<T | null>;
    reset: () => void;
    resetCall: (callId: string) => void;
    getCallData: (callId: string) => any;
    getCallLoading: (callId: string) => boolean;
    getCallError: (callId: string) => string | null;
    clearHistory: () => void;
}

/**
 * Custom helper hook for API operations
 * NO PARAMETERS - Helper hooks should not accept any parameters
 * NO useEffect - Components handle API call timing
 * NO side effects - Components handle business logic timing
 * ONLY function definitions - Return callable functions
 * USE store setters - Update centralized state
 * 
 * @returns Object containing API helper functions
 */
export function useApiHelpers<T = any, P extends any[] = any[]>(): UseApiHelpersReturn<T, P> {
    // Get state setters from ApiStore (no state returned)
    const {
        setData,
        setLoading,
        setError,
        setApiCalls,
        setLastExecutedCall,
        setCallHistory,
    } = useApiStore();

    /**
     * Execute an API function with automatic state management
     * @param apiFunction The API function to execute
     * @param params Parameters to pass to the API function
     * @returns Promise that resolves to the API result or null if error occurred
     */
    const execute = async (apiFunction: (...params: P) => Promise<T>, ...params: P): Promise<T | null> => {
        const startTime = Date.now();
        
        try {
            setLoading(true);
            setError(null);

            const result = await apiFunction(...params);
            setData(result);
            
            // Add successful call to history
            const duration = Date.now() - startTime;
            setCallHistory(prev => [...prev, {
                callId: 'default',
                timestamp: new Date(),
                success: true,
                duration,
            }]);
            
            setLastExecutedCall('default');
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'API call failed';
            setError(errorMessage);
            
            // Add failed call to history
            const duration = Date.now() - startTime;
            setCallHistory(prev => [...prev, {
                callId: 'default',
                timestamp: new Date(),
                success: false,
                duration,
            }]);
            
            console.error('API Error:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Execute an API function with a specific call ID for multiple concurrent calls
     * @param callId Unique identifier for this API call
     * @param apiFunction The API function to execute
     * @param params Parameters to pass to the API function
     * @returns Promise that resolves to the API result or null if error occurred
     */
    const executeWithId = async (callId: string, apiFunction: (...params: P) => Promise<T>, ...params: P): Promise<T | null> => {
        const startTime = Date.now();
        
        try {
            // Set loading state for this specific call
            setApiCalls(prev => ({
                ...prev,
                [callId]: {
                    data: prev[callId]?.data || null,
                    loading: true,
                    error: null,
                },
            }));

            const result = await apiFunction(...params);
            
            // Update state for this specific call
            setApiCalls(prev => ({
                ...prev,
                [callId]: {
                    data: result,
                    loading: false,
                    error: null,
                },
            }));
            
            // Add successful call to history
            const duration = Date.now() - startTime;
            setCallHistory(prev => [...prev, {
                callId,
                timestamp: new Date(),
                success: true,
                duration,
            }]);
            
            setLastExecutedCall(callId);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'API call failed';
            
            // Update error state for this specific call
            setApiCalls(prev => ({
                ...prev,
                [callId]: {
                    data: prev[callId]?.data || null,
                    loading: false,
                    error: errorMessage,
                },
            }));
            
            // Add failed call to history
            const duration = Date.now() - startTime;
            setCallHistory(prev => [...prev, {
                callId,
                timestamp: new Date(),
                success: false,
                duration,
            }]);
            
            console.error(`API Error (${callId}):`, err);
            return null;
        }
    };

    /**
     * Reset the main API state to initial values
     */
    const reset = (): void => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    /**
     * Reset a specific API call state
     * @param callId The call ID to reset
     */
    const resetCall = (callId: string): void => {
        setApiCalls(prev => {
            const updated = { ...prev };
            delete updated[callId];
            return updated;
        });
    };

    /**
     * Get data for a specific API call
     * @param callId The call ID to get data for
     * @returns The data for the specified call
     */
    const getCallData = (callId: string): any => {
        // This is a helper function to be used with the store's apiCalls state
        // Components will need to access this through the store
        return null; // Components should use the store directly
    };

    /**
     * Get loading state for a specific API call
     * @param callId The call ID to get loading state for
     * @returns The loading state for the specified call
     */
    const getCallLoading = (callId: string): boolean => {
        // This is a helper function to be used with the store's apiCalls state
        // Components will need to access this through the store
        return false; // Components should use the store directly
    };

    /**
     * Get error state for a specific API call
     * @param callId The call ID to get error state for
     * @returns The error state for the specified call
     */
    const getCallError = (callId: string): string | null => {
        // This is a helper function to be used with the store's apiCalls state
        // Components will need to access this through the store
        return null; // Components should use the store directly
    };

    /**
     * Clear the API call history
     */
    const clearHistory = (): void => {
        setCallHistory([]);
    };

    // NO useEffect - Components handle API call timing

    return {
        execute,
        executeWithId,
        reset,
        resetCall,
        getCallData,
        getCallLoading,
        getCallError,
        clearHistory,
    };
}