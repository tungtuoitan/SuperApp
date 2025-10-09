/**
 * Authentication Context
 * Global authentication state management for user login/logout,
 * authentication status, and user data across the application
 */

import { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { User } from '../types';

/**
 * Authentication context interface defining the shape of auth state and actions
 */
export interface AuthContextValue {
    auth: User;
    setAuth: React.Dispatch<React.SetStateAction<User>>;
    isAuthenticated: boolean;
    login: (userName: string, password: string, token: string) => void;
    logout: () => void;
}

const DEFAULT_AUTH_STATE: User = {
    userName: '',
    password: '',
    userToken: '',
};

export const AUTH_CONTEXT_DEFAULT_VALUE: AuthContextValue = {
    auth: DEFAULT_AUTH_STATE,
    setAuth: () => {},
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextValue>(AUTH_CONTEXT_DEFAULT_VALUE);

/**
 * Custom hook to access authentication context
 * @throws {Error} When used outside of AuthProvider
 * @returns {AuthContextValue} Authentication context value with state and actions
 */
export const useAuthStore = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthStore must be used within AuthProvider');
    }
    return context;
};

/**
 * Authentication provider component that manages auth state for the entire application
 * Provides user authentication status, login/logout functions, and user data management
 */
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [auth, setAuth] = useState<User>(DEFAULT_AUTH_STATE);

    const isAuthenticated = Boolean(auth.userToken);

    const login = (userName: string, password: string, token: string) => {
        setAuth({ userName, password, userToken: token });
    };

    const logout = () => {
        setAuth(DEFAULT_AUTH_STATE);
        localStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
