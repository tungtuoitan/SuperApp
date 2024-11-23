import React, { createContext, useContext, useReducer, useState } from 'react'

export interface FormHelper {
    nameError: boolean
    nameErrorMessage: string

    emailError: boolean
    emailErrorMessage: string

    passwordError: boolean
    passwordErrorMessage: string
    showPassword: boolean
    
    confirmPasswordError: boolean
    confirmPassErrorMessage: string
    showConfirmPassword: boolean
}

const initFormHelper = {
    nameError: false,
    nameErrorMessage: '',
    
    emailError: false,  
    emailErrorMessage: '',

    passwordError: false,
    passwordErrorMessage: '',
    showPassword: false,

    confirmPasswordError: false,
    confirmPassErrorMessage: '',
    showConfirmPassword: false,
}

export interface LoginContextData {
    loginForm: LoginForm
    setLoginForm: (loginForm: LoginForm) => void
    formHelper: FormHelper
    setFormHelper: (formHelper: FormHelper) => void
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
    loginForm: initLoginForm,
    setLoginForm: () => {},
    formHelper: {
        emailError: false,
        emailErrorMessage: '',
        nameError: false,
        nameErrorMessage: '',

        passwordError: false,
        showPassword: false,
        passwordErrorMessage: '',

        confirmPasswordError: false,
        confirmPassErrorMessage: '',
        showConfirmPassword: false,
    },
    setFormHelper: () => {},

}
export const LoginStore = createContext<LoginContextData>(initLoginStore);
export const useLoginStore = () => useContext(LoginStore);

export const LoginProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    console.log('re-render LoginStore')
  const [loginForm, setLoginForm] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    initLoginForm
); 
  const [formHelper, setFormHelper] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    initFormHelper
);

  return (
      <LoginStore.Provider
          value={{
            loginForm,
            setLoginForm,
            formHelper,
            setFormHelper,

          }}>
          {children}
      </LoginStore.Provider>
  )
}