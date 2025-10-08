/**
 * Authentication Context
 * Global authentication state management
 */

import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { User } from '../types';

export interface AuthContextData {
  auth: User;
  setAuth: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  login: (userName: string, password: string, token: string) => void;
  logout: () => void;
}

const defaultAuthState: User = {
  userName: '',
  password: '',
  userToken: '',
};

export const AuthContextDefaultValue: AuthContextData = {
  auth: defaultAuthState,
  setAuth: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextData>(AuthContextDefaultValue);

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthStore must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<User>(defaultAuthState);

  const isAuthenticated = Boolean(auth.userToken);

  const login = (userName: string, password: string, token: string) => {
    setAuth({ userName, password, userToken: token });
  };

  const logout = () => {
    setAuth(defaultAuthState);
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
