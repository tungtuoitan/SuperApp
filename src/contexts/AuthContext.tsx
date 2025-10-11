/**
 * Authentication Context
 * Minimal authentication context that provides basic auth state.
 * Business logic is handled by AuthStore and useAuthHelpers.
 */

import React, { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import { AuthProvider as AuthStoreProvider, useAuthStoreContext } from '@/store/auth/AuthStore';

/**
 * Authentication context interface defining basic auth state access
 */
export interface AuthContextValue {
    auth: {
        userName: string;
        password: string;
        userToken: string;
    };
    isAuthenticated: boolean;
    setAuth: React.Dispatch<React.SetStateAction<{
        userName: string;
        password: string;
        userToken: string;
    }>>;
    loading: boolean;
    error: string | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * @throws {Error} When used outside of AuthProvider
 * @returns {AuthContextValue} Authentication context value with state
 */
export const useAuthStore = () => {
    const storeContext = useAuthStoreContext();
    
    if (!storeContext) {
        throw new Error('useAuthStore must be used within AuthProvider');
    }
    
    return {
        auth: storeContext.auth,
        isAuthenticated: storeContext.isAuthenticated,
        setAuth: storeContext.setAuth,
        loading: storeContext.loading,
        error: storeContext.error,
        logout: () => {
            // Clear auth state
            storeContext.setAuth({
                userName: '',
                password: '',
                userToken: '',
            });
            storeContext.setIsAuthenticated(false);
            
            // Clear any stored token
            localStorage.removeItem('userToken');
        },
    };
};

/**
 * Authentication provider component that wraps the AuthStore provider
 * Provides minimal auth context for compatibility with existing code
 */
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <AuthStoreProvider>
            {children}
        </AuthStoreProvider>
    );
};
