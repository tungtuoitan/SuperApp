
import { createContext, Dispatch, SetStateAction, useContext, useState, ReactNode } from 'react';

/**
 * Authentication form state interface.
 * Represents the temporary form state used during authentication.
 * 
 * NOTE: This appears to be a duplicate of the main AuthContext.
 * Consider consolidating authentication state management into a single context.
 */
export interface Auth {
    /** Username entered in the login form */
    userName: string;
    /** Password entered in the login form */
    password: string;
    /** User authentication token */
    userToken: string;
}

/**
 * Authentication context data interface.
 * Provides access to authentication form state and setter function.
 */
export interface AuthContextData {
    /** Current authentication form state */
    auth: Auth;
    /** Function to update authentication form state */
    setAuth: Dispatch<SetStateAction<Auth>>;
}

/**
 * Default value for the authentication context.
 * Used as fallback when context is not properly initialized.
 */
export const AuthContextDefaultValue: AuthContextData = {
    auth: { userName: '', password: '', userToken: '' },
    setAuth: () => {
        console.warn('AuthStore setAuth called outside of provider');
    },
};

/**
 * Authentication store context.
 * Provides authentication form state management for login components.
 * 
 * NOTE: This context appears to duplicate functionality from the main AuthContext.
 * Consider refactoring to use a single authentication state management solution.
 */
const AuthStore = createContext<AuthContextData>(AuthContextDefaultValue);

/**
 * Hook to access the authentication store context.
 * 
 * @returns Authentication context data with form state and setter
 * @throws Error if used outside of AuthProvider
 */
export function useAuthStore(): AuthContextData {
    const context = useContext(AuthStore);
    if (!context) {
        throw new Error('useAuthStore must be used within AuthProvider');
    }
    return context;
}

/**
 * Authentication store provider component.
 * 
 * Provides authentication form state management to child components.
 * This is intended for temporary form state during the login process.
 * 
 * @param children - Child components that need access to auth form state
 * @returns Provider component with authentication form context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<Auth>({ 
        userName: '', 
        password: '', 
        userToken: '' 
    });

    const contextValue: AuthContextData = {
        auth,
        setAuth,
    };

    return (
        <AuthStore.Provider value={contextValue}>
            {children}
        </AuthStore.Provider>
    );
}