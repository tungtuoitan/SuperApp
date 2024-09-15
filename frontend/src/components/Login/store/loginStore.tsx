import React, { createContext, useContext, useState } from 'react'

export interface LoginContextData {
    password: string
    setPassword: (password: string) => void
    showPassword: boolean
    setShowPassword: (showPassword: boolean) => void
}

export const initLoginStore: LoginContextData = {
    password: '',
    setPassword: (password: string) => {},
    showPassword: false,
    setShowPassword: (showPassword: boolean) => {}
}
export const LoginStore = createContext<LoginContextData>(initLoginStore);
export const useLoginStore = () => useContext(LoginStore);


export const StyleSturdyActProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
  const [password,setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
      <LoginStore.Provider
          value={{
            password,
            setPassword,
            showPassword,
            setShowPassword
          }}>
          {children}
      </LoginStore.Provider>
  )
}