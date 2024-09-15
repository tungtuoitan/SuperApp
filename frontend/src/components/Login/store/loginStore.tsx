import React, { createContext, useContext, useReducer, useState } from 'react'

export interface LoginContextData {
    showPassword: boolean
    setShowPassword: (showPassword: boolean) => void
    showConfirmPassword: boolean
    setShowConfirmPassword: (showConfirmPassword: boolean) => void
    loginForm: LoginForm
    setLoginForm: (loginForm: LoginForm) => void
}

export interface LoginForm {
    name: string
    email: string
    password: string
    confirmPassword: string
}
const initLoginForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
} 
export const initLoginStore: LoginContextData = {
    showPassword: false,
    setShowPassword: () => {},
    showConfirmPassword: false,
    setShowConfirmPassword: () => {},

    loginForm: initLoginForm,
    setLoginForm: () => {}

}
export const LoginStore = createContext<LoginContextData>(initLoginStore);
export const useLoginStore = () => useContext(LoginStore);

export const LoginProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
  const [loginForm, setLoginForm] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    initLoginForm
); 
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
      <LoginStore.Provider
          value={{
            showPassword,
            setShowPassword,
            showConfirmPassword,
            setShowConfirmPassword,
            loginForm,
            setLoginForm,

          }}>
          {children}
      </LoginStore.Provider>
  )
}