
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";

export interface Auth {
    userName: string;
    password: string;
    userToken: string;
}
export interface AuthContextData {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
};

export const AuthContextDefaultValue: AuthContextData = {
    auth: { userName: '', password: '', userToken: '' },
    setAuth: () => { },
};

const AuthStore = createContext<AuthContextData>(AuthContextDefaultValue);
export const useAuthStore = () => useContext(AuthStore);

export const AuthProvider: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = ({ children }) => {
    const [auth, setAuth] = useState<Auth>({ userName: '', password: '', userToken: '' });

    return (
        <AuthStore.Provider
            value={{
                auth,
                setAuth,
            }}>
            {children}
        </AuthStore.Provider>
    )
}